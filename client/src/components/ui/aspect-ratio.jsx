import React from 'react';

export const AspectRatio = React.forwardRef(({ ratio = '1x1', className, children, ...props }, ref) => {
  const ratioMap = {
    '1x1': 'ratio-1x1',
    '4x3': 'ratio-4x3',
    '16x9': 'ratio-16x9',
    '21x9': 'ratio-21x9'
  };
  
  return (
    <div 
      ref={ref} 
      className={`ratio ${ratioMap[ratio] || ratioMap['1x1']} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});
AspectRatio.displayName = "AspectRatio";