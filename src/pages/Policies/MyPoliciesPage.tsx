import React from 'react';
import MyPolicy from '../../components/Policy/MyPolicy';
import { mockMyPolicyData } from '../../data/mockData';

const MyPoliciesPage: React.FC = () => {
  return (
    <MyPolicy
      policy={mockMyPolicyData.policy}
      insuranceTypes={mockMyPolicyData.insuranceTypes}
      faqs={mockMyPolicyData.faqs}
      onRenew={mockMyPolicyData.onRenew}
      onUploadDocument={mockMyPolicyData.onUploadDocument}
      onFilterChange={mockMyPolicyData.onFilterChange}
      onPolicySelect={mockMyPolicyData.onPolicySelect}
    />
  );
};

export default MyPoliciesPage;