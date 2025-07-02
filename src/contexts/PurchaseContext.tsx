import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PurchaseContext, PolicyFormData, Provider, PremiumBreakdown } from '../types/purchase';

interface PurchaseState extends PurchaseContext {}

type PurchaseAction = 
  | { type: 'SET_POLICY_TYPE'; payload: string }
  | { type: 'UPDATE_FORM_DATA'; payload: Partial<PolicyFormData> }
  | { type: 'SET_SELECTED_PROVIDERS'; payload: string[] }
  | { type: 'SET_CURRENT_PROVIDER'; payload: Provider }
  | { type: 'UPDATE_PREMIUM_BREAKDOWN'; payload: PremiumBreakdown }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'RESET_PURCHASE' };

const initialState: PurchaseState = {
  policyType: '',
  formData: {
    fullName: '',
    email: '',
    mobile: '',
    mobileVerified: false,
  },
  selectedProviders: [],
  currentStep: 1,
  totalSteps: 4,
};

const purchaseReducer = (state: PurchaseState, action: PurchaseAction): PurchaseState => {
  switch (action.type) {
    case 'SET_POLICY_TYPE':
      return { ...state, policyType: action.payload };
    case 'UPDATE_FORM_DATA':
      return { 
        ...state, 
        formData: { ...state.formData, ...action.payload } 
      };
    case 'SET_SELECTED_PROVIDERS':
      return { ...state, selectedProviders: action.payload };
    case 'SET_CURRENT_PROVIDER':
      return { ...state, currentProvider: action.payload };
    case 'UPDATE_PREMIUM_BREAKDOWN':
      return { ...state, premiumBreakdown: action.payload };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'RESET_PURCHASE':
      return initialState;
    default:
      return state;
  }
};

const PurchaseContextProvider = createContext<{
  state: PurchaseState;
  dispatch: React.Dispatch<PurchaseAction>;
} | null>(null);

export const PurchaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(purchaseReducer, initialState);

  return (
    <PurchaseContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </PurchaseContextProvider.Provider>
  );
};

export const usePurchase = () => {
  const context = useContext(PurchaseContextProvider);
  if (!context) {
    throw new Error('usePurchase must be used within PurchaseProvider');
  }
  return context;
};