import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { X } from 'lucide-react';

export const Dialog = ({ children, show, onHide, ...props }) => (
  <Modal 
    show={show} 
    onHide={onHide} 
    centered 
    size="xl"
    className="modal-xl"
    {...props}
  >
    {children}
  </Modal>
);

export const DialogTrigger = ({ children, onClick }) => (
  <div onClick={onClick}>{children}</div>
);

export const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <Modal.Body 
    ref={ref} 
    className={`p-0 bg-transparent border-0 ${className || ''}`} 
    style={{ backgroundColor: 'transparent' }}
    {...props}
  >
    {children}
  </Modal.Body>
));
DialogContent.displayName = "DialogContent";

export const DialogHeader = ({ className, ...props }) => (
  <Modal.Header closeButton className={className} {...props} />
);

export const DialogFooter = ({ className, ...props }) => (
  <Modal.Footer className={`d-flex justify-content-end gap-2 ${className || ''}`} {...props} />
);

export const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <Modal.Title ref={ref} className={`fs-5 fw-semibold ${className || ''}`} {...props} />
));
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={`small text-muted ${className || ''}`} {...props} />
));
DialogDescription.displayName = "DialogDescription";

export const DialogClose = Modal.Header.RenderCloseButton;