import React from 'react';
import { Form } from 'react-bootstrap';
import { Circle } from 'lucide-react';

export const RadioGroup = React.forwardRef(({ className, ...props }, ref) => (
  <Form ref={ref} className={className} {...props} />
));
RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => (
  <Form.Check 
    ref={ref}
    type="radio"
    className={className}
    {...props}
  />
));
RadioGroupItem.displayName = "RadioGroupItem";