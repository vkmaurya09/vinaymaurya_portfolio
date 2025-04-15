
import { useState, useEffect } from "react";
import { Briefcase, Calendar, MapPin, ChevronRight } from "lucide-react";

type Experience = {
  id: number;
  company: string;
  logo: string;
  position: string;
  employmentType: string;
  period: string;
  location: string;
  responsibilities: string[];
  skills: string[];
  companyUrl: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    company: "FYERS",
    logo: "/lovable-uploads/fyers-logo.png",
    position: "Senior Software Engineer",
    employmentType: "Full-time",
    period: "Aug 2023 - Present",
    location: "Bengaluru, Karnataka, India",
    responsibilities: [
      "Designed and implemented instant withdrawal to let the user withdraw funds up to 1 Lakhs INR instantly to their bank account.",
      "Created a funds module that lets a user add and withdraw funds from their trading wallet from the app and web.",
      "Automated high-availability setup to serve real-time stock screener data without any downtime using AWS lambda and step function.",
      "Designed a microservice that handles all types of settings (chart, user, order window, etc) across platforms using Kafka, Redis and PostgreSQL.",
      "Created async APIs using Kafka to scale systems to handle higher loads during peak traffic time",
    ],
    skills: ["Go", "Apache Kafka", "AWS", "Redis", "PostgreSQL"],
    companyUrl: "https://app.fyers.in",
  },
  {
    id: 2,
    company: "Plaza",
    logo: "/lovable-uploads/plaza-logo.jpeg",
    position: "Software Development Engineer - Backend",
    employmentType: "Full-time",
    period: "Jul 2022 - Jun 2023",
    location: "Bengaluru, Karnataka, India",
    responsibilities: [
      "Integrated creator analytics SDK, displaying content stats from multiple social media platforms, resulting in a comprehensive dashboard.",
      "Developed serverless function for automated data retrieval, ensuring real-time analytics updates and saving 17 hours per week of manual tasks.",
      "Implemented event-driven notification service for timely email, in-app, and push notifications, increasing user engagement by over 15%.",
      "Contributed to admin-side API development, enabling efficient platform management and achieving over 20% efficiency gain.",
    ],
    skills: ["JSON", "AWS", "Node.js", "Python"],
    companyUrl: "https://www.linkedin.com/company/plaza-tech/",
  },
  {
    id: 3,
    company: "Quantum Dynamics Corp",
    logo: "/lovable-uploads/qd_corp_logo.jpeg",
    position: "Back End Developer",
    employmentType: "Internship",
    period: "Apr 2022 - Jun 2022",
    location: "Remote",
    responsibilities: [
      "Implemented GraphQL resolvers to efficiently retrieve and manipulate data from multiple data sources, ensuring streamlined data access and minimizing response time.",
      "Collaborated with the team to continuously improve the GraphQL schema design, ensuring consistency and scalability as new features and requirements were introduced.",
      "Actively participated in code reviews, providing constructive feedback and suggestions to improve code quality, performance, and maintainability.",
      "Maintained documentation for the GraphQL API, providing clear and comprehensive guidelines for frontend developers to interact with the backend system.",
    ],
    skills: ["NestJS", "GraphQL"],
    companyUrl: "https://www.qd-corp.com/",
  },
  {
    id: 4,
    company: "Korazón",
    logo: "/lovable-uploads/korazon-logo.jpeg",
    position: "Backend Developer",
    employmentType: "Internship",
    period: "Jan 2022 - Mar 2022",
    location: "Remote",
    responsibilities: [
      "Developed and implemented the backend infrastructure for a crypto payment app, using Django and GraphQL technologies.",
      "Focused on authentication mechanisms using JSON Web Tokens (JWT), ensuring secure user authentication and authorization processes.",
      "Assisted in the deployment and maintenance of the application on cloud platforms, ensuring high availability and scalability.",
    ],
    skills: ["Django", "GraphQL", "JWT", "Python"],
    companyUrl: "https://www.linkedin.com/company/korazon4world/",
  },
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
          <h3 className="text-2xl font-display text-retro-text mb-1">{experience.position}</h3>
          <p className="text-retro-orange font-mono">
            <a 
              href={experience.companyUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {experience.company}
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
          <span>{experience.period}</span>
        </div>
        
        <div className="flex items-center text-retro-muted px-3 py-1.5 border border-white/10 mb-2">
          <MapPin className="w-4 h-4 mr-2 text-retro-orange" />
          <span>{experience.location}</span>
        </div>
      </div>

      <ul className="mt-8 space-y-4">
        {experience.responsibilities.map((responsibility, index) => (
          <li key={index} className="flex items-start text-retro-muted">
            <ChevronRight className="w-4 h-4 text-retro-orange mr-2 flex-shrink-0 mt-1" />
            <span className="text-sm">{responsibility}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-8 flex flex-wrap gap-3">
        {experience.skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-1.5 bg-retro-card border border-white/10 text-xs font-mono"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(
    experiences.find((exp) => exp.id === 1)
  );

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

  // Update current experience when tab changes
  const handleTabChange = (tabId: number) => {
    const newExperience = experiences.find((exp) => exp.id === tabId);
    if (newExperience) {
      setSelectedTab(tabId);
      setCurrentExperience(newExperience);
    }
  };

  return (
    <section id="experience" className="py-24 px-4 bg-gradient-to-b from-retro-bg/90 to-retro-bg retro-container">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-display mb-12 flex items-center animate-on-scroll">
          <span className="text-retro-orange font-mono mr-2">02.</span>
          <span className="retro-text-shadow">Experience</span>
          <span className="h-px bg-white/10 flex-grow ml-4"></span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4 animate-on-scroll">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-1 pb-4 lg:pb-0 font-mono text-sm">
              {experiences.map((exp) => (
                <button
                  key={exp.id}
                  className={`px-4 py-3 text-left border transition-colors whitespace-nowrap ${
                    selectedTab === exp.id
                      ? "border-retro-orange text-retro-orange bg-retro-orange/5"
                      : "border-white/10 text-retro-muted hover:text-retro-orange hover:border-retro-orange/50"
                  }`}
                  onClick={() => handleTabChange(exp.id)}
                >
                  <Briefcase className="w-4 h-4 inline-block mr-2" />
                  {exp.company}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-3/4 min-h-[300px] flex items-start animate-on-scroll delay-100">
            {currentExperience && (
              <div className="w-full">
                <ExperienceCard experience={currentExperience} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 text-center animate-on-scroll">
          <a 
            href="https://flowcv.com/resume/tsc77t6arq" 
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
