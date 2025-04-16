
import { useEffect } from 'react';
import { BookOpen, Code } from 'lucide-react';

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
    <section id="about" className="saas-section bg-saas-bgLight">
      <div className="saas-container">
        <h2 className="mb-12 animate-on-scroll text-center">
          <span className="text-saas-primary font-medium">01.</span>
          <span className="font-semibold ml-2">About Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 animate-on-scroll delay-100">
            <div className="mb-6 flex items-center">
              <div className="bg-saas-primary/10 p-2 mr-4 rounded-md">
                <BookOpen className="w-5 h-5 text-saas-primary" />
              </div>
              <h3 className="text-xl font-semibold text-saas-dark">My Background</h3>
            </div>
            
            <p className="text-saas-muted mb-6">
              Senior Software Engineer at a trading firm based in Bangalore, working on high-performance 
              trade systems and fintech solutions.
            </p>
            
            <div className="mb-6 flex items-center">
              <div className="bg-saas-primary/10 p-2 mr-4 rounded-md">
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
          </div>
          
          <div className="animate-on-scroll delay-200 relative">
            <div className="relative max-w-xs mx-auto">
              <div className="bg-white shadow-saas-md rounded-lg p-2 relative z-10">
                <div className="overflow-hidden rounded-md">
                  <img 
                    src="/images/profile.png"
                    alt="Aditya Raj" 
                    className="w-full transition-all duration-500"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-saas-primary/20 translate-x-4 translate-y-4 rounded-lg -z-10"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4">
                <span className="inline-block w-24 h-1 bg-saas-primary rounded-full"></span>
                <span className="inline-block w-6 h-1 bg-saas-secondary rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
