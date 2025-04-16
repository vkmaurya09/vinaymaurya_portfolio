import { useEffect, useState } from 'react';
import { Cpu, Database, Code, Cloud, Network, Server, ChevronRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

type Skill = {
  name: string;
  icon: JSX.Element;
  level: number;
  colorClass: string;
  category: 'backend' | 'cloud' | 'languages' | 'databases';
};

const skills: Skill[] = [
  { 
    name: "Go",
    icon: <Code className="w-4 h-4" />, 
    level: 90, 
    colorClass: "bg-retro-orange", 
    category: 'languages'
  },
  { 
    name: "AWS", 
    icon: <Cloud className="w-4 h-4" />, 
    level: 85, 
    colorClass: "bg-retro-yellow", 
    category: 'cloud'
  },
  { 
    name: "Apache Kafka", 
    icon: <Network className="w-4 h-4" />, 
    level: 80, 
    colorClass: "bg-retro-purple", 
    category: 'backend'
  },
  { 
    name: "Node.js", 
    icon: <Server className="w-4 h-4" />, 
    level: 75, 
    colorClass: "bg-retro-green", 
    category: 'backend'
  },
  { 
    name: "TypeScript", 
    icon: <Code className="w-4 h-4" />, 
    level: 70, 
    colorClass: "bg-retro-blue", 
    category: 'languages'
  },
  { 
    name: "Redis", 
    icon: <Database className="w-4 h-4" />, 
    level: 85, 
    colorClass: "bg-retro-orange", 
    category: 'databases'
  },
  { 
    name: "Django", 
    icon: <Cpu className="w-4 h-4" />, 
    level: 65, 
    colorClass: "bg-retro-green", 
    category: 'backend'
  }
];

type FocusArea = {
  title: string;
  icon: JSX.Element;
  color: string;
  description: string;
};

const focusAreas: FocusArea[] = [
  {
    title: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    color: "text-retro-orange bg-retro-orange/20",
    description: "Building robust and scalable server-side applications and APIs."
  },
  {
    title: "Cloud Infrastructure",
    icon: <Cloud className="w-6 h-6" />,
    color: "text-retro-yellow bg-retro-yellow/20",
    description: "Designing and implementing cloud-native solutions on AWS."
  },
  {
    title: "Distributed Systems",
    icon: <Network className="w-6 h-6" />,
    color: "text-retro-purple bg-retro-purple/20",
    description: "Creating high-performance, fault-tolerant distributed applications."
  },
  {
    title: "Real-time Processing",
    icon: <Cpu className="w-6 h-6" />,
    color: "text-retro-green bg-retro-green/20",
    description: "Building systems for real-time data processing and analytics."
  },
  {
    title: "Microservices",
    icon: <Server className="w-6 h-6" />,
    color: "text-retro-blue bg-retro-blue/20",
    description: "Architecting and developing microservice-based applications."
  },
  {
    title: "Database Systems",
    icon: <Database className="w-6 h-6" />,
    color: "text-retro-orange bg-retro-orange/20",
    description: "Working with SQL, NoSQL, and in-memory databases."
  }
];

const SkillBar = ({ skill, animate = false }: { skill: Skill; animate?: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        setProgressValue(skill.level);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setProgressValue(skill.level);
    }
  }, [skill.level, animate]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    // Find the element to observe
    const currentElement = document.getElementById(`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`);
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [skill.name]);

  return (
    <div 
      id={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
      className={cn(
        "mb-6 transition-all duration-500",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="flex justify-between mb-2 items-center">
        <div className="flex items-center font-mono text-sm">
          <div className={`p-1.5 rounded-sm mr-2 text-white ${skill.colorClass}`}>
            {skill.icon}
          </div>
          <span className="font-medium">{skill.name}</span>
        </div>
        <span className={`font-mono text-sm ${skill.colorClass.replace('bg-', 'text-')}`}>
          {progressValue}%
        </span>
      </div>
      <div className="relative">
        <Progress
          value={progressValue}
          className="h-3"
          colorClass={skill.colorClass}
        />
      </div>
    </div>
  );
};

const SkillsCategory = ({ category, skills }: { category: string; skills: Skill[] }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-display mb-8 text-retro-orange retro-text-shadow">
        {category}
      </h3>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <SkillBar key={`${category}-${index}`} skill={skill} animate={true} />
        ))}
      </div>
    </div>
  );
};

const FocusAreaCard = ({ area, index }: { area: FocusArea; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible
      className={cn(
        "retro-card p-5 hover:border-retro-orange/50 transition-all duration-300 group",
        "md:hover:scale-105 md:transition-transform"
      )}
      open={isExpanded}
      onOpenChange={setIsExpanded}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className={`mb-4 h-10 w-10 flex items-center justify-center ${area.color} mr-3`}>
            {area.icon}
          </div>
          <div>
            <CollapsibleTrigger className="text-left" asChild>
              <h4 className="text-lg font-display flex items-center hover:text-retro-orange transition-colors cursor-pointer">
                {area.title}
                <ChevronRight 
                  className={cn(
                    "w-4 h-4 ml-2 transition-transform duration-200",
                    isExpanded ? "rotate-90" : ""
                  )} 
                />
              </h4>
            </CollapsibleTrigger>
            <p className="text-retro-muted text-sm mt-1 line-clamp-1">{area.description}</p>
          </div>
        </div>
      </div>
      <CollapsibleContent className="mt-2 space-y-2">
        <p className="text-retro-muted text-sm">{area.description}</p>
        <div className="mt-2 pt-2 border-t border-white/10">
          <span className="text-xs text-retro-orange font-mono">Related skills:</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills
              .filter((_, skillIndex) => skillIndex % (index + 2) === 0) // Just for demo - showing random related skills
              .slice(0, 3)
              .map((skill, i) => (
                <span 
                  key={i} 
                  className="text-xs px-2 py-1 bg-retro-card border border-white/10 rounded-sm"
                >
                  {skill.name}
                </span>
              ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const Skills = () => {
  const [selectedView, setSelectedView] = useState<"detailed" | "compact">("detailed");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const filteredSkills = selectedCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);
  
  const categories = [
    { value: "all", label: "All Skills" },
    { value: "backend", label: "Backend" },
    { value: "cloud", label: "Cloud" },
    { value: "languages", label: "Languages" },
    { value: "databases", label: "Databases" }
  ];

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

        <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between animate-on-scroll">
          <ToggleGroup 
            type="single" 
            value={selectedCategory} 
            onValueChange={(value) => {
              if (value) setSelectedCategory(value);
            }}
            className="justify-start"
          >
            {categories.map((category) => (
              <ToggleGroupItem 
                key={category.value} 
                value={category.value}
                aria-label={category.label}
                className="data-[state=on]:text-white data-[state=on]:border-retro-orange data-[state=on]:bg-retro-orange/30"
              >
                <span className="text-xs">{category.label}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <span>View:</span>
            <button
              onClick={() => setSelectedView("detailed")}
              className={`px-2 py-1 ${
                selectedView === "detailed" ? "bg-retro-orange/20 text-retro-orange" : "text-retro-muted"
              }`}
            >
              Detailed
            </button>
            <button
              onClick={() => setSelectedView("compact")}
              className={`px-2 py-1 ${
                selectedView === "compact" ? "bg-retro-orange/20 text-retro-orange" : "text-retro-muted"
              }`}
            >
              Compact
            </button>
          </div>
        </div>

        <Tabs defaultValue="skills" className="animate-on-scroll">
          <TabsList className="bg-retro-card border border-white/10 w-full justify-start mb-6">
            <TabsTrigger 
              value="skills"
              className="data-[state=active]:bg-retro-orange/20 data-[state=active]:text-retro-orange"
            >
              Technical Skills
            </TabsTrigger>
            <TabsTrigger 
              value="focus"
              className="data-[state=active]:bg-retro-orange/20 data-[state=active]:text-retro-orange"
            >
              Areas of Focus
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="skills" className="border-none p-0">
            {selectedView === "detailed" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div className="animate-on-scroll">
                  {filteredSkills.slice(0, Math.ceil(filteredSkills.length / 2)).map((skill, index) => (
                    <SkillBar key={`left-${index}`} skill={skill} animate={true} />
                  ))}
                </div>
                <div className="animate-on-scroll">
                  {filteredSkills.slice(Math.ceil(filteredSkills.length / 2)).map((skill, index) => (
                    <SkillBar key={`right-${index}`} skill={skill} animate={true} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredSkills.map((skill, index) => (
                  <div 
                    key={`compact-${index}`}
                    className="retro-card p-3 flex items-center justify-between animate-on-scroll"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center">
                      <div className={`p-1.5 rounded-sm mr-2 text-white ${skill.colorClass}`}>
                        {skill.icon}
                      </div>
                      <span className="font-mono text-sm">{skill.name}</span>
                    </div>
                    <span className={`font-mono text-sm ${skill.colorClass.replace('bg-', 'text-')}`}>
                      {skill.level}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="focus" className="border-none p-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {focusAreas.map((area, index) => (
                <FocusAreaCard key={index} area={area} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;
