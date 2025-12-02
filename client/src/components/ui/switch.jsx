import * as React from "react";
import { Form } from "react-bootstrap";

const Switch = React.forwardRef(({ className, checked, onCheckedChange, ...props }, ref) => {
  return (
    <Form.Check
      ref={ref}
      type="switch"
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className={className}
      {...props}
    />
  );
});
Switch.displayName = "Switch";

export { Switch };