import React from 'react';
import { Form } from 'react-bootstrap';

export const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => (
  <Form.Control 
    ref={ref} 
    type={type} 
    className={`${className || ''}`}
    {...props} 
  />
));
Input.displayName = "Input";