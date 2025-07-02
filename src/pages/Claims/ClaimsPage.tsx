import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Eye, 
  Download, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  XCircle, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Building,
  User,
  MapPin,
  MessageSquare,
  TrendingUp,
  Shield,
  Plus,
  X
} from 'lucide-react';
import { Skeleton } from '../../components/UI/skeleton';

// Types for Claims Management
interface Claim {
  id: string;
  policyId: string;
  providerName: string;
  providerLogo: string;
  policyType: 'Health' | 'Motor' | 'Life' | 'Travel' | 'Home';
  claimInitiatedDate: string;
  requestedAmount: number;
  approvedAmount?: number;
  status: 'pending' | 'approved' | 'rejected' | 'processing' | 'under_review';
  comments: string;
  priority: 'low' | 'medium' | 'high';
  claimNumber: string;
  description: string;
  documents: string[];
  lastUpdated: string;
  estimatedResolution: string;
  adjusterName?: string;
  adjusterContact?: string;
}

interface FilterOptions {
  status: string[];
  policyType: string[];
  provider: string[];
  dateRange: string;
  amountRange: string;
}

interface SortOption {
  field: 'date' | 'amount' | 'status' | 'provider';
  direction: 'asc' | 'desc';
}

const ClaimsPage: React.FC = () => {
  // State Management
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOption, setSortOption] = useState<SortOption>({ field: 'date', direction: 'desc' });
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    policyType: [],
    provider: [],
    dateRange: 'all',
    amountRange: 'all'
  });

  // Mock Claims Data
  const mockClaims: Claim[] = [
    {
      id: 'CLM001',
      policyId: 'POL-HLTH-2024-001',
      providerName: 'Star Health Insurance',
      providerLogo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      policyType: 'Health',
      claimInitiatedDate: '2024-12-15',
      requestedAmount: 85000,
      approvedAmount: 82000,
      status: 'approved',
      comments: 'Claim approved after medical review. All documents verified successfully. Payment will be processed within 3-5 business days.',
      priority: 'high',
      claimNumber: 'SH2024001234',
      description: 'Hospitalization for cardiac procedure',
      documents: ['medical-report.pdf', 'discharge-summary.pdf', 'bills.pdf'],
      lastUpdated: '2024-12-20',
      estimatedResolution: '2024-12-22',
      adjusterName: 'Dr. Rajesh Kumar',
      adjusterContact: '+91-9876543210'
    },
    {
      id: 'CLM002',
      policyId: 'POL-MOTR-2024-002',
      providerName: 'ICICI Lombard',
      providerLogo: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      policyType: 'Motor',
      claimInitiatedDate: '2024-12-10',
      requestedAmount: 45000,
      status: 'processing',
      comments: 'Vehicle inspection completed. Waiting for repair estimate approval from authorized service center.',
      priority: 'medium',
      claimNumber: 'IL2024005678',
      description: 'Accident damage - front bumper and headlight',
      documents: ['accident-report.pdf', 'photos.zip', 'estimate.pdf'],
      lastUpdated: '2024-12-18',
      estimatedResolution: '2024-12-25',
      adjusterName: 'Priya Sharma',
      adjusterContact: '+91-9876543211'
    },
    {
      id: 'CLM003',
      policyId: 'POL-LIFE-2024-003',
      providerName: 'LIC of India',
      providerLogo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      policyType: 'Life',
      claimInitiatedDate: '2024-12-05',
      requestedAmount: 500000,
      status: 'under_review',
      comments: 'Additional documentation required. Please submit medical records from the last 2 years for policy verification.',
      priority: 'high',
      claimNumber: 'LIC2024009876',
      description: 'Life insurance claim - natural death',
      documents: ['death-certificate.pdf', 'medical-records.pdf'],
      lastUpdated: '2024-12-16',
      estimatedResolution: '2025-01-05',
      adjusterName: 'Amit Patel',
      adjusterContact: '+91-9876543212'
    },
    {
      id: 'CLM004',
      policyId: 'POL-TRVL-2024-004',
      providerName: 'HDFC ERGO',
      providerLogo: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      policyType: 'Travel',
      claimInitiatedDate: '2024-12-01',
      requestedAmount: 25000,
      approvedAmount: 22000,
      status: 'approved',
      comments: 'Travel delay claim approved. Reimbursement for hotel and meal expenses during flight delay.',
      priority: 'low',
      claimNumber: 'HE2024003456',
      description: 'Flight delay compensation',
      documents: ['flight-tickets.pdf', 'hotel-bills.pdf', 'receipts.pdf'],
      lastUpdated: '2024-12-12',
      estimatedResolution: '2024-12-15',
      adjusterName: 'Sneha Reddy',
      adjusterContact: '+91-9876543213'
    },
    {
      id: 'CLM005',
      policyId: 'POL-HOME-2024-005',
      providerName: 'Bajaj Allianz',
      providerLogo: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      policyType: 'Home',
      claimInitiatedDate: '2024-11-28',
      requestedAmount: 150000,
      status: 'rejected',
      comments: 'Claim rejected due to policy exclusion. Water damage caused by negligence is not covered under the current policy terms.',
      priority: 'medium',
      claimNumber: 'BA2024007890',
      description: 'Water damage to electronics',
      documents: ['damage-photos.zip', 'repair-estimate.pdf'],
      lastUpdated: '2024-12-10',
      estimatedResolution: 'N/A',
      adjusterName: 'Vikram Singh',
      adjusterContact: '+91-9876543214'
    },
    {
      id: 'CLM006',
      policyId: 'POL-HLTH-2024-006',
      providerName: 'Max Bupa',
      providerLogo: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      policyType: 'Health',
      claimInitiatedDate: '2024-12-18',
      requestedAmount: 35000,
      status: 'pending',
      comments: 'Initial review in progress. All required documents have been received and are being verified.',
      priority: 'medium',
      claimNumber: 'MB2024004567',
      description: 'Outpatient surgery - minor procedure',
      documents: ['surgery-report.pdf', 'prescription.pdf', 'bills.pdf'],
      lastUpdated: '2024-12-19',
      estimatedResolution: '2024-12-28',
      adjusterName: 'Kavya Nair',
      adjusterContact: '+91-9876543215'
    }
  ];

  // Initialize data
  useEffect(() => {
    const timer = setTimeout(() => {
      setClaims(mockClaims);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Debounced search
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter and sort claims
  const filteredAndSortedClaims = useMemo(() => {
    let filtered = claims.filter(claim => {
      // Search filter
      const searchMatch = debouncedSearchQuery === '' || 
        claim.policyId.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        claim.providerName.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        claim.claimNumber.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        claim.description.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

      // Status filter
      const statusMatch = filters.status.length === 0 || filters.status.includes(claim.status);

      // Policy type filter
      const typeMatch = filters.policyType.length === 0 || filters.policyType.includes(claim.policyType);

      // Provider filter
      const providerMatch = filters.provider.length === 0 || filters.provider.includes(claim.providerName);

      // Date range filter
      const dateMatch = filters.dateRange === 'all' || (() => {
        const claimDate = new Date(claim.claimInitiatedDate);
        const now = new Date();
        switch (filters.dateRange) {
          case 'last_week':
            return (now.getTime() - claimDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
          case 'last_month':
            return (now.getTime() - claimDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
          case 'last_3_months':
            return (now.getTime() - claimDate.getTime()) <= 90 * 24 * 60 * 60 * 1000;
          default:
            return true;
        }
      })();

      // Amount range filter
      const amountMatch = filters.amountRange === 'all' || (() => {
        switch (filters.amountRange) {
          case 'under_50k':
            return claim.requestedAmount < 50000;
          case '50k_to_100k':
            return claim.requestedAmount >= 50000 && claim.requestedAmount <= 100000;
          case 'over_100k':
            return claim.requestedAmount > 100000;
          default:
            return true;
        }
      })();

      return searchMatch && statusMatch && typeMatch && providerMatch && dateMatch && amountMatch;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortOption.field) {
        case 'date':
          aValue = new Date(a.claimInitiatedDate);
          bValue = new Date(b.claimInitiatedDate);
          break;
        case 'amount':
          aValue = a.requestedAmount;
          bValue = b.requestedAmount;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'provider':
          aValue = a.providerName;
          bValue = b.providerName;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOption.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOption.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [claims, debouncedSearchQuery, filters, sortOption]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedClaims.length / itemsPerPage);
  const paginatedClaims = filteredAndSortedClaims.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Helper functions
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'processing':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'under_review':
        return <Eye className="h-5 w-5 text-purple-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'under_review':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPolicyTypeIcon = (type: string) => {
    switch (type) {
      case 'Health':
        return '🏥';
      case 'Motor':
        return '🚗';
      case 'Life':
        return '👤';
      case 'Travel':
        return '✈️';
      case 'Home':
        return '🏠';
      default:
        return '📄';
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const toggleComments = (claimId: string) => {
    const newExpanded = new Set(expandedComments);
    if (newExpanded.has(claimId)) {
      newExpanded.delete(claimId);
    } else {
      newExpanded.add(claimId);
    }
    setExpandedComments(newExpanded);
  };

  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => {
      if (filterType === 'dateRange' || filterType === 'amountRange') {
        return { ...prev, [filterType]: value };
      } else {
        const currentValues = prev[filterType] as string[];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        return { ...prev, [filterType]: newValues };
      }
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      policyType: [],
      provider: [],
      dateRange: 'all',
      amountRange: 'all'
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleSort = (field: SortOption['field']) => {
    setSortOption(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Get unique values for filters
  const uniqueProviders = [...new Set(claims.map(claim => claim.providerName))];
  const uniqueStatuses = [...new Set(claims.map(claim => claim.status))];
  const uniquePolicyTypes = [...new Set(claims.map(claim => claim.policyType))];

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: 'var(--color-background)' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-12 w-64 mb-4" />
            <Skeleton className="h-6 w-96" />
          </div>

          {/* Search and Filter Skeleton */}
          <div className="mb-8 p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-card)' }}>
            <div className="flex flex-col lg:flex-row gap-4">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>

          {/* Claims Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-card)' }}>
                <div className="flex items-center space-x-4 mb-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-6 w-32 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-8 w-20 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Skeleton className="h-16" />
                  <Skeleton className="h-16" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Hero Section with Character Image */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br" style={{ 
            background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` 
          }} />
        </div>

        <div className="relative z-10 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Enhanced Header Section with Character */}
            <div className="mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left Side - Text Content */}
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center space-x-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br shadow-lg" style={{ 
                      background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))` 
                    }}>
                      <FileText className="h-10 w-10 text-white" />
                    </div>
                    <div className="h-12 w-px bg-gradient-to-b" style={{ 
                      background: `linear-gradient(to bottom, var(--color-primary), transparent)` 
                    }} />
                    <Shield className="h-8 w-8 animate-pulse" style={{ color: 'var(--color-primary)' }} />
                  </div>

                  <h1 className="text-5xl md:text-6xl font-bold font-poppins mb-4 bg-gradient-to-r bg-clip-text text-transparent" style={{ 
                    backgroundImage: `linear-gradient(135deg, var(--color-foreground), var(--color-primary))` 
                  }}>
                    Claims Management
                  </h1>
                  
                  <p className="text-xl font-roboto max-w-2xl leading-relaxed mb-8" style={{ color: 'var(--color-muted)' }}>
                    Track, manage, and monitor all your insurance claims with real-time updates and comprehensive analytics. Your friendly claims assistant is here to help!
                  </p>

                  {/* Quick Stats */}
                  <div className="flex items-center justify-center lg:justify-start space-x-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                        {claims.length}
                      </div>
                      <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Total Claims
                      </div>
                    </div>
                    <div className="h-12 w-px" style={{ backgroundColor: 'var(--color-border)' }} />
                    <div className="text-center">
                      <div className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                        {claims.filter(c => c.status === 'approved').length}
                      </div>
                      <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Approved
                      </div>
                    </div>
                    <div className="h-12 w-px" style={{ backgroundColor: 'var(--color-border)' }} />
                    <div className="text-center">
                      <div className="text-3xl font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                        {formatCurrency(claims.reduce((sum, claim) => sum + (claim.approvedAmount || claim.requestedAmount), 0))}
                      </div>
                      <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Total Value
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Character Image */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    {/* Character Image with Enhanced Styling */}
                    <div className="relative transform hover:scale-105 transition-transform duration-500">
                      <img 
                        src="/ChatGPT Image Jul 2, 2025, 03_49_54 PM copy.png"
                        alt="Claims Assistant Character"
                        className="w-80 h-80 md:w-96 md:h-96 object-contain drop-shadow-2xl"
                      />
                      
                      {/* Floating Animation Elements */}
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br rounded-full animate-bounce" style={{ 
                        background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
                        animationDelay: '0.5s'
                      }} />
                      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br rounded-full animate-bounce" style={{ 
                        background: `linear-gradient(135deg, var(--color-accent), var(--color-primary))`,
                        animationDelay: '1s'
                      }} />
                      <div className="absolute top-1/4 -left-6 w-4 h-4 bg-gradient-to-br rounded-full animate-pulse" style={{ 
                        background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`
                      }} />
                    </div>

                    {/* Speech Bubble */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-4 shadow-xl border-2 animate-bounce" style={{ 
                      borderColor: 'var(--color-primary)',
                      animationDelay: '2s',
                      animationDuration: '3s'
                    }}>
                      <div className="text-sm font-semibold font-poppins text-center" style={{ color: 'var(--color-primary)' }}>
                        Hi! I'm here to help with your claims! 👋
                      </div>
                      {/* Speech bubble tail */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent" style={{ 
                        borderTopColor: 'var(--color-primary)'
                      }} />
                    </div>

                    {/* Background Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br rounded-full opacity-20 blur-3xl -z-10" style={{ 
                      background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`
                    }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Search and Filter Section */}
            <div className="mb-8 rounded-2xl shadow-xl p-6" style={{ backgroundColor: 'var(--color-card)' }}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search by Policy ID, Provider, Claim Number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 rounded-xl font-roboto focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all duration-300"
                    style={{ 
                      borderColor: 'var(--color-border)',
                      backgroundColor: 'var(--color-background)',
                      color: 'var(--color-foreground)',
                      '--tw-ring-color': 'var(--color-primary)'
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 hover:opacity-70 transition-opacity"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Filter Toggle and Sort */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-4 py-3 rounded-xl font-medium font-roboto transition-all duration-300 hover:scale-105"
                    style={{ 
                      backgroundColor: showFilters ? 'var(--color-primary)' : 'var(--color-secondary)',
                      color: showFilters ? 'white' : 'var(--color-primary)'
                    }}
                  >
                    <Filter className="h-5 w-5" />
                    <span>Filters</span>
                    {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>

                  <div className="relative">
                    <select
                      value={`${sortOption.field}-${sortOption.direction}`}
                      onChange={(e) => {
                        const [field, direction] = e.target.value.split('-') as [SortOption['field'], SortOption['direction']];
                        setSortOption({ field, direction });
                      }}
                      className="appearance-none border-2 rounded-xl px-4 py-3 pr-10 font-roboto focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all"
                      style={{ 
                        borderColor: 'var(--color-border)',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-foreground)',
                        '--tw-ring-color': 'var(--color-primary)'
                      }}
                    >
                      <option value="date-desc">Newest First</option>
                      <option value="date-asc">Oldest First</option>
                      <option value="amount-desc">Highest Amount</option>
                      <option value="amount-asc">Lowest Amount</option>
                      <option value="status-asc">Status A-Z</option>
                      <option value="provider-asc">Provider A-Z</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
                  </div>
                </div>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="border-t pt-6 space-y-6" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-semibold font-roboto mb-3" style={{ color: 'var(--color-foreground)' }}>
                        Status
                      </label>
                      <div className="space-y-2">
                        {uniqueStatuses.map(status => (
                          <label key={status} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.status.includes(status)}
                              onChange={() => handleFilterChange('status', status)}
                              className="w-4 h-4 rounded focus:ring-4 focus:ring-opacity-20"
                              style={{
                                accentColor: 'var(--color-primary)',
                                '--tw-ring-color': 'var(--color-primary)'
                              }}
                            />
                            <span className="text-sm font-roboto capitalize" style={{ color: 'var(--color-foreground)' }}>
                              {status.replace('_', ' ')}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Policy Type Filter */}
                    <div>
                      <label className="block text-sm font-semibold font-roboto mb-3" style={{ color: 'var(--color-foreground)' }}>
                        Policy Type
                      </label>
                      <div className="space-y-2">
                        {uniquePolicyTypes.map(type => (
                          <label key={type} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={filters.policyType.includes(type)}
                              onChange={() => handleFilterChange('policyType', type)}
                              className="w-4 h-4 rounded focus:ring-4 focus:ring-opacity-20"
                              style={{
                                accentColor: 'var(--color-primary)',
                                '--tw-ring-color': 'var(--color-primary)'
                              }}
                            />
                            <span className="text-sm font-roboto" style={{ color: 'var(--color-foreground)' }}>
                              {getPolicyTypeIcon(type)} {type}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Date Range Filter */}
                    <div>
                      <label className="block text-sm font-semibold font-roboto mb-3" style={{ color: 'var(--color-foreground)' }}>
                        Date Range
                      </label>
                      <select
                        value={filters.dateRange}
                        onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                        className="w-full border-2 rounded-lg px-3 py-2 font-roboto focus:outline-none focus:ring-4 focus:ring-opacity-20"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      >
                        <option value="all">All Time</option>
                        <option value="last_week">Last Week</option>
                        <option value="last_month">Last Month</option>
                        <option value="last_3_months">Last 3 Months</option>
                      </select>
                    </div>

                    {/* Amount Range Filter */}
                    <div>
                      <label className="block text-sm font-semibold font-roboto mb-3" style={{ color: 'var(--color-foreground)' }}>
                        Amount Range
                      </label>
                      <select
                        value={filters.amountRange}
                        onChange={(e) => handleFilterChange('amountRange', e.target.value)}
                        className="w-full border-2 rounded-lg px-3 py-2 font-roboto focus:outline-none focus:ring-4 focus:ring-opacity-20"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      >
                        <option value="all">All Amounts</option>
                        <option value="under_50k">Under ₹50,000</option>
                        <option value="50k_to_100k">₹50,000 - ₹1,00,000</option>
                        <option value="over_100k">Over ₹1,00,000</option>
                      </select>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 rounded-lg font-medium font-roboto transition-all duration-300 hover:scale-105"
                      style={{ 
                        backgroundColor: 'var(--color-secondary)',
                        color: 'var(--color-primary)'
                      }}
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}

              {/* Search Results Info */}
              {(debouncedSearchQuery || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== 'all')) && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                    Showing {filteredAndSortedClaims.length} of {claims.length} claims
                    {debouncedSearchQuery && ` for "${debouncedSearchQuery}"`}
                  </p>
                </div>
              )}
            </div>

            {/* Enhanced Claims Grid */}
            {filteredAndSortedClaims.length === 0 ? (
              <div className="text-center py-16 rounded-2xl shadow-xl" style={{ backgroundColor: 'var(--color-card)' }}>
                <div className="relative">
                  <FileText className="h-20 w-20 mx-auto mb-6 animate-pulse" style={{ color: 'var(--color-muted)' }} />
                  <div className="absolute -top-2 -right-2">
                    <Search className="h-8 w-8 text-blue-500 animate-bounce" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-poppins mb-3" style={{ color: 'var(--color-foreground)' }}>
                  No Claims Found
                </h3>
                <p className="font-roboto mb-6" style={{ color: 'var(--color-muted)' }}>
                  {debouncedSearchQuery || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== 'all')
                    ? 'No claims match your current search and filter criteria.'
                    : 'You haven\'t submitted any claims yet.'
                  }
                </p>
                {(debouncedSearchQuery || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== 'all')) && (
                  <button 
                    onClick={clearFilters}
                    className="px-6 py-3 rounded-xl font-semibold font-roboto text-white transition-all duration-300 hover:scale-105"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
                  {paginatedClaims.map((claim) => (
                    <div
                      key={claim.id}
                      className="group rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
                      style={{ backgroundColor: 'var(--color-card)' }}
                    >
                      {/* Priority Indicator */}
                      <div className={`absolute top-0 left-0 w-2 h-full ${getPriorityColor(claim.priority)} transition-all duration-300 group-hover:w-3`} />

                      <div className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              <img
                                src={claim.providerLogo}
                                alt={claim.providerName}
                                className="w-12 h-12 rounded-full object-cover border-2 transition-transform duration-300 group-hover:scale-110"
                                style={{ borderColor: 'var(--color-border)' }}
                                loading="lazy"
                              />
                              <div className="absolute -bottom-1 -right-1 text-lg">
                                {getPolicyTypeIcon(claim.policyType)}
                              </div>
                            </div>
                            <div>
                              <h3 className="font-bold font-poppins text-lg" style={{ color: 'var(--color-foreground)' }}>
                                {claim.providerName}
                              </h3>
                              <p className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                                {claim.policyType} Insurance
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(claim.status)} flex items-center space-x-1`}>
                            {getStatusIcon(claim.status)}
                            <span className="capitalize">{claim.status.replace('_', ' ')}</span>
                          </span>
                        </div>

                        {/* Policy Details */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Policy ID:</span>
                            <span className="font-semibold font-poppins" style={{ color: 'var(--color-foreground)' }}>
                              {claim.policyId}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Claim Number:</span>
                            <span className="font-semibold font-poppins" style={{ color: 'var(--color-primary)' }}>
                              {claim.claimNumber}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>Description:</span>
                            <span className="font-medium font-roboto text-right max-w-48 truncate" style={{ color: 'var(--color-foreground)' }}>
                              {claim.description}
                            </span>
                          </div>
                        </div>

                        {/* Amount and Date Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                            <div className="flex items-center justify-center mb-2">
                              <DollarSign className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                            </div>
                            <p className="text-xs font-roboto uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>
                              Requested
                            </p>
                            <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                              {formatCurrency(claim.requestedAmount)}
                            </p>
                            {claim.approvedAmount && (
                              <>
                                <p className="text-xs font-roboto uppercase tracking-wide mt-2" style={{ color: 'var(--color-muted)' }}>
                                  Approved
                                </p>
                                <p className="text-sm font-bold font-poppins text-emerald-600">
                                  {formatCurrency(claim.approvedAmount)}
                                </p>
                              </>
                            )}
                          </div>

                          <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'var(--color-secondary)' }}>
                            <div className="flex items-center justify-center mb-2">
                              <Calendar className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                            </div>
                            <p className="text-xs font-roboto uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>
                              Initiated
                            </p>
                            <p className="text-lg font-bold font-poppins" style={{ color: 'var(--color-primary)' }}>
                              {formatDate(claim.claimInitiatedDate)}
                            </p>
                            <p className="text-xs font-roboto mt-2" style={{ color: 'var(--color-muted)' }}>
                              Updated: {formatDate(claim.lastUpdated)}
                            </p>
                          </div>
                        </div>

                        {/* Comments Section */}
                        <div className="mb-6">
                          <button
                            onClick={() => toggleComments(claim.id)}
                            className="flex items-center justify-between w-full p-3 rounded-xl transition-all duration-300 hover:scale-105"
                            style={{ backgroundColor: 'var(--color-secondary)' }}
                          >
                            <div className="flex items-center space-x-2">
                              <MessageSquare className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                              <span className="font-semibold font-roboto" style={{ color: 'var(--color-foreground)' }}>
                                Comments
                              </span>
                            </div>
                            {expandedComments.has(claim.id) ? 
                              <ChevronUp className="h-5 w-5" style={{ color: 'var(--color-muted)' }} /> : 
                              <ChevronDown className="h-5 w-5" style={{ color: 'var(--color-muted)' }} />
                            }
                          </button>
                          
                          {expandedComments.has(claim.id) && (
                            <div className="mt-3 p-4 rounded-xl border-l-4 animate-slide-down" style={{ 
                              backgroundColor: 'var(--color-background)',
                              borderLeftColor: 'var(--color-primary)'
                            }}>
                              <p className="text-sm font-roboto leading-relaxed" style={{ color: 'var(--color-foreground)' }}>
                                {claim.comments}
                              </p>
                              {claim.adjusterName && (
                                <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                                  <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4" style={{ color: 'var(--color-muted)' }} />
                                    <span className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                                      Adjuster: {claim.adjusterName}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <button className="flex-1 py-3 px-4 rounded-xl font-semibold font-roboto text-white transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2" style={{ backgroundColor: 'var(--color-primary)' }}>
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </button>
                          <button className="py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                            <Download className="h-4 w-4" />
                          </button>
                          {claim.adjusterContact && (
                            <button className="py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105" style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}>
                              <Phone className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        {/* Progress Indicator */}
                        {claim.status === 'processing' && (
                          <div className="mt-4 p-3 rounded-xl" style={{ backgroundColor: 'var(--color-secondary)' }}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                                Processing Progress
                              </span>
                              <span className="text-xs font-roboto" style={{ color: 'var(--color-muted)' }}>
                                Est. {formatDate(claim.estimatedResolution)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="h-2 rounded-full bg-gradient-to-r animate-pulse" style={{ 
                                background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`,
                                width: '65%'
                              }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl shadow-xl" style={{ backgroundColor: 'var(--color-card)' }}>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                        Items per page:
                      </span>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="border-2 rounded-lg px-3 py-2 font-roboto focus:outline-none focus:ring-4 focus:ring-opacity-20"
                        style={{ 
                          borderColor: 'var(--color-border)',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-foreground)',
                          '--tw-ring-color': 'var(--color-primary)'
                        }}
                      >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
                        style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
                      >
                        <ChevronsLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
                        style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>

                      <div className="flex items-center space-x-1">
                        {[...Array(Math.min(5, totalPages))].map((_, index) => {
                          let pageNumber;
                          if (totalPages <= 5) {
                            pageNumber = index + 1;
                          } else if (currentPage <= 3) {
                            pageNumber = index + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNumber = totalPages - 4 + index;
                          } else {
                            pageNumber = currentPage - 2 + index;
                          }

                          return (
                            <button
                              key={pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
                              className={`px-4 py-2 rounded-lg font-semibold font-roboto transition-all duration-300 hover:scale-105 ${
                                currentPage === pageNumber 
                                  ? 'text-white shadow-lg' 
                                  : ''
                              }`}
                              style={{
                                backgroundColor: currentPage === pageNumber 
                                  ? 'var(--color-primary)' 
                                  : 'var(--color-secondary)',
                                color: currentPage === pageNumber 
                                  ? 'white' 
                                  : 'var(--color-primary)'
                              }}
                            >
                              {pageNumber}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
                        style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
                        style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
                      >
                        <ChevronsRight className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="text-sm font-roboto" style={{ color: 'var(--color-muted)' }}>
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedClaims.length)} of {filteredAndSortedClaims.length} claims
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimsPage;