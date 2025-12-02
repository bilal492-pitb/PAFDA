import React, { useState, useEffect } from 'react';
import { Collapse as BootstrapCollapse, Button } from 'react-bootstrap';

export const Collapsible = ({ children, isOpen: isOpenProp, onToggle, ...props }) => {
  const [isOpen, setIsOpen] = useState(isOpenProp || false);

  useEffect(() => {
    if (isOpenProp !== undefined) {
      setIsOpen(isOpenProp);
    }
  }, [isOpenProp]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <div {...props}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen,
            onToggle: handleToggle,
            ...(child.type === CollapsibleTrigger || child.type === CollapsibleContent
              ? { isOpen, onToggle: handleToggle }
              : {})
          });
        }
        return child;
      })}
    </div>
  );
};

export const CollapsibleTrigger = ({ 
  children, 
  isOpen, 
  onToggle, 
  className = '',
  ...props 
}) => (
  <Button 
    onClick={onToggle}
    aria-expanded={isOpen}
    className={`d-flex align-items-center ${className}`}
    variant="link"
    {...props}
  >
    {children}
  </Button>
);

export const CollapsibleContent = ({ 
  children, 
  isOpen, 
  className = '',
  ...props 
}) => (
  <BootstrapCollapse in={isOpen}>
    <div className={className} {...props}>
      {children}
    </div>
  </BootstrapCollapse>
);