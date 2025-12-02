import * as React from "react";
import { Toast as BToast } from "react-bootstrap";
import { X } from "lucide-react";

const ToastContext = React.createContext({
  show: false,
  onClose: () => {},
});

const ToastProvider = ({ children, ...props }) => {
  const [show, setShow] = React.useState(false);
  const onClose = () => setShow(false);
  
  return (
    <ToastContext.Provider value={{ show, onClose, setShow }}>
      <BToastContainer {...props}>{children}</BToastContainer>
    </ToastContext.Provider>
  );
};

const Toast = React.forwardRef(({ className, variant = "default", children, ...props }, ref) => {
  const { show, onClose } = React.useContext(ToastContext);
  
  return (
    <BToast
      ref={ref}
      show={show}
      onClose={onClose}
      bg={variant === "destructive" ? "danger" : ""}
      className={className}
      {...props}
    >
      {children}
    </BToast>
  );
});
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <BToast.Header ref={ref} className={className} {...props} />
));
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <BToast.Body ref={ref} className={className} {...props} />
));
ToastDescription.displayName = "ToastDescription";

const ToastClose = ({ className, ...props }) => (
  <button className={`btn-close ${className || ""}`} {...props}>
    <X size={16} />
  </button>
);

export {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};