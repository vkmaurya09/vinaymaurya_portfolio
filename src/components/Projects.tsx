import React, { useEffect, useRef } from "react";
import { ExternalLink, Code as CodeIcon, Monitor, Zap, Package } from 'lucide-react';
import { getImagePath } from "@/lib/utils";

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

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string;
  technologies: string[];
  fileType?: string; // Add file type to customize the label
};

const projects: Project[] = [
  {
    id: 1,
    title: "FYERS API v3 Python SDK",
    description:
      "Created FYERS API v3 and Python SDK with 50ms order execution, rapid tick data via enhanced Data Sockets, dedicated WebSockets for market depth, and broader symbol subscription. The SDK has 100,000+ downloads and handles 40,000+ daily order requests.",
    image: getImagePath("/images/python_sdk.png"),
    link: "https://pypi.org/project/fyers-apiv3/",
    technologies: ["Python", "WebSockets", "API Development", "Microservices", "Real-time Data"],
    fileType: "py"
  },
  {
    id: 2,
    title: "gRPC User Service",
    description:
      "Scalable gRPC service for user management with search and unit tests.",
    image: getImagePath("/images/grpc.png"),
    link: "https://github.com/vkmaurya09/grpc-user-service",
    github: "https://github.com/vkmaurya09/grpc-user-service",
    technologies: ["Golang", "gRPC", "Docker", "Protobuf"],
    fileType: "go"
  },
  {
    id: 3,
    title: "Smart Trading Systems @ FYERS",
    description:
      "Comprehensive backend system for Smart Trading features including Smart Limit, Smart Trail, and Equity SIP. Developed real-time order processing systems, automated investment scheduling for ETFs, REITs, and equities, and integration with market data feeds for precision execution.",
    image: getImagePath("/images/smart_order.png"),
    link: "https://fyers.in/community/announcements-syobm28p/post/smart-orders-changing-the-way-you-trade-HCgB02gxcv6RFjK",
    technologies: ["Golang", "Gin", "Kafka", "Redis", "PostgreSQL", "WebSockets", "AWS"],
    fileType: "go"
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

  // Function to get the appropriate icon based on file type
  const getFileIcon = (fileType: string = 'go') => {
    switch(fileType) {
      case 'py':
        return <Package className="w-3 h-3 mr-1 text-retro-blue" />;
      default:
        return <CodeIcon className="w-3 h-3 mr-1 text-retro-orange" />;
    }
  };

  return (
    <section id="projects" className="py-24 px-4 bg-gradient-to-b from-retro-bg to-retro-bg/90 retro-container">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-display mb-12 flex items-center animate-on-scroll">
          <span className="text-retro-orange font-mono mr-2">04.</span>
          <span className="retro-text-shadow">Projects</span>
          <span className="h-px bg-white/10 flex-grow ml-4"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="retro-card animate-on-scroll border-2 border-white/5 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-56">
                {/* File label moved from absolute to fixed position at top right */}
                <div className="absolute right-0 top-0 z-10 bg-retro-card py-1 px-2 text-xs font-mono flex items-center border-l border-b border-white/10">
                  {getFileIcon(project.fileType)}
                  <span>project_{index + 1}.{project.fileType || 'go'}</span>
                </div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
                />
              </div>
              <div className="p-6 bg-retro-card">
                <h3 className="font-display text-xl mb-1 text-retro-orange">{project.title}</h3>
                
                <div className="flex flex-wrap gap-2 mt-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} 
                      className="px-2 py-1 bg-white/5 border border-white/10 font-mono text-xs text-retro-muted">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <p className="text-retro-muted mb-6 text-sm">{project.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex space-x-4">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" 
                        className="text-retro-muted hover:text-retro-orange transition-colors flex items-center font-mono text-xs">
                        <GitHubIcon className="w-4 h-4 mr-1" />
                        <span>SOURCE</span>
                      </a>
                    )}
                    <a href={project.link} target="_blank" rel="noopener noreferrer" 
                      className="text-retro-muted hover:text-retro-orange transition-colors flex items-center font-mono text-xs">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <span>{project.id === 1 ? 'PYPI PACKAGE' : 'LIVE DEMO'}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <a 
            href="https://github.com/vkmaurya09" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-retro-card border border-retro-orange text-retro-orange font-mono hover:bg-retro-orange/10 transition-colors"
          >
            <GitHubIcon className="w-5 h-5 mr-2" />
            <span>VIEW_ALL_PROJECTS</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
