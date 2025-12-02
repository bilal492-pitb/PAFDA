import * as React from "react";
import { ToggleButtonGroup, ToggleButton } from "react-bootstrap";

const ToggleGroup = React.forwardRef({ type = "radio", children, className, ...props }, ref) => {
  const [value, setValue] = React.useState(props.value);
  
  return (
    <ToggleButtonGroup
      ref={ref}
      type={type}
      value={value}
      onChange={setValue}
      className={className}
      {...props}
    >
      {children}
    </ToggleButtonGroup>
  );
});
ToggleGroup.displayName = "ToggleGroup";

const ToggleGroupItem = React.forwardRef(({ value, children, className, ...props }, ref) => {
  return (
    <ToggleButton
      ref={ref}
      id={`tbg-${value}`}
      value={value}
      className={className}
      {...props}
    >
      {children}
    </ToggleButton>
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";

export {
  ToggleGroup,
  ToggleGroupItem,
};