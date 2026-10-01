import type { Job } from "@/app/types";

export const jobs: Job[] = [
  {
    company: "Cognizant Technology Solutions",
    logo: "/img/companies/viasat.svg",
    role: "Associate - Data Engineer",
    period: "Oct 2025 – Present",
    location: "Chennai, Tamil Nadu, India",
    desc: "Lead enterprise ETL modernization to Azure Databricks Delta Lake, engineering scalable Medallion Lakehouse pipelines, Auto Loader ingestion, and Apache Airflow orchestration.",
    stack:
      "Azure Databricks, Delta Lake, PySpark, Spark SQL, Azure Data Factory (ADF), Apache Airflow, ADLS Gen2, Unity Catalog",
    overview:
      "Leading cloud data engineering initiatives focused on migrating legacy on-premise Informatica ETL to cloud-native Lakehouse architecture on Azure Databricks, reducing pipeline runtimes by 40% and infrastructure spend by ~30%.",
    highlights: [
      {
        label: "ETL to Lakehouse Migration",
        detail:
          "Led Informatica PowerCenter to Azure Databricks Delta Lake migration, accelerating pipeline execution by 40% with ~30% infrastructure savings.",
      },
      {
        label: "Medallion Architecture Implementation",
        detail:
          "Engineered Bronze, Silver, and Gold Delta Lake layers, enforcing automated schema evolution, data quality validation gates, and auditable lineage.",
      },
      {
        label: "Continuous Streaming Ingestion",
        detail:
          "Automated multi-source continuous ingestion using Databricks Auto Loader, eliminating manual batch delays for millions of incoming records.",
      },
      {
        label: "Hybrid Workflow Orchestration",
        detail:
          "Built modular Python Apache Airflow DAGs and Azure Data Factory (ADF) pipelines with branch protection, PR code reviews, and failure alerts.",
      },
      {
        label: "Unity Catalog Governance",
        detail:
          "Configured Databricks Unity Catalog for centralized data governance, table-level and column-level RBAC, and auditable lineage tracking.",
      },
    ],
    metrics: [
      "40% reduction in average pipeline runtime",
      "~30% infrastructure cost savings via cluster rightsizing",
      "100% data parity between legacy and modern pipelines",
      "2 major cloud platform initiatives delivered on schedule",
    ],
    stackList: [
      "Azure Databricks",
      "Delta Lake",
      "PySpark",
      "Spark SQL",
      "Azure Data Factory",
      "Apache Airflow",
      "ADLS Gen2",
      "Unity Catalog",
      "Python",
    ],
    problemStatement:
      "Legacy Informatica batch jobs experienced high failure rates, long execution windows exceeding daily SLAs, and high licensing costs, while lacking modern lakehouse ACID transactions and schema evolution.",
    solutions: [
      {
        title: "Delta Lake Medallion Pipeline",
        desc: "Designed unified Bronze-to-Gold PySpark transformations with Delta Lake ACID guarantees, partition pruning, and broadcast join optimizations.",
      },
      {
        title: "Databricks Auto Loader Framework",
        desc: "Implemented incremental ingestion via cloud notification queues, automatically detecting schema evolution across incoming source feeds.",
      },
    ],
  },
  {
    company: "Cognizant Technology Solutions",
    logo: "/img/companies/viasat.svg",
    role: "Programming Analyst - Data Engineer",
    period: "Feb 2024 – Oct 2025",
    location: "Chennai, Tamil Nadu, India",
    desc: "Maintained mission-critical ETL feeds, tuned Informatica MDM match-merge logic for golden records, and built self-serve Power BI operational dashboards.",
    stack:
      "Informatica PowerCenter, Informatica MDM, SQL, Power BI, DAX, Python, Data Quality",
    overview:
      "Managed production ETL workflows and master data governance for enterprise analytics, ensuring strict SLA compliance and clean customer/product master data.",
    highlights: [
      {
        label: "High-SLA Production Maintenance",
        detail:
          "Maintained 99.8% SLA adherence across critical daily data feeds by refactoring multi-source Informatica PowerCenter ETL workflows.",
      },
      {
        label: "Informatica MDM Deduplication",
        detail:
          "Configured match-merge rule sets, trust scores, and survivorship logic to eliminate duplicate entities into unified golden master records.",
      },
      {
        label: "Analytical Query Optimization",
        detail:
          "Profiled and optimized complex SQL queries for data validation checks and exploratory profiling across heterogeneous source systems.",
      },
      {
        label: "Power BI Executive Reporting",
        detail:
          "Built 6+ interactive Power BI dashboards with custom DAX KPI scorecards, enabling self-serve visibility into daily operations.",
      },
    ],
    metrics: [
      "99.8% SLA compliance on production data pipelines",
      "25% query latency improvement via SQL indexing",
      "Unified golden master records across enterprise domains",
      "6+ executive Power BI dashboards delivered",
    ],
    stackList: [
      "Informatica PowerCenter",
      "Informatica MDM",
      "SQL",
      "Power BI",
      "DAX",
      "Shell Scripting",
    ],
    problemStatement:
      "Heterogeneous source systems created inconsistent customer and product records, while business stakeholders lacked real-time visibility into operational data health.",
    solutions: [
      {
        title: "Master Data Management Survivorship",
        desc: "Engineered automated match-and-merge algorithms and trust scoring rules in Informatica MDM, consolidating duplicate records into single golden sources.",
      },
      {
        title: "Self-Serve Business Intelligence Dashboards",
        desc: "Modeled star schemas and DAX calculations in Power BI, delivering real-time operational analytics and eliminating ad-hoc report bottlenecks.",
      },
    ],
  },
  {
    company: "Cognizant Technology Solutions",
    logo: "/img/companies/viasat.svg",
    role: "Programmer Analyst Trainee / GenC Intern",
    period: "Feb 2022 – Mar 2024",
    location: "Chennai, Tamil Nadu, India",
    desc: "Automated SQL data extraction scripts, tuned PowerCenter workflows, and completed structured cloud and big data engineering training.",
    stack: "Python, SQL, Linux/Shell, Informatica PowerCenter, Relational Modeling",
    overview:
      "Gained hands-on production data engineering experience through Cognizant's GenC engineering program, resolving production tickets and building internal data tooling.",
    highlights: [
      {
        label: "Automated Data Extraction",
        detail:
          "Wrote automated SQL extraction scripts and shell automation to feed downstream reporting layers, reducing ad-hoc turnaround times.",
      },
      {
        label: "Incident Troubleshooting",
        detail:
          "Assisted senior engineers in troubleshooting production ETL workflow failures, analyzing log traces, and applying hotfixes.",
      },
      {
        label: "Internal PoC Development",
        detail:
          "Engineered an internal proof-of-concept data tooling project using Python and relational data modeling within the GenC graduate cohort.",
      },
    ],
    metrics: [
      "Automated extraction scripts cutting ad-hoc report time",
      "Resolved production ETL tickets within SLAs",
      "Selected as GenC top cohort graduate",
    ],
    stackList: [
      "SQL",
      "Python",
      "Shell/Bash",
      "Informatica PowerCenter",
      "Data Modeling",
    ],
    problemStatement:
      "Manual data extraction requests created operational friction and diverted senior data engineers from platform-level priorities.",
    solutions: [
      {
        title: "Automated Shell & SQL Extraction Scripts",
        desc: "Scripted automated scheduled query jobs that delivered extraction payloads directly to downstream staging directories.",
      },
    ],
  },
];
