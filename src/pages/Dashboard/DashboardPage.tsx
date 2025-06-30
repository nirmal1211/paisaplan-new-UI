import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RetailCustomerDashboard from './RetailCustomerDashboard';
import CorporateEmployeeDashboard from './CorporateEmployeeDashboard';
import HRAdminDashboard from './HRAdminDashboard';
import UnderwriterDashboard from './UnderwriterDashboard';
import UnderwriterAdminDashboard from './UnderwriterAdminDashboard';
import RelationshipManagerDashboard from './RelationshipManagerDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'retail_customer':
        return <RetailCustomerDashboard />;
      case 'corporate_employee':
        return <CorporateEmployeeDashboard />;
      case 'hr_admin':
        return <HRAdminDashboard />;
      case 'underwriter':
        return <UnderwriterDashboard />;
      case 'underwriter_admin':
        return <UnderwriterAdminDashboard />;
      case 'relationship_manager':
        return <RelationshipManagerDashboard />;
      default:
        return <RetailCustomerDashboard />;
    }
  };

  return (
    <div className="animate-fade-in">
      {renderDashboard()}
    </div>
  );
};

export default DashboardPage;