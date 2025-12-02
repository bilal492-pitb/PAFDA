import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';

export const Carousel = React.forwardRef(({ className, children, ...props }, ref) => (
  <BootstrapCarousel ref={ref} className={className || ''} {...props}>
    {children}
  </BootstrapCarousel>
));
Carousel.displayName = "Carousel";

export const CarouselContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={`carousel-inner ${className || ''}`} {...props}>
    {children}
  </div>
));
CarouselContent.displayName = "CarouselContent";

export const CarouselItem = React.forwardRef(({ className, ...props }, ref) => (
  <BootstrapCarousel.Item ref={ref} className={className || ''} {...props} />
));
CarouselItem.displayName = "CarouselItem";

export const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => (
  <BootstrapCarousel.Control ref={ref} direction="prev" className={className || ''} {...props} />
));
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef(({ className, ...props }, ref) => (
  <BootstrapCarousel.Control ref={ref} direction="next" className={className || ''} {...props} />
));
CarouselNext.displayName = "CarouselNext";