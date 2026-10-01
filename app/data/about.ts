import type { AboutCard, CareerStat, Skill } from "@/app/types";

export const stats: CareerStat[] = [
  {
    value: "40%",
    label: "Runtime Speedup",
    sublabel: "ETL to Lakehouse Migration",
    icon: "fa-bolt",
    href: "#experience",
    highlight: true,
  },
  {
    value: "~30%",
    label: "Cost Reduction",
    sublabel: "Cloud Compute Optimization",
    icon: "fa-line-chart",
    href: "#experience",
    highlight: true,
  },
  {
    value: "3+ Yrs",
    label: "Tenure @ Cognizant",
    sublabel: "Azure Data Engineering",
    icon: "fa-building-o",
    href: "#experience",
    highlight: true,
  },
  {
    value: "2",
    label: "Industry Certifications",
    sublabel: "Databricks & Microsoft Power BI",
    icon: "fa-certificate",
    href: "#certifications",
  },
  {
    value: "Medallion",
    label: "Architecture Standard",
    sublabel: "Bronze, Silver & Gold Delta Lake",
    icon: "fa-database",
    href: "#projects",
  },
  {
    value: "99.8%",
    label: "Feed SLA Adherence",
    sublabel: "Production Pipeline Reliability",
    icon: "fa-check-circle",
    href: "#experience",
  },
];

export const cards: AboutCard[] = [
  {
    icon: "fa-database",
    title: "Azure Databricks & Delta Lake",
    desc: "Architecting cloud-native Lakehouse platforms following the Medallion Architecture (Bronze/Silver/Gold) with automated Auto Loader ingestion and Unity Catalog governance.",
  },
  {
    icon: "fa-cogs",
    title: "PySpark & Big Data Processing",
    desc: "Building high-performance distributed Spark pipelines, optimizing transformations via broadcast joins, partition pruning, caching, and Spark SQL tuning.",
  },
  {
    icon: "fa-random",
    title: "Hybrid ETL Orchestration",
    desc: "Orchestrating end-to-end data workflows combining Python-based Apache Airflow DAGs with Azure Data Factory (ADF) copy activities and notebook triggers across ADLS Gen2.",
  },
  {
    icon: "fa-shield",
    title: "Data Governance & MDM",
    desc: "Enforcing table/column-level RBAC via Unity Catalog and tuning Informatica MDM match-and-merge rule sets to establish unified golden customer and product records.",
  },
];

export const SKILLS: Skill[] = [
  {
    name: "Databricks",
    label: "Azure Databricks",
    color: "#FF3621",
    icon: "fa-database",
    shortDescription:
      "Apache Spark 3.0, Delta Lake, Unity Catalog, Auto Loader, cluster autoscaling",
  },
  {
    name: "PySpark",
    label: "PySpark & Spark SQL",
    color: "#E25A1C",
    icon: "fa-code",
    shortDescription:
      "Distributed DataFrame transformations, broadcast joins, partition pruning, caching",
  },
  {
    name: "DeltaLake",
    label: "Delta Lake (Medallion)",
    color: "#00A4EF",
    icon: "fa-cubes",
    shortDescription:
      "Bronze, Silver, Gold architecture, ACID transactions, time travel, schema evolution",
  },
  {
    name: "Orchestration",
    label: "ADF & Apache Airflow",
    color: "#10B981",
    icon: "fa-cogs",
    shortDescription:
      "Python Airflow DAGs, ADF copy pipelines, webhook triggers, CI/CD with Git",
  },
  {
    name: "Azure",
    label: "Azure Cloud & ADLS Gen2",
    color: "#0078D4",
    icon: "fa-cloud",
    shortDescription:
      "ADLS Gen2 hierarchical namespaces, Blob Storage, Azure DevOps, Azure Monitor",
  },
  {
    name: "Informatica",
    label: "Informatica & MDM",
    color: "#F59E0B",
    icon: "fa-exchange",
    shortDescription:
      "Legacy PowerCenter ETL migration, MDM match/merge rules, trust scores",
  },
  {
    name: "SQL",
    label: "SQL & Data Warehousing",
    color: "#38BDF8",
    icon: "fa-table",
    shortDescription:
      "Complex analytical queries, T-SQL, Databricks SQL, query plan tuning",
  },
  {
    name: "PowerBI",
    label: "Power BI & Analytics",
    color: "#F2C811",
    icon: "fa-bar-chart",
    shortDescription:
      "DAX calculations, KPI data modeling, operational reporting dashboards",
  },
];
