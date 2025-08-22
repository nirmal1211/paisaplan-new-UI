import React from "react";
import { Routes, Route } from "react-router-dom";
import { PurchaseProvider } from "../../contexts/PurchaseContext";
import PolicySelectionForm from "../../components/Purchase/PolicySelectionForm";
import ProviderListing from "../../components/Purchase/ProviderListing";
import ProviderDetails from "../../components/Purchase/ProviderDetails";

const PurchaseFlow: React.FC = () => {
  // const location = useLocation();

  return (
    <PurchaseProvider>
      <>
        <Routes>
          <Route path="/:policyType" element={<PolicySelectionForm />} />
          <Route path="/providers" element={<ProviderListing />} />
          <Route path="/provider/:providerId" element={<ProviderDetails />} />
        </Routes>
      </>
    </PurchaseProvider>
  );
};

export default PurchaseFlow;
