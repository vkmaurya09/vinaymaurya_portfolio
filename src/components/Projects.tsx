
import { useEffect } from 'react';
import { ExternalLink, GitHub } from 'lucide-react';

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
    title: "Funds Module",
    description: "A module that enables users to add and withdraw funds from their trading wallet across both app and web platforms.",
    image: "/lovable-uploads/7610f744-6eda-455b-8d59-a7d84bd01f0f.png",
    link: "#",
    technologies: ["Go", "AWS", "Kafka", "PostgreSQL"]
  },
  {
    id: 2,
    title: "Olive Garden",
    description: "A restaurant website with Django backend, featuring ordering system and responsive design.",
    image: "/lovable-uploads/0749b044-3c54-445e-ab26-ca3118500835.png",
    link: "#",
    github: "https://github.com",
    technologies: ["Django", "Python", "HTML/CSS", "JavaScript"]
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Comprehensive dashboard displaying content stats from multiple social media platforms with real-time updates.",
    image: "/lovable-uploads/9c75e9c4-024e-4b09-9efa-0a5445d1a333.png", 
    link: "#",
    technologies: ["Node.js", "AWS Lambda", "React", "Redux"]
  },
  {
    id: 4,
    title: "Koolpeace: Korean Metaverse",
    description: "Backend infrastructure for a crypto payment app using Django and GraphQL technologies with JWT authentication.",
    image: "/lovable-uploads/6693e3eb-b522-432e-92b3-856477fcfac6.png",
    link: "#",
    technologies: ["Django", "GraphQL", "JWT", "AWS"]
  }
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
                        <GitHub className="w-4 h-4 mr-1" />
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
            href="https://github.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-code text-code rounded-md hover:bg-code/10 transition-colors duration-300"
          >
            <GitHub className="w-5 h-5 inline mr-2" />
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
