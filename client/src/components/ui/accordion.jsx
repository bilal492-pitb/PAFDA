import React from 'react';
import { Accordion as BootstrapAccordion } from 'react-bootstrap';

export const Accordion = BootstrapAccordion;

export const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <BootstrapAccordion.Item 
    ref={ref} 
    className={`border-bottom ${className || ''}`} 
    {...props} 
  />
));
AccordionItem.displayName = "AccordionItem";

export const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <BootstrapAccordion.Header>
    <BootstrapAccordion.Button
      ref={ref}
      className={`w-100 d-flex justify-content-between align-items-center py-3 fw-medium ${className || ''}`}
      {...props}
    >
      {children}
    </BootstrapAccordion.Button>
  </BootstrapAccordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

export const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <BootstrapAccordion.Body
    ref={ref}
    className={`py-3 ${className || ''}`}
    {...props}
  >
    {children}
  </BootstrapAccordion.Body>
));
AccordionContent.displayName = "AccordionContent";