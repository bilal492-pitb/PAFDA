import React from 'react';

export const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={`position-relative d-inline-flex rounded-circle overflow-hidden ${className || ''}`}
    style={{ width: '40px', height: '40px' }}
    {...props} 
  />
));
Avatar.displayName = "Avatar";

export const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <img 
    ref={ref} 
    className={`w-100 h-100 object-fit-cover ${className || ''}`} 
    {...props} 
  />
));
AvatarImage.displayName = "AvatarImage";

export const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={`w-100 h-100 d-flex align-items-center justify-content-center bg-secondary ${className || ''}`}
    {...props} 
  />
));
AvatarFallback.displayName = "AvatarFallback";