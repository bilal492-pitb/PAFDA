import { Toast as BSToast } from 'react-bootstrap';
import { useToast } from '../hooks/useToast';
import React from 'react';

export function ToastsContainer() {
  const { toasts, dismiss } = useToast();
  
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
      {toasts.map((toast) => (
        <BSToast 
          key={toast.id} 
          show={toast.open} 
          onClose={() => dismiss(toast.id)}
          bg={toast.variant}
          delay={5000}
          autohide
        >
          <BSToast.Header>
            <strong className="me-auto">{toast.title}</strong>
          </BSToast.Header>
          <BSToast.Body>{toast.description}</BSToast.Body>
        </BSToast>
      ))}
    </div>
  );
}