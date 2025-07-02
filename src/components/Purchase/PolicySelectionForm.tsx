import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePurchase } from '../../contexts/PurchaseContext';
import { policyTypes } from '../../data/purchaseData';
import { FormField, Dependent } from '../../types/purchase';
import { Heart, Shield, Bike, Car, Plus, Trash2, Phone, Check, ArrowLeft } from 'lucide-react';

const PolicySelectionForm: React.FC = () => {
  const { policyType } = useParams<{ policyType: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = usePurchase();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const currentPolicyType = policyType ? policyTypes[policyType] : null;

  React.useEffect(() => {
    if (policyType) {
      dispatch({ type: 'SET_POLICY_TYPE', payload: policyType });
    }
  }, [policyType, dispatch]);

  const getIcon = (iconName: string) => {
    const icons = { Heart, Shield, Bike, Car };
    return icons[iconName as keyof typeof icons] || Shield;
  };

  const validateField = (field: FormField, value: any): string => {
    if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return `${field.label} is required`;
    }

    if (field.validation) {
      const { min, max, pattern, message } = field.validation;
      
      if (min !== undefined && value < min) {
        return message || `${field.label} must be at least ${min}`;
      }
      
      if (max !== undefined && value > max) {
        return message || `${field.label} must be at most ${max}`;
      }
      
      if (pattern && !new RegExp(pattern).test(value)) {
        return message || `${field.label} format is invalid`;
      }
    }

    return '';
  };

  const handleInputChange = (fieldName: string, value: any) => {
    dispatch({
      type: 'UPDATE_FORM_DATA',
      payload: { [fieldName]: value }
    });

    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleDependentChange = (index: number, field: string, value: any) => {
    const dependents = [...(state.formData.dependents || [])];
    dependents[index] = { ...dependents[index], [field]: value };
    handleInputChange('dependents', dependents);
  };

  const addDependent = () => {
    const newDependent: Dependent = {
      id: Date.now().toString(),
      name: '',
      age: 0,
      relation: '',
      medicalHistory: []
    };
    const dependents = [...(state.formData.dependents || []), newDependent];
    handleInputChange('dependents', dependents);
  };

  const removeDependent = (index: number) => {
    const dependents = state.formData.dependents?.filter((_, i) => i !== index) || [];
    handleInputChange('dependents', dependents);
  };

  const sendOtp = async () => {
    if (!state.formData.mobile) {
      setErrors(prev => ({ ...prev, mobile: 'Mobile number is required' }));
      return;
    }

    setShowOtpModal(true);
    console.log('OTP sent to:', state.formData.mobile);
  };

  const verifyOtp = async () => {
    setIsVerifying(true);
    
    setTimeout(() => {
      if (otpCode === '123456') {
        dispatch({
          type: 'UPDATE_FORM_DATA',
          payload: { mobileVerified: true, otpCode }
        });
        setShowOtpModal(false);
        setIsVerifying(false);
      } else {
        setErrors(prev => ({ ...prev, otp: 'Invalid OTP. Use 123456 for demo.' }));
        setIsVerifying(false);
      }
    }, 1500);
  };

  const validateForm = (): boolean => {
    if (!currentPolicyType) return false;

    const newErrors: Record<string, string> = {};

    currentPolicyType.baseFields.forEach(field => {
      const value = state.formData[field.name as keyof typeof state.formData];
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (!state.formData.mobileVerified) {
      newErrors.mobile = 'Mobile number must be verified';
    }

    if (policyType === 'health-insurance' && state.formData.dependents) {
      state.formData.dependents.forEach((dependent, index) => {
        if (!dependent.name) {
          newErrors[`dependent_${index}_name`] = 'Dependent name is required';
        }
        if (!dependent.age || dependent.age < 0) {
          newErrors[`dependent_${index}_age`] = 'Valid age is required';
        }
        if (!dependent.relation) {
          newErrors[`dependent_${index}_relation`] = 'Relation is required';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      navigate('/buy-policy/providers');
    }
  };

  const renderField = (field: FormField) => {
    const value = state.formData[field.name as keyof typeof state.formData];
    const error = errors[field.name];

    switch (field.type) {
      case 'text':
      case 'number':
      case 'email':
      case 'tel':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
              {field.label} {field.required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
            </label>
            <input
              type={field.type}
              value={value || ''}
              onChange={(e) => handleInputChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
              placeholder={field.placeholder}
              className={`w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all ${
                error ? 'border-red-500' : ''
              }`}
              style={{
                borderColor: error ? 'var(--color-danger)' : 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                '--tw-ring-color': 'var(--color-primary)'
              }}
            />
            {error && (
              <p className="text-sm font-roboto" style={{ color: 'var(--color-danger)' }}>
                {error}
              </p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
              {field.label} {field.required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
            </label>
            <select
              value={value || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all ${
                error ? 'border-red-500' : ''
              }`}
              style={{
                borderColor: error ? 'var(--color-danger)' : 'var(--color-border)',
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                '--tw-ring-color': 'var(--color-primary)'
              }}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && (
              <p className="text-sm font-roboto" style={{ color: 'var(--color-danger)' }}>
                {error}
              </p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
              {field.label} {field.required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map(option => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(value as string[] || []).includes(option.value)}
                    onChange={(e) => {
                      const currentValues = (value as string[]) || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option.value]
                        : currentValues.filter(v => v !== option.value);
                      handleInputChange(field.name, newValues);
                    }}
                    className="w-4 h-4 rounded focus:ring-2"
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {error && (
              <p className="text-sm font-roboto" style={{ color: 'var(--color-danger)' }}>
                {error}
              </p>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
              {field.label} {field.required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map(option => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-4 h-4 focus:ring-2"
                    style={{ accentColor: 'var(--color-primary)' }}
                  />
                  <span className="font-roboto" style={{ color: 'var(--color-foreground)' }}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {error && (
              <p className="text-sm font-roboto" style={{ color: 'var(--color-danger)' }}>
                {error}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (!currentPolicyType) {
    return (
      <div className="text-center py-12">
        <p className="text-lg font-roboto" style={{ color: 'var(--color-muted)' }}>
          Policy type not found
        </p>
      </div>
    );
  }

  const Icon = getIcon(currentPolicyType.icon);

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/buy-policy')}
            className="flex items-center space-x-2 text-sm font-roboto hover:opacity-80 transition-colors"
            style={{ color: 'var(--color-primary)' }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Policy Types</span>
          </button>
        </div>

        {/* Policy Type Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 rounded-2xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
              <Icon className="h-12 w-12" style={{ color: 'var(--color-primary)' }} />
            </div>
          </div>
          <h1 className="text-3xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
            {currentPolicyType.name}
          </h1>
          <p className="text-lg font-roboto" style={{ color: 'var(--color-muted)' }}>
            {currentPolicyType.description}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
            <h2 className="text-xl font-bold font-poppins mb-6" style={{ color: 'var(--color-foreground)' }}>
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Common fields */}
              <div className="space-y-2">
                <label className="block text-sm font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Email Address <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <input
                  type="email"
                  value={state.formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: 'var(--color-border)',
                    backgroundColor: 'var(--color-background)',
                    color: 'var(--color-foreground)',
                    '--tw-ring-color': 'var(--color-primary)'
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                  Mobile Number <span style={{ color: 'var(--color-danger)' }}>*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={state.formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="Enter your mobile number"
                    className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all pr-20"
                    style={{
                      borderColor: errors.mobile ? 'var(--color-danger)' : 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={state.formData.mobileVerified}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded text-sm font-medium transition-colors"
                    style={{
                      backgroundColor: state.formData.mobileVerified ? 'var(--color-success)' : 'var(--color-primary)',
                      color: 'white'
                    }}
                  >
                    {state.formData.mobileVerified ? (
                      <><Check className="h-4 w-4 inline mr-1" />Verified</>
                    ) : (
                      <>Verify</>
                    )}
                  </button>
                </div>
                {errors.mobile && (
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-danger)' }}>
                    {errors.mobile}
                  </p>
                )}
              </div>

              {/* Policy-specific fields */}
              {currentPolicyType.baseFields.map(renderField)}
            </div>
          </div>

          {/* Dependents Section for Health Insurance */}
          {policyType === 'health-insurance' && (
            <div className="rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                  Dependents (Optional)
                </h2>
                <button
                  type="button"
                  onClick={addDependent}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium font-roboto text-white transition-colors"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Dependent</span>
                </button>
              </div>

              {state.formData.dependents?.map((dependent, index) => (
                <div key={dependent.id} className="border rounded-lg p-6 mb-4" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                      Dependent {index + 1}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeDependent(index)}
                      className="p-2 rounded-lg hover:opacity-80 transition-colors"
                      style={{ backgroundColor: 'var(--color-danger)', color: 'white' }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Name <span style={{ color: 'var(--color-danger)' }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={dependent.name}
                        onChange={(e) => handleDependentChange(index, 'name', e.target.value)}
                        placeholder="Enter dependent name"
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: errors[`dependent_${index}_name`] ? 'var(--color-danger)' : 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      />
                      {errors[`dependent_${index}_name`] && (
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-danger)' }}>
                          {errors[`dependent_${index}_name`]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Age <span style={{ color: 'var(--color-danger)' }}>*</span>
                      </label>
                      <input
                        type="number"
                        value={dependent.age || ''}
                        onChange={(e) => handleDependentChange(index, 'age', Number(e.target.value))}
                        placeholder="Enter age"
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: errors[`dependent_${index}_age`] ? 'var(--color-danger)' : 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      />
                      {errors[`dependent_${index}_age`] && (
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-danger)' }}>
                          {errors[`dependent_${index}_age`]}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                        Relation <span style={{ color: 'var(--color-danger)' }}>*</span>
                      </label>
                      <select
                        value={dependent.relation}
                        onChange={(e) => handleDependentChange(index, 'relation', e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all"
                        style={{
                          borderColor: errors[`dependent_${index}_relation`] ? 'var(--color-danger)' : 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      >
                        <option value="">Select relation</option>
                        <option value="spouse">Spouse</option>
                        <option value="child">Child</option>
                        <option value="parent">Parent</option>
                        <option value="sibling">Sibling</option>
                      </select>
                      {errors[`dependent_${index}_relation`] && (
                        <p className="text-sm font-roboto" style={{ color: 'var(--color-danger)' }}>
                          {errors[`dependent_${index}_relation`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg font-bold font-roboto text-white transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Continue to Providers
            </button>
          </div>
        </form>

        {/* OTP Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="rounded-xl shadow-2xl p-8 max-w-md w-full mx-4" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="text-center mb-6">
                <div className="p-3 rounded-full mx-auto mb-4 w-fit" style={{ backgroundColor: 'var(--color-secondary)' }}>
                  <Phone className="h-8 w-8" style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="text-xl font-bold font-poppins mb-2" style={{ color: 'var(--color-foreground)' }}>
                  Verify Mobile Number
                </h3>
                <p className="font-roboto" style={{ color: 'var(--color-muted)' }}>
                  Enter the OTP sent to {state.formData.mobile}
                </p>
                <p className="text-sm font-roboto mt-2" style={{ color: 'var(--color-muted)' }}>
                  Demo OTP: 123456
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium font-roboto" style={{ color: 'var(--color-foreground)' }}>
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="w-full px-4 py-3 border rounded-lg font-roboto focus:outline-none focus:ring-2 transition-all text-center text-lg tracking-widest"
                    style={{
                      borderColor: errors.otp ? 'var(--color-danger)' : 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                  />
                  {errors.otp && (
                    <p className="text-sm font-roboto" style={{ color: 'var(--color-danger)' }}>
                      {errors.otp}
                    </p>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowOtpModal(false)}
                    className="flex-1 px-4 py-3 rounded-lg font-medium font-roboto transition-colors"
                    style={{ 
                      backgroundColor: 'var(--color-secondary)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={verifyOtp}
                    disabled={isVerifying || otpCode.length !== 6}
                    className="flex-1 px-4 py-3 rounded-lg font-medium font-roboto text-white transition-colors disabled:opacity-50"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    {isVerifying ? 'Verifying...' : 'Verify OTP'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolicySelectionForm;