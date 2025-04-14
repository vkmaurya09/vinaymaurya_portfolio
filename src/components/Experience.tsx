
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, MapPin } from 'lucide-react';

type Experience = {
  id: number;
  company: string;
  logo: string;
  position: string;
  period: string;
  location: string;
  responsibilities: string[];
  skills: string[];
};

const experiences: Experience[] = [
  {
    id: 1,
    company: "FYERS",
    logo: "/lovable-uploads/ebcb6abf-7f72-4276-8637-17d34ac64940.png",
    position: "Senior Software Engineer",
    period: "Aug 2023 - Present",
    location: "Bengaluru, Karnataka, India",
    responsibilities: [
      "Designed and implemented instant withdrawal to let the user withdraw funds up to 1 Lakhs INR instantly to their bank account.",
      "Created a funds module that lets a user add and withdraw funds from their trading wallet from the app and web.",
      "Automated high-availability setup to serve real-time stock screener data without any downtime using AWS lambda and step function.",
      "Designed a microservice that handles all types of settings (chart, user, order window, etc) across platforms using Kafka, Redis and PostgreSQL.",
      "Created async APIs using Kafka to scale systems to handle higher loads during peak traffic time"
    ],
    skills: ["Go", "Apache Kafka", "AWS", "Redis", "PostgreSQL"]
  },
  {
    id: 2,
    company: "Plaza",
    logo: "/lovable-uploads/f6d3650e-00f8-4ffc-9e3e-f6abf81b4520.png",
    position: "Software Development Engineer - Backend",
    period: "Jul 2022 - Jun 2023",
    location: "Bengaluru, Karnataka, India",
    responsibilities: [
      "Integrated creator analytics SDK, displaying content stats from multiple social media platforms, resulting in a comprehensive dashboard.",
      "Developed serverless function for automated data retrieval, ensuring real-time analytics updates and saving 17 hours per week of manual tasks.",
      "Implemented event-driven notification service for timely email, in-app, and push notifications, increasing user engagement by over 15%.",
      "Contributed to admin-side API development, enabling efficient platform management and achieving over 20% efficiency gain."
    ],
    skills: ["JSON", "AWS", "Node.js", "Python"]
  },
  {
    id: 3,
    company: "Quantum Dynamics Corp",
    logo: "/lovable-uploads/0b8675d7-f217-44f4-9166-109aaf39ea85.png",
    position: "Back End Developer",
    period: "Apr 2022 - Jun 2022",
    location: "Remote",
    responsibilities: [
      "Implemented GraphQL resolvers to efficiently retrieve and manipulate data from multiple data sources, ensuring streamlined data access and minimizing response time.",
      "Collaborated with the team to continuously improve the GraphQL schema design, ensuring consistency and scalability as new features and requirements were introduced.",
      "Actively participated in code reviews, providing constructive feedback and suggestions to improve code quality, performance, and maintainability.",
      "Maintained documentation for the GraphQL API, providing clear and comprehensive guidelines for frontend developers to interact with the backend system."
    ],
    skills: ["NestJS", "GraphQL"]
  }
];

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <div className="glass-card p-6 rounded-lg animate-on-scroll">
      <div className="flex items-start gap-4">
        <img 
          src={experience.logo} 
          alt={`${experience.company} logo`} 
          className="w-12 h-12 object-contain rounded" 
        />
        <div>
          <h3 className="text-xl font-bold">{experience.position}</h3>
          <p className="text-code">{experience.company}</p>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{experience.period}</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{experience.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <ul className="mt-4 space-y-2 text-muted-foreground">
        {experience.responsibilities.map((responsibility, index) => (
          <li key={index} className="flex items-start">
            <span className="text-code mr-2">•</span>
            <span>{responsibility}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {experience.skills.map((skill, index) => (
          <span key={index} className="px-3 py-1 bg-secondary rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  
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
    <section id="experience" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold mb-12 flex items-center animate-on-scroll">
          <span className="text-code font-mono mr-2">02.</span>
          <span>Experience</span>
          <span className="h-px bg-muted flex-grow ml-4"></span>
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0">
              {experiences.map((exp) => (
                <Button
                  key={exp.id}
                  variant={selectedTab === exp.id ? "default" : "ghost"}
                  className={`justify-start whitespace-nowrap ${
                    selectedTab === exp.id 
                      ? "bg-code/10 text-code border-l-2 border-code" 
                      : "hover:bg-secondary/50 hover:text-code"
                  }`}
                  onClick={() => setSelectedTab(exp.id)}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  {exp.company}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="lg:w-3/4 space-y-6">
            {experiences.filter(exp => exp.id === selectedTab).map(experience => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center animate-on-scroll">
          <a 
            href="#" 
            className="inline-block px-6 py-3 border border-code text-code rounded-md hover:bg-code/10 transition-colors duration-300"
          >
            View Full Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experience;
