import React from 'react';
import { OverlayTrigger, Popover as BootstrapPopover } from 'react-bootstrap';

export const Popover = BootstrapPopover;

export const PopoverTrigger = OverlayTrigger;

export const PopoverContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <BootstrapPopover.Body ref={ref} className={`p-3 ${className || ''}`} {...props}>
    {children}
  </BootstrapPopover.Body>
));
PopoverContent.displayName = "PopoverContent";