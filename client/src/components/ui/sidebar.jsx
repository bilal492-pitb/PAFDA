import * as React from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { PanelLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Mock hook (implement actual logic)
const useIsMobile = () => window.innerWidth < 768;

const SidebarContext = React.createContext({
  state: "expanded",
  open: false,
  setOpen: () => {},
  openMobile: false,
  setOpenMobile: () => {},
  isMobile: false,
  toggleSidebar: () => {},
});

const SidebarProvider = ({ defaultOpen = true, children, ...props }) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [open, setOpen] = React.useState(defaultOpen);
  const state = open ? "expanded" : "collapsed";

  const toggleSidebar = React.useCallback(() => {
    isMobile ? setOpenMobile((o) => !o) : setOpen((o) => !o);
  }, [isMobile]);

  const contextValue = React.useMemo(() => ({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }), [state, open, isMobile, openMobile]);

  return (
    <SidebarContext.Provider value={contextValue}>
      <div className="d-flex" {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};

const Sidebar = ({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }) => {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return (
      <nav className={cn("bg-light vh-100 d-flex flex-column", className)} {...props}>
        {children}
      </nav>
    );
  }

  if (isMobile) {
    return (
      <Offcanvas show={openMobile} onHide={() => setOpenMobile(false)} placement={side} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sidebar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 d-flex flex-column">{children}</Offcanvas.Body>
      </Offcanvas>
    );
  }

  return (
    <nav className={cn("d-none d-md-flex vh-100 position-fixed", side === "left" ? "start-0" : "end-0", className)} {...props}>
      <div className="bg-light h-100 d-flex flex-column shadow-sm">{children}</div>
    </nav>
  );
};

const SidebarTrigger = ({ className, onClick, ...props }) => {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="outline-secondary"
      size="sm"
      className={cn("d-flex align-items-center justify-content-center", className)}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon size={16} />
      <span className="visually-hidden">Toggle Sidebar</span>
    </Button>
  );
};

const SidebarContent = ({ className, ...props }) => (
  <div className={cn("flex-grow-1 overflow-auto p-2", className)} {...props} />
);

const SidebarMenu = ({ className, ...props }) => (
  <ul className={cn("list-unstyled", className)} {...props} />
);

const SidebarMenuItem = ({ className, ...props }) => (
  <li className={cn("mb-1", className)} {...props} />
);

const SidebarMenuButton = ({ asChild = false, isActive = false, variant = "default", size = "default", ...props }) => {
  const Comp = asChild ? "div" : Button;
  const variantClass = variant === "outline" ? "outline-secondary" : "light";
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  
  return (
    <Comp
      variant={variantClass}
      className={cn("w-100 text-start d-flex align-items-center", sizeClass, isActive && "active", props.className)}
      {...props}
    />
  );
};

export {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
};