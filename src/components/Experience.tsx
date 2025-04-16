import { useState, useEffect, useRef } from "react";
import { Briefcase, Calendar, MapPin, ChevronRight, ArrowUp } from "lucide-react";

type Experience = {
  id: number;
  company: string;
  logo: string;
  positions: Array<{
    title: string;
    period: string;
    responsibilities: string[];
    skills: string[];
  }>;
  employmentType: string;
  location: string;
  companyUrl: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    company: "FYERS",
    logo: "/lovable-uploads/fyers-logo.png",
    positions: [
      {
        title: "Software Engineer 2",
        period: "Jan 2024 - Present",
        responsibilities: [
          "Built producer-consumer microservices for asynchronous data saving (TradingView SaveChart & Drawing APIs).",
          "Used Redis, Kafka, and S3 with Snappy compression; reduced storage usage by 60%.",
          "Developed and deployed FYERS Smart Orders & SIP microservices using Go, WebSockets, Kafka, Redis.",
          "Engineered a settings service managing 100+ types of settings with PostgreSQL, Kafka, Redis & WebSocket updates."
        ],
        skills: ["Go", "Apache Kafka", "AWS", "Redis", "PostgreSQL"]
      },
      {
        title: "Software Engineer 1",
        period: "Dec 2022 - Jan 2024",
        responsibilities: [
          "Created FYERS API v3 and Python SDK for algo trading with 50ms order execution.",
          "Rebuilt charting data service in Go, reducing EC2 usage by 85%.",
          "Implemented inter-service resource locking with Redis for AWS EFS operations."
        ],
        skills: ["Go", "Python", "AWS", "Redis", "Microservices"]
      }
    ],
    employmentType: "Full-time",
    location: "Bangalore, Karnataka, India",
    companyUrl: "https://app.fyers.in",
  }
];

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <div className="retro-card p-6">
      <div className="flex items-start gap-4 mb-8">
        <div className="bg-retro-card border border-white/10 p-3 flex-shrink-0">
          <img
            src={experience.logo}
            alt={`${experience.company} logo`}
            className="w-16 h-16 object-contain grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-display text-retro-text mb-1">{experience.company}</h3>
          <p className="text-retro-orange font-mono">
            <a 
              href={experience.companyUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {experience.companyUrl.replace('https://', '')}
            </a>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center mb-8 font-mono text-xs">
        <div className="flex items-center text-retro-muted px-3 py-1.5 border border-white/10 mr-4 mb-2">
          <Briefcase className="w-4 h-4 mr-2 text-retro-orange" />
          <span>{experience.employmentType}</span>
        </div>
        
        <div className="flex items-center text-retro-muted px-3 py-1.5 border border-white/10 mr-4 mb-2">
          <Calendar className="w-4 h-4 mr-2 text-retro-orange" />
          <span>{experience.positions[experience.positions.length-1].period.split(' - ')[0]} - {experience.positions[0].period.split(' - ')[1]}</span>
        </div>
        
        <div className="flex items-center text-retro-muted px-3 py-1.5 border border-white/10 mb-2">
          <MapPin className="w-4 h-4 mr-2 text-retro-orange" />
          <span>{experience.location}</span>
        </div>
      </div>

      {experience.positions.map((position, posIndex) => (
        <div key={`position-${posIndex}`} className={`${posIndex > 0 ? 'mt-10 pt-10 border-t border-white/10' : ''}`}>
          <div className="flex items-center mb-3">
            <h4 className="text-xl font-display text-retro-orange flex items-center">
              {position.title}
              {posIndex === 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-retro-orange/20 border border-retro-orange/50 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" /> Promoted
                </span>
              )}
            </h4>
            <div className="ml-3 px-2 py-0.5 text-xs border border-white/20 text-retro-muted">
              {position.period}
            </div>
          </div>
          
          <ul className="space-y-4 mt-4">
            {position.responsibilities.map((responsibility, index) => (
              <li key={`resp-${posIndex}-${index}`} className="flex items-start text-retro-muted">
                <ChevronRight className="w-4 h-4 text-retro-orange mr-2 flex-shrink-0 mt-1" />
                <span className="text-sm">{responsibility}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 flex flex-wrap gap-3">
            {position.skills.map((skill, index) => (
              <span
                key={`skill-${posIndex}-${index}`}
                className="px-4 py-1.5 bg-retro-card border border-white/10 text-xs font-mono"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Experience = () => {
  const [currentExperience] = useState(experiences[0]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="experience" className="py-24 px-4 bg-gradient-to-b from-retro-bg/90 to-retro-bg retro-container">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-display mb-12 flex items-center animate-on-scroll">
          <span className="text-retro-orange font-mono mr-2">02.</span>
          <span className="retro-text-shadow">Experience</span>
          <span className="h-px bg-white/10 flex-grow ml-4"></span>
        </h2>

        <div className="flex flex-col gap-8">
          <div className="min-h-[300px] flex items-start animate-on-scroll">
            {currentExperience && (
              <div className="w-full relative perspective-500" ref={cardRef}>
                <ExperienceCard experience={currentExperience} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <a 
            href="https://drive.google.com/file/d/1MerP_nO__EY9pAtuKOkBkHW8rbtkkEaW/view?usp=sharing" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-retro-card border border-retro-orange text-retro-orange font-mono hover:bg-retro-orange/10 transition-colors"
          >
            <Calendar className="w-5 h-5 mr-2" />
            VIEW_FULL_RESUME
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
