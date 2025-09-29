import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

// Définition des variantes du label
const labelVariants = cva(
  "text-sm font-medium leading-5 text-neutral-700 transition-colors peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "",
        required: "after:content-['*'] after:ml-0.5 after:text-error-500",
        optional: "text-neutral-500 text-xs font-normal",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// Extension des props pour inclure les props HTML standard et les variantes
interface LabelProps 
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'className'>,
    VariantProps<typeof labelVariants> {
  htmlFor?: string
  required?: boolean
  optional?: boolean
  className?: string
}

// Composant Label avec support des variantes et des enfants
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, size, required, optional, children, ...props }, ref) => {
    const variantClass = required ? 'required' : optional ? 'optional' : variant;
    
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(
          labelVariants({ variant: variantClass as any, size, className })
        )}
        {...props}
      >
        {children}
      </LabelPrimitive.Root>
    )
  }
)

Label.displayName = "Label"

export { Label, type LabelProps }
