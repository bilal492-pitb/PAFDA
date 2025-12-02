import React from 'react';
import { Badge as BootstrapBadge } from 'react-bootstrap';

const badgeVariants = {
  default: 'primary',
  secondary: 'secondary',
  destructive: 'danger',
  outline: 'light',
};

export const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => (
  <BootstrapBadge 
    ref={ref} 
    bg={badgeVariants[variant]} 
    className={`d-inline-flex align-items-center rounded-pill px-2 py-1 small fw-semibold ${className || ''}`}
    {...props} 
  />
));
Badge.displayName = "Badge";