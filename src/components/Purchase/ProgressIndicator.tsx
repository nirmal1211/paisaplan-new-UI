import React from 'react';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={index} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'text-white shadow-lg'
                      : isCurrent
                      ? 'text-white shadow-lg'
                      : 'border-2'
                  }`}
                  style={{
                    backgroundColor: isCompleted || isCurrent ? 'var(--color-primary)' : 'transparent',
                    borderColor: isCompleted || isCurrent ? 'var(--color-primary)' : 'var(--color-border)',
                    color: isCompleted || isCurrent ? 'white' : 'var(--color-muted)'
                  }}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span 
                  className={`mt-2 text-xs font-medium text-center ${
                    isCompleted || isCurrent ? '' : ''
                  }`}
                  style={{ 
                    color: isCompleted || isCurrent ? 'var(--color-primary)' : 'var(--color-muted)' 
                  }}
                >
                  {step}
                </span>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className="flex-1 h-0.5 mx-4 transition-all duration-300"
                  style={{
                    backgroundColor: isCompleted ? 'var(--color-primary)' : 'var(--color-border)'
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;