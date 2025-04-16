
import { useEffect, useRef } from 'react';
import { Code, BookOpen } from 'lucide-react';
import { usePixelHoverEffect } from '@/utils/micro-animations';

const About = () => {
  const profileImgRef = useRef<HTMLImageElement>(null);
  
  // Create refs for pixel hover effect
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const pixelHoverEffect = usePixelHoverEffect();

  useEffect(() => {
    // Create an intersection observer for animation triggers
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class with a slight delay based on data-delay attribute
          const delay = parseInt(entry.target.getAttribute('data-delay') || '0');
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in');
          }, delay);
          
          // If it's the profile image, add a pixel loading effect
          if (entry.target.classList.contains('profile-image-container')) {
            const img = entry.target.querySelector('img');
            if (img) {
              // Add a custom animation sequence
              img.style.filter = 'grayscale(1) blur(10px)';
              setTimeout(() => {
                img.style.transition = 'filter 0.8s cubic-bezier(0.11, 0, 0.5, 0)';
                img.style.filter = 'grayscale(1) blur(0px)';
              }, 300);
            }
          }
        }
      });
    }, { threshold: 0.1 });

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Add CRT flicker effect to section
    const section = document.getElementById('about');
    if (section) {
      let lastTime = 0;
      const flickerInterval = 5000; // Time between flickers in ms
      
      const flicker = (timestamp: number) => {
        if (timestamp - lastTime > flickerInterval) {
          const overlay = document.createElement('div');
          overlay.className = 'absolute inset-0 bg-white/5 pointer-events-none';
          section.appendChild(overlay);
          
          setTimeout(() => {
            if (section.contains(overlay)) {
              section.removeChild(overlay);
            }
          }, 100);
          
          lastTime = timestamp;
        }
        
        requestAnimationFrame(flicker);
      };
      
      requestAnimationFrame(flicker);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="py-24 px-4 retro-container relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-display mb-12 flex items-center animate-on-scroll" data-delay="0">
          <span className="text-retro-orange font-mono mr-2">01.</span>
          <span className="retro-text-shadow">About Me</span>
          <span className="h-px bg-white/10 flex-grow ml-4"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <div 
              ref={firstSectionRef}
              className="mb-6 flex items-center animate-on-scroll" 
              data-delay="100"
              onMouseMove={pixelHoverEffect.onMouseMove}
            >
              <div className="bg-retro-card p-2 mr-4 hover:bg-retro-card/80 transition-colors duration-300">
                <BookOpen className="w-5 h-5 text-retro-orange" />
              </div>
              <h3 className="text-xl font-display text-retro-orange">My Background</h3>
            </div>
            
            <p className="text-retro-muted mb-6 pl-4 border-l border-retro-orange/20 animate-on-scroll hover:border-retro-orange/60 transition-colors duration-500" data-delay="200">
              Senior Software Engineer at a trading firm based in Bangalore, working on high-performance 
              trade systems and fintech solutions.
            </p>
            
            <div 
              ref={secondSectionRef}
              className="mb-6 flex items-center animate-on-scroll" 
              data-delay="300"
              onMouseMove={pixelHoverEffect.onMouseMove}
            >
              <div className="bg-retro-card p-2 mr-4 hover:bg-retro-card/80 transition-colors duration-300">
                <Code className="w-5 h-5 text-retro-orange" />
              </div>
              <h3 className="text-xl font-display text-retro-orange">My Expertise</h3>
            </div>
            
            <div className="space-y-4">
              {[
                "I've worked across multiple domains from Web3 to e-commerce—and I'm currently focused on trade systems and fintech.",
                "My main expertise lies in backend technologies like distributed systems, Redis, Kafka, AWS, Go, and real-time systems.",
                "I'm passionate about building backend and cloud services that are efficient, reliable, and easy to maintain. I believe in keeping things simple and scalable, no matter the complexity of the project.",
                "Always open to meeting new people and collaborating on exciting projects—feel free to connect if you'd like to chat!"
              ].map((text, index) => (
                <p 
                  key={index}
                  className="text-retro-muted pl-4 border-l border-retro-orange/20 animate-on-scroll hover:pl-6 transition-all duration-500"
                  data-delay={400 + (index * 100)}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
          
          <div className="animate-on-scroll profile-image-container relative" data-delay="600">
            <div className="relative max-w-xs mx-auto">
              <div className="border-4 border-retro-orange p-2 bg-retro-bg relative z-10 overflow-hidden group">
                <div className="overflow-hidden">
                  <img 
                    ref={profileImgRef}
                    src="/images/profile.png"
                    alt="Aditya Raj" 
                    className="w-full grayscale hover:grayscale-0 transition-all duration-500 mix-blend-luminosity hover:mix-blend-normal"
                  />
                  
                  {/* Scan line animation overlay */}
                  <div className="absolute inset-0 bg-scanline opacity-0 group-hover:opacity-30 pointer-events-none"></div>
                  
                  {/* Static effect overlay */}
                  <div className="absolute inset-0 bg-noise opacity-0 group-hover:opacity-10 pointer-events-none mix-blend-overlay"></div>
                </div>
              </div>
              <div className="absolute inset-0 bg-retro-purple/20 -translate-x-4 translate-y-4 -z-10 animate-pulse-slow"></div>
              
              {/* Retro decorative elements */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4">
                <span className="inline-block w-6 h-1.5 bg-retro-orange"></span>
                <span className="inline-block w-2 h-1.5 bg-retro-purple"></span>
                <span className="inline-block w-4 h-1.5 bg-retro-yellow"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
