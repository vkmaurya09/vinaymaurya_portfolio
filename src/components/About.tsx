
import { useEffect } from 'react';

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
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 flex items-center animate-on-scroll">
          <span className="text-code font-mono mr-2">01.</span>
          <span>About Me</span>
          <span className="h-px bg-muted flex-grow ml-4"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 animate-on-scroll delay-100">
            <p className="text-lg mb-4">
              Senior Software Engineer at a trading firm based in Bangalore, working on high-performance trade systems and fintech solutions.
            </p>
            <p className="text-lg mb-4">
              I've worked across multiple domains from Web3 to e-commerce—and I'm currently focused on trade systems and fintech.
            </p>
            <p className="text-lg mb-4">
              My main expertise lies in backend technologies like distributed systems, Redis, Kafka, AWS, Go, and real-time systems.
            </p>
            <p className="text-lg mb-4">
              I'm passionate about building backend and cloud services that are efficient, reliable, and easy to maintain. 
              I believe in keeping things simple and scalable, no matter the complexity of the project.
            </p>
            <p className="text-lg">
              Always open to meeting new people and collaborating on exciting projects—feel free to connect if you'd like to chat!
            </p>
          </div>
          
          <div className="animate-on-scroll delay-200">
            <div className="relative w-64 h-64 mx-auto">
              <div className="absolute inset-0 rounded-full bg-blue-500/20"></div>
              <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-code">
                <img 
                  src="public/lovable-uploads/700a3e7c-9437-4a35-a51a-883789b8f262.png"
                  alt="Aditya Raj" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
