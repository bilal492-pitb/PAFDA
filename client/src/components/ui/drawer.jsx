import React from 'react';
import { Offcanvas } from 'react-bootstrap';

export const Drawer = ({ children, ...props }) => (
  <Offcanvas placement="bottom" {...props}>
    {children}
  </Offcanvas>
);

export const DrawerTrigger = ({ onClick, children }) => (
  <div onClick={onClick}>{children}</div>
);

export const DrawerContent = React.forwardRef(({ className, ...props }, ref) => (
  <Offcanvas.Body ref={ref} className={`p-0 ${className || ''}`} {...props} />
));
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = ({ className, ...props }) => (
  <div className={`p-4 border-bottom ${className || ''}`} {...props} />
);

export const DrawerFooter = ({ className, ...props }) => (
  <div className={`p-4 mt-auto ${className || ''}`} {...props} />
);

export const DrawerTitle = React.forwardRef(({ className, ...props }, ref) => (
  <Offcanvas.Title ref={ref} className={`fw-semibold fs-5 ${className || ''}`} {...props} />
));
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={`small text-muted ${className || ''}`} {...props} />
));
DrawerDescription.displayName = "DrawerDescription";

export const DrawerClose = Offcanvas.Header.RenderCloseButton;