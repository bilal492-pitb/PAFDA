import * as React from "react";
import { Modal } from "react-bootstrap";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SheetContext = React.createContext({
  show: false,
  onHide: () => {},
});

const Sheet = ({ children, show, onHide, ...props }) => {
  const contextValue = React.useMemo(() => ({ show, onHide }), [show, onHide]);
  return (
    <SheetContext.Provider value={contextValue}>
      <Modal show={show} onHide={onHide} {...props}>
        {children}
      </Modal>
    </SheetContext.Provider>
  );
};

const SheetTrigger = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});
SheetTrigger.displayName = "SheetTrigger";

const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => {
  const { onHide } = React.useContext(SheetContext);
  
  const sideClasses = {
    top: "modal-dialog modal-fullscreen border-bottom",
    bottom: "modal-dialog modal-fullscreen border-top",
    left: "modal-dialog modal-fullscreen",
    right: "modal-dialog modal-fullscreen",
  };

  return (
    <div className={cn(sideClasses[side], className)} ref={ref} {...props}>
      <Modal.Header className="border-0">
        <Modal.Title className="d-none">Sheet</Modal.Title>
        <button className="btn-close position-absolute top-3 end-3" onClick={onHide}>
          <X size={16} />
        </button>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </div>
  );
});
SheetContent.displayName = "SheetContent";

const SheetHeader = ({ className, ...props }) => (
  <div className={cn("modal-header border-0", className)} {...props} />
);

const SheetTitle = ({ className, ...props }) => (
  <h5 className={cn("modal-title", className)} {...props} />
);

const SheetDescription = ({ className, ...props }) => (
  <p className={cn("text-muted small", className)} {...props} />
);

const SheetFooter = ({ className, ...props }) => (
  <div className={cn("modal-footer border-0", className)} {...props} />
);

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};