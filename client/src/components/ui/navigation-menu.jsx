import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { ChevronDown } from 'lucide-react';

export const NavigationMenu = React.forwardRef(({ className, children, ...props }, ref) => (
  <Navbar ref={ref} className={`p-0 ${className || ''}`} {...props}>
    {children}
  </Navbar>
));
NavigationMenu.displayName = "NavigationMenu";

export const NavigationMenuList = React.forwardRef(({ className, ...props }, ref) => (
  <Nav ref={ref} className={`gap-2 ${className || ''}`} {...props} />
));
NavigationMenuList.displayName = "NavigationMenuList";

export const NavigationMenuItem = Nav.Item;

export const NavigationMenuTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <NavDropdown.Toggle ref={ref} className={`d-flex align-items-center ${className || ''}`} {...props}>
    {children}
    <ChevronDown className="ms-1" size={12} />
  </NavDropdown.Toggle>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

export const NavigationMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <NavDropdown.Menu ref={ref} className={className} {...props} />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

export const NavigationMenuLink = Nav.Link;

export const NavigationMenuViewport = () => null; // Not needed for Bootstrap

export const NavigationMenuIndicator = () => null; // Not needed for Bootstrap