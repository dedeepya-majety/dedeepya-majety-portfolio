export interface Certification {
  name: string;
  issuer: string;
  badge: string;
  metric?: string;
  url?: string;
  date?: string;
}

export const certifications: Certification[] = [
  {
    name: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    badge: "/img/badges/architecture.png",
    metric: "Lakehouse, Delta Lake, Spark SQL & Auto Loader",
    url: "https://credentials.databricks.com/0b153543-bf9a-4130-8d80-0daaffc5a4ea",
    date: "Jun 2026",
  },
  {
    name: "Microsoft Certified: Power BI Data Analyst Associate",
    issuer: "Microsoft",
    badge: "/img/badges/cloud.png",
    metric: "DAX, Data Modeling & Executive Scorecards",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/DedeepyaMajetyCognizant-8171/5F29A7B356D3AFFB?sharingId=86DC478C83106E9D",
    date: "Certified",
  },
  {
    name: "Microsoft Certified: Power Platform Fundamentals",
    issuer: "Microsoft",
    badge: "/img/badges/cloud-connection.png",
    metric: "Power Platform, Power BI & Low-Code Basics",
    url: "https://learn.microsoft.com/api/credentials/share/en-us/DedeepyaMajetyCognizant-8171/13F378F1FC820DF?sharingId=86DC478C83106E9D",
    date: "Certified",
  },
  {
    name: "SQL for Data Science",
    issuer: "UC Davis / Coursera",
    badge: "/img/badges/cloud-sync.png",
    metric: "Complex Joins, Window Functions & Profiling",
    date: "Certified",
  },
  {
    name: "Data Modeling in Power BI",
    issuer: "Coursera",
    badge: "/img/badges/spotlight.png",
    metric: "Dimensional Star Schemas & Relationships",
    date: "Certified",
  },
  {
    name: "Preparing Data for Analysis with Microsoft Excel",
    issuer: "Coursera",
    badge: "/img/badges/cloud-connection.png",
    metric: "Data Wrangling & Statistical Summarization",
    date: "Certified",
  },
  {
    name: "Python Programming",
    issuer: "Industry Certification",
    badge: "/img/badges/trophy.png",
    metric: "Data Structures & PySpark Automation",
    date: "Certified",
  },
];
