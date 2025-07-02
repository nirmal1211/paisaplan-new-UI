import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PurchaseProvider } from '../../contexts/PurchaseContext';
import ProgressIndicator from '../../components/Purchase/ProgressIndicator';
import Breadcrumb from '../../components/Purchase/Breadcrumb';
import PolicySelectionForm from '../../components/Purchase/PolicySelectionForm';
import ProviderListing from '../../components/Purchase/ProviderListing';
import ProviderDetails from '../../components/Purchase/ProviderDetails';

const PurchaseFlow: React.FC = () => {
  const steps = ['Policy Details', 'Choose Provider', 'Customize & Buy', 'Payment'];

  return (
    <PurchaseProvider>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
        {/* Navigation */}
        <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumb />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="border-b" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProgressIndicator currentStep={1} totalSteps={4} steps={steps} />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/:policyType" element={<PolicySelectionForm />} />
            <Route path="/providers" element={<ProviderListing />} />
            <Route path="/provider/:providerId" element={<ProviderDetails />} />
            <Route path="/" element={<Navigate to="/buy-policy/health-insurance" replace />} />
          </Routes>
        </div>
      </div>
    </PurchaseProvider>
  );
};

export default PurchaseFlow;