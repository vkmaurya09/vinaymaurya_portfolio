
import { ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

// Define the possible states for our typing animation
type TypingState = "typing" | "pausing" | "deleting";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [typingState, setTypingState] = useState<TypingState>("typing");
  const [currentIndex, setCurrentIndex] = useState(0);
  const typingTexts = useMemo(() => ["web", "future", "cloud", "systems", "experiences"], []);
  const typingSpeed = 100; // ms per character
  const deletingSpeed = 75; // slightly faster deletion
  const pauseDuration = 800; // pause before deleting
  const isMobile = useIsMobile();
  
  // Manage the typing animation with a clean state machine approach
  useEffect(() => {
    const currentWord = typingTexts[currentIndex];
    let timer: NodeJS.Timeout;
    
    const nextStep = () => {
      // Handle different states in the animation cycle
      switch (typingState) {
        case "typing":
          if (displayText.length < currentWord.length) {
            // Continue typing the current word
            setDisplayText(currentWord.substring(0, displayText.length + 1));
          } else {
            // Word is complete, transition to pausing state
            setTypingState("pausing");
          }
          break;
          
        case "pausing":
          // After pause, move to deleting state
          setTypingState("deleting");
          break;
          
        case "deleting":
          if (displayText.length > 0) {
            // Continue deleting the current word
            setDisplayText(displayText.substring(0, displayText.length - 1));
          } else {
            // Word is fully deleted, move to the next word and start typing
            setCurrentIndex((currentIndex + 1) % typingTexts.length);
            setTypingState("typing");
          }
          break;
      }
    };
    
    // Set timer based on current state
    if (typingState === "pausing") {
      timer = setTimeout(nextStep, pauseDuration);
    } else {
      timer = setTimeout(
        nextStep, 
        typingState === "typing" ? typingSpeed : deletingSpeed
      );
    }
    
    // Clean up timer
    return () => clearTimeout(timer);
  }, [
    typingState, 
    displayText, 
    currentIndex, 
    typingTexts
  ]);

  // Handle smooth scroll to sections
  const handleScrollToSection = (sectionId: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center pt-16 pb-16 bg-saas-bgLight relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-48 h-48 bg-saas-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-saas-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-saas-secondary/10 rounded-full blur-2xl"></div>
      
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      <div className="saas-container relative z-10">
        <div className="max-w-3xl">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 rounded-full bg-saas-primary/10 text-saas-primary font-medium text-sm animated-border">
              Senior Software Engineer
            </span>
          </div>

          <h1 className="font-heading font-bold mb-4 text-saas-dark">
            <span className="text-saas-primary">Aditya</span> Raj.
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-heading font-medium text-saas-dark/80 mb-8">
            I build things for the
            <div className="inline-block relative ml-2">
              <span className="text-saas-primary">{displayText || '\u00A0'}</span>
              <span className="text-saas-primary inline-block ml-0.5 animate-pulse">|</span>
            </div>
          </h2>
          
          <p className="text-lg text-saas-muted max-w-2xl mb-10 leading-relaxed">
            Senior Software Engineer specializing in backend development and cloud infrastructure. 
            Currently focused on building high-performance trade systems at FYERS.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={handleScrollToSection("contact")}
              variant="edgy"
              size="edgy-md"
              className="group"
            >
              Get in touch
              <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              onClick={handleScrollToSection("experience")}
              variant="edgy-light"
              size="edgy-md"
              className="relative overflow-hidden"
            >
              See my experience
            </Button>
          </div>
        </div>
      </div>
      
      {/* Only show scroll down on desktop */}
      {!isMobile && (
        <div className="absolute bottom-10 w-full flex justify-center">
          <a 
            href="#about" 
            aria-label="Scroll down" 
            className="flex flex-col items-center text-saas-muted hover:text-saas-primary transition-all duration-300 hover:-translate-y-1"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="font-medium text-sm mb-2">Scroll Down</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      )}
    </section>
  );
};

export default Hero;
