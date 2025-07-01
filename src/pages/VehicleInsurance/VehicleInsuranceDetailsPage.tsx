import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, 
  Calculator, 
  Shield, 
  Car, 
  User, 
  FileText, 
  DollarSign,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Edit,
  Save,
  RefreshCw,
  Download,
  Share2,
  Printer,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { InsurancePolicy, NavigationState, PremiumCalculatorParams, AddOnCoverage } from '../../types/insurance';
import { premiumCalculator, PremiumCalculationResult } from '../../utils/premiumCalculator';

const VehicleInsuranceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract navigation state
  const navigationState = location.state as NavigationState | null;
  
  // Component state
  const [policy, setPolicy] = useState<InsurancePolicy | null>(navigationState?.policy || null);
  const [calculatorParams, setCalculatorParams] = useState<PremiumCalculatorParams>(
    navigationState?.calculatorParams || {} as PremiumCalculatorParams
  );
  const [premiumCalculation, setPremiumCalculation] = useState<PremiumCalculationResult | null>(null);
  const [availableAddOns, setAvailableAddOns] = useState<AddOnCoverage[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize component
  useEffect(() => {
    const initializeComponent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Validate navigation state
        if (!navigationState || !policy) {
          throw new Error('Policy data not found. Please navigate from the policies page.');
        }

        // Validate policy ID matches route parameter
        if (policy.id !== id) {
          throw new Error('Policy ID mismatch. Invalid navigation.');
        }

        // Load available add-ons
        const addOns = premiumCalculator.getAvailableAddOns(policy.vehicle.vehicleType);
        
        // Update add-ons with current selections
        const updatedAddOns = addOns.map(addon => ({
          ...addon,
          isSelected: policy.addOns.some(policyAddon => 
            policyAddon.id === addon.id && policyAddon.isSelected
          )
        }));
        
        setAvailableAddOns(updatedAddOns);

        // Calculate initial premium
        await calculatePremium(calculatorParams);

        console.log('Component initialized successfully');
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load policy details');
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, [id, policy, calculatorParams, navigationState]);

  // Calculate premium with current parameters
  const calculatePremium = async (params: PremiumCalculatorParams) => {
    try {
      setIsCalculating(true);
      setError(null);

      const result = premiumCalculator.calculatePremium(params);
      setPremiumCalculation(result);
      
      console.log('Premium calculated:', result);
    } catch (err) {
      console.error('Premium calculation error:', err);
      setError('Failed to calculate premium. Please check your inputs.');
    } finally {
      setIsCalculating(false);
    }
  };

  // Handle add-on selection changes
  const handleAddOnChange = async (addOnId: string, isSelected: boolean) => {
    try {
      // Update available add-ons
      const updatedAddOns = availableAddOns.map(addon =>
        addon.id === addOnId ? { ...addon, isSelected } : addon
      );
      setAvailableAddOns(updatedAddOns);

      // Update calculator parameters
      const selectedAddOnIds = updatedAddOns
        .filter(addon => addon.isSelected)
        .map(addon => addon.id);

      const updatedParams = {
        ...calculatorParams,
        selectedAddOns: selectedAddOnIds
      };
      
      setCalculatorParams(updatedParams);
      setHasUnsavedChanges(true);

      // Recalculate premium
      await calculatePremium(updatedParams);
    } catch (err) {
      console.error('Add-on change error:', err);
      setError('Failed to update add-on selection');
    }
  };

  // Handle parameter changes
  const handleParameterChange = async (field: keyof PremiumCalculatorParams, value: any) => {
    try {
      const updatedParams = {
        ...calculatorParams,
        [field]: value
      };
      
      setCalculatorParams(updatedParams);
      setHasUnsavedChanges(true);

      // Recalculate premium with debouncing
      setTimeout(() => calculatePremium(updatedParams), 500);
    } catch (err) {
      console.error('Parameter change error:', err);
      setError('Failed to update parameter');
    }
  };

  // Save changes
  const handleSaveChanges = async () => {
    try {
      if (!policy) return;

      setIsCalculating(true);

      // Update policy with new add-ons and premium
      const updatedPolicy: InsurancePolicy = {
        ...policy,
        addOns: availableAddOns.filter(addon => addon.isSelected),
        premiumBreakdown: premiumCalculation ? {
          basePremium: premiumCalculation.basePremium,
          addOnPremiums: Object.values(premiumCalculation.addOnPremiums).reduce((sum, premium) => sum + premium, 0),
          discounts: premiumCalculation.discounts,
          taxes: premiumCalculation.taxes,
          totalPremium: premiumCalculation.totalPremium,
          payableAmount: premiumCalculation.totalPremium
        } : policy.premiumBreakdown,
        updatedAt: new Date().toISOString()
      };

      setPolicy(updatedPolicy);
      setHasUnsavedChanges(false);
      setIsEditing(false);

      console.log('Changes saved successfully');
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save changes');
    } finally {
      setIsCalculating(false);
    }
  };

  // Quick action handlers
  const handleDownload = () => {
    console.log('Downloading policy document...');
    // Implement download logic
  };

  const handleShare = () => {
    console.log('Sharing policy...');
    // Implement share logic
  };

  const handlePrint = () => {
    console.log('Printing policy...');
    window.print();
  };

  // Navigation handler
  const handleGoBack = () => {
    if (hasUnsavedChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }
    
    const returnPath = navigationState?.returnPath || '/my-policy';
    navigate(returnPath);
  };

  // Memoized calculations
  const savingsFromCurrentPlan = useMemo(() => {
    if (!premiumCalculation || !policy) return 0;
    return Math.max(0, policy.premiumBreakdown.totalPremium - premiumCalculation.totalPremium);
  }, [premiumCalculation, policy]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
          <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>Loading policy details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !policy) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="text-center max-w-md mx-auto p-6">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            Unable to Load Policy
          </h2>
          <p className="font-roboto mb-4" style={{ color: 'var(--color-muted)' }}>
            {error}
          </p>
          <button
            onClick={handleGoBack}
            className="py-2 px-4 rounded-lg font-medium font-roboto text-white transition-all duration-200 hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Go Back to Policies
          </button>
        </div>
      </div>
    );
  }

  if (!policy) return null;

  return (
    <>
      <Helmet>
        <title>{`${policy.vehicle.make} ${policy.vehicle.model} Insurance - ${policy.policyNumber} | Trovity`}</title>
        <meta name="description" content={`Manage your ${policy.policyType} insurance policy with real-time premium calculator and comprehensive coverage details`} />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        {/* Header */}
        <div className="sticky top-0 z-40 backdrop-blur-md border-b" style={{ 
          backgroundColor: 'var(--color-background)', 
          borderColor: 'var(--color-border)' 
        }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleGoBack}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-primary)'
                  }}
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                
                <div>
                  <h1 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {policy.vehicle.make} {policy.vehicle.model} Insurance
                  </h1>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Policy: {policy.policyNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {hasUnsavedChanges && (
                  <div className="flex items-center space-x-2 px-3 py-1 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <Info className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-sm font-roboto" style={{ color: 'var(--color-primary)' }}>
                      Unsaved changes
                    </span>
                  </div>
                )}
                
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-primary)'
                  }}
                  title="Download Policy"
                >
                  <Download className="h-5 w-5" />
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-primary)'
                  }}
                  title="Share Policy"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                
                <button
                  onClick={handlePrint}
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                  style={{ 
                    backgroundColor: 'var(--color-secondary)',
                    color: 'var(--color-primary)'
                  }}
                  title="Print Policy"
                >
                  <Printer className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Policy Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vehicle Information */}
              <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <Car className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    Vehicle Information
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Make & Model</p>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy.vehicle.make} {policy.vehicle.model}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Registration Number</p>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy.vehicle.registrationNumber}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Year</p>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy.vehicle.year}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Fuel Type</p>
                    <p className="font-semibold font-poppins capitalize" style={{ color: 'var(--color-foreground)' }}>
                      {policy.vehicle.fuelType}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Engine Capacity</p>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy.vehicle.cubicCapacity} CC
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Vehicle Value</p>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
                      ₹{policy.vehicle.vehicleValue.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Policy Holder Information */}
              <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <User className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    Policy Holder Information
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Name</p>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy.policyHolder.name}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Email</p>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy.policyHolder.email}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>Phone</p>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy.policyHolder.phone}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>License Number</p>
                    <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy.policyHolder.drivingLicenseNumber}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm font-roboto mb-2" style={{ color: 'var(--color-muted)' }}>Address</p>
                  <p className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    {policy.policyHolder.address.street}, {policy.policyHolder.address.city}, {policy.policyHolder.address.state} - {policy.policyHolder.address.pincode}
                  </p>
                </div>
              </div>

              {/* Coverage Details */}
              <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    Coverage Details
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Own Damage Cover
                    </h3>
                    <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                      ₹{policy.coverage.ownDamage.sumInsured.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Deductible: ₹{policy.coverage.ownDamage.deductible.toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Third Party Liability
                    </h3>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Bodily Injury: ₹{policy.coverage.thirdPartyLiability.bodilyInjury.toLocaleString('en-IN')}
                    </p>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Property Damage: ₹{policy.coverage.thirdPartyLiability.propertyDamage.toLocaleString('en-IN')}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <h3 className="font-semibold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                      Personal Accident Cover
                    </h3>
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Owner/Driver: ₹{policy.coverage.personalAccident.ownerDriver.toLocaleString('en-IN')}
                    </p>
                    {policy.coverage.personalAccident.passengers && (
                      <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Passengers: ₹{policy.coverage.personalAccident.passengers.toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Premium Calculator */}
            <div className="space-y-6">
              {/* Premium Calculator Card */}
              <div className="rounded-xl shadow-lg p-6 sticky top-24" style={{ backgroundColor: 'var(--color-card)' }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <Calculator className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                    <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      Premium Calculator
                    </h2>
                  </div>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-primary)'
                    }}
                    title={isEditing ? 'Cancel editing' : 'Edit parameters'}
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>

                {/* Current Premium Display */}
                {premiumCalculation && (
                  <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--color-secondary)' }}>
                    <div className="text-center">
                      <p className="text-sm font-roboto mb-1" style={{ color: 'var(--color-muted)' }}>
                        Total Premium
                      </p>
                      <p className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                        ₹{premiumCalculation.totalPremium.toLocaleString('en-IN')}
                      </p>
                      {savingsFromCurrentPlan > 0 && (
                        <p className="text-sm font-roboto text-green-600 mt-1">
                          Save ₹{savingsFromCurrentPlan.toLocaleString('en-IN')} from current plan
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Add-ons Selection */}
                <div className="mb-6">
                  <h3 className="font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                    Add-on Covers
                  </h3>
                  
                  <div className="space-y-3">
                    {availableAddOns.map((addon) => (
                      <div key={addon.id} className="flex items-start space-x-3 p-3 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
                        <input
                          type="checkbox"
                          id={addon.id}
                          checked={addon.isSelected}
                          onChange={(e) => handleAddOnChange(addon.id, e.target.checked)}
                          disabled={!isEditing}
                          className="mt-1"
                          style={{ accentColor: 'var(--color-primary)' }}
                        />
                        <div className="flex-1">
                          <label htmlFor={addon.id} className="font-medium font-poppins cursor-pointer" style={{ color: 'var(--color-foreground)' }}>
                            {addon.name}
                          </label>
                          <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                            {addon.description}
                          </p>
                          {premiumCalculation && premiumCalculation.addOnPremiums[addon.id] && (
                            <p className="text-sm font-semibold font-poppins mt-1" style={{ color: 'var(--color-primary)' }}>
                              +₹{premiumCalculation.addOnPremiums[addon.id].toLocaleString('en-IN')}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Premium Breakdown */}
                {premiumCalculation && (
                  <div className="mb-6">
                    <h3 className="font-semibold font-poppins mb-4" style={{ color: 'var(--color-foreground)' }}>
                      Premium Breakdown
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Own Damage</span>
                        <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          ₹{premiumCalculation.breakdown.ownDamage.toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Third Party</span>
                        <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          ₹{premiumCalculation.breakdown.thirdParty.toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Personal Accident</span>
                        <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          ₹{premiumCalculation.breakdown.personalAccident.toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      {premiumCalculation.breakdown.addOns > 0 && (
                        <div className="flex justify-between">
                          <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Add-ons</span>
                          <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                            ₹{premiumCalculation.breakdown.addOns.toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}
                      
                      {Object.values(premiumCalculation.discounts).some(d => d > 0) && (
                        <div className="flex justify-between text-green-600">
                          <span className="font-roboto">Discounts</span>
                          <span className="font-semibold font-poppins">
                            -₹{Object.values(premiumCalculation.discounts).reduce((sum, d) => sum + d, 0).toLocaleString('en-IN')}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>GST (18%)</span>
                        <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                          ₹{premiumCalculation.taxes.gst.toLocaleString('en-IN')}
                        </span>
                      </div>
                      
                      <div className="border-t pt-2 mt-2" style={{ borderColor: 'var(--color-border)' }}>
                        <div className="flex justify-between">
                          <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>Total Premium</span>
                          <span className="font-bold font-poppins text-lg" style={{ color: 'var(--color-primary)' }}>
                            ₹{premiumCalculation.totalPremium.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  {hasUnsavedChanges && (
                    <button
                      onClick={handleSaveChanges}
                      disabled={isCalculating}
                      className="w-full py-3 px-4 rounded-lg font-semibold font-roboto text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50 flex items-center justify-center space-x-2"
                      style={{ backgroundColor: 'var(--color-primary)' }}
                    >
                      {isCalculating ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Calculating...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  )}
                  
                  <button
                    className="w-full py-3 px-4 rounded-lg font-semibold font-roboto transition-all duration-200 hover:opacity-90"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    Renew Policy
                  </button>
                  
                  <button
                    className="w-full py-3 px-4 rounded-lg font-semibold font-roboto transition-all duration-200 hover:opacity-90 border"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-primary)',
                      backgroundColor: 'transparent'
                    }}
                  >
                    Get Quote
                  </button>
                </div>

                {/* Error Display */}
                {error && (
                  <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <p className="text-sm font-roboto text-red-700">{error}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Policy Term Information */}
              <div className="rounded-xl shadow-lg p-6" style={{ backgroundColor: 'var(--color-card)' }}>
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="h-6 w-6" style={{ color: 'var(--color-primary)' }} />
                  <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                    Policy Term
                  </h2>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Start Date</span>
                    <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {new Date(policy.policyTerm.startDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>End Date</span>
                    <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {new Date(policy.policyTerm.endDate).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Duration</span>
                    <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy.policyTerm.duration} months
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-roboto" style={{ color: 'var(--color-muted)' }}>Grace Period</span>
                    <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      {policy.policyTerm.gracePeriod} days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleInsuranceDetailsPage;