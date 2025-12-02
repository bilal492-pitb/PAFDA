import React from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export const Pagination = ({ className, ...props }) => (
  <BootstrapPagination className={`justify-content-center ${className || ''}`} {...props} />
);

export const PaginationContent = ({ className, ...props }) => (
  <BootstrapPagination className={className} {...props} />
);

export const PaginationItem = BootstrapPagination.Item;

export const PaginationLink = ({ isActive, size = 'md', className, ...props }) => (
  <BootstrapPagination.Link 
    active={isActive} 
    className={`d-flex align-items-center justify-content-center ${className || ''}`}
    style={{ width: size === 'icon' ? '40px' : 'auto', height: size === 'icon' ? '40px' : 'auto' }}
    {...props} 
  />
);

export const PaginationPrevious = ({ className, ...props }) => (
  <PaginationLink {...props} className={`gap-2 ${className || ''}`}>
    <ChevronLeft size={16} />
    <span>Previous</span>
  </PaginationLink>
);

export const PaginationNext = ({ className, ...props }) => (
  <PaginationLink {...props} className={`gap-2 ${className || ''}`}>
    <span>Next</span>
    <ChevronRight size={16} />
  </PaginationLink>
);

export const PaginationEllipsis = ({ className, ...props }) => (
  <BootstrapPagination.Ellipsis className={`d-flex align-items-center justify-content-center ${className || ''}`} {...props}>
    <MoreHorizontal size={16} />
  </BootstrapPagination.Ellipsis>
);