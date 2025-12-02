import * as React from "react";
import { ToggleButton } from "react-bootstrap";

const Toggle = React.forwardRef(({ className, pressed, onPressedChange, size = "md", variant = "outline-secondary", ...props }, ref) => {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  
  return (
    <ToggleButton
      ref={ref}
      type="checkbox"
      checked={pressed}
      onChange={(e) => onPressedChange?.(e.target.checked)}
      variant={variant}
      className={`${sizeClass} ${className || ""}`}
      {...props}
    />
  );
});
Toggle.displayName = "Toggle";

export { Toggle };