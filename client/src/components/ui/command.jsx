import React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { Modal } from 'react-bootstrap';

export const Command = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={`d-flex flex-column overflow-hidden rounded bg-white ${className || ''}`}
    {...props}
  />
));
Command.displayName = "Command";

export const CommandDialog = ({ children, ...props }) => (
  <Modal {...props} centered size="lg">
    <Modal.Body className="p-0">
      <Command className="cmdk-root">{children}</Command>
    </Modal.Body>
  </Modal>
);

export const CommandInput = React.forwardRef(({ className, ...props }, ref) => (
  <div className="d-flex align-items-center border-bottom px-3">
    <Search className="me-2" size={16} />
    <CommandPrimitive.Input
      ref={ref}
      className={`flex-grow-1 border-0 py-3 outline-none ${className || ''}`}
      {...props}
    />
  </div>
));
CommandInput.displayName = "CommandInput";

export const CommandList = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={`overflow-auto ${className || ''}`}
    style={{ maxHeight: '300px' }}
    {...props}
  />
));
CommandList.displayName = "CommandList";

export const CommandEmpty = React.forwardRef((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className="py-4 text-center text-muted" {...props} />
));
CommandEmpty.displayName = "CommandEmpty";

export const CommandGroup = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={`px-2 ${className || ''}`}
    {...props}
  />
));
CommandGroup.displayName = "CommandGroup";

export const CommandSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={`my-1 bg-light ${className || ''}`} {...props} />
));
CommandSeparator.displayName = "CommandSeparator";

export const CommandItem = React.forwardRef(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={`d-flex align-items-center cursor-pointer gap-2 rounded px-2 py-2 ${className || ''}`}
    {...props}
  />
));
CommandItem.displayName = "CommandItem";

export const CommandShortcut = ({ className, ...props }) => (
  <span className={`ms-auto text-muted small ${className || ''}`} {...props} />
);
CommandShortcut.displayName = "CommandShortcut";