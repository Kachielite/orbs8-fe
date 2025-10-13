import React from 'react';

import {cn} from '@/core/lib/utils';

const steps = ['Consent', 'Connect', 'Label', 'Sync', 'Done'];

function LinkStepIndicator({ step }: { step: number }) {
  return (
    <div className="flex justify-between items-center px-6 pt-6 mb-4">
      {steps.map((title, index) => (
        <div key={title} className="flex-1 flex flex-col items-center">
          {/* Circle */}
          <div
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium',
              index === step
                ? 'bg-primary text-white dark:bg-primary/40 dark:text-white'
                : index < step
                  ? 'bg-primary/20 text-primary dark:bg-primary/20 dark:text-primary'
                  : 'bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground'
            )}
          >
            {index + 1}
          </div>
          {/* Label */}
          <span
            className={`mt-2 text-xs font-medium text-center 
                ${index === step ? 'text-primary' : 'text-muted-foreground'}`}
          >
            {title}
          </span>
        </div>
      ))}
    </div>
  );
}

export default LinkStepIndicator;
