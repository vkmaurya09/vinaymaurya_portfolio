import { useState, useEffect } from "react";
import { Menu, X, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-sm border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        <a href="#hero" className="text-xl font-bold text-gradient">AR.</a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="link-underline">About</a>
          <a href="#experience" className="link-underline">Experience</a>
          <a href="#skills" className="link-underline">Skills</a>
          <a href="#projects" className="link-underline">Projects</a>
          <a href="#contact" className="link-underline">Contact</a>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <a href="https://github.com/aditya201551" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHubIcon className="w-5 h-5 hover:text-code transition-colors" />
          </a>
          <a href="https://www.linkedin.com/in/aaditya-raaj/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <LinkedInIcon className="w-5 h-5 hover:text-code transition-colors" />
          </a>
          <a href="mailto:ssh@adityaraj.dev" aria-label="Email">
            <Mail className="w-5 h-5 hover:text-code transition-colors" />
          </a>
          <a href="https://flowcv.com/resume/tsc77t6arq" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="ml-4 border-code text-code hover:bg-code/10">
              <FileText className="w-4 h-4 mr-2" /> Resume
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-20">
          <nav className="flex flex-col items-center space-y-8 py-8">
            <a href="#about" className="text-lg" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#experience" className="text-lg" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#skills" className="text-lg" onClick={() => setMobileMenuOpen(false)}>Skills</a>
            <a href="#projects" className="text-lg" onClick={() => setMobileMenuOpen(false)}>Projects</a>
            <a href="#contact" className="text-lg" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            
            <div className="flex items-center space-x-6 mt-6">
              <a href="https://github.com/aditya201551" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/aaditya-raaj/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon className="w-6 h-6" />
              </a>
              <a href="mailto:ssh@adityaraj.dev" aria-label="Email">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            
            <a href="https://flowcv.com/resume/tsc77t6arq" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="border-code text-code hover:bg-code/10 mt-4">
                <FileText className="w-4 h-4 mr-2" /> Resume
              </Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
