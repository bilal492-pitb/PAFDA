import * as React from "react";
import { Form } from "react-bootstrap";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Form.Control
      ref={ref}
      as="textarea"
      className={className}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };