import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps = 2,
  className = '',
  activeColor = 'bg-[#489DDA]',
  inactiveColor = 'bg-gray-300'
}) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            currentStep === index 
              ? `${activeColor} scale-110` 
              : inactiveColor
          }`}
          aria-label={`Step ${index + 1} ${currentStep === index ? '(current)' : ''}`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
