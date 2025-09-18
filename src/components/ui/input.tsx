import * as React from "react"

import { cn } from "../../lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-neutral-300 bg-white py-2 text-sm text-neutral-700 placeholder-neutral-400 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus:border-primary-400 focus:ring-2 focus:ring-primary-100 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70",
            leftIcon ? 'pl-10 pr-3' : 'px-3',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, type InputProps }
