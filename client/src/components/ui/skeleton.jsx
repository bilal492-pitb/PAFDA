import * as React from "react";

const Skeleton = ({ className, ...props }) => (
  <div className={`placeholder-glow ${className || ""}`} {...props}>
    <span className="placeholder w-100" style={{ height: "1.5rem" }} />
  </div>
);

export { Skeleton };