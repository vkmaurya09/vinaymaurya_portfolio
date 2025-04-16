
import { ChevronDown, Terminal, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <section 
      id="hero" 
      className={`min-h-screen flex flex-col justify-center relative px-4 retro-container ${
        isMobile 
          ? 'pt-[calc(4rem+3vh)]'
          : ''
      }`}
    >
      <div className="container mx-auto max-w-5xl">
        <div>
          <div className="inline-flex items-center mb-6 px-2 py-1 bg-retro-card border border-retro-orange/30 hover-btn">
            <Terminal className="w-4 h-4 text-retro-orange mr-2" />
            <p className="text-retro-orange font-mono text-xs">hello_world.sh</p>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display mb-4 text-retro-text retro-text-shadow">
            <span className="text-retro-orange">Aditya</span> Raj.
          </h1>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display text-retro-text/70 mb-8">
            I build things for the web
          </h2>
          
          <p className="text-lg text-retro-muted max-w-2xl mb-10 font-mono leading-relaxed border-l-2 border-retro-orange/50 pl-4">
            Senior Software Engineer specializing in backend development and cloud infrastructure. 
            Currently focused on building high-performance trade systems at FYERS.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="px-6 py-3 bg-retro-orange text-retro-bg rounded-none font-mono hover:translate-x-1 hover:-translate-y-1 transition-transform duration-300 pixel-shadow flex items-center justify-center hover-btn"
            >
              <Zap className="w-4 h-4 mr-2" /> GET_IN_TOUCH
            </button>
            <button 
              className="px-6 py-3 border-2 border-retro-orange/70 text-retro-orange font-mono rounded-none hover:bg-retro-orange/10 transition-colors duration-300 flex items-center justify-center hover-btn"
            >
              SEE_MY_WORK
            </button>
          </div>
        </div>
      </div>
      
      {!isMobile && (
        <div className="absolute bottom-10 w-full flex justify-center">
          <a href="#about" aria-label="Scroll down" className="flex flex-col items-center text-retro-muted hover:text-retro-orange transition-colors duration-300">
            <span className="font-mono text-xs mb-2">Scroll Down</span>
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      )}

      <div className="absolute right-0 top-1/4 w-1/3 h-1.5 bg-retro-orange/40"></div>
      <div className="absolute right-10 top-1/4 mt-8 w-1/4 h-1.5 bg-retro-purple/40"></div>
      <div className="absolute right-32 top-1/4 mt-16 w-1/5 h-1.5 bg-retro-blue/40"></div>
      <div className="absolute right-5 top-1/4 mt-24 w-1/3 h-1.5 bg-retro-green/40"></div>
      <div className="absolute right-20 top-1/4 mt-32 w-1/6 h-1.5 bg-retro-yellow/40"></div>
    </section>
  );
};

export default Hero;
