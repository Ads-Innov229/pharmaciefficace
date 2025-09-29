// Type definitions for @radix-ui/react-label
declare module '@radix-ui/react-label' {
  import * as React from 'react';

  export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    htmlFor?: string;
    asChild?: boolean;
  }

  export const Root: React.ForwardRefExoticComponent<
    LabelProps & React.RefAttributes<HTMLLabelElement>
  >;

  const Label: React.ForwardRefExoticComponent<
    LabelProps & React.RefAttributes<HTMLLabelElement>
  >;

  export default Label;
}
