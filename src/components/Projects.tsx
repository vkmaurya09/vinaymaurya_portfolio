import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

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
    <section id="projects" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 flex items-center animate-on-scroll">
          <span className="text-code font-mono mr-2">04.</span>
          <span>Projects</span>
          <span className="h-px bg-muted flex-grow ml-4"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="glass-card rounded-lg overflow-hidden group animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-background/50 backdrop-blur-sm rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-code hover:underline flex items-center">
                        <GitHubIcon className="w-4 h-4 mr-1" />
                        <span>Code</span>
                      </a>
                    )}
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-code hover:underline flex items-center">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <a 
            href="https://github.com/aditya201551" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-code text-code rounded-md hover:bg-code/10 transition-colors duration-300"
          >
            <GitHubIcon className="w-5 h-5 inline mr-2" />
            View My GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
