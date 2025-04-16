
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Apply cursor: none to document root to ensure it cascades properly
    document.documentElement.style.cursor = 'none';
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.classList.contains('hover-btn') ||
          target.closest('button') || 
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.hasAttribute('data-interactive')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Force cursor: none on all interactive elements
    const applyNoDefaultCursor = () => {
      const interactiveElements = document.querySelectorAll('a, button, input[type="button"], input[type="submit"], .hover-btn, [role="button"]');
      interactiveElements.forEach(el => {
        (el as HTMLElement).style.cursor = 'none';
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Apply no cursor to all elements immediately and on DOM changes
    applyNoDefaultCursor();
    const observer = new MutationObserver(applyNoDefaultCursor);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Mobile detection to disable custom cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 ||
                         (navigator as any).msMaxTouchPoints > 0;
    
    if (!isTouchDevice) {
      document.body.classList.add('custom-cursor-active');
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('custom-cursor-active');
      observer.disconnect();
      document.documentElement.style.cursor = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={`custom-cursor-dot ${isHovering ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ 
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      <div 
        className={`custom-cursor-ring ${isHovering ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ 
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />

      <style jsx global>{`
        /* Updated cursor styles to match beige theme */
        body {
          cursor: none !important;
        }

        a, button, input[type="button"], input[type="submit"], input[type="reset"], 
        select, .hover-btn, [role="button"] {
          cursor: none !important;
        }

        .custom-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background-color: #FF7E5F;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, opacity 0.2s;
        }

        .custom-cursor-ring {
          position: fixed;
          width: 24px;
          height: 24px;
          border: 2px solid #FF7E5F;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, opacity 0.3s, transform 0.3s;
          opacity: 0.5;
        }

        .custom-cursor-dot.hover {
          width: 10px;
          height: 10px;
          background-color: #FFB74D;
          opacity: 0.8;
        }

        .custom-cursor-ring.hover {
          width: 36px;
          height: 36px;
          border-color: #FFB74D;
          opacity: 0.6;
        }

        .custom-cursor-dot.clicking {
          width: 14px;
          height: 14px;
          background-color: #FF7E5F;
          opacity: 1;
        }

        .custom-cursor-ring.clicking {
          width: 18px;
          height: 18px;
          border-color: #FF7E5F;
          opacity: 0.8;
          transform: translate(-50%, -50%) scale(0.8);
        }

        .custom-cursor-dot.hover.clicking {
          background-color: #FFB74D;
        }

        .custom-cursor-ring.hover.clicking {
          border-color: #FFB74D;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
