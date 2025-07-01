import { Policy, FAQ, InsuranceSlide, RenewalItem, UploadFile, PaymentOption, MyPolicyProps } from '../types/policy';

export const mockPolicies: Policy[] = [
  {
    id: '1',
    policyNumber: 'HLTH12345',
    provider: 'Star Health Insurance',
    type: 'Health',
    status: 'Active',
    validFrom: '2024-01-15',
    validTo: '2025-01-14',
    sumInsured: '₹10,00,000',
    premium: '₹18,500',
    expiryDays: 234
  },
  {
    id: '2',
    policyNumber: 'MOTR67890',
    provider: 'ICICI Lombard',
    type: 'Motor',
    status: 'Active',
    validFrom: '2024-03-20',
    validTo: '2025-03-19',
    sumInsured: '₹8,50,000',
    premium: '₹12,800',
    expiryDays: 298
  },
  {
    id: '3',
    policyNumber: 'BIKE54321',
    provider: 'Bajaj Allianz',
    type: 'Two-wheeler',
    status: 'Pending',
    validFrom: '2024-05-10',
    validTo: '2025-05-09',
    sumInsured: '₹1,50,000',
    premium: '₹3,200',
    expiryDays: 349
  },
  {
    id: '4',
    policyNumber: 'LIFE98765',
    provider: 'LIC of India',
    type: 'Life',
    status: 'Active',
    validFrom: '2023-12-01',
    validTo: '2024-11-30',
    sumInsured: '₹25,00,000',
    premium: '₹45,000',
    expiryDays: 189
  },
  {
    id: '5',
    policyNumber: 'TRVL13579',
    provider: 'HDFC ERGO',
    type: 'Travel',
    status: 'Expired',
    validFrom: '2023-08-15',
    validTo: '2024-02-14',
    sumInsured: '₹5,00,000',
    premium: '₹2,500',
    expiryDays: -90
  }
];

export const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How do I renew my policy online?',
    answer: 'You can renew your policy by clicking on the "Renew" button on your policy card. You will be redirected to the renewal page where you can review your policy details and make the payment.',
    category: 'Renewal'
  },
  {
    id: '2',
    question: 'What documents are required for policy renewal?',
    answer: 'For policy renewal, you typically need your previous policy document, ID proof, address proof, and any additional documents specific to your policy type. Health insurance may require medical reports if applicable.',
    category: 'Documentation'
  },
  {
    id: '3',
    question: 'Can I modify my policy coverage during renewal?',
    answer: 'Yes, you can modify your coverage during renewal. You can increase or decrease your sum insured, add or remove riders, and update beneficiary details. Changes may affect your premium amount.',
    category: 'Policy Changes'
  },
  {
    id: '4',
    question: 'What happens if I miss my renewal date?',
    answer: 'If you miss your renewal date, your policy will lapse. Most insurers provide a grace period of 15-30 days. After this period, you may need to undergo fresh medical examinations or vehicle inspections.',
    category: 'Renewal'
  },
  {
    id: '5',
    question: 'How can I download my policy documents?',
    answer: 'You can download your policy documents by clicking on the policy card and selecting "Download Policy". The document will be available in PDF format.',
    category: 'Documentation'
  },
  {
    id: '6',
    question: 'Is there a discount for online renewal?',
    answer: 'Yes, most insurance companies offer online renewal discounts ranging from 5% to 15%. The exact discount depends on your insurer and policy type.',
    category: 'Discounts'
  }
];

export const insuranceSlides: InsuranceSlide[] = [
  {
    id: '1',
    type: 'Health',
    title: 'Comprehensive Health Insurance',
    description: 'Protect yourself and your family with comprehensive health coverage including hospitalization, pre and post hospitalization expenses.',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    features: ['Cashless Treatment', 'Pre & Post Hospitalization', 'Day Care Procedures', 'Annual Health Checkup']
  },
  {
    id: '2',
    type: 'Motor',
    title: 'Complete Car Insurance',
    description: 'Comprehensive motor insurance covering damages, theft, third-party liability and personal accident coverage for complete peace of mind.',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    features: ['Own Damage Cover', 'Third Party Liability', 'Personal Accident', 'Roadside Assistance']
  },
  {
    id: '3',
    type: 'Two-wheeler',
    title: 'Two Wheeler Protection',
    description: 'Affordable two-wheeler insurance with comprehensive coverage for your bike or scooter including theft and accident protection.',
    image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
    features: ['Theft Protection', 'Accident Coverage', 'Third Party Liability', 'Engine Protection']
  }
];

export const mockPaymentOptions: PaymentOption[] = [
  { id: '1', method: 'card', label: 'Credit/Debit Card', processingFee: 0, discount: 2 },
  { id: '2', method: 'bank', label: 'Net Banking', processingFee: 0, discount: 1 },
  { id: '3', method: 'wallet', label: 'Digital Wallet', processingFee: 0, discount: 3 },
  { id: '4', method: 'emi', label: 'EMI (0% Interest)', processingFee: 99, discount: 0 }
];

export const mockRenewals: RenewalItem[] = [
  {
    id: '1',
    policyId: '1',
    policyNumber: 'HLTH12345',
    provider: 'Star Health Insurance',
    type: 'Health Insurance',
    currentPremium: 18500,
    newPremium: 19200,
    renewalDate: new Date('2024-07-15'),
    gracePeriod: 30,
    status: 'urgent',
    paymentOptions: mockPaymentOptions,
    reminderSettings: {
      email: true,
      sms: true,
      push: true,
      frequency: 'daily'
    }
  },
  {
    id: '2',
    policyId: '2',
    policyNumber: 'MOTR67890',
    provider: 'ICICI Lombard',
    type: 'Motor Insurance',
    currentPremium: 12800,
    newPremium: 13500,
    renewalDate: new Date('2024-08-20'),
    gracePeriod: 15,
    status: 'warning',
    paymentOptions: mockPaymentOptions,
    reminderSettings: {
      email: true,
      sms: false,
      push: true,
      frequency: 'weekly'
    }
  },
  {
    id: '3',
    policyId: '4',
    policyNumber: 'LIFE98765',
    provider: 'LIC of India',
    type: 'Life Insurance',
    currentPremium: 45000,
    newPremium: 47000,
    renewalDate: new Date('2024-11-30'),
    gracePeriod: 30,
    status: 'normal',
    paymentOptions: mockPaymentOptions,
    reminderSettings: {
      email: true,
      sms: true,
      push: false,
      frequency: 'monthly'
    }
  }
];

export const mockRecentUploads: UploadFile[] = [
  {
    id: '1',
    name: 'health-policy-certificate.pdf',
    size: 2048576,
    type: 'application/pdf',
    progress: 100,
    status: 'completed',
    category: 'Policy Certificate',
    ocrStatus: 'completed',
    uploadTime: new Date('2024-05-20T10:30:00'),
    errors: []
  },
  {
    id: '2',
    name: 'motor-insurance-receipt.jpg',
    size: 1536000,
    type: 'image/jpeg',
    progress: 85,
    status: 'processing',
    category: 'Payment Receipt',
    ocrStatus: 'processing',
    uploadTime: new Date('2024-05-20T14:15:00'),
    errors: []
  },
  {
    id: '3',
    name: 'medical-report-2024.pdf',
    size: 3072000,
    type: 'application/pdf',
    progress: 100,
    status: 'failed',
    category: 'Medical Report',
    ocrStatus: 'failed',
    uploadTime: new Date('2024-05-19T16:45:00'),
    errors: ['File corrupted', 'OCR processing failed']
  }
];

// Mock data for MyPolicy component
export const mockMyPolicyData: MyPolicyProps = {
  policy: {
    number: 'HLTH12345',
    provider: 'Star Health Insurance',
    expiryDays: 45,
    status: 'Active',
    type: 'Health',
    validFrom: new Date('2024-01-15'),
    validTo: new Date('2025-01-14'),
    sumInsured: 1000000,
    premium: 18500
  },
  insuranceTypes: [
    {
      type: 'Health Insurance',
      image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      description: 'Comprehensive health coverage for you and your family',
      ctaLink: '/buy-policy/health'
    },
    {
      type: 'Motor Insurance',
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      description: 'Complete protection for your vehicle',
      ctaLink: '/buy-policy/motor'
    },
    {
      type: 'Two Wheeler Insurance',
      image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&dpr=2',
      description: 'Affordable coverage for your bike or scooter',
      ctaLink: '/buy-policy/two-wheeler'
    }
  ],
  faqs: mockFAQs.map(faq => ({
    id: faq.id,
    question: faq.question,
    answer: faq.answer
  })),
  onRenew: (policyNumber: string) => {
    console.log('Renewing policy:', policyNumber);
  },
  onUploadDocument: async (file: File) => {
    console.log('Uploading document:', file.name);
    return new Promise(resolve => setTimeout(resolve, 2000));
  },
  onFilterChange: (status: string, type: any) => {
    console.log('Filter changed:', status, type);
  },
  onPolicySelect: (policyNumber: string) => {
    console.log('Policy selected:', policyNumber);
  }
};