import React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Dot } from 'lucide-react';

export const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={`d-flex align-items-center gap-2 ${containerClassName || ''}`}
    className={className}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

export const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`d-flex align-items-center ${className || ''}`} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

export const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={`position-relative d-flex align-items-center justify-content-center border ${isActive ? 'ring-2' : ''} ${className || ''}`}
      style={{ width: '40px', height: '40px', borderRadius: '4px' }}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="position-absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <div style={{ width: '1px', height: '16px', background: 'currentColor', animation: 'blink 1s infinite' }} />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

export const InputOTPSeparator = React.forwardRef((props, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";