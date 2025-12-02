import React from 'react';
import { Breadcrumb as BootstrapBreadcrumb } from 'react-bootstrap';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

export const Breadcrumb = React.forwardRef((props, ref) => (
  <BootstrapBreadcrumb ref={ref} {...props} />
));
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol ref={ref} className={`d-flex flex-wrap gap-2 align-items-center list-unstyled small ${className || ''}`} {...props} />
));
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={`d-inline-flex align-items-center gap-2 ${className || ''}`} {...props} />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

export const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : 'a';
  return <Comp ref={ref} className={`text-decoration-none ${className || ''}`} {...props} />;
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <span ref={ref} aria-current="page" className={`fw-normal text-dark ${className || ''}`} {...props} />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = ({ children, className, ...props }) => (
  <li role="presentation" aria-hidden="true" className={`d-flex align-items-center ${className || ''}`} {...props}>
    {children || <ChevronRight size={14} />}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = ({ className, ...props }) => (
  <span role="presentation" aria-hidden="true" className={`d-flex align-items-center justify-content-center ${className || ''}`} {...props}>
    <MoreHorizontal size={16} />
    <span className="visually-hidden">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";