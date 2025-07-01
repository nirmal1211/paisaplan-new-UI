import React, { useState } from 'react';
import { ArrowLeft, Download, Share2, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClaimHistoryMobile from './ClaimHistoryMobile';
import PolicyOverviewMobile from './PolicyOverviewMobile';
import NetworkHospitalsMobile from './NetworkHospitalsMobile';
import { PolicyDetails } from '../../data/policyDetails';

interface MobileOptimizedPolicyDetailsProps {
  policy: PolicyDetails;
}

type MobileTab = 'overview' | 'claims' | 'hospitals';

const MobileOptimizedPolicyDetails: React.FC<MobileOptimizedPolicyDetailsProps> = ({ policy }) => {
  const [activeTab, setActiveTab] = useState<MobileTab>('overview');
  const [menuOpen, setMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview' as MobileTab, label: 'Overview' },
    { id: 'claims' as MobileTab, label: 'Claims' },
    { id: 'hospitals' as MobileTab, label: 'Hospitals' },
  ];

  const handleDownload = () => {
    console.log('Downloading policy...');
    // Implement download logic
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${policy.type} Insurance Policy`,
        text: `Policy ${policy.policyNumber} with ${policy.provider}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      console.log('Sharing policy...');
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <PolicyOverviewMobile
            policyholderName="John Doe" // This would come from user context
            policyNumber={policy.policyNumber}
            provider={policy.provider}
            type={policy.type}
            sumInsured={policy.sumInsured}
            premium={policy.premium}
            validFrom={policy.validFrom}
            validTo={policy.validTo}
            status={policy.status}
          />
        );
      case 'claims':
        return <ClaimHistoryMobile claims={policy.claims} />;
      case 'hospitals':
        return <NetworkHospitalsMobile hospitals={policy.hospitals} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md border-b" 
           style={{ 
             backgroundColor: 'var(--color-background)', 
             borderColor: 'var(--color-border)' 
           }}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link
              to="/my-policy"
              className="touch-button touch-button-secondary p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-bold" style={{ color: 'var(--color-foreground)' }}>
                {policy.type} Insurance
              </h1>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                {policy.policyNumber}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="touch-button touch-button-secondary p-2"
              title="Download Policy"
            >
              <Download className="h-5 w-5" />
            </button>
            <button
              onClick={handleShare}
              className="touch-button touch-button-secondary p-2"
              title="Share Policy"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="touch-button touch-button-secondary p-2"
              title="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="flex border-t" style={{ borderColor: 'var(--color-border)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'border-b-2'
                  : ''
              }`}
              style={{
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-muted)',
                borderColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent',
                backgroundColor: activeTab === tab.id ? 'var(--color-secondary)' : 'transparent'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="pb-safe">
        {renderTabContent()}
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMenuOpen(false)}>
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-6"
               style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-foreground)' }}>
              Policy Actions
            </h3>
            <div className="space-y-3">
              <button className="touch-button touch-button-primary w-full">
                Renew Policy
              </button>
              <button className="touch-button touch-button-secondary w-full">
                File a Claim
              </button>
              <button className="touch-button touch-button-secondary w-full">
                Request Changes
              </button>
              <button className="touch-button touch-button-secondary w-full">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileOptimizedPolicyDetails;