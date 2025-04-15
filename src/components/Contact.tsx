
import { useState, useEffect } from 'react';
import { Send, Mail, MapPin, Terminal, ArrowRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Custom LinkedIn icon component
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

// Custom GitHub icon component
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
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFocus = (name: string) => {
    setFocused(name);
  };

  const handleBlur = () => {
    setFocused(null);
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
    <section id="contact" className="py-24 px-4 retro-container">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-display mb-12 flex items-center animate-on-scroll">
          <span className="text-retro-orange font-mono mr-2">05.</span>
          <span className="retro-text-shadow">Get In Touch</span>
          <span className="h-px bg-white/10 flex-grow ml-4"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-on-scroll">
            <div className="inline-flex items-center mb-6 px-2 py-1 bg-retro-card border-l-2 border-retro-orange">
              <Terminal className="w-4 h-4 text-retro-orange mr-2" />
              <p className="font-mono text-xs text-retro-orange">contact.sh</p>
            </div>
            
            <h3 className="text-2xl font-display mb-6 text-retro-text">Let's Connect</h3>
            
            <p className="text-retro-muted mb-8 pl-4 border-l border-retro-orange/20">
              I'm always interested in new opportunities, collaborations, or just having a chat about technology. 
              Feel free to reach out through the form or any of the channels listed below.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center group">
                <div className="w-10 h-10 mr-4 bg-retro-card flex items-center justify-center border border-white/10 group-hover:border-retro-orange/50 transition-colors">
                  <Mail className="w-5 h-5 text-retro-orange" />
                </div>
                <a href="mailto:ssh@adityaraj.dev" className="font-mono text-sm text-retro-muted group-hover:text-retro-orange transition-colors">
                  ssh@adityaraj.dev
                </a>
              </div>
              
              <div className="flex items-center group">
                <div className="w-10 h-10 mr-4 bg-retro-card flex items-center justify-center border border-white/10 group-hover:border-retro-orange/50 transition-colors">
                  <MapPin className="w-5 h-5 text-retro-orange" />
                </div>
                <span className="font-mono text-sm text-retro-muted">
                  Bengaluru, Karnataka, India
                </span>
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-xl font-display mb-6 text-retro-text">Find me on</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/aditya201551" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-retro-card flex items-center justify-center border border-white/10 hover:border-retro-orange transition-colors group"
                >
                  <GitHubIcon className="w-6 h-6 text-retro-muted group-hover:text-retro-orange transition-colors" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/aaditya-raaj/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-retro-card flex items-center justify-center border border-white/10 hover:border-retro-orange transition-colors group"
                >
                  <LinkedInIcon className="w-6 h-6 text-retro-muted group-hover:text-retro-orange transition-colors" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll delay-100">
            <form onSubmit={handleSubmit} className="retro-card p-8 border-2 border-white/5">
              <div className="mb-8">
                <label 
                  htmlFor="name" 
                  className={`block text-xs font-mono mb-2 ${focused === 'name' ? 'text-retro-orange' : 'text-retro-muted'}`}
                >
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="_yourName"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  required
                  className="w-full bg-retro-bg border-b-2 border-white/20 focus:border-retro-orange px-0 py-2 font-mono text-retro-text focus:outline-none transition-colors"
                />
              </div>
              
              <div className="mb-8">
                <label 
                  htmlFor="email" 
                  className={`block text-xs font-mono mb-2 ${focused === 'email' ? 'text-retro-orange' : 'text-retro-muted'}`}
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="_yourEmail@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  required
                  className="w-full bg-retro-bg border-b-2 border-white/20 focus:border-retro-orange px-0 py-2 font-mono text-retro-text focus:outline-none transition-colors"
                />
              </div>
              
              <div className="mb-8">
                <label 
                  htmlFor="message" 
                  className={`block text-xs font-mono mb-2 ${focused === 'message' ? 'text-retro-orange' : 'text-retro-muted'}`}
                >
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="_yourMessage"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  required
                  rows={4}
                  className="w-full bg-retro-bg border-b-2 border-white/20 focus:border-retro-orange px-0 py-2 font-mono text-retro-text focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-retro-orange text-retro-bg hover:bg-retro-orange/90 font-mono py-3 flex items-center justify-center group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    PROCESSING...
                  </span>
                ) : (
                  <>
                    <span>SEND_MESSAGE</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
