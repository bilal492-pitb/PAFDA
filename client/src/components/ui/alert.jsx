import React from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

export const Alert = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const alertVariant = variant === 'destructive' ? 'danger' : variant;
  return (
    <BootstrapAlert 
      ref={ref} 
      variant={alertVariant} 
      className={`w-100 rounded-lg p-3 ${className || ''}`}
      {...props} 
    />
  );
});
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5 ref={ref} className={`mb-1 fw-medium ${className || ''}`} {...props} />
));
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`small ${className || ''}`} {...props} />
));
AlertDescription.displayName = "AlertDescription";