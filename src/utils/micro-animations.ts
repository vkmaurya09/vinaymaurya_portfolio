// Utility functions for micro-animations
import { useEffect, useRef } from 'react';

// Typewriter effect - returns a ref to be attached to the element
export function useTypewriterEffect(
  text: string,
  options: { 
    typingSpeed?: number; 
    startDelay?: number;
    cursorCharacter?: string;
    loop?: boolean;
    loopDelay?: number;
  } = {}
) {
  const elementRef = useRef<HTMLElement | null>(null);
  const {
    typingSpeed = 50,
    startDelay = 0,
    cursorCharacter = "▊",
    loop = false,
    loopDelay = 2000
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let timeout: NodeJS.Timeout;
    
    const startTyping = () => {
      let currentIndex = 0;
      element.textContent = cursorCharacter;
      
      const typeNextChar = () => {
        if (currentIndex < text.length) {
          element.textContent = text.substring(0, currentIndex + 1) + cursorCharacter;
          currentIndex++;
          timeout = setTimeout(typeNextChar, typingSpeed);
        } else if (loop) {
          // If looping, wait and then clear to start again
          timeout = setTimeout(() => {
            element.textContent = cursorCharacter;
            currentIndex = 0;
            typeNextChar();
          }, loopDelay);
        } else {
          // Remove cursor after typing complete
          element.textContent = text;
        }
      };

      timeout = setTimeout(typeNextChar, typingSpeed);
    };

    // Start typing after initial delay
    timeout = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, typingSpeed, startDelay, loop, loopDelay, cursorCharacter]);

  return elementRef;
}

// Glitch text effect - modified to reduce flashing
export function createGlitchEffect(
  options: { 
    intensity?: number;
    interval?: number;
    duration?: number;
  } = {}
) {
  const {
    intensity = 3,
    interval = 4000,
    duration = 200
  } = options;

  // Return a function that will set up the glitch effect
  return (element: HTMLElement | null) => {
    if (!element) return () => {}; // Return noop cleanup if no element
    
    const originalText = element.innerText;
    const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;
    
    const glitch = () => {
      let iterations = 0;
      const maxIterations = intensity;
      
      const glitchEffect = () => {
        element.innerText = originalText
          .split("")
          .map((char, idx) => {
            if (iterations >= maxIterations) {
              return originalText[idx];
            }
            if (Math.random() < 0.3) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            }
            return char;
          })
          .join("");
        
        iterations += 1/3;
        
        if (iterations < maxIterations) {
          timeoutId = setTimeout(glitchEffect, 50);
        } else {
          element.innerText = originalText;
        }
      };
      
      glitchEffect();
    };
    
    // Start the effect periodically
    intervalId = setInterval(glitch, interval);
    
    // Return a cleanup function
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  };
}

// Hook version of the glitch effect that properly follows React's rules of hooks
// Modified to ensure stable rendering
export function useGlitchEffect(
  options: { 
    intensity?: number;
    interval?: number;
    duration?: number;
  } = {}
) {
  const elementRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    // Ensure the original text is stable by setting it immediately
    const originalText = element.innerText;
    
    const glitchEffect = createGlitchEffect(options);
    const cleanup = glitchEffect(element);
    
    return () => {
      cleanup();
      // Restore original text on cleanup
      if (elementRef.current) {
        elementRef.current.innerText = originalText;
      }
    };
  }, [options.intensity, options.interval, options.duration]);
  
  return elementRef;
}

// No-op functions for removed animations
export function useScanlineEffect() {
  return () => {};
}

export function useStaticNoiseEffect() {
  return () => {};
}

export function usePixelationEffect() {
  return () => {};
}

// Simplified to return a no-op function
export function usePixelHoverEffect() {
  const pixelRef = useRef<HTMLElement | null>(null);
  
  // This is now a no-op function
  const handleMouseMove = () => {};
  
  return {
    ref: pixelRef,
    onMouseMove: handleMouseMove
  };
}
