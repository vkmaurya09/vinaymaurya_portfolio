
import { useEffect } from 'react';
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

const SkillBar = ({ skill }: { skill: Skill }) => {
  return (
    <div className="mb-8 animate-on-scroll">
      <div className="flex justify-between mb-2">
        <div className="flex items-center font-mono text-sm">
          <div className="bg-retro-card p-1.5 mr-2 text-white">
            {skill.icon}
          </div>
          <span>{skill.name}</span>
        </div>
        <span className="text-retro-orange font-mono text-sm">{skill.level}%</span>
      </div>
      <div className="skill-bar">
        <div 
          className={`${skill.colorClass} h-full shimmer`}
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  useEffect(() => {
    // Animation on scroll
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
    <section id="skills" className="py-24 px-4 retro-container">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-display mb-12 flex items-center animate-on-scroll">
          <span className="text-retro-orange font-mono mr-2">03.</span>
          <span className="retro-text-shadow">Skills</span>
          <span className="h-px bg-white/10 flex-grow ml-4"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <h3 className="text-xl font-display mb-8 text-retro-orange retro-text-shadow animate-on-scroll">Technical Skills</h3>
            {skills.slice(0, 4).map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-display mb-8 text-retro-orange retro-text-shadow animate-on-scroll">Additional Expertise</h3>
            {skills.slice(4).map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
        </div>

        <div className="mt-16 animate-on-scroll">
          <h3 className="text-xl font-display mb-8 text-retro-orange retro-text-shadow">Areas of Focus</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            <div className="retro-card p-5 hover:border-retro-orange/50 transition-colors group">
              <div className="mb-4 h-10 w-10 flex items-center justify-center bg-retro-orange/20 text-retro-orange">
                <Server className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-display mb-2">Backend Development</h4>
              <p className="text-retro-muted text-sm">Building robust and scalable server-side applications and APIs.</p>
            </div>
            
            <div className="retro-card p-5 hover:border-retro-orange/50 transition-colors group">
              <div className="mb-4 h-10 w-10 flex items-center justify-center bg-retro-yellow/20 text-retro-yellow">
                <Cloud className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-display mb-2">Cloud Infrastructure</h4>
              <p className="text-retro-muted text-sm">Designing and implementing cloud-native solutions on AWS.</p>
            </div>
            
            <div className="retro-card p-5 hover:border-retro-orange/50 transition-colors group">
              <div className="mb-4 h-10 w-10 flex items-center justify-center bg-retro-purple/20 text-retro-purple">
                <Network className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-display mb-2">Distributed Systems</h4>
              <p className="text-retro-muted text-sm">Creating high-performance, fault-tolerant distributed applications.</p>
            </div>
            
            <div className="retro-card p-5 hover:border-retro-orange/50 transition-colors group">
              <div className="mb-4 h-10 w-10 flex items-center justify-center bg-retro-green/20 text-retro-green">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-display mb-2">Real-time Processing</h4>
              <p className="text-retro-muted text-sm">Building systems for real-time data processing and analytics.</p>
            </div>
            
            <div className="retro-card p-5 hover:border-retro-orange/50 transition-colors group">
              <div className="mb-4 h-10 w-10 flex items-center justify-center bg-retro-blue/20 text-retro-blue">
                <Server className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-display mb-2">Microservices</h4>
              <p className="text-retro-muted text-sm">Architecting and developing microservice-based applications.</p>
            </div>
            
            <div className="retro-card p-5 hover:border-retro-orange/50 transition-colors group">
              <div className="mb-4 h-10 w-10 flex items-center justify-center bg-retro-orange/20 text-retro-orange">
                <Database className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-display mb-2">Database Systems</h4>
              <p className="text-retro-muted text-sm">Working with SQL, NoSQL, and in-memory databases.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
