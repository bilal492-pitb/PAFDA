import React from 'react';
import { Form } from 'react-bootstrap';

export const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <Form.Check 
    ref={ref}
    type="checkbox"
    className={`shrink-0 ${className || ''}`}
    {...props}
  />
));
Checkbox.displayName = "Checkbox";