import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PurchaseProvider } from '../../contexts/PurchaseContext';
import Layout from '../../components/Layout/Navbar';
import PolicyTypeSelection from './PolicyTypeSelection';
import PolicySelectionForm from '../../components/Purchase/PolicySelectionForm';
import ProviderListing from '../../components/Purchase/ProviderListing';
import ProviderDetails from '../../components/Purchase/ProviderDetails';

const PurchaseFlow: React.FC = () => {
  return (
    <PurchaseProvider>
      <Layout>
        <Routes>
          {/* Policy Type Selection - Main entry point */}
          <Route path="/" element={<PolicyTypeSelection />} />
          
          {/* Policy Form for specific type */}
          <Route path="/:policyType" element={<PolicySelectionForm />} />
          
          {/* Provider listing */}
          <Route path="/providers" element={<ProviderListing />} />
          
          {/* Provider details */}
          <Route path="/provider/:providerId" element={<ProviderDetails />} />
          
          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/buy-policy" replace />} />
        </Routes>
      </Layout>
    </PurchaseProvider>
  );
};

export default PurchaseFlow;