import React from 'react';

export const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <div 
    ref={ref} 
    className={`position-relative overflow-auto ${className || ''}`}
    style={{ maxHeight: '400px' }}
    {...props}
  >
    {children}
  </div>
));
ScrollArea.displayName = "ScrollArea";

export const ScrollBar = () => null; // Bootstrap handles scrollbars automatically