
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

// Glitch text effect
export function useGlitchEffect(
  element: HTMLElement | null, 
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

  useEffect(() => {
    if (!element) return;
    
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
    
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [element, intensity, interval, duration]);
}

// Scanline effect for retro CRT look
export function useScanlineEffect() {
  useEffect(() => {
    // Already implemented via CSS
    return () => {};
  }, []);
}

// Static noise effect that appears/disappears
export function useStaticNoiseEffect(element: HTMLElement | null) {
  useEffect(() => {
    if (!element) return;
    
    let noiseContainer: HTMLDivElement | null = null;
    
    // Create noise overlay
    const createNoiseOverlay = () => {
      noiseContainer = document.createElement('div');
      noiseContainer.className = 'absolute inset-0 bg-noise opacity-10 pointer-events-none z-10';
      noiseContainer.style.mixBlendMode = 'overlay';
      element.style.position = 'relative';
      element.appendChild(noiseContainer);
      
      // Animate noise opacity
      let increasing = false;
      const animateNoise = () => {
        if (!noiseContainer) return;
        
        const currentOpacity = parseFloat(noiseContainer.style.opacity || '0.1');
        
        if (currentOpacity >= 0.15) increasing = false;
        else if (currentOpacity <= 0.05) increasing = true;
        
        noiseContainer.style.opacity = String(
          increasing ? currentOpacity + 0.002 : currentOpacity - 0.002
        );
        
        requestAnimationFrame(animateNoise);
      };
      
      requestAnimationFrame(animateNoise);
    };
    
    createNoiseOverlay();
    
    return () => {
      if (noiseContainer && element.contains(noiseContainer)) {
        element.removeChild(noiseContainer);
      }
    };
  }, [element]);
}

// "Loading" pixelation effect
export function usePixelationEffect(
  imageElement: HTMLImageElement | null,
  options: { 
    duration?: number;
    startDelay?: number;
    steps?: number;
  } = {}
) {
  const { 
    duration = 1000, 
    startDelay = 0, 
    steps = 10 
  } = options;
  
  useEffect(() => {
    if (!imageElement) return;
    
    const originalSrc = imageElement.src;
    let timeoutId: NodeJS.Timeout;
    
    const pixelate = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Set dimensions
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      
      // Draw image to canvas
      ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
      
      let currentStep = 1;
      const stepDuration = duration / steps;
      
      const pixelateStep = () => {
        if (!ctx) return;
        
        // Calculate pixel size for this step
        const pixelSize = Math.max(1, Math.ceil((steps - currentStep) / steps * 16));
        
        // Clear canvas and draw pixelated version
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Save original image data
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw pixelated image
        for (let y = 0; y < canvas.height; y += pixelSize) {
          for (let x = 0; x < canvas.width; x += pixelSize) {
            // Get the color from the original image
            const dataIndex = (y * canvas.width + x) * 4;
            const r = imgData.data[dataIndex];
            const g = imgData.data[dataIndex + 1];
            const b = imgData.data[dataIndex + 2];
            
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, y, pixelSize, pixelSize);
          }
        }
        
        // Replace image source with canvas data
        imageElement.src = canvas.toDataURL();
        
        currentStep++;
        
        if (currentStep <= steps) {
          timeoutId = setTimeout(pixelateStep, stepDuration);
        } else {
          // Restore original image when done
          imageElement.src = originalSrc;
        }
      };
      
      pixelateStep();
    };
    
    // Start after delay
    timeoutId = setTimeout(pixelate, startDelay);
    
    return () => {
      clearTimeout(timeoutId);
      imageElement.src = originalSrc;
    };
    
  }, [imageElement, duration, startDelay, steps]);
}

// Hover pixel background effect - modified to correctly return types for React refs
export function usePixelHoverEffect() {
  const pixelRef = useRef<HTMLElement | null>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();
    
    // Calculate relative position in element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create pixel trail effect
    const pixel = document.createElement('div');
    pixel.className = 'absolute w-1 h-1 bg-retro-orange opacity-70 pointer-events-none';
    pixel.style.left = `${x}px`;
    pixel.style.top = `${y}px`;
    element.appendChild(pixel);
    
    // Animate and remove
    setTimeout(() => {
      pixel.style.transition = 'all 500ms ease';
      pixel.style.opacity = '0';
      pixel.style.transform = 'scale(3)';
      
      setTimeout(() => {
        if (element.contains(pixel)) {
          element.removeChild(pixel);
        }
      }, 500);
    }, 10);
  };
  
  // Effect to initialize the element
  useEffect(() => {
    const el = pixelRef.current;
    if (el) {
      if (el.style.position !== 'relative') {
        el.style.position = 'relative';
        el.style.overflow = 'hidden';
      }
    }
    return () => {};
  }, []);

  return {
    ref: pixelRef,
    onMouseMove: handleMouseMove
  };
}
