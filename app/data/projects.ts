export type ProjectTag = { name: string; color: string };

export interface Project {
  name: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  github?: string;
  deploy?: string;
}

export const projects: Project[] = [
  {
    name: "Informatica to Azure Databricks Lakehouse Migration",
    description:
      "Led the end-to-end modernization of dozens of legacy Informatica PowerCenter batch ETL mappings into scalable Azure Databricks Lakehouse pipelines. Transitioned workloads to PySpark and Delta Lake, cutting average pipeline runtime by 40% and reducing cloud infrastructure costs by ~30% via cluster autoscaling.",
    tags: [
      { name: "azure-databricks", color: "#38BDF8" },
      { name: "delta-lake", color: "#38BDF8" },
      { name: "pyspark", color: "#38BDF8" },
      { name: "spark-sql", color: "#94A3B8" },
      { name: "migration", color: "#9b59b6" },
      { name: "adls-gen2", color: "#38BDF8" },
    ],
    image: "/img/appreciations/Migration_appreciation.png",
  },
  {
    name: "Delta Lake Medallion Architecture with Auto Loader",
    description:
      "Architected a scalable three-tier Medallion Lakehouse on Azure Databricks. Automated multi-source continuous file ingestion from ADLS Gen2 using Databricks Auto Loader with schema inference and evolution (Bronze), enforced data cleansing and deduplication via PySpark (Silver), and built conformed star schemas for analytics (Gold).",
    tags: [
      { name: "medallion-architecture", color: "#38BDF8" },
      { name: "auto-loader", color: "#38BDF8" },
      { name: "unity-catalog", color: "#38BDF8" },
      { name: "pyspark", color: "#94A3B8" },
      { name: "data-quality", color: "#9b59b6" },
    ],
    image: "/img/appreciations/Screenshot 2024-02-12 at 11.24.33 AM.png",
  },
  {
    name: "Hybrid Data Pipeline Orchestrator (Airflow + ADF)",
    description:
      "Engineered a robust hybrid workflow orchestration framework combining Python-based Apache Airflow DAGs with Azure Data Factory (ADF) execution pipelines. Managed DAG definitions under GitHub version control with automated PR checks, task retries, and failure alerts across ADLS Gen2 tiers.",
    tags: [
      { name: "apache-airflow", color: "#38BDF8" },
      { name: "azure-data-factory", color: "#38BDF8" },
      { name: "python", color: "#38BDF8" },
      { name: "orchestration", color: "#94A3B8" },
      { name: "azure-devops", color: "#38BDF8" },
    ],
    image: "/img/appreciations/RBO_scorecard_appreciation.png",
  },
  {
    name: "Enterprise Informatica MDM & Operational Power BI Dashboard",
    description:
      "Configured match-and-merge rule sets, survivorship logic, and trust scores in Informatica MDM to eliminate duplicate customer and product master records across disparate source systems. Designed 6+ interactive Power BI dashboards with DAX KPI models delivering real-time operational visibility.",
    tags: [
      { name: "informatica-mdm", color: "#38BDF8" },
      { name: "power-bi", color: "#38BDF8" },
      { name: "dax", color: "#94A3B8" },
      { name: "master-data", color: "#9b59b6" },
      { name: "sql", color: "#38BDF8" },
    ],
    image: "/img/appreciations/cert_automation_appreciation.png",
  },
];
