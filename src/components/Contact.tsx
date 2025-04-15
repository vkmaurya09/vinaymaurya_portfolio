import { useState, useEffect } from 'react';
import { Send, Mail, MapPin, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

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

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Use fetch with no-cors mode to bypass CORS issues
      await fetch('https://script.google.com/macros/s/AKfycbwuWYTO170ZPMpNG-oBpzRNf0FLN6hch_PR5Ny9UcGZoWG5VpMaP0QLTyDnjm-gn-Zr2w/exec', {
        method: 'POST',
        mode: 'no-cors', // This prevents CORS errors
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // Since we're using no-cors, we'll assume success if no error is thrown
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 flex items-center animate-on-scroll">
          <span className="text-code font-mono mr-2">05.</span>
          <span>Get In Touch</span>
          <span className="h-px bg-muted flex-grow ml-4"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-on-scroll">
            <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
            <p className="text-muted-foreground mb-8">
              I'm always interested in new opportunities, collaborations, or just having a chat about technology. Feel free to reach out through the form or any of the channels listed below.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-code mr-4" />
                <span>ssh@adityaraj.dev</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-code mr-4" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-xl font-medium mb-4">Find me on</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/aditya201551" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary p-3 rounded-full hover:bg-code/20 transition-colors"
                >
                  <GitHubIcon className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/aaditya-raaj/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary p-3 rounded-full hover:bg-code/20 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll delay-100">
            <form onSubmit={handleSubmit} className="space-y-6 bg-secondary/20 p-8 rounded-lg border border-border/40 backdrop-blur-sm">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground/80">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-border/60 bg-background/30 px-4 py-3 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-code focus:border-code transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground/80">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-border/60 bg-background/30 px-4 py-3 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-code focus:border-code transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground/80">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Hi! I'd like to talk about..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-md border border-border/60 bg-background/30 px-4 py-3 text-sm font-normal focus:outline-none focus:ring-1 focus:ring-code focus:border-code transition-all duration-200 resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-code hover:bg-code/90 text-background px-6 py-3 rounded-md w-full flex items-center justify-center transition-all duration-300 font-medium mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
