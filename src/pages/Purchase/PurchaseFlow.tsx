import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { PurchaseProvider } from "../../contexts/PurchaseContext";
import PurchaseNavbar from "../../components/Layout/PurchaseNavbar";
import PolicyTypeSelection from "../Home/Home";
import PolicySelectionForm from "../../components/Purchase/PolicySelectionForm";
import ProviderListing from "../../components/Purchase/ProviderListing";
import ProviderDetails from "../../components/Purchase/ProviderDetails";

const PurchaseFlow: React.FC = () => {
  const location = useLocation();

  // Show navbar only on the main entry route
  const showNavbar =
    location.pathname === "/buy-policy" || location.pathname === "/buy-policy/";

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
