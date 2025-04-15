
import { Terminal } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-4 border-t border-retro-orange/10 retro-container">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <Terminal className="w-5 h-5 text-retro-orange mr-2" />
              <span className="font-display text-xl text-retro-text">&lt;/&gt;</span>
            </div>
            <p className="font-mono text-xs text-retro-muted">
              &copy; {currentYear} Aditya Raj. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="font-mono text-xs text-retro-muted mb-2">
              Built with modern AI technologies
            </p>
            <div className="flex space-x-4">
              <span className="text-retro-orange font-mono text-xs">Cursor</span>
              <span className="text-retro-yellow font-mono text-xs">Lovable</span>
            </div>
          </div>
        </div>
        
        <div className="retro-separator mt-8 mb-8"></div>
        
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-xs text-retro-muted font-mono">
              Senior Software Engineer @ FYERS | Trading Systems | Cloud Platform Specialist
            </p>
          </div>
          
          <div className="text-xs font-mono">
            <span className="text-retro-orange">$</span> <span className="text-retro-muted">Thank you for visiting</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
