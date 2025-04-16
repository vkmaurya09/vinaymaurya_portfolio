import React, { useState, useEffect } from 'react';
import { Loader, Zap, Sun, Star } from 'lucide-react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIcon, setCurrentIcon] = useState(0);
  
  const icons = [
    <Zap key="zap" size={24} className="text-retro-orange" />,
    <Sun key="sun" size={24} className="text-retro-yellow" />,
    <Star key="star" size={24} className="text-retro-purple" />,
    <Loader key="loader" size={24} className="text-retro-green" />
  ];
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.floor(Math.random() * 20 + 8);
        return next > 100 ? 100 : next;
      });
      
      // Cycle through icons
      setCurrentIcon(prev => (prev + 1) % icons.length);
    }, 120);
    
    // Complete loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);
  
  // When loading is complete, fade out
  if (!isLoading) return null;
  
  return (
    <div className="loading-screen">
      <div className="retro-loading">
        <div className="retro-loading-card">
          {/* Decorative patterns */}
          <div className="retro-loading-pattern top-0"></div>
          
          {/* Title */}
          <h1 className="retro-loading-title">LOADING</h1>
          
          {/* Icon Grid */}
          <div className="retro-loading-grid">
            {[...Array(9)].map((_, index) => (
              <div 
                key={index} 
                className={`retro-loading-cell ${
                  index === 4 ? "retro-loading-cell-active" : ""
                }`}
              >
                {index === 4 ? icons[currentIcon] : null}
              </div>
            ))}
          </div>
          
          {/* Loading Bar */}
          <div className="retro-loading-bar-container">
            <div className="retro-loading-bar" style={{ width: `${progress}%` }}></div>
            <span className="retro-loading-percentage">{progress}%</span>
          </div>
          
          <div className="retro-loading-pattern bottom-0"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
