import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  // Create refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Change page title
    document.title = "Aditya Raj | Senior Software Engineer";
    
    // Display toast notification about keyboard navigation
    toast({
      title: "Keyboard Navigation",
      description: "Press 0-5 keys to navigate to different sections of the page",
      duration: 5000,
    });
    
    // Add keyboard event listener
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key;
      
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
  }, [toast]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <div ref={heroRef}>
          <Hero />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={experienceRef}>
          <Experience />
        </div>
        <div ref={skillsRef}>
          <Skills />
        </div>
        <div ref={projectsRef}>
          <Projects />
        </div>
        <div ref={contactRef}>
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
