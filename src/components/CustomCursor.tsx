import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
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
      document.body.classList.remove('custom-cursor-active');
      observer.disconnect();
      document.documentElement.style.cursor = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{ 
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    />
  );
};

export default CustomCursor;
