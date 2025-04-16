
import { useState, useEffect } from "react";
import { Menu, X, Mail, FileText, Github, Linkedin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const handleNavClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-saas-sm" : "bg-transparent"
      }`}
    >
      <div className="saas-container flex items-center justify-between py-4">
        <a href="#hero" className="font-heading text-2xl font-bold flex items-center text-saas-primary">
          <span>AR</span><span className="text-saas-dark">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex font-medium space-x-8">
            <li>
              <a 
                href="#about" 
                className="text-saas-dark hover:text-saas-primary transition-colors duration-200"
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                className="text-saas-dark hover:text-saas-primary transition-colors duration-200"
              >
                Experience
              </a>
            </li>
            <li>
              <a 
                href="#skills" 
                className="text-saas-dark hover:text-saas-primary transition-colors duration-200"
              >
                Skills
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                className="text-saas-dark hover:text-saas-primary transition-colors duration-200"
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="text-saas-dark hover:text-saas-primary transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <a href="https://github.com/aditya201551" target="_blank" rel="noopener noreferrer" aria-label="GitHub" 
            className="text-saas-muted hover:text-saas-dark transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/aaditya-raaj/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" 
            className="text-saas-muted hover:text-saas-dark transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://flowcv.com/resume/tsc77t6arq" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="font-medium border-saas-primary text-saas-primary hover:bg-saas-primary/10">
              <FileText className="w-4 h-4 mr-2" /> Resume
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-saas-dark p-2 rounded-md"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-white pt-20 font-medium" 
            style={{ height: '100vh', width: '100vw', overflowY: 'auto' }}>
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-saas-muted rounded-md"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col items-center space-y-6 py-8">
            <a href="#about" className="text-xl" onClick={handleNavClick}>
              About
            </a>
            <a href="#experience" className="text-xl" onClick={handleNavClick}>
              Experience
            </a>
            <a href="#skills" className="text-xl" onClick={handleNavClick}>
              Skills
            </a>
            <a href="#projects" className="text-xl" onClick={handleNavClick}>
              Projects
            </a>
            <a href="#contact" className="text-xl" onClick={handleNavClick}>
              Contact
            </a>
            
            <div className="flex items-center space-x-6 mt-6">
              <a href="https://github.com/aditya201551" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-saas-muted hover:text-saas-dark transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/aaditya-raaj/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-saas-muted hover:text-saas-dark transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:ssh@adityaraj.dev" aria-label="Email" className="text-saas-muted hover:text-saas-dark transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            
            <a href="https://flowcv.com/resume/tsc77t6arq" target="_blank" rel="noopener noreferrer" className="mt-6">
              <Button className="bg-saas-primary hover:bg-saas-primary/90 text-white">
                <FileText className="w-4 h-4 mr-2" /> View Resume
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
