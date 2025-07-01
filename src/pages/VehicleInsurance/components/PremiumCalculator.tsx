import React, { useState, useCallback } from 'react';
import { Calculator, AlertCircle, CheckCircle } from 'lucide-react';

interface PremiumCalculatorProps {
  vehicleType: 'two-wheeler' | 'four-wheeler';
}

interface FormData {
  vehicleValue: string;
  age: string;
  location: string;
  previousClaims: string;
  voluntaryDeductible: string;
}

interface FormErrors {
  [key: string]: string;
}

const PremiumCalculator: React.FC<PremiumCalculatorProps> = ({ vehicleType }) => {
  const [formData, setFormData] = useState<FormData>({
    vehicleValue: '',
    age: '',
    location: '',
    previousClaims: '0',
    voluntaryDeductible: '0'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [calculatedPremium, setCalculatedPremium] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.vehicleValue || parseFloat(formData.vehicleValue) <= 0) {
      newErrors.vehicleValue = 'Please enter a valid vehicle value';
    }
    
    if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 100) {
      newErrors.age = 'Age must be between 18 and 100';
    }
    
    if (!formData.location) {
      newErrors.location = 'Please select a location';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const calculatePremium = useCallback(async () => {
    if (!validateForm()) return;
    
    setIsCalculating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const vehicleValue = parseFloat(formData.vehicleValue);
      const age = parseInt(formData.age);
      const claims = parseInt(formData.previousClaims);
      const deductible = parseInt(formData.voluntaryDeductible);
      
      // Basic premium calculation logic
      let basePremium = vehicleType === 'four-wheeler' 
        ? vehicleValue * 0.03 
        : vehicleValue * 0.02;
      
      // Age factor
      if (age < 25) basePremium *= 1.2;
      else if (age > 50) basePremium *= 0.9;
      
      // Location factor
      if (formData.location === 'metro') basePremium *= 1.1;
      else if (formData.location === 'rural') basePremium *= 0.8;
      
      // Claims factor
      basePremium *= (1 + claims * 0.1);
      
      // Deductible discount
      basePremium *= (1 - deductible * 0.05);
      
      setCalculatedPremium(Math.round(basePremium));
    } catch (error) {
      console.error('Error calculating premium:', error);
    } finally {
      setIsCalculating(false);
    }
  }, [formData, vehicleType, validateForm]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vehicle Value */}
        <div>
          <label htmlFor="vehicleValue" className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Value (₹) *
          </label>
          <input
            type="number"
            id="vehicleValue"
            value={formData.vehicleValue}
            onChange={(e) => handleInputChange('vehicleValue', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.vehicleValue ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder={vehicleType === 'four-wheeler' ? '500000' : '80000'}
            min="0"
            step="1000"
            aria-describedby={errors.vehicleValue ? 'vehicleValue-error' : undefined}
          />
          {errors.vehicleValue && (
            <p id="vehicleValue-error" className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.vehicleValue}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
            Your Age *
          </label>
          <input
            type="number"
            id="age"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="30"
            min="18"
            max="100"
            aria-describedby={errors.age ? 'age-error' : undefined}
          />
          {errors.age && (
            <p id="age-error" className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.age}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <select
            id="location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.location ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-describedby={errors.location ? 'location-error' : undefined}
          >
            <option value="">Select location</option>
            <option value="metro">Metro City</option>
            <option value="urban">Urban</option>
            <option value="rural">Rural</option>
          </select>
          {errors.location && (
            <p id="location-error" className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.location}
            </p>
          )}
        </div>

        {/* Previous Claims */}
        <div>
          <label htmlFor="previousClaims" className="block text-sm font-medium text-gray-700 mb-2">
            Previous Claims (last 3 years)
          </label>
          <select
            id="previousClaims"
            value={formData.previousClaims}
            onChange={(e) => handleInputChange('previousClaims', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">No Claims</option>
            <option value="1">1 Claim</option>
            <option value="2">2 Claims</option>
            <option value="3">3+ Claims</option>
          </select>
        </div>

        {/* Voluntary Deductible */}
        <div className="md:col-span-2">
          <label htmlFor="voluntaryDeductible" className="block text-sm font-medium text-gray-700 mb-2">
            Voluntary Deductible
          </label>
          <select
            id="voluntaryDeductible"
            value={formData.voluntaryDeductible}
            onChange={(e) => handleInputChange('voluntaryDeductible', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">No Deductible</option>
            <option value="1">₹2,500 (5% discount)</option>
            <option value="2">₹5,000 (10% discount)</option>
            <option value="3">₹7,500 (15% discount)</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            Higher deductible reduces your premium but increases out-of-pocket expense during claims
          </p>
        </div>
      </div>

      {/* Calculate Button */}
      <div className="flex justify-center">
        <button
          onClick={calculatePremium}
          disabled={isCalculating}
          className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Calculator className="h-4 w-4" />
          <span>{isCalculating ? 'Calculating...' : 'Calculate Premium'}</span>
        </button>
      </div>

      {/* Results */}
      {calculatedPremium && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h4 className="text-lg font-semibold text-green-800">Estimated Premium</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-green-600">Annual Premium</p>
              <p className="text-2xl font-bold text-green-800">{formatCurrency(calculatedPremium)}</p>
            </div>
            <div>
              <p className="text-sm text-green-600">Monthly Premium</p>
              <p className="text-2xl font-bold text-green-800">{formatCurrency(Math.round(calculatedPremium / 12))}</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Premium Breakdown</h5>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Base Premium:</span>
                <span>{formatCurrency(Math.round(calculatedPremium * 0.7))}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees:</span>
                <span>{formatCurrency(Math.round(calculatedPremium * 0.18))}</span>
              </div>
              <div className="flex justify-between">
                <span>Add-ons:</span>
                <span>{formatCurrency(Math.round(calculatedPremium * 0.12))}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-medium text-gray-900">
                <span>Total:</span>
                <span>{formatCurrency(calculatedPremium)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="w-full py-2 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
              Get Detailed Quote
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumCalculator;