
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    colorClass?: string;
  }
>(({ className, value, colorClass, ...props }, ref) => {
  const defaultColorClass = "bg-primary";
  const progressColorClass = colorClass || defaultColorClass;
  
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", progressColorClass)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
      
      {/* Progress dots/segments instead of a solid bar */}
      <div className="absolute inset-0 flex items-center justify-between px-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div 
            key={i}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              (value || 0) >= (i + 1) * 10 ? progressColorClass : "bg-white/10"
            )}
          />
        ))}
      </div>
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
