
import { useEffect, useState } from "react";

interface CountAnimationOptions {
  duration?: number;
  delay?: number;
  easing?: (t: number) => number;
}

/**
 * Hook to animate a number counting up from 0 to the target value
 */
export const useCountAnimation = (
  targetValue: number, 
  options: CountAnimationOptions = {}
) => {
  const { 
    duration = 1000, 
    delay = 0,
    // Default easing function (ease-out cubic)
    easing = (t: number) => 1 - Math.pow(1 - t, 3)
  } = options;
  
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    // Delay start if needed
    const delayTimeout = setTimeout(() => {
      setIsAnimating(true);
      
      const startTime = Date.now();
      const endTime = startTime + duration;
      
      const updateValue = () => {
        const now = Date.now();
        
        if (now >= endTime) {
          setCurrentValue(targetValue);
          setIsAnimating(false);
          return;
        }
        
        // Calculate progress (0 to 1)
        const progress = Math.min(1, (now - startTime) / duration);
        // Apply easing function
        const easedProgress = easing(progress);
        // Calculate current value
        const value = Math.floor(easedProgress * targetValue);
        
        setCurrentValue(value);
        requestAnimationFrame(updateValue);
      };
      
      requestAnimationFrame(updateValue);
    }, delay);
    
    return () => {
      clearTimeout(delayTimeout);
    };
  }, [targetValue, duration, delay, easing]);
  
  return { value: currentValue, isAnimating };
};

export default useCountAnimation;
