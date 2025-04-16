import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  // Create refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [mobileDetectionComplete, setMobileDetectionComplete] = useState(false);
  
  // Update when isMobile value changes from undefined
  useEffect(() => {
    if (typeof isMobile === 'boolean') {
      setMobileDetectionComplete(true);
    }
  }, [isMobile]);
  
  console.log('Is mobile:', isMobile); // Debug log

  useEffect(() => {
    // Change page title
    document.title = "Aditya Raj | Senior Software Engineer";
    
    // Only proceed if mobile detection is complete
    if (mobileDetectionComplete) {
      // Only show toast on desktop, not mobile
      if (!isMobile) {
        // Display toast notification about keyboard navigation
        toast({
          title: "Keyboard Navigation",
          description: "Press 0-5 keys to navigate to different sections of the page",
          duration: 5000,
        });
        
        // Add keyboard event listener - only for desktop
        const handleKeyPress = (event: KeyboardEvent) => {
          const key = event.key;
          
          // Check if focus is on an input field, textarea, or other form elements
          const activeElement = document.activeElement;
          const isInputField = activeElement instanceof HTMLInputElement || 
                               activeElement instanceof HTMLTextAreaElement || 
                               activeElement instanceof HTMLSelectElement ||
                               activeElement?.tagName === 'TEXTAREA' ||
                               (activeElement instanceof HTMLElement && activeElement.isContentEditable);
          
          // Don't navigate if user is typing in an input field
          if (isInputField) {
            return;
          }
          
          // Check if the key is a number
          if (/^[0-5]$/.test(key)) {
            const sectionIndex = parseInt(key, 10);
            const sections = [
              heroRef.current,
              aboutRef.current,
              experienceRef.current,
              skillsRef.current,
              projectsRef.current,
              contactRef.current
            ];
            
            // Scroll to the selected section
            if (sections[sectionIndex]) {
              sections[sectionIndex]?.scrollIntoView({ behavior: 'smooth' });
            }
          }
        };
        
        // Add event listener
        window.addEventListener('keydown', handleKeyPress);
        
        // Cleanup
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }
    }
  }, [toast, isMobile, mobileDetectionComplete]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-0">
        <div ref={heroRef} id="hero">
          <Hero />
        </div>
        <div ref={aboutRef} id="about">
          <About />
        </div>
        <div ref={experienceRef} id="experience">
          <Experience />
        </div>
        <div ref={skillsRef} id="skills">
          <Skills />
        </div>
        <div ref={projectsRef} id="projects">
          <Projects />
        </div>
        <div ref={contactRef} id="contact">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
