
import { Github, Linkedin, Mail, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 border-t border-saas-border relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      <div className="saas-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <span className="font-heading text-xl font-bold text-saas-dark">AR<span className="text-saas-primary">.</span></span>
            </div>
            <p className="text-xs text-saas-muted">
              &copy; {currentYear} Aditya Raj. All rights reserved.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-xs text-saas-muted mb-2">
              Built with modern technologies
            </p>
            <div className="flex space-x-4">
              <a
                href="https://cursor.sh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-saas-muted hover:text-saas-primary transition-colors text-xs relative group"
              >
                Cursor
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saas-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="https://lovable.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-saas-muted hover:text-saas-primary transition-colors text-xs relative group"
              >
                Lovable
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-saas-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-saas-border my-8"></div>

        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-xs text-saas-muted">
              Senior Software Engineer @ FYERS | Trading Systems | Cloud Platform Specialist
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="https://github.com/aditya201551" target="_blank" rel="noopener noreferrer" 
               className="text-saas-muted hover:text-saas-primary transform transition-all hover:-translate-y-1">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/aaditya-raaj/" target="_blank" rel="noopener noreferrer" 
               className="text-saas-muted hover:text-saas-primary transform transition-all hover:-translate-y-1">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:ssh@adityaraj.dev" 
               className="text-saas-muted hover:text-saas-primary transform transition-all hover:-translate-y-1">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://flowcv.com/resume/tsc77t6arq" target="_blank" rel="noopener noreferrer" 
               className="text-saas-muted hover:text-saas-primary transform transition-all hover:-translate-y-1">
              <FileText className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
