// src/components/ui/button-variants.ts
import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "bg-primary-500 text-white hover:bg-primary-600 shadow-sm",
        destructive:
          "bg-error-500 text-white hover:bg-error-600 shadow-sm",
        outline:
          "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-primary-300 hover:text-primary-700",
        secondary:
          "bg-secondary-500 text-white hover:bg-secondary-600 shadow-sm",
        accent: "bg-accent-500 text-white hover:bg-accent-600 shadow-sm",
        ghost: "text-neutral-700 hover:bg-neutral-100 hover:text-primary-700",
        link: "text-primary-600 hover:text-primary-800 hover:underline underline-offset-4",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
