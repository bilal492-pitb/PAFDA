import * as React from "react";
import { Tooltip as BTooltip, OverlayTrigger } from "react-bootstrap";
import { cn } from "../lib/utils.js";

const TooltipProvider = ({ children }) => children;

const Tooltip = BTooltip;

const TooltipTrigger = ({ children, ...props }) => children;

const TooltipContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <BTooltip ref={ref} className={className} {...props}>
    {children}
  </BTooltip>
));
TooltipContent.displayName = "TooltipContent";

// Usage wrapper to match original API
const TooltipWrapper = ({ content, children, placement = "top", ...props }) => (
  <OverlayTrigger
    placement={placement}
    overlay={<Tooltip {...props}>{content}</Tooltip>}
  >
    {children}
  </OverlayTrigger>
);

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipWrapper,
};