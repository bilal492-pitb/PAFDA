import * as React from "react";

const Separator = React.forwardRef(({ className, orientation = "horizontal", ...props }, ref) => {
  const baseClass = orientation === "horizontal" ? "w-100 border-top" : "h-100 border-start";
  return <div ref={ref} className={`${baseClass} ${className || ""}`} {...props} />;
});
Separator.displayName = "Separator";

export { Separator };