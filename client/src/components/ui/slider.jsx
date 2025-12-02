import * as React from "react";
import { Form } from "react-bootstrap";

const Slider = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <Form.Range
      ref={ref}
      className={`form-range ${className || ""}`}
      {...props}
    />
  );
});
Slider.displayName = "Slider";

export { Slider };