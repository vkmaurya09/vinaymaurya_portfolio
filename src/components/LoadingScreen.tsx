
import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.floor(Math.random() * 15 + 5);
        return next > 100 ? 100 : next;
      });
    }, 100);
    
    // Complete loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); // Short loading time (1.2s)
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);
  
  // When loading is complete, fade out
  if (!isLoading) return null;
  
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-terminal">
          <div className="loading-terminal-header">
            <div className="loading-terminal-button"></div>
            <div className="loading-terminal-button"></div>
            <div className="loading-terminal-button"></div>
          </div>
          <div className="loading-terminal-body">
            <div className="typing-text">INITIALIZING SYSTEM...</div>
            <div className="typing-text delay-300">LOADING MODULES...</div>
            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              <div className="progress-text">{progress}%</div>
            </div>
            {progress >= 100 && (
              <div className="typing-text delay-500">SYSTEM READY</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
