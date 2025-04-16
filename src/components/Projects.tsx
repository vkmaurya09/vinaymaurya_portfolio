
import { useEffect } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from "@/components/ui/button";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string;
  technologies: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "FIA (FYERS Intelligent Assistant)",
    description:
      "A smart assistant that helps you generate screeners on demand!",
    image: "/lovable-uploads/fia.png",
    link: "https://app.fyers.in/discover/screeners/fia",
    technologies: ["Go", "LLM", "AI", "AWS"],
  },
  {
    id: 2,
    title: "Funds Module",
    description:
      "A module that enables users to add and withdraw funds from their trading wallet across both app and web platforms.",
    image: "/lovable-uploads/funds-module.png",
    link: "https://app.fyers.in/funds",
    technologies: ["Go", "AWS", "Kafka", "Redis"],
  },
];

const Projects = () => {
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
    <section id="projects" className="saas-section bg-saas-bgLight">
      <div className="saas-container">
        <h2 className="mb-3 animate-on-scroll text-center">
          <span className="text-saas-primary font-medium">04.</span>
          <span className="font-semibold ml-2">Projects</span>
        </h2>
        
        <p className="text-saas-muted text-center max-w-2xl mx-auto mb-12">
          A showcase of my recent work and projects I've built for companies and personal exploration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="animate-on-scroll bg-white rounded-lg shadow-saas overflow-hidden hover:shadow-saas-md transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h4 className="font-semibold">{project.title}</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs bg-white/20 px-2 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-saas-dark">{project.title}</h3>
                <p className="text-saas-muted mb-6">{project.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" 
                        className="text-saas-muted hover:text-saas-dark transition-colors flex items-center text-sm">
                        <Github className="w-4 h-4 mr-1" />
                        <span>Source</span>
                      </a>
                    )}
                    <a href={project.link} target="_blank" rel="noopener noreferrer" 
                      className="text-saas-primary hover:text-saas-primary/80 transition-colors flex items-center text-sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <a 
            href="https://github.com/aditya201551" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="border-saas-primary text-saas-primary hover:bg-saas-primary/10 rounded-md">
              <Github className="w-5 h-5 mr-2" />
              <span>View All Projects</span>
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
