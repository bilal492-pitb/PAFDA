import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

export const HoverCard = ({ children }) => children;

export const HoverCardTrigger = ({ children, ...props }) => (
  <span {...props}>{children}</span>
);

export const HoverCardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <Popover.Body ref={ref} className={`p-3 ${className || ''}`} {...props}>
    {children}
  </Popover.Body>
));
HoverCardContent.displayName = "HoverCardContent";

// Wrapper component for usage
export const HoverCardWrapper = ({ children, content, ...props }) => (
  <OverlayTrigger
    trigger="hover"
    placement="top"
    overlay={
      <Popover>
        <HoverCardContent>{content}</HoverCardContent>
      </Popover>
    }
    {...props}
  >
    <HoverCardTrigger>{children}</HoverCardTrigger>
  </OverlayTrigger>
);