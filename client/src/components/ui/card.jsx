import React from 'react';

export const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={`rounded-xl border bg-white shadow-sm ${className || ''}`}
    {...props} 
  />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`d-flex flex-column gap-2 p-4 ${className || ''}`} {...props} />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`fs-5 fw-semibold ${className || ''}`} {...props} />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`small text-muted ${className || ''}`} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-4 pt-0 ${className || ''}`} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`d-flex align-items-center p-4 pt-0 ${className || ''}`} {...props} />
));
CardFooter.displayName = "CardFooter";