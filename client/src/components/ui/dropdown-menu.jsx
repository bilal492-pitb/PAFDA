import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Check, ChevronRight, Circle } from 'lucide-react';

export const DropdownMenu = Dropdown;
export const DropdownMenuTrigger = Dropdown.Toggle;

export const DropdownMenuContent = React.forwardRef(({ className, ...props }, ref) => (
  <Dropdown.Menu ref={ref} className={className} {...props} />
));
DropdownMenuContent.displayName = "DropdownMenuContent";

export const DropdownMenuItem = React.forwardRef(({ inset, className, ...props }, ref) => (
  <Dropdown.Item ref={ref} className={`d-flex align-items-center ${inset ? 'ps-4' : ''} ${className || ''}`} {...props} />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export const DropdownMenuCheckboxItem = React.forwardRef(({ checked, children, ...props }, ref) => (
  <Dropdown.Item ref={ref} {...props}>
    {checked && <Check className="me-2" size={16} />}
    {children}
  </Dropdown.Item>
));
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

export const DropdownMenuRadioItem = React.forwardRef(({ children, ...props }, ref) => (
  <Dropdown.Item ref={ref} {...props}>
    <Circle className="me-2" size={8} />
    {children}
  </Dropdown.Item>
));
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

export const DropdownMenuLabel = React.forwardRef(({ inset, className, ...props }, ref) => (
  <Dropdown.Header ref={ref} className={`${inset ? 'ps-4' : ''} ${className || ''}`} {...props} />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export const DropdownMenuSeparator = () => <Dropdown.Divider />;

export const DropdownMenuShortcut = ({ className, ...props }) => (
  <span className={`ms-auto text-muted small ${className || ''}`} {...props} />
);
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";