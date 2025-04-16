import { useEffect } from 'react';
import { Code, BookOpen } from 'lucide-react';
const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, {
      threshold: 0.1
    });
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);
  return <section id="about" className="py-24 px-4 retro-container">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-display mb-12 flex items-center animate-on-scroll">
          <span className="text-retro-orange font-mono mr-2">01.</span>
          <span className="retro-text-shadow">About Me</span>
          <span className="h-px bg-white/10 flex-grow ml-4"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 animate-on-scroll delay-100">
            <div className="mb-6 flex items-center">
              <div className="bg-retro-card p-2 mr-4">
                <BookOpen className="w-5 h-5 text-retro-orange" />
              </div>
              <h3 className="text-xl font-display text-retro-orange">My Background</h3>
            </div>
            
            <p className="text-retro-muted mb-6 pl-4 border-l border-retro-orange/20">
              Senior Software Engineer at a trading firm based in Bangalore, working on high-performance 
              trade systems and fintech solutions.
            </p>
            
            <div className="mb-6 flex items-center">
              <div className="bg-retro-card p-2 mr-4">
                <Code className="w-5 h-5 text-retro-orange" />
              </div>
              <h3 className="text-xl font-display text-retro-orange">My Expertise</h3>
            </div>
            
            <p className="text-retro-muted mb-4 pl-4 border-l border-retro-orange/20">
              I've worked across multiple domains from Web3 to e-commerce—and I'm currently focused on trade systems and fintech.
            </p>
            
            <p className="text-retro-muted mb-4 pl-4 border-l border-retro-orange/20">
              My main expertise lies in backend technologies like distributed systems, Redis, Kafka, AWS, Go, and real-time systems.
            </p>
            
            <p className="text-retro-muted mb-4 pl-4 border-l border-retro-orange/20">
              I'm passionate about building backend and cloud services that are efficient, reliable, and easy to maintain. 
              I believe in keeping things simple and scalable, no matter the complexity of the project.
            </p>
            
            <p className="text-retro-muted pl-4 border-l border-retro-orange/20">
              Always open to meeting new people and collaborating on exciting projects—feel free to connect if you'd like to chat!
            </p>
          </div>
          
          <div className="animate-on-scroll delay-200 relative">
            <div className="relative max-w-xs mx-auto">
              <div className="border-4 border-retro-orange p-2 bg-retro-bg relative z-10">
                <div className="overflow-hidden">
                  <img src="/images/profile.png" alt="Aditya Raj" className="w-full grayscale hover:grayscale-0 transition-all duration-500 mix-blend-luminosity hover:mix-blend-normal" />
                </div>
              </div>
              <div className="absolute inset-0 bg-retro-purple/20 -translate-x-4 translate-y-4 -z-10"></div>
              
              {/* Retro decorative elements */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 flex space-x-2 mt-4">
                <span className="inline-block w-6 h-1.5 bg-retro-orange"></span>
                <span className="inline-block w-2 h-1.5 bg-retro-purple"></span>
                <span className="inline-block w-4 h-1.5 bg-retro-yellow"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;