
import { useEffect } from 'react';
import { BookOpen, Code } from 'lucide-react';
import { Button } from "@/components/ui/button";

const About = () => {
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
    <section id="about" className="saas-section bg-white relative">
      {/* Decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>
      
      <div className="saas-container relative z-10">
        <h2 className="mb-12 animate-on-scroll text-center">
          <span className="text-saas-primary font-medium">01.</span>
          <span className="font-semibold ml-2 relative inline-block">
            About Me
            <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-saas-primary"></span>
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 animate-on-scroll delay-100">
            <div className="mb-6 flex items-center">
              <div className="bg-saas-primary/10 p-2 mr-4 rounded-none border-l-2 border-saas-primary">
                <BookOpen className="w-5 h-5 text-saas-primary" />
              </div>
              <h3 className="text-xl font-semibold text-saas-dark">My Background</h3>
            </div>
            
            <p className="text-saas-muted mb-6">
              Senior Software Engineer at a trading firm based in Bangalore, working on high-performance 
              trade systems and fintech solutions.
            </p>
            
            <div className="mb-6 flex items-center">
              <div className="bg-saas-primary/10 p-2 mr-4 rounded-none border-l-2 border-saas-primary">
                <Code className="w-5 h-5 text-saas-primary" />
              </div>
              <h3 className="text-xl font-semibold text-saas-dark">My Expertise</h3>
            </div>
            
            <p className="text-saas-muted mb-4">
              I've worked across multiple domains from Web3 to e-commerce—and I'm currently focused on trade systems and fintech.
            </p>
            
            <p className="text-saas-muted mb-4">
              My main expertise lies in backend technologies like distributed systems, Redis, Kafka, AWS, Go, and real-time systems.
            </p>
            
            <p className="text-saas-muted mb-4">
              I'm passionate about building backend and cloud services that are efficient, reliable, and easy to maintain. 
              I believe in keeping things simple and scalable, no matter the complexity of the project.
            </p>
            
            <p className="text-saas-muted">
              Always open to meeting new people and collaborating on exciting projects—feel free to connect if you'd like to chat!
            </p>
            
            <div className="mt-8">
              <Button variant="edgy" size="edgy-md" className="btn-noise">
                View Resume
              </Button>
            </div>
          </div>
          
          <div className="animate-on-scroll delay-200 relative">
            <div className="relative max-w-xs mx-auto">
              <div className="card-edgy bg-white shadow-saas p-2 relative z-10">
                <div className="overflow-hidden">
                  <img 
                    src="/images/profile.png"
                    alt="Aditya Raj" 
                    className="w-full transition-all duration-500"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-saas-primary z-0"></div>
              
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 flex space-x-2 mt-6">
                <span className="inline-block w-8 h-1 bg-saas-primary"></span>
                <span className="inline-block w-16 h-1 bg-saas-dark"></span>
                <span className="inline-block w-8 h-1 bg-saas-accent"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
