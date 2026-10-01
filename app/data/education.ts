export interface EducationHighlight {
  label: string;
  detail: string;
}

export interface Degree {
  institution: string;
  shortName: string;
  logo: string;
  degree: string;
  period: string;
  location: string;
  gpa: string;
  overview: string;
  highlights: EducationHighlight[];
  coursework: string[];
  projects: string[];
  achievements: string[];
}

export const degrees: Degree[] = [
  {
    institution: "Saveetha Engineering College",
    shortName: "Saveetha",
    logo: "/img/education/sastra.svg",
    degree:
      "Bachelor of Engineering (B.E.) in Electrical, Electronics & Communications Engineering",
    period: "2018 – 2022",
    location: "Chennai, Tamil Nadu, India",
    gpa: "First Class",
    overview:
      "4-year undergraduate curriculum covering core computing, signal analysis, communications engineering, and software development, building a rigorous analytical foundation for distributed systems and cloud data engineering.",
    highlights: [
      {
        label: "Engineering Foundations",
        detail:
          "Specialized in data structures, relational database systems, and signal processing algorithms",
      },
      {
        label: "Technical Project Lead",
        detail:
          "Led undergraduate engineering cohort projects on automated data telemetry and embedded systems",
      },
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Object Oriented Programming with Python",
      "Computer Networks & Communication Protocols",
      "Digital Signal Processing",
      "Microcontroller Systems",
    ],
    projects: [
      "Automated Sensor Data Ingestion & Signal Quality Validation System",
      "Relational Database Schema Design and Optimized SQL Querying Framework",
    ],
    achievements: [
      "Graduated with Bachelor of Engineering in Electronics & Communications",
      "Selected directly into Cognizant Technology Solutions via GenC campus engineering recruitment",
    ],
  },
];
