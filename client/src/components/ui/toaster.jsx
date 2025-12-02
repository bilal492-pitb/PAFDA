import * as React from "react";
import { ToastContainer, Toast as BToast } from "react-bootstrap";
import { useToast } from "@/hooks/use-toast";
import { ToastTitle, ToastDescription, ToastClose } from "@/components/ui/toast";

export function Toaster() {
  const { toasts, removeToast } = useToast();

  return (
    <ToastContainer position="top-end" className="p-3">
      {toasts.map(({ id, title, description, action, variant = "default" }) => (
        <BToast
          key={id}
          onClose={() => removeToast(id)}
          show={true}
          delay={5000}
          autohide
          bg={variant === "destructive" ? "danger" : ""}
        >
          <BToast.Header closeButton={false}>
            <strong className="me-auto">{title}</strong>
            <ToastClose onClick={() => removeToast(id)} />
          </BToast.Header>
          <BToast.Body>
            {description}
            {action}
          </BToast.Body>
        </BToast>
      ))}
    </ToastContainer>
  );
}