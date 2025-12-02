// Example
import { cn } from '../lib/utils';
import { Button } from 'react-bootstrap';

function MyButton({ variant, size, disabled }) {
  return (
    <Button 
      className={cn(
        "btn-icon-gap",
        disabled && "opacity-50",
        size === "lg" && "btn-lg"
      )}
      variant={variant}
    >
      Click Me
    </Button>
  );
}