import { useEffect, useState, useRef } from 'react';
import { Cpu, Database, Code, Cloud, Network, Server, ChevronRight, Grid2X2, List } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

type Skill = {
  name: string;
  icon: JSX.Element;
  level: SkillLevel;
  colorClass: string;
  category: 'backend' | 'cloud' | 'languages' | 'databases';
};

const getSkillLevelValue = (level: SkillLevel): number => {
  switch (level) {
    case 'beginner': return 25;
    case 'intermediate': return 50;
    case 'advanced': return 75;
    case 'expert': return 100;
    default: return 0;
  }
};

const skills: Skill[] = [
  { 
    name: "Go",
    icon: <Code className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-orange", 
    category: 'languages'
  },
  { 
    name: "AWS", 
    icon: <Cloud className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-yellow", 
    category: 'cloud'
  },
  { 
    name: "Apache Kafka", 
    icon: <Network className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-purple", 
    category: 'backend'
  },
  { 
    name: "Node.js", 
    icon: <Server className="w-4 h-4" />, 
    level: 'intermediate', 
    colorClass: "bg-retro-green", 
    category: 'backend'
  },
  { 
    name: "TypeScript", 
    icon: <Code className="w-4 h-4" />, 
    level: 'intermediate', 
    colorClass: "bg-retro-blue", 
    category: 'languages'
  },
  { 
    name: "Redis", 
    icon: <Database className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-orange", 
    category: 'databases'
  },
  { 
    name: "Django", 
    icon: <Cpu className="w-4 h-4" />, 
    level: 'intermediate', 
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

const SkillBar = ({ skill }: { skill: Skill }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
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
    
    const currentElement = elementRef.current;
    
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  // Convert level to percentage for dots calculation
  const levelValue = getSkillLevelValue(skill.level);
  const totalDots = 10;
  const activeDots = Math.floor(levelValue / 100 * totalDots);

  return (
    <div 
      ref={elementRef}
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
        <Badge variant="outline" className={`font-mono text-xs ${skill.colorClass.replace('bg-', 'border-')} ${skill.colorClass.replace('bg-', 'text-')}`}>
          {skill.level}
        </Badge>
      </div>
      <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
        {/* Progress dots/segments instead of a solid bar */}
        <div className="absolute inset-0 flex items-center justify-between px-1">
          {Array.from({ length: totalDots }).map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-2 w-2 rounded-full transition-all",
                i < activeDots ? skill.colorClass : "bg-white/10"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ skill }: { skill: Skill }) => {
  return (
    <div 
      className="retro-card p-3 flex flex-col gap-2 animate-on-scroll group hover:border-retro-orange/50 transition-all"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className={`p-1.5 rounded-sm mr-2 text-white ${skill.colorClass}`}>
            {skill.icon}
          </div>
          <span className="font-mono text-sm">{skill.name}</span>
        </div>
        <Badge variant="outline" className={`font-mono text-xs ${skill.colorClass.replace('bg-', 'border-')} ${skill.colorClass.replace('bg-', 'text-')}`}>
          {skill.level}
        </Badge>
      </div>
      
      {/* Skill level indicator dots */}
      <div className="flex items-center justify-center gap-1 mt-1">
        {Array.from({ length: 4 }).map((_, i) => {
          const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
          const isActive = levels.indexOf(skill.level) >= i;
          
          return (
            <div 
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all",
                isActive ? skill.colorClass : "bg-white/10",
                isActive && "animate-pulse"
              )}
            />
          );
        })}
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
  // Use separate state variables for clarity and to prevent unnecessary re-renders
  const [view, setView] = useState<"detailed" | "compact">("detailed");
  const [category, setCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"skills" | "focus">("skills");
  const sectionRef = useRef<HTMLElement>(null);
  
  // Filter skills based on selected category
  const filteredSkills = category === "all" 
    ? skills 
    : skills.filter(skill => skill.category === category);
  
  const categories = [
    { value: "all", label: "All Skills" },
    { value: "backend", label: "Backend" },
    { value: "cloud", label: "Cloud" },
    { value: "languages", label: "Languages" },
    { value: "databases", label: "Databases" }
  ];

  // Load user preferences on initial render only
  useEffect(() => {
    const savedView = localStorage.getItem('skillsView') as "detailed" | "compact" | null;
    const savedCategory = localStorage.getItem('skillsCategory');
    const savedTab = localStorage.getItem('skillsActiveTab') as "skills" | "focus" | null;
    
    if (savedView) setView(savedView === 'compact' ? 'compact' : 'detailed');
    if (savedCategory) setCategory(savedCategory);
    if (savedTab) setActiveTab(savedTab === 'focus' ? 'focus' : 'skills');
  }, []);

  // Save preferences individually to avoid unnecessary saves
  useEffect(() => { localStorage.setItem('skillsView', view); }, [view]);
  useEffect(() => { localStorage.setItem('skillsCategory', category); }, [category]);
  useEffect(() => { localStorage.setItem('skillsActiveTab', activeTab); }, [activeTab]);

  // Setup animation on scroll once
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (sectionRef.current) {
      const animatedElements = sectionRef.current.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach(el => {
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-4 retro-container">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-display mb-12 flex items-center animate-on-scroll">
          <span className="text-retro-orange font-mono mr-2">03.</span>
          <span className="retro-text-shadow">Skills</span>
          <span className="h-px bg-white/10 flex-grow ml-4"></span>
        </h2>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between animate-on-scroll">
          <ToggleGroup 
            type="single" 
            value={category} 
            onValueChange={(value) => {
              if (value) setCategory(value);
            }}
            className="justify-start"
          >
            {categories.map((cat) => (
              <ToggleGroupItem 
                key={cat.value} 
                value={cat.value}
                aria-label={cat.label}
                className="data-[state=on]:text-white data-[state=on]:border-retro-orange data-[state=on]:bg-retro-orange/30"
              >
                <span className="text-xs">{cat.label}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <div className="flex items-center space-x-2 font-mono text-xs">
            <span>View:</span>
            <button
              onClick={() => setView("detailed")}
              className={`px-2 py-1 flex items-center gap-1 rounded ${
                view === "detailed" ? "bg-retro-orange/20 text-retro-orange" : "text-retro-muted"
              }`}
            >
              <List className="w-3 h-3" />
              Detailed
            </button>
            <button
              onClick={() => setView("compact")}
              className={`px-2 py-1 flex items-center gap-1 rounded ${
                view === "compact" ? "bg-retro-orange/20 text-retro-orange" : "text-retro-muted"
              }`}
            >
              <Grid2X2 className="w-3 h-3" />
              Compact
            </button>
          </div>
        </div>

        <Tabs 
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "skills" | "focus")}
          className="animate-on-scroll"
        >
          <TabsList className="bg-retro-card border border-white/10 w-full justify-start mb-6">
            <TabsTrigger value="skills" className="data-[state=active]:bg-retro-orange/20 data-[state=active]:text-retro-orange">
              Technical Skills
            </TabsTrigger>
            <TabsTrigger value="focus" className="data-[state=active]:bg-retro-orange/20 data-[state=active]:text-retro-orange">
              Areas of Focus
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="skills" className="border-none p-0 mt-4">
            {view === "detailed" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <div>
                  {filteredSkills.slice(0, Math.ceil(filteredSkills.length / 2)).map((skill) => (
                    <SkillBar key={`left-${skill.name}`} skill={skill} />
                  ))}
                </div>
                <div>
                  {filteredSkills.slice(Math.ceil(filteredSkills.length / 2)).map((skill) => (
                    <SkillBar key={`right-${skill.name}`} skill={skill} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredSkills.map((skill) => (
                  <SkillCard 
                    key={`compact-${skill.name}`}
                    skill={skill}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="focus" className="border-none p-0 mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {focusAreas.map((area, index) => (
                <FocusAreaCard key={`area-${area.title}`} area={area} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;
