
import { useEffect } from 'react';

type Skill = {
  name: string;
  icon: string;
  level: number;
  colorClass: string;
};

const skills: Skill[] = [
  { 
    name: "Go (Programming Language)", 
    icon: "🔹", 
    level: 90, 
    colorClass: "bg-skillbar-go" 
  },
  { 
    name: "AWS", 
    icon: "☁️", 
    level: 85, 
    colorClass: "bg-skillbar-aws" 
  },
  { 
    name: "Apache Kafka", 
    icon: "📊", 
    level: 80, 
    colorClass: "bg-skillbar-kafka" 
  },
  { 
    name: "Node.js", 
    icon: "🟢", 
    level: 75, 
    colorClass: "bg-skillbar-nodejs" 
  },
  { 
    name: "TypeScript", 
    icon: "🔷", 
    level: 70, 
    colorClass: "bg-skillbar-typescript" 
  },
  { 
    name: "Redis", 
    icon: "🔴", 
    level: 85, 
    colorClass: "bg-skillbar-redis" 
  },
  { 
    name: "Django", 
    icon: "🐍", 
    level: 65, 
    colorClass: "bg-skillbar-django" 
  }
];

const SkillBar = ({ skill }: { skill: Skill }) => {
  return (
    <div className="mb-6 animate-on-scroll">
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <span className="mr-2">{skill.icon}</span>
          <span>{skill.name}</span>
        </div>
        <span className="text-code">{skill.level}%</span>
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
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 flex items-center animate-on-scroll">
          <span className="text-code font-mono mr-2">03.</span>
          <span>Skills</span>
          <span className="h-px bg-muted flex-grow ml-4"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-6 text-code animate-on-scroll">Technical Skills</h3>
            {skills.slice(0, 4).map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-6 text-code animate-on-scroll">Additional Expertise</h3>
            {skills.slice(4).map((skill, index) => (
              <SkillBar key={index} skill={skill} />
            ))}
          </div>
        </div>

        <div className="mt-12 animate-on-scroll">
          <h3 className="text-xl font-semibold mb-6 text-code">Areas of Focus</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="glass-card p-5 rounded-lg hover:border-code/50 transition-colors">
              <h4 className="text-lg font-medium mb-2">Backend Development</h4>
              <p className="text-muted-foreground">Building robust and scalable server-side applications and APIs.</p>
            </div>
            
            <div className="glass-card p-5 rounded-lg hover:border-code/50 transition-colors">
              <h4 className="text-lg font-medium mb-2">Cloud Infrastructure</h4>
              <p className="text-muted-foreground">Designing and implementing cloud-native solutions on AWS.</p>
            </div>
            
            <div className="glass-card p-5 rounded-lg hover:border-code/50 transition-colors">
              <h4 className="text-lg font-medium mb-2">Distributed Systems</h4>
              <p className="text-muted-foreground">Creating high-performance, fault-tolerant distributed applications.</p>
            </div>
            
            <div className="glass-card p-5 rounded-lg hover:border-code/50 transition-colors">
              <h4 className="text-lg font-medium mb-2">Real-time Processing</h4>
              <p className="text-muted-foreground">Building systems for real-time data processing and analytics.</p>
            </div>
            
            <div className="glass-card p-5 rounded-lg hover:border-code/50 transition-colors">
              <h4 className="text-lg font-medium mb-2">Microservices</h4>
              <p className="text-muted-foreground">Architecting and developing microservice-based applications.</p>
            </div>
            
            <div className="glass-card p-5 rounded-lg hover:border-code/50 transition-colors">
              <h4 className="text-lg font-medium mb-2">Database Systems</h4>
              <p className="text-muted-foreground">Working with SQL, NoSQL, and in-memory databases.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
