
import { useState, useEffect } from "react";
import { Menu, X, GitHub, Linkedin, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GitHub className="w-5 h-5 hover:text-code transition-colors" />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 hover:text-code transition-colors" />
          </a>
          <a href="mailto:contact@example.com" aria-label="Email">
            <Mail className="w-5 h-5 hover:text-code transition-colors" />
          </a>
          <Button variant="outline" size="sm" className="ml-4 border-code text-code hover:bg-code/10">
            <FileText className="w-4 h-4 mr-2" /> Resume
          </Button>
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
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHub className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="mailto:contact@example.com" aria-label="Email">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            
            <Button variant="outline" size="sm" className="border-code text-code hover:bg-code/10 mt-4">
              <FileText className="w-4 h-4 mr-2" /> Resume
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
