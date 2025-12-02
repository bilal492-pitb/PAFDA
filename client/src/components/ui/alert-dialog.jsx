import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export const AlertDialog = ({ children, ...props }) => (
  <Modal {...props} centered>
    {children}
  </Modal>
);

export const AlertDialogTrigger = React.forwardRef(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>{children}</div>
));
AlertDialogTrigger.displayName = "AlertDialogTrigger";

export const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <Modal.Body ref={ref} className={`p-0 ${className || ''}`} {...props} />
));
AlertDialogContent.displayName = "AlertDialogContent";

export const AlertDialogHeader = ({ className, ...props }) => (
  <Modal.Header closeButton className={`flex-column align-items-start ${className || ''}`} {...props} />
);

export const AlertDialogFooter = ({ className, ...props }) => (
  <Modal.Footer className={`d-flex justify-content-end gap-2 ${className || ''}`} {...props} />
);

export const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <Modal.Title ref={ref} className={`fs-5 fw-semibold ${className || ''}`} {...props} />
));
AlertDialogTitle.displayName = "AlertDialogTitle";

export const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={`small text-muted ${className || ''}`} {...props} />
));
AlertDialogDescription.displayName = "AlertDialogDescription";

export const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
  <Button ref={ref} variant="primary" className={className} {...props} />
));
AlertDialogAction.displayName = "AlertDialogAction";

export const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (
  <Button ref={ref} variant="outline-secondary" className={`mt-2 mt-sm-0 ${className || ''}`} {...props} />
));
AlertDialogCancel.displayName = "AlertDialogCancel";