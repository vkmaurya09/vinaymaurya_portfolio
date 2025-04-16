
import { Github, Linkedin, Mail, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white py-16 border-t border-saas-border">
      <div className="saas-container">
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
                className="text-saas-muted hover:text-saas-primary transition-colors text-xs"
              >
                Cursor
              </a>
              <a
                href="https://lovable.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-saas-muted hover:text-saas-primary transition-colors text-xs"
              >
                Lovable
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
            <a href="https://github.com/aditya201551" target="_blank" rel="noopener noreferrer" className="text-saas-muted hover:text-saas-primary">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/aaditya-raaj/" target="_blank" rel="noopener noreferrer" className="text-saas-muted hover:text-saas-primary">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:ssh@adityaraj.dev" className="text-saas-muted hover:text-saas-primary">
              <Mail className="w-4 h-4" />
            </a>
            <a href="https://flowcv.com/resume/tsc77t6arq" target="_blank" rel="noopener noreferrer" className="text-saas-muted hover:text-saas-primary">
              <FileText className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
