import type { Job } from "@/app/types";

export const jobs: Job[] = [
  {
    company: "Cognizant Technology Solutions",
    logo: "/img/companies/cognizant.svg",
    role: "Associate - Data Engineer",
    period: "Oct 2025 - Present",
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
    diagram: "/img/projects/lakehouse-migration.svg",
    problemStatement:
      "Legacy Informatica batch jobs experienced high failure rates, long execution windows exceeding daily SLAs, and high licensing costs, while lacking modern lakehouse ACID transactions and schema evolution.",
    solutions: [
      {
        title: "Databricks Auto Loader Ingestion (Bronze Layer)",
        desc: "Implemented incremental ingestion via cloud notification queues, automatically detecting schema evolution across incoming source feeds.",
        filename: "autoloader_bronze_ingest.py",
        codeSnippet: `# Databricks Auto Loader (cloudFiles) Ingestion to Bronze Delta Table
from pyspark.sql import functions as F

bronze_stream = (
    spark.readStream.format("cloudFiles")
    .option("cloudFiles.format", "json")
    .option("cloudFiles.schemaLocation", "/mnt/adls/checkpoints/schema_bronze")
    .option("cloudFiles.inferColumnTypes", "true")
    .load("/mnt/adls/raw_landing/")
    .withColumn("ingestion_timestamp", F.current_timestamp())
    .withColumn("source_file", F.input_file_name())
    .writeStream.format("delta")
    .option("checkpointLocation", "/mnt/adls/checkpoints/bronze_orders")
    .outputMode("append")
    .table("enterprise_lakehouse.bronze.orders")
)`,
      },
      {
        title: "Delta Lake Silver Medallion Merge & Deduplication",
        desc: "Designed unified Bronze-to-Gold PySpark transformations with Delta Lake ACID guarantees, partition pruning, and broadcast join optimizations.",
        filename: "silver_medallion_merge.py",
        codeSnippet: `from delta.tables import DeltaTable
from pyspark.sql.functions import col, row_number
from pyspark.sql.window import Window

silver_target = DeltaTable.forName(spark, "enterprise_lakehouse.silver.orders")

# Window deduplication on primary key with latest timestamp
window_spec = Window.partitionBy("order_id").orderBy(col("updated_at").desc())
deduped_updates = (
    spark.read.table("enterprise_lakehouse.bronze.orders")
    .filter("order_id IS NOT NULL")
    .withColumn("rank", row_number().over(window_spec))
    .filter("rank == 1")
    .drop("rank")
)

# ACID Upsert into Silver Tier
(
    silver_target.alias("t")
    .merge(deduped_updates.alias("s"), "t.order_id = s.order_id")
    .whenMatchedUpdateAll()
    .whenNotMatchedInsertAll()
    .execute()
)`,
      },
    ],
    recognition: [
      "Dedeepya's architectural leadership in migrating legacy Informatica mappings to Azure Databricks reduced pipeline runtimes by 40% while maintaining 100% data parity across production environments. : Cognizant Delivery Lead",
      "Her deep expertise in Auto Loader and Delta Lake ACID capabilities enabled our analytics teams to access clean Silver datasets within minutes of ingestion. : Data Platform Architect",
    ],
  },
  {
    company: "Cognizant Technology Solutions",
    logo: "/img/companies/cognizant.svg",
    role: "Programming Analyst - Data Engineer",
    period: "Feb 2024 - Oct 2025",
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
    diagram: "/img/projects/informatica-mdm-powerbi.svg",
    problemStatement:
      "Heterogeneous source systems created inconsistent customer and product records, while business stakeholders lacked real-time visibility into operational data health.",
    solutions: [
      {
        title: "Master Data Management Survivorship & Match-Merge",
        desc: "Engineered automated match-and-merge algorithms and trust scoring rules in Informatica MDM, consolidating duplicate records into single golden sources.",
        filename: "mdm_match_merge_rules.sql",
        codeSnippet: `-- Informatica MDM Golden Record Match-Merge Query
SELECT 
    m.party_id,
    m.golden_account_id,
    COALESCE(s.tax_id, f.tax_id) AS unified_tax_id,
    m.trust_score,
    CASE 
        WHEN m.trust_score >= 0.95 THEN 'CONFIRMED_MERGE'
        WHEN m.trust_score >= 0.80 THEN 'QUEUE_FOR_STEWARD_REVIEW'
        ELSE 'REJECT_SUSPECT'
    END AS match_action
FROM mdm_stage_customers m
LEFT JOIN crm_source s ON m.source_system_id = s.source_id
LEFT JOIN erp_source f ON m.source_system_id = f.source_id;`,
      },
      {
        title: "Self-Serve Power BI Operational Reporting (DAX)",
        desc: "Modeled star schemas and DAX calculations in Power BI, delivering real-time operational analytics and eliminating ad-hoc report bottlenecks.",
        filename: "pipeline_sla_metric.dax",
        codeSnippet: `Pipeline_SLA_Adherence_% = 
DIVIDE(
    CALCULATE(
        COUNTROWS(FactPipelineExecutions),
        FactPipelineExecutions[ExecutionDurationMinutes] <= FactPipelineExecutions[TargetSLAMinutes],
        FactPipelineExecutions[Status] = "SUCCESS"
    ),
    COUNTROWS(FactPipelineExecutions),
    0
)`,
      },
    ],
    recognition: [
      "Maintained outstanding 99.8% feed availability across critical daily ETL batches and delivered executive Power BI dashboards with high stakeholder adoption. : Analytics Practice Manager",
    ],
  },
  {
    company: "Cognizant Technology Solutions",
    logo: "/img/companies/cognizant.svg",
    role: "Programmer Analyst Trainee / GenC Intern",
    period: "Feb 2022 - Mar 2024",
    location: "Chennai, Tamil Nadu, India",
    desc: "Automated SQL data extraction scripts, tuned PowerCenter workflows, and completed structured cloud and big data engineering training.",
    stack:
      "Python, SQL, Linux/Shell, Informatica PowerCenter, Relational Modeling",
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
    diagram: "/img/projects/hybrid-orchestrator-airflow-adf.svg",
    problemStatement:
      "Manual data extraction requests created operational friction and diverted senior data engineers from platform-level priorities.",
    solutions: [
      {
        title: "Automated Shell & SQL Extraction Scripts",
        desc: "Scripted automated scheduled query jobs that delivered extraction payloads directly to downstream staging directories.",
        filename: "scheduled_extract.sh",
        codeSnippet: `#!/usr/bin/env bash
# Automated Daily SQL Extraction Script
set -euo pipefail

TARGET_DATE=$(date -d "yesterday" +'%Y-%m-%d')
OUTPUT_DIR="/data/staging/extracts/\${TARGET_DATE}"
mkdir -p "\${OUTPUT_DIR}"

sqlcmd -S "\${DB_HOST}" -d "\${DB_NAME}" -U "\${DB_USER}" -P "\${DB_PASS}" \\
  -Q "EXEC sp_ExtractDailyTransactions @ExtractDate='\${TARGET_DATE}'" \\
  -s "," -W -o "\${OUTPUT_DIR}/transactions_\${TARGET_DATE}.csv"

echo "Extraction complete: \${OUTPUT_DIR}/transactions_\${TARGET_DATE}.csv"`,
      },
    ],
    recognition: [
      "Graduated at the top of the Cognizant GenC engineering cohort with demonstrated excellence in database design, scripting, and enterprise pipeline monitoring. : GenC Program Mentor",
    ],
  },
];
