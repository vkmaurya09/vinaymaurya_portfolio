
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Remove mobile detection, always show cursor
    document.documentElement.style.cursor = 'none';
    
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
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

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div 
        className={`custom-cursor-dot ${isHovering ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ 
          left: `${position.x}px`,
          top: `${position.y}px`,
          // Ensure visibility by adding z-index and pointer-events
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      />
      <div 
        className={`custom-cursor-ring ${isHovering ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ 
          left: `${position.x}px`,
          top: `${position.y}px`,
          // Ensure visibility by adding z-index and pointer-events
          zIndex: 9998,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};

export default CustomCursor;

