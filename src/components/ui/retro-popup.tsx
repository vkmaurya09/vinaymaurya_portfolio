import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface RetroPopupProps {
  title: string
  description?: string
  open: boolean
  onClose: () => void
  children?: React.ReactNode
  variant?: "default" | "success" | "alert"
  position?: "center" | "bottom-right"
  className?: string
}

const RetroPopup = ({
  title,
  description,
  open,
  onClose,
  children,
  variant = "default",
  position = "center",
  className,
}: RetroPopupProps) => {
  const [isVisible, setIsVisible] = useState(false)

  // Handle animation timing
  useEffect(() => {
    if (open) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300) // Match this with the CSS transition duration
      return () => clearTimeout(timer)
    }
  }, [open])

  if (!isVisible && !open) return null

  // Variant styling
  const variantStyles = {
    default: "bg-retro-orange",
    success: "bg-retro-green",
    alert: "bg-retro-yellow",
  }

  // Position styling
  const positionStyles = {
    center: "fixed inset-0 flex items-center justify-center z-50",
    "bottom-right": "fixed bottom-4 right-4 z-50",
  }

  return (
    <div className={positionStyles[position]}>
      {/* Backdrop for center position */}
      {position === "center" && (
        <div 
          className={`absolute inset-0 bg-black/50 ${
            open ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          onClick={onClose}
        />
      )}
      
      <div
        className={cn(
          "max-w-md w-full transform transition-all duration-300",
          position === "center" 
            ? open 
              ? "scale-100 opacity-100" 
              : "scale-95 opacity-0"
            : open 
              ? "translate-y-0 opacity-100" 
              : "translate-y-4 opacity-0",
          className
        )}
      >
        <div 
          className={cn(
            "border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden",
            variantStyles[variant]
          )}
        >
          {/* Zigzag decorative border */}
          <div className="w-full h-3 bg-black [mask-image:_repeating-linear-gradient(45deg,_#000_0px,_#000_6px,_transparent_6px,_transparent_12px)]" />
          
          <div className="p-5">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-display tracking-wide text-black uppercase">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Description */}
            {description && (
              <p className="text-black font-mono font-semibold mb-4">{description}</p>
            )}
            
            {/* Content */}
            <div className="font-mono text-black">{children}</div>
          </div>
          
          {/* Decorative bottom pattern */}
          <div className="w-full h-3 bg-black [mask-image:_repeating-linear-gradient(-45deg,_#000_0px,_#000_6px,_transparent_6px,_transparent_12px)]" />
        </div>
      </div>
    </div>
  )
}

// Create a component for a gamified spinner popup
export const RetroSpinnerPopup = ({
  title,
  description,
  open,
  onClose,
  onSpin,
  prizes,
  className,
}: {
  title: string
  description?: string
  open: boolean
  onClose: () => void
  onSpin: (prize: string) => void
  prizes: string[]
  className?: string
}) => {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedPrize, setSelectedPrize] = useState<string | null>(null)
  
  const handleSpin = () => {
    if (isSpinning) return
    
    setIsSpinning(true)
    
    // Simulate spinning and selecting a random prize
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)]
      setSelectedPrize(randomPrize)
      
      setTimeout(() => {
        setIsSpinning(false)
        if (onSpin) onSpin(randomPrize)
      }, 1000)
    }, 2000)
  }
  
  return (
    <RetroPopup
      title={title}
      description={description}
      open={open}
      onClose={onClose}
      className={className}
    >
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div 
          className={`relative w-64 h-64 rounded-full bg-white border-4 border-black mb-6 ${
            isSpinning ? 'animate-spin-slow' : ''
          }`}
        >
          {prizes.map((prize, index) => {
            const angle = (index * 360) / prizes.length
            return (
              <div 
                key={index}
                className={`absolute top-0 left-1/2 -translate-x-1/2 h-full w-0.5 origin-bottom rotate-[${angle}deg]`}
              >
                <div className="absolute top-4 left-1/2 -translate-x-1/2 transform -rotate-[${angle}deg] whitespace-nowrap text-black font-mono text-sm font-bold">
                  {prize}
                </div>
              </div>
            )
          })}
          
          {/* Center point */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-black"></div>
          </div>
          
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-retro-orange rotate-45 border-2 border-black"></div>
        </div>
        
        {/* Spin button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="px-8 py-3 bg-black text-white font-display text-xl tracking-widest uppercase border-2 border-black hover:bg-retro-orange hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSpinning ? "SPINNING..." : selectedPrize ? "SPIN AGAIN" : "SPIN"}
        </button>
        
        {/* Selected prize */}
        {selectedPrize && !isSpinning && (
          <div className="mt-4 text-center">
            <p className="font-bold text-xl">You won:</p>
            <p className="text-2xl font-display">{selectedPrize}</p>
          </div>
        )}
      </div>
    </RetroPopup>
  )
}

// Add keyframes for spin-slow animation to your CSS (in index.css or similar)
// @keyframes spin-slow {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(1440deg); }
// }
// 
// .animate-spin-slow {
//   animation: spin-slow 3s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
// }

export { RetroPopup } 