import { useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin, Github, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is just a demo - would normally submit to a backend
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: '', email: '', message: '' });
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
                <span>contact@example.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-code mr-4" />
                <span>+91 9876543210</span>
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
                  href="https://github.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary p-3 rounded-full hover:bg-code/20 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://linkedin.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary p-3 rounded-full hover:bg-code/20 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="animate-on-scroll delay-200">
            <div className="glass-card p-6 rounded-lg">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="bg-secondary/30"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="bg-secondary/30"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block mb-1">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi! I'd like to talk about..."
                      className="min-h-[150px] bg-secondary/30"
                      required
                    />
                  </div>
                  <Button type="submit" className="bg-code hover:bg-code-dark text-background w-full">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
