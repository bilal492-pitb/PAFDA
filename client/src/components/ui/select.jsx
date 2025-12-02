import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Utils for Bootstrap class concatenation
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SelectContext = React.createContext({
  value: "",
  onChange: () => {},
});

const Select = ({ children, value, onChange, ...props }) => {
  const contextValue = React.useMemo(() => ({ value, onChange }), [value, onChange]);
  return (
    <SelectContext.Provider value={contextValue}>
      <Dropdown {...props}>{children}</Dropdown>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const { value } = React.useContext(SelectContext);
  return (
    <Dropdown.Toggle
      ref={ref}
      variant="outline-secondary"
      className={cn("d-flex justify-content-between align-items-center w-100", className)}
      {...props}
    >
      <span className="text-truncate">{value || props.placeholder}</span>
      <ChevronDown className="ms-2" size={16} />
    </Dropdown.Toggle>
  );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <Dropdown.Menu ref={ref} className={cn("w-100", className)} {...props}>
      {children}
    </Dropdown.Menu>
  );
});
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const { value: selectedValue, onChange } = React.useContext(SelectContext);
  const isSelected = selectedValue === value;
  
  return (
    <Dropdown.Item
      ref={ref}
      active={isSelected}
      onClick={() => onChange(value)}
      className={cn("d-flex align-items-center", className)}
      {...props}
    >
      <span className="me-2">{isSelected && "✓"}</span>
      {children}
    </Dropdown.Item>
  );
});
SelectItem.displayName = "SelectItem";

const SelectValue = ({ placeholder }) => {
  const { value } = React.useContext(SelectContext);
  return value || placeholder;
};

// Simplified exports
export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
};