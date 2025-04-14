
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative px-4">
      <div className="container mx-auto max-w-5xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <p className="text-code mb-4 font-mono">Hi, my name is</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4">
            Aditya Raj.
          </h1>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-muted-foreground mb-6">
            I build things for the web.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            I'm a Senior Software Engineer specializing in backend development and cloud infrastructure. 
            Currently focused on building high-performance trade systems at FYERS.
          </p>
          <div className="flex space-x-4">
            <a 
              href="#contact"
              className="px-6 py-3 border border-code text-code rounded-md hover:bg-code/10 transition-colors duration-300"
            >
              Get In Touch
            </a>
            <a 
              href="#experience"
              className="px-6 py-3 bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors duration-300"
            >
              Check my work
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" aria-label="Scroll down">
            <ArrowDown className="w-6 h-6 text-code" />
          </a>
        </div>
      </div>

      {/* Background decorative colored bars inspired by LinkedIn profile */}
      <div className="absolute right-0 top-1/4 w-1/2 h-2 bg-pink-500/30 rounded-l-full"></div>
      <div className="absolute right-10 top-1/4 mt-8 w-1/3 h-2 bg-purple-500/30 rounded-l-full"></div>
      <div className="absolute right-20 top-1/4 mt-16 w-1/4 h-2 bg-blue-500/30 rounded-l-full"></div>
      <div className="absolute right-5 top-1/4 mt-24 w-2/5 h-2 bg-green-500/30 rounded-l-full"></div>
      <div className="absolute right-0 top-1/4 mt-32 w-1/4 h-2 bg-cyan-500/30 rounded-l-full"></div>
    </section>
  );
};

export default Hero;
