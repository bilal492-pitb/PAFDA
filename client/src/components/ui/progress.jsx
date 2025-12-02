import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export const Progress = React.forwardRef(({ className, value = 0, ...props }, ref) => (
  <ProgressBar 
    ref={ref} 
    now={value} 
    className={className} 
    {...props} 
  />
));
Progress.displayName = "Progress";