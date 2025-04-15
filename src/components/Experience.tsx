import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, MapPin } from "lucide-react";

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
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-start gap-4 mb-6">
        <img
          src={experience.logo}
          alt={`${experience.company} logo`}
          className={`${
            experience.company === "FYERS" ? "w-20 h-20" : "w-12 h-12"
          } object-contain rounded`}
        />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground">{experience.position}</h3>
          <p className="text-code text-xl">
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

      <div className="flex flex-wrap items-center mb-8">
        <div className="flex items-center text-gray-400 px-4 py-1.5 rounded-md mr-8">
          <Briefcase className="w-5 h-5 mr-2" />
          <span className="font-medium">{experience.employmentType}</span>
        </div>
        
        <div className="flex items-center text-gray-400 mr-8">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{experience.period}</span>
        </div>
        
        <div className="flex items-center text-gray-400">
          <MapPin className="w-5 h-5 mr-2" />
          <span>{experience.location}</span>
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {experience.responsibilities.map((responsibility, index) => (
          <li key={index} className="flex items-start text-gray-400">
            <span className="text-code mr-3 flex-shrink-0 text-lg">•</span>
            <span className="text-base">{responsibility}</span>
          </li>
        ))}
      </ul>
      
      <div className="mt-8 flex flex-wrap gap-3">
        {experience.skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-secondary/40 border border-white/5 rounded-full text-sm"
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
                  onClick={() => handleTabChange(exp.id)}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  {exp.company}
                </Button>
              ))}
            </div>
          </div>

          <div className="lg:w-3/4 min-h-[300px] flex items-start">
            {currentExperience && (
              <div className="w-full">
                <ExperienceCard experience={currentExperience} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center animate-on-scroll">
          <a 
            href="https://flowcv.com/resume/tsc77t6arq" 
            target="_blank"
            rel="noopener noreferrer"
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
