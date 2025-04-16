import { useState, useEffect } from "react";
import { Menu, X, Mail, FileText, Terminal, Zap, TerminalSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

// Custom LinkedIn icon component to replace the deprecated Linkedin from lucide-react
const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Custom GitHub icon component to replace the deprecated Github from lucide-react
const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add effect to prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      if (isMobile) {
        setMobileMenuOpen(false);
      }
    } else {
      // If element not found, try to navigate to the correct URL
      // This is needed for GitHub Pages where the base path might be different
      const isProduction = window.location.href.includes('github.io');
      if (isProduction) {
        window.location.href = `/vinaymaurya_portfolio/#${id}`;
      } else {
        window.location.href = `/#${id}`;
      }
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-retro-bg/95 backdrop-blur-sm border-b border-retro-orange/10" : "bg-transparent"
      }`}
    >
      <div className="container max-w-7xl flex items-center justify-between py-4 px-4">
        <a 
          href="#hero" 
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="font-display text-2xl retro-text-shadow flex items-center"
        >
          <TerminalSquare className="w-6 h-6 text-retro-orange mr-2" />
          <span className="text-retro-orange">VM</span><span className="text-retro-text">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex font-mono text-sm space-x-1">
            <li>
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('about');
                }}
                className="px-3 py-2 hover:text-retro-orange hover:bg-retro-orange/5 transition-colors duration-200 flex items-center"
              >
                <span className="text-retro-orange mr-1">01.</span> ABOUT
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('experience');
                }}
                className="px-3 py-2 hover:text-retro-orange hover:bg-retro-orange/5 transition-colors duration-200 flex items-center"
              >
                <span className="text-retro-orange mr-1">02.</span> EXPERIENCE
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('skills');
                }}
                className="px-3 py-2 hover:text-retro-orange hover:bg-retro-orange/5 transition-colors duration-200 flex items-center"
              >
                <span className="text-retro-orange mr-1">03.</span> SKILLS
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('projects');
                }}
                className="px-3 py-2 hover:text-retro-orange hover:bg-retro-orange/5 transition-colors duration-200 flex items-center"
              >
                <span className="text-retro-orange mr-1">04.</span> PROJECTS
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
                className="px-3 py-2 hover:text-retro-orange hover:bg-retro-orange/5 transition-colors duration-200 flex items-center"
              >
                <span className="text-retro-orange mr-1">05.</span> CONTACT
              </a>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center space-x-5">
          <a href="https://github.com/vkmaurya09" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-retro-muted hover:text-retro-orange transition-colors">
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/vinaykmaurya/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-retro-muted hover:text-retro-orange transition-colors">
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a href="mailto:iamvinay1999@gmail.com" aria-label="Email" className="text-retro-muted hover:text-retro-orange transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://drive.google.com/file/d/1MerP_nO__EY9pAtuKOkBkHW8rbtkkEaW/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="font-mono text-xs border-retro-orange text-retro-orange hover:bg-retro-orange/10 rounded-none">
              <FileText className="w-4 h-4 mr-2" /> RESUME
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-retro-text p-2 border border-retro-orange/20 bg-retro-card"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-retro-orange" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-retro-bg pt-20 font-display" style={{ height: '100vh', width: '100vw', overflowY: 'auto' }}>
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-retro-orange border border-retro-orange/20 bg-retro-card"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-8 py-8">
            <a href="#about" onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }} className="flex items-center text-2xl font-display tracking-wider retro-text-shadow">
              <span className="text-retro-orange mr-2">01.</span> ABOUT
            </a>
            <a href="#experience" onClick={(e) => {
                e.preventDefault();
                handleNavClick('experience');
              }} className="flex items-center text-2xl font-display tracking-wider retro-text-shadow">
              <span className="text-retro-orange mr-2">02.</span> EXPERIENCE
            </a>
            <a href="#skills" onClick={(e) => {
                e.preventDefault();
                handleNavClick('skills');
              }} className="flex items-center text-2xl font-display tracking-wider retro-text-shadow">
              <span className="text-retro-orange mr-2">03.</span> SKILLS
            </a>
            <a href="#projects" onClick={(e) => {
                e.preventDefault();
                handleNavClick('projects');
              }} className="flex items-center text-2xl font-display tracking-wider retro-text-shadow">
              <span className="text-retro-orange mr-2">04.</span> PROJECTS
            </a>
            <a href="#contact" onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }} className="flex items-center text-2xl font-display tracking-wider retro-text-shadow">
              <span className="text-retro-orange mr-2">05.</span> CONTACT
            </a>
            
            <div className="flex items-center space-x-8 mt-6">
              <a href="https://github.com/vkmaurya09" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-retro-muted hover:text-retro-orange transition-colors">
                <GitHubIcon className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/vinaykmaurya/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-retro-muted hover:text-retro-orange transition-colors">
                <LinkedInIcon className="w-6 h-6" />
              </a>
              <a href="mailto:iamvinay1999@gmail.com" aria-label="Email" className="text-retro-muted hover:text-retro-orange transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            
            <a href="https://drive.google.com/file/d/1MerP_nO__EY9pAtuKOkBkHW8rbtkkEaW/view?usp=sharing" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="mt-4 border-retro-orange text-retro-orange hover:bg-retro-orange/10 rounded-none font-display text-xl tracking-wider">
                <FileText className="w-4 h-4 mr-2" /> RESUME
              </Button>
            </a>

            {/* Added a decorative element to enhance the retro feel */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-20 pointer-events-none">
              <div className="text-retro-orange font-mono">
                &lt;/ menu &gt;
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
