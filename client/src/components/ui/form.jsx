import React from 'react';
import { useFormContext, Controller, FormProvider } from 'react-hook-form';
import { Form as BootstrapForm } from 'react-bootstrap';

export const Form = FormProvider;

const FormFieldContext = React.createContext({ name: '' });

export const FormField = ({ name, ...props }) => (
  <FormFieldContext.Provider value={{ name }}>
    <Controller name={name} {...props} />
  </FormFieldContext.Provider>
);

const FormItemContext = React.createContext({ id: '' });

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id: itemContext.id,
    name: fieldContext.name,
    formItemId: `${itemContext.id}-form-item`,
    formDescriptionId: `${itemContext.id}-form-item-description`,
    formMessageId: `${itemContext.id}-form-item-message`,
    ...fieldState,
  };
};

export const FormItem = React.forwardRef(({ className, ...props }, ref) => {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={`mb-3 ${className || ''}`} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

export const FormLabel = React.forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();
  return (
    <BootstrapForm.Label 
      ref={ref} 
      htmlFor={formItemId} 
      className={`${error ? 'text-danger' : ''} ${className || ''}`}
      {...props} 
    />
  );
});
FormLabel.displayName = "FormLabel";

export const FormControl = React.forwardRef((props, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return (
    <BootstrapForm.Control
      ref={ref}
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      isInvalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

export const FormDescription = React.forwardRef(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return (
    <BootstrapForm.Text 
      ref={ref} 
      id={formDescriptionId} 
      className={`text-muted ${className || ''}`}
      {...props} 
    />
  );
});
FormDescription.displayName = "FormDescription";

export const FormMessage = React.forwardRef(({ children, className, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message || '') : children;

  if (!body) return null;

  return (
    <BootstrapForm.Control.Feedback 
      ref={ref} 
      id={formMessageId} 
      type="invalid"
      className={className}
      {...props}
    >
      {body}
    </BootstrapForm.Control.Feedback>
  );
});
FormMessage.displayName = "FormMessage";