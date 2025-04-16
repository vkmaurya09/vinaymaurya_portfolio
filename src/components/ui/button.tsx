
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:translate-y-[-2px] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:translate-y-0 active:shadow-none after:content-[''] after:absolute after:h-full after:w-0 after:top-0 after:right-0 after:bg-white/10 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 hover:after:right-auto",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:translate-y-[-2px] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:translate-y-0 active:shadow-none",
        outline:
          "border-2 border-input bg-transparent hover:bg-accent/50 hover:text-accent-foreground hover:translate-y-[-2px] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.05)] active:translate-y-0 active:shadow-none after:content-[''] after:absolute after:h-full after:w-0 after:top-0 after:right-0 after:bg-accent/30 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 hover:after:right-auto",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:translate-y-[-2px] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:translate-y-0 active:shadow-none after:content-[''] after:absolute after:h-full after:w-0 after:top-0 after:right-0 after:bg-white/10 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 hover:after:right-auto",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground hover:translate-y-[-1px] active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        // New edgy flat styles
        flat: "bg-primary text-primary-foreground border-none shadow-none rounded-sm hover:translate-y-[-2px] hover:shadow-[0_2px_0_0_rgba(0,0,0,0.2)] active:translate-y-0 active:shadow-none after:content-[''] after:absolute after:h-full after:w-0 after:top-0 after:right-0 after:bg-white/10 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 hover:after:right-auto",
        edgy: "bg-saas-dark text-white border-none shadow-none rounded-none hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_rgba(255,126,95,1)] active:translate-y-0 active:shadow-none transition-all duration-200 after:content-[''] after:absolute after:h-full after:w-0 after:top-0 after:right-0 after:bg-primary/20 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0 hover:after:right-auto",
        "edgy-light": "bg-white text-saas-dark border-2 border-saas-dark shadow-none rounded-none hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_rgba(255,126,95,1)] active:translate-y-0 active:shadow-none transition-all duration-200",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        // New sizes for edgy buttons
        "edgy-md": "h-11 px-6 py-3",
        "edgy-lg": "h-12 px-8 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
