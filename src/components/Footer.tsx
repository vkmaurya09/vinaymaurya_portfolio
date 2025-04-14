
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 px-4 border-t border-muted">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground">
              &copy; {currentYear} Aditya Raj. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center">
            <span className="text-muted-foreground text-sm">
              Built with <Heart className="inline-block w-4 h-4 text-red-500 mx-1" /> using React & Tailwind
            </span>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col md:flex-row justify-center md:justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              Senior Software Engineer @ FYERS | Trading Systems | Cloud Platform Specialist
            </p>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <a href="#" className="hover:text-code mr-4">Privacy Policy</a>
            <a href="#" className="hover:text-code">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
