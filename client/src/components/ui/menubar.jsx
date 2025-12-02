import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Check, ChevronRight, Circle } from 'lucide-react';

export const Menubar = React.forwardRef(({ className, ...props }, ref) => (
  <Navbar ref={ref} className={`p-2 ${className || ''}`} {...props} />
));
Menubar.displayName = "Menubar";

export const MenubarTrigger = React.forwardRef(({ children, ...props }, ref) => (
  <Nav.Link ref={ref} {...props}>
    {children}
  </Nav.Link>
));
MenubarTrigger.displayName = "MenubarTrigger";

export const MenubarContent = React.forwardRef(({ className, ...props }, ref) => (
  <NavDropdown.Menu ref={ref} className={className} {...props} />
));
MenubarContent.displayName = "MenubarContent";

export const MenubarItem = React.forwardRef(({ inset, children, ...props }, ref) => (
  <NavDropdown.Item ref={ref} className={`${inset ? 'ps-4' : ''}`} {...props}>
    {children}
  </NavDropdown.Item>
));
MenubarItem.displayName = "MenubarItem";

export const MenubarCheckboxItem = React.forwardRef(({ checked, children, ...props }, ref) => (
  <NavDropdown.Item ref={ref} {...props}>
    {checked && <Check className="me-2" size={16} />}
    {children}
  </NavDropdown.Item>
));
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

export const MenubarRadioItem = React.forwardRef(({ children, ...props }, ref) => (
  <NavDropdown.Item ref={ref} {...props}>
    <Circle className="me-2" size={8} />
    {children}
  </NavDropdown.Item>
));
MenubarRadioItem.displayName = "MenubarRadioItem";

export const MenubarLabel = React.forwardRef(({ inset, children, ...props }, ref) => (
  <NavDropdown.Header ref={ref} className={`${inset ? 'ps-4' : ''}`} {...props}>
    {children}
  </NavDropdown.Header>
));
MenubarLabel.displayName = "MenubarLabel";

export const MenubarSeparator = () => <NavDropdown.Divider />;