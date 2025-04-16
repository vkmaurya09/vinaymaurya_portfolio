
import { useEffect, useRef } from 'react';
import { Cpu, Database, Code, Cloud, Network, Server } from 'lucide-react';

type Skill = {
  name: string;
  icon: JSX.Element;
  level: number;
  colorClass: string;
};

const skills: Skill[] = [
  { 
    name: "Go (Programming Language)", 
    icon: <Code className="w-4 h-4" />, 
    level: 90, 
    colorClass: "bg-retro-orange" 
  },
  { 
    name: "AWS", 
    icon: <Cloud className="w-4 h-4" />, 
    level: 85, 
    colorClass: "bg-retro-yellow" 
  },
  { 
    name: "Apache Kafka", 
    icon: <Network className="w-4 h-4" />, 
    level: 80, 
    colorClass: "bg-retro-purple" 
  },
  { 
    name: "Node.js", 
    icon: <Server className="w-4 h-4" />, 
    level: 75, 
    colorClass: "bg-retro-green" 
  },
  { 
    name: "TypeScript", 
    icon: <Code className="w-4 h-4" />, 
    level: 70, 
    colorClass: "bg-retro-blue" 
  },
  { 
    name: "Redis", 
    icon: <Database className="w-4 h-4" />, 
    level: 85, 
    colorClass: "bg-retro-orange" 
  },
  { 
    name: "Django", 
    icon: <Cpu className="w-4 h-4" />, 
    level: 65, 
    colorClass: "bg-retro-green" 
  }
];

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <div className="mb-8 animate-on-scroll skill-item" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex justify-between mb-2">
        <div className="flex items-center font-mono text-sm">
          <div className="bg-retro-card p-1.5 mr-2 text-white skill-icon-container">
            {skill.icon}
          </div>
          <span className="skill-name">{skill.name}</span>
        </div>
        <span className="text-retro-orange font-mono text-sm skill-percentage">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div 
          className={`${skill.colorClass} h-full skill-bar-fill shimmer`}
          style={{ 
            width: "0%", 
            '--fill-percent': `${skill.level}%` 
          } as React.CSSProperties}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // Enhanced animation on scroll with more refined approach
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Apply different animations based on element class
          if (element.classList.contains('skill-item')) {
            element.classList.add('animate-fade-in');
            
            // Find and animate the skill bar fill inside this item
            const fillBar = element.querySelector('.skill-bar-fill');
            if (fillBar) {
              setTimeout(() => {
                fillBar.classList.add('animate-fill-bar');
              }, 300);
            }
          } else if (element.classList.contains('focus-area')) {
            // Add entrance animation with staggered delay
            const index = parseInt(element.getAttribute('data-index') || '0');
            setTimeout(() => {
              element.classList.add('animate-scale-in');
            }, index * 100);
          } else {
            // Default animation for other elements
            element.classList.add('animate-fade-in');
          }
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      // Observe section headings
      sectionRef.current.querySelectorAll('h2, h3').forEach(el => {
        observer.observe(el);
      });
      
      // Observe skill items
      sectionRef.current.querySelectorAll('.skill-item').forEach(el => {
        observer.observe(el);
      });
      
      // Observe focus areas
      sectionRef.current.querySelectorAll('.focus-area').forEach(el => {
        observer.observe(el);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-4 retro-container">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-display mb-12 flex items-center">
          <span className="text-retro-orange font-mono mr-2 glitch-number">03.</span>
          <span className="retro-text-shadow glitch-text" data-text="Skills">Skills</span>
          <span className="h-px bg-white/10 flex-grow ml-4 scan-line-animation"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <h3 className="text-xl font-display mb-8 text-retro-orange retro-text-shadow retro-glow">Technical Skills</h3>
            {skills.slice(0, 4).map((skill, index) => (
              <SkillBar key={index} skill={skill} index={index} />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-display mb-8 text-retro-orange retro-text-shadow retro-glow">Additional Expertise</h3>
            {skills.slice(4).map((skill, index) => (
              <SkillBar key={index + 4} skill={skill} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-display mb-8 text-retro-orange retro-text-shadow retro-glow">Areas of Focus</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                icon: <Server className="w-6 h-6" />,
                title: "Backend Development",
                description: "Building robust and scalable server-side applications and APIs.",
                color: "retro-orange"
              },
              {
                icon: <Cloud className="w-6 h-6" />,
                title: "Cloud Infrastructure",
                description: "Designing and implementing cloud-native solutions on AWS.",
                color: "retro-yellow"
              },
              {
                icon: <Network className="w-6 h-6" />,
                title: "Distributed Systems",
                description: "Creating high-performance, fault-tolerant distributed applications.",
                color: "retro-purple"
              },
              {
                icon: <Cpu className="w-6 h-6" />,
                title: "Real-time Processing",
                description: "Building systems for real-time data processing and analytics.",
                color: "retro-green"
              },
              {
                icon: <Server className="w-6 h-6" />,
                title: "Microservices",
                description: "Architecting and developing microservice-based applications.",
                color: "retro-blue"
              },
              {
                icon: <Database className="w-6 h-6" />,
                title: "Database Systems",
                description: "Working with SQL, NoSQL, and in-memory databases.",
                color: "retro-orange"
              }
            ].map((area, index) => (
              <div 
                key={index}
                data-index={index}
                className={`focus-area retro-card p-5 hover:border-${area.color}/50 transition-all duration-300 group hover-card-effect`}
              >
                <div className={`mb-4 h-10 w-10 flex items-center justify-center bg-${area.color}/20 text-${area.color} icon-pulse`}>
                  {area.icon}
                </div>
                <h4 className="text-lg font-display mb-2">{area.title}</h4>
                <p className="text-retro-muted text-sm scan-line-text">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
