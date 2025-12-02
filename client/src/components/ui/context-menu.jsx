import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Check, ChevronRight, Circle } from 'lucide-react';

export const ContextMenu = ({ children, ...props }) => (
  <div {...props} style={{ position: 'relative' }}>
    {children}
  </div>
);

export const ContextMenuTrigger = ({ children, ...props }) => (
  <div {...props} style={{ cursor: 'context-menu' }}>
    {children}
  </div>
);

export const ContextMenuContent = ({ show, children, ...props }) => (
  <Dropdown.Menu show={show} {...props}>
    {children}
  </Dropdown.Menu>
);

export const ContextMenuItem = ({ inset, children, ...props }) => (
  <Dropdown.Item {...props}>
    {inset && <span className="ms-3" />}
    {children}
  </Dropdown.Item>
);

export const ContextMenuCheckboxItem = ({ checked, children, ...props }) => (
  <Dropdown.Item {...props}>
    {checked && <Check className="me-2" size={16} />}
    {children}
  </Dropdown.Item>
);

export const ContextMenuRadioItem = ({ children, ...props }) => (
  <Dropdown.Item {...props}>
    <Circle className="me-2" size={8} />
    {children}
  </Dropdown.Item>
);

export const ContextMenuLabel = ({ children, ...props }) => (
  <Dropdown.Header {...props}>{children}</Dropdown.Header>
);

export const ContextMenuSeparator = () => <Dropdown.Divider />;

// Simplified version using state management
export const useContextMenu = () => {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setShow(true);
  };

  return { show, setShow, position, handleContextMenu };
};