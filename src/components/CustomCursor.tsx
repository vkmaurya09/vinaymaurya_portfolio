
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
          target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
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
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{ 
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
      <div className="scan-line" />
    </>
  );
};

export default CustomCursor;
