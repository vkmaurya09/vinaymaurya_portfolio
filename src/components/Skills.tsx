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
  category: 'backend' | 'cloud' | 'languages' | 'databases' | 'tools' | 'other';
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
  // Languages
  { 
    name: "Golang",
    icon: <Code className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-orange", 
    category: 'languages'
  },
  { 
    name: "Python",
    icon: <Code className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-blue", 
    category: 'languages'
  },
  
  // Frameworks & Libraries
  { 
    name: "Gin",
    icon: <Server className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-green", 
    category: 'backend'
  },
  { 
    name: "Django",
    icon: <Server className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-green", 
    category: 'backend'
  },
  { 
    name: "Gorilla Mux",
    icon: <Server className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-purple", 
    category: 'backend'
  },
  
  // Databases & Caches
  { 
    name: "MySQL",
    icon: <Database className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-blue", 
    category: 'databases'
  },
  { 
    name: "PostgreSQL",
    icon: <Database className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-blue", 
    category: 'databases'
  },
  { 
    name: "Redis",
    icon: <Database className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-red", 
    category: 'databases'
  },
  { 
    name: "ScyllaDB",
    icon: <Database className="w-4 h-4" />, 
    level: 'intermediate', 
    colorClass: "bg-retro-yellow", 
    category: 'databases'
  },
  { 
    name: "MongoDB",
    icon: <Database className="w-4 h-4" />, 
    level: 'intermediate', 
    colorClass: "bg-retro-green", 
    category: 'databases'
  },
  { 
    name: "ClickHouse",
    icon: <Database className="w-4 h-4" />, 
    level: 'intermediate', 
    colorClass: "bg-retro-yellow", 
    category: 'databases'
  },
  
  // Cloud Platforms & Services
  { 
    name: "AWS EC2", 
    icon: <Cloud className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-orange", 
    category: 'cloud'
  },
  { 
    name: "AWS Lambda", 
    icon: <Cloud className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-orange", 
    category: 'cloud'
  },
  { 
    name: "AWS S3", 
    icon: <Cloud className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-orange", 
    category: 'cloud'
  },
  { 
    name: "AWS RDS", 
    icon: <Cloud className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-orange", 
    category: 'cloud'
  },
  { 
    name: "AWS EFS", 
    icon: <Cloud className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-orange", 
    category: 'cloud'
  },
  
  // Tools & Technologies
  { 
    name: "Kafka", 
    icon: <Network className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-purple", 
    category: 'tools'
  },
  { 
    name: "Docker", 
    icon: <Server className="w-4 h-4" />, 
    level: 'intermediate', 
    colorClass: "bg-retro-blue", 
    category: 'tools'
  },
  { 
    name: "Cron Jobs", 
    icon: <Cpu className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-green", 
    category: 'tools'
  },
  { 
    name: "gRPC", 
    icon: <Network className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-blue", 
    category: 'tools'
  },
  { 
    name: "Protobuf", 
    icon: <Code className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-yellow", 
    category: 'tools'
  },
  { 
    name: "WebSockets", 
    icon: <Network className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-purple", 
    category: 'tools'
  },
  { 
    name: "OpenTelemetry", 
    icon: <Cpu className="w-4 h-4" />, 
    level: 'intermediate', 
    colorClass: "bg-retro-green", 
    category: 'tools'
  },
  { 
    name: "Vegeta (Load Testing)", 
    icon: <Server className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-green", 
    category: 'tools'
  },
  { 
    name: "K6 (Load Testing)", 
    icon: <Server className="w-4 h-4" />, 
    level: 'advanced', 
    colorClass: "bg-retro-green", 
    category: 'tools'
  },
  
  // Other Skills
  { 
    name: "Microservices", 
    icon: <Network className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-orange", 
    category: 'other'
  },
  { 
    name: "Asynchronous Processing", 
    icon: <Cpu className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-blue", 
    category: 'other'
  },
  { 
    name: "Concurrency", 
    icon: <Cpu className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-purple", 
    category: 'other'
  },
  { 
    name: "Real-time Data Streaming", 
    icon: <Network className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-yellow", 
    category: 'other'
  },
  { 
    name: "Resource Locking", 
    icon: <Server className="w-4 h-4" />, 
    level: 'expert', 
    colorClass: "bg-retro-green", 
    category: 'other'
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
    title: "Golang & Backend",
    icon: <Server className="w-6 h-6" />,
    color: "text-retro-orange bg-retro-orange/20",
    description: "Building high-performance microservices and APIs using Golang, Gin, and other modern frameworks."
  },
  {
    title: "Cloud & AWS",
    icon: <Cloud className="w-6 h-6" />,
    color: "text-retro-yellow bg-retro-yellow/20",
    description: "Designing scalable cloud-native solutions using AWS EC2, Lambda, S3, RDS, and other services."
  },
  {
    title: "Distributed Systems",
    icon: <Network className="w-6 h-6" />,
    color: "text-retro-purple bg-retro-purple/20",
    description: "Developing fault-tolerant distributed applications with asynchronous processing and resource locking."
  },
  {
    title: "Real-time Data",
    icon: <Cpu className="w-6 h-6" />,
    color: "text-retro-green bg-retro-green/20",
    description: "Building systems for real-time data streaming, processing, and analytics with Kafka and WebSockets."
  },
  {
    title: "High-Performance",
    icon: <Server className="w-6 h-6" />,
    color: "text-retro-blue bg-retro-blue/20",
    description: "Optimizing performance for high-throughput applications using concurrency patterns and load testing."
  },
  {
    title: "Database Systems",
    icon: <Database className="w-6 h-6" />,
    color: "text-retro-orange bg-retro-orange/20",
    description: "Working with SQL, NoSQL, and in-memory databases including PostgreSQL, MySQL, Redis, and MongoDB."
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
              .filter((_, skillIndex) => skillIndex % (index + 2) === 0)
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
  const [category, setCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"skills" | "focus">("skills");
  const sectionRef = useRef<HTMLElement>(null);
  
  const filteredSkills = category === "all" 
    ? skills 
    : skills.filter(skill => skill.category === category);
  
  const categories = [
    { value: "all", label: "All Skills" },
    { value: "languages", label: "Languages" },
    { value: "backend", label: "Backend" },
    { value: "databases", label: "Databases" },
    { value: "cloud", label: "Cloud" },
    { value: "tools", label: "Tools & Tech" },
    { value: "other", label: "Other Skills" }
  ];

  useEffect(() => {
    const savedCategory = localStorage.getItem('skillsCategory');
    const savedTab = localStorage.getItem('skillsActiveTab') as "skills" | "focus" | null;
    
    if (savedCategory) setCategory(savedCategory);
    if (savedTab) setActiveTab(savedTab === 'focus' ? 'focus' : 'skills');
  }, []);

  useEffect(() => { localStorage.setItem('skillsCategory', category); }, [category]);
  useEffect(() => { localStorage.setItem('skillsActiveTab', activeTab); }, [activeTab]);

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
          
          <div className="mb-8 animate-on-scroll">
            <ToggleGroup 
              type="single" 
              value={category} 
              onValueChange={(value) => {
                if (value) setCategory(value);
              }}
              className="justify-start"
              disabled={activeTab === "focus"}
            >
              {categories.map((cat) => (
                <ToggleGroupItem 
                  key={cat.value} 
                  value={cat.value}
                  aria-label={cat.label}
                  className={cn(
                    "data-[state=on]:text-white data-[state=on]:border-retro-orange data-[state=on]:bg-retro-orange/30",
                    activeTab === "focus" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className="text-xs">{cat.label}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          
          <TabsContent value="skills" className="border-none p-0 mt-4">
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
