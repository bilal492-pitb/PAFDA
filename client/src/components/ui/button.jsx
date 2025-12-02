import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

const buttonVariants = {
  default: 'primary',
  destructive: 'danger',
  outline: 'outline-primary',
  secondary: 'secondary',
  ghost: 'link',
};

const buttonSizes = {
  default: '',
  sm: 'sm',
  lg: 'lg',
  icon: 'sm',
};

export const Button = React.forwardRef(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
  const Comp = asChild ? 'div' : BootstrapButton;
  return (
    <Comp 
      ref={ref} 
      variant={buttonVariants[variant]} 
      size={buttonSizes[size]}
      className={`d-inline-flex align-items-center justify-content-center gap-2 ${className || ''}`}
      {...props} 
    />
  );
});
Button.displayName = "Button";