export type ProjectTag = { name: string; color: string };

export interface ProjectPillar {
  title: string;
  description: string;
  tech: string;
  icon: string;
}

export interface DataFlowStep {
  step: number;
  phase: string;
  title: string;
  detail: string;
}

export interface SlaMetric {
  label: string;
  value: string;
  detail: string;
}

export interface ProjectLLD {
  storageTiering: string;
  partitionStrategy: string;
  cdcStrategy: string;
  compactionAndOptimization: string[];
  qualityAndErrorHandling: string[];
}

export interface ProjectCodeSnippet {
  title: string;
  filename: string;
  language: string;
  code: string;
  explanation: string;
}

export interface ProjectImpactMetric {
  metric: string;
  value: string;
  detail: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  tags: ProjectTag[];
  image: string;
  github?: string;
  deploy?: string;
  hldOverview: string;
  pillars: ProjectPillar[];
  dataFlow: DataFlowStep[];
  slaMetrics: SlaMetric[];
  lld: ProjectLLD;
  codeSnippets: ProjectCodeSnippet[];
  impactMetrics: ProjectImpactMetric[];
  challenges: ProjectChallenge[];
}

export const projects: Project[] = [
  {
    id: "lakehouse-migration",
    name: "Informatica to Azure Databricks Lakehouse Migration",
    subtitle: "Enterprise ETL Modernization to Delta Lake & PySpark",
    category: "Cloud Migration & Lakehouse Modernization",
    description:
      "Led the end-to-end modernization of 40+ legacy Informatica PowerCenter batch ETL mappings into scalable Azure Databricks Lakehouse pipelines. Transitioned workloads to PySpark and Delta Lake, cutting average pipeline runtime by 40% and reducing cloud infrastructure costs by ~30% via cluster autoscaling.",
    tags: [
      { name: "azure-databricks", color: "#38BDF8" },
      { name: "delta-lake", color: "#38BDF8" },
      { name: "pyspark", color: "#38BDF8" },
      { name: "spark-sql", color: "#94A3B8" },
      { name: "migration", color: "#9b59b6" },
      { name: "adls-gen2", color: "#38BDF8" },
    ],
    image: "/img/projects/lakehouse-migration.svg",
    hldOverview:
      "The legacy enterprise landscape relied on on-premise Informatica PowerCenter workflows processing multi-gigabyte transactional extracts into relational staging tables. Escalating licensing overhead, rigid fixed-node compute bottlenecks, and batch window SLA breaches necessitated a full cloud modernization. The target architecture establishes a cloud-native Databricks Lakehouse on ADLS Gen2, orchestrating distributed PySpark workloads that ingest raw files, conform schemas into Delta Lake Silver tables with ACID transactional integrity, and serve high-concurrency Gold analytical cubes.",
    pillars: [
      {
        title: "Ingestion & Decoupled Storage",
        description:
          "Replaced batch staging databases with Azure Data Lake Storage (ADLS Gen2) hierarchical namespace containers, isolating raw landing, silver curated, and gold serving tiers.",
        tech: "ADLS Gen2, Azure Data Factory",
        icon: "fa-database",
      },
      {
        title: "Distributed PySpark Processing",
        description:
          "Refactored complex Informatica expression, lookup, and router transformations into modular, vectorized PySpark DataFrame transformations executing across autoscaling Databricks worker nodes.",
        tech: "PySpark 3.4, Spark SQL",
        icon: "fa-cogs",
      },
      {
        title: "ACID Transactional Storage",
        description:
          "Enforced ACID transactions, time-travel capabilities, and schema enforcement using Delta Lake, replacing fragile relational truncate-and-load batch procedures.",
        tech: "Delta Lake, Delta Log",
        icon: "fa-shield",
      },
      {
        title: "Cluster Cost Optimization",
        description:
          "Configured single-node testing clusters and autoscaling multi-worker production pools with aggressive 15-minute auto-termination to eliminate idle compute spend.",
        tech: "Databricks Runtime 14.x LTS",
        icon: "fa-bolt",
      },
    ],
    dataFlow: [
      {
        step: 1,
        phase: "Source Extract",
        title: "Raw Data Ingestion to ADLS Gen2 Landing",
        detail:
          "Azure Data Factory (ADF) pipeline triggers daily delta extraction from enterprise OLTP systems and drops compressed Parquet/CSV files into ADLS Gen2 landing containers.",
      },
      {
        step: 2,
        phase: "Bronze Stage",
        title: "Immutable Raw Delta Lake Ingestion",
        detail:
          "Databricks Auto Loader detects new files in landing, infers incoming schemas, appends audit metadata (ingestion timestamp, source file path), and writes to the Bronze Delta table.",
      },
      {
        step: 3,
        phase: "Silver Stage",
        title: "PySpark Transformation & ACID MERGE",
        detail:
          "PySpark jobs clean bad records, apply business validation rules, cast types, and execute Delta Lake MERGE INTO upserts against existing customer and transaction entities.",
      },
      {
        step: 4,
        phase: "Gold Stage",
        title: "Dimensional Modeling & Power BI Serving",
        detail:
          "Curated Silver records are aggregated into dimensional star schemas (Facts and Dimensions) with automated Z-ORDER clustering for sub-second query performance in Power BI.",
      },
    ],
    slaMetrics: [
      {
        label: "Runtime Reduction",
        value: "40% Faster",
        detail:
          "Batch execution window dropped from 3.5 hours to under 2 hours.",
      },
      {
        label: "Cloud Cost Savings",
        value: "~30% Reduction",
        detail:
          "Eliminated idle server costs through aggressive cluster autoscaling.",
      },
      {
        label: "Feed Reliability",
        value: "99.8% SLA",
        detail:
          "Maintained zero feed outages across 40+ migrated enterprise pipelines.",
      },
      {
        label: "Data Integrity",
        value: "100% Verified",
        detail:
          "Automated regression testing verified zero data loss between Informatica and PySpark.",
      },
    ],
    lld: {
      storageTiering:
        "ADLS Gen2 storage accounts configured with private endpoints, TLS 1.3 encryption in transit, and separate containers: /landing (retention: 7 days), /bronze (retention: 90 days), /silver (indefinite), and /gold (indefinite).",
      partitionStrategy:
        "Partitioning applied exclusively on high-cardinality date boundaries (p_year=YYYY/p_month=MM) for tables exceeding 100GB. Sub-partitioning eliminated to prevent the small-file problem.",
      cdcStrategy:
        "Change Data Capture (CDC) orchestrated using source last_modified_date watermark filters and Delta Lake deterministic MERGE INTO statements based on composite business primary keys.",
      compactionAndOptimization: [
        "Enabled spark.databricks.delta.optimizeWrite.enabled = true to write compact 128MB Parquet files.",
        "Scheduled daily OPTIMIZE delta.`/mnt/gold/sales_mart` ZORDER BY (transaction_date, customer_id).",
        "Configured VACUUM retention periods to 168 hours (7 days) to support point-in-time forensic audits.",
      ],
      qualityAndErrorHandling: [
        "Configured _rescued_data column in Auto Loader to catch unmapped schema changes without job failure.",
        "Implemented dead-letter queue (DLQ) tables (silver_quarantine) for records failing business constraint checks.",
        "Automated row count and checksum reconciliation validation scripts between source and Delta Lake.",
      ],
    },
    codeSnippets: [
      {
        title: "Delta Lake ACID Merge Upsert",
        filename: "silver_customer_merge.py",
        language: "python",
        code: `from delta.tables import DeltaTable
from pyspark.sql.functions import col, current_timestamp, sha2

# Load incoming cleansed Bronze batch
bronze_df = (
    spark.readStream.format("delta")
    .table("bronze_customer_feed")
    .filter(col("customer_id").isNotNull())
    .withColumn("row_hash", sha2(col("customer_id"), 256))
    .withColumn("updated_at", current_timestamp())
)

# Reference existing Silver Delta Lake table
silver_table = DeltaTable.forName(spark, "silver_customer_master")

# Execute deterministic ACID MERGE INTO upsert
(
    silver_table.alias("target")
    .merge(
        source=bronze_df.alias("source"),
        condition="target.customer_id = source.customer_id",
    )
    .whenMatchedUpdate(
        condition="target.row_hash != source.row_hash",
        set={
            "customer_name": col("source.customer_name"),
            "email": col("source.email"),
            "phone": col("source.phone"),
            "status": col("source.status"),
            "updated_at": col("source.updated_at"),
            "row_hash": col("source.row_hash"),
        },
    )
    .whenNotMatchedInsertAll()
    .execute()
)`,
        explanation:
          "Executes an atomic ACID upsert that compares incoming record hashes against existing target records. Avoids redundant disk writes by only updating rows where payload hashes differ.",
      },
      {
        title: "Automated Data Validation & Reconciliation",
        filename: "reconciliation_checker.py",
        language: "python",
        code: `from pyspark.sql.functions import count, sum as _sum

def verify_migration_parity(source_table: str, target_delta: str, date_key: str):
    source_stats = spark.table(source_table).filter(f"date = '{date_key}'").agg(
        count("*").alias("src_count"),
        _sum("transaction_amount").alias("src_total")
    ).collect()[0]
    
    target_stats = spark.table(target_delta).filter(f"date = '{date_key}'").agg(
        count("*").alias("tgt_count"),
        _sum("transaction_amount").alias("tgt_total")
    ).collect()[0]
    
    count_diff = abs(source_stats["src_count"] - target_stats["tgt_count"])
    amount_diff = abs(source_stats["src_total"] - target_stats["tgt_total"])
    
    assert count_diff == 0, f"Row count mismatch: {count_diff} missing records"
    assert amount_diff < 0.01, f"Financial discrepancy detected: \${amount_diff}"
    print(f"Parity Verified for {date_key}: 100% matched across {target_stats['tgt_count']} rows.")`,
        explanation:
          "Automated verification script executed during production cutover. Ensures exact parity of row counts and aggregated financial sums between legacy Informatica outputs and Delta Lake.",
      },
    ],
    impactMetrics: [
      {
        metric: "Execution Speed",
        value: "40% Faster",
        detail:
          "Vectorized Spark SQL execution reduced overnight batch window.",
      },
      {
        metric: "Infrastructure Cost",
        value: "~30% Saved",
        detail:
          "Databricks compute pools auto-terminate during idle off-peak hours.",
      },
      {
        metric: "Workflows Converted",
        value: "40+ Workflows",
        detail:
          "Fully migrated Informatica mappings without enterprise downtime.",
      },
      {
        metric: "Data Parity",
        value: "100% Parity",
        detail:
          "Zero financial discrepancies or dropped records during dual-run testing.",
      },
    ],
    challenges: [
      {
        challenge: "Data Skew on High-Volume Merchant Keys",
        solution:
          "A small subset of enterprise merchant IDs caused Spark stage skew where single tasks ran 10x longer. Applied salting techniques to skew keys and enabled Databricks Adaptive Query Execution (AQE) skew join optimization.",
      },
      {
        challenge: "Informatica Complex Stored Procedure Migration",
        solution:
          "Legacy pipelines relied on Oracle PL/SQL stored procedures with recursive cursor loops. Re-architected these into set-based PySpark window functions, achieving massive parallelization.",
      },
    ],
  },
  {
    id: "medallion-autoloader",
    name: "Delta Lake Medallion Architecture with Auto Loader",
    subtitle: "End-to-End Streaming Lakehouse Ingestion & Governance",
    category: "Lakehouse Architecture & Cloud Ingestion",
    description:
      "Architected a scalable three-tier Medallion Lakehouse on Azure Databricks. Automated multi-source continuous file ingestion from ADLS Gen2 using Databricks Auto Loader with schema inference and evolution (Bronze), enforced data cleansing and deduplication via PySpark (Silver), and built conformed star schemas for analytics (Gold).",
    tags: [
      { name: "medallion-architecture", color: "#38BDF8" },
      { name: "auto-loader", color: "#38BDF8" },
      { name: "unity-catalog", color: "#38BDF8" },
      { name: "pyspark", color: "#94A3B8" },
      { name: "data-quality", color: "#9b59b6" },
    ],
    image: "/img/projects/medallion-autoloader.svg",
    hldOverview:
      "High-volume data streams arriving continuously in varied schema structures often cripple traditional batch ETL schedules. This architecture establishes a streaming-first Medallion Lakehouse on Databricks. Databricks Auto Loader ingests semi-structured JSON and Parquet streams from ADLS Gen2 into an immutable Bronze raw layer. A PySpark structured streaming pipeline cleanses, validates, and deduplicates the data into Silver Delta tables. Finally, optimized Gold Delta tables aggregate metrics into dimensional models with Unity Catalog access controls.",
    pillars: [
      {
        title: "Auto Loader CloudFiles Ingestion",
        description:
          "Scalable file discovery using Azure Event Grid file notifications. Ingests millions of incoming landing files incrementally without expensive directory listings.",
        tech: "cloudFiles, Event Grid",
        icon: "fa-bolt",
      },
      {
        title: "Automated Schema Evolution",
        description:
          "Dynamically handles upstream schema drift and newly added columns without crashing streaming jobs, storing unmapped fields in a dedicated rescued data column.",
        tech: "Schema Inference, Rescued Data",
        icon: "fa-code",
      },
      {
        title: "Medallion Data Refinement",
        description:
          "Structured Bronze (raw), Silver (cleansed/validated), and Gold (aggregated business marts) separation ensuring data pedigree and clear consumption boundaries.",
        tech: "Delta Lake, Structured Streaming",
        icon: "fa-cubes",
      },
      {
        title: "Unity Catalog Data Governance",
        description:
          "Enforces centralized table-level and column-level role-based access control (RBAC), data lineage tracking, and audit logging across all Lakehouse tiers.",
        tech: "Unity Catalog, Azure AD",
        icon: "fa-shield",
      },
    ],
    dataFlow: [
      {
        step: 1,
        phase: "File Landing",
        title: "Multi-Source Feed Ingestion to ADLS Gen2",
        detail:
          "External IoT telemetry, CRM feeds, and transactional flat files arrive continuously in ADLS Gen2 landing buckets, emitting Azure Event Grid file creation events.",
      },
      {
        step: 2,
        phase: "Auto Loader Bronze",
        title: "Incremental Micro-Batch Ingestion",
        detail:
          "Databricks Auto Loader listens to file events, infers schema variations, and streams records into the Bronze Delta table with checkpoint tracking for exactly-once guarantees.",
      },
      {
        step: 3,
        phase: "PySpark Silver",
        title: "Data Quality Filtering & Conforming",
        detail:
          "Streaming PySpark processes apply validation constraints (null checks, range validation), conform timestamps to UTC, deduplicate against existing keys, and write to Silver.",
      },
      {
        step: 4,
        phase: "Gold Semantic Layer",
        title: "Aggregated Fact Marts for BI",
        detail:
          "Scheduled materialized view transformations compute daily and monthly business KPIs, writing into Gold Delta tables optimized with Liquid Clustering for sub-second dashboards.",
      },
    ],
    slaMetrics: [
      {
        label: "Ingestion Latency",
        value: "< 30 Seconds",
        detail:
          "Real-time streaming ingestion from ADLS landing to Bronze Delta tables.",
      },
      {
        label: "Schema Drift Resilience",
        value: "Zero Job Failures",
        detail:
          "Rescued data column captured new schema attributes without pipeline halts.",
      },
      {
        label: "Storage Efficiency",
        value: "45% Reduction",
        detail:
          "Parquet columnar encoding and Delta Snappy compression slashed storage size.",
      },
      {
        label: "Query Performance",
        value: "5x Faster",
        detail:
          "Optimized Gold tables deliver sub-second response times in executive reports.",
      },
    ],
    lld: {
      storageTiering:
        "Dedicated ADLS Gen2 containers: /mnt/landing_incoming, /mnt/lakehouse/bronze, /mnt/lakehouse/silver, and /mnt/lakehouse/gold. Access restricted via Azure Managed Identities.",
      partitionStrategy:
        "Delta Lake tables partitioned by ingestion_date for Bronze, and event_date for Silver. Gold tables utilize Liquid Clustering on frequently filtered query attributes.",
      cdcStrategy:
        "Auto Loader checkpoint directory persisted on ADLS Gen2 maintaining exact file read offsets. Exactly-once stream-stream and stream-batch joins enforced via watermarks.",
      compactionAndOptimization: [
        "Configured auto-optimize and auto-compact on high-throughput Silver tables.",
        "Set delta.targetFileSize = 134217728 (128MB) to eliminate the small file problem in streaming.",
        "Automated retention policy purging raw landing files older than 14 days after Bronze confirmation.",
      ],
      qualityAndErrorHandling: [
        "Enabled Delta Expectations: CONSTRAINT valid_amount CHECK (amount >= 0) ON VIOLATION DROP ROW.",
        "Corrupted JSON payloads quarantined to bronze_corrupt_records for engineer investigation.",
        "Integrated Databricks alert notifications sending Webhook alerts on consecutive streaming retries.",
      ],
    },
    codeSnippets: [
      {
        title: "Auto Loader Streaming Ingestion Pipeline",
        filename: "autoloader_bronze_stream.py",
        language: "python",
        code: `from pyspark.sql.functions import current_timestamp, input_file_name

# Configure Databricks Auto Loader for streaming file discovery
stream_df = (
    spark.readStream.format("cloudFiles")
    .option("cloudFiles.format", "json")
    .option("cloudFiles.schemaLocation", "/mnt/lakehouse/checkpoints/bronze_schema")
    .option("cloudFiles.inferColumnTypes", "true")
    .option("cloudFiles.schemaEvolutionMode", "addNewColumns")
    .option("cloudFiles.rescuedDataColumn", "_rescued_data")
    .load("/mnt/landing_incoming/transactions/")
    .withColumn("ingested_at", current_timestamp())
    .withColumn("source_file", input_file_name())
)

# Stream to Bronze Delta Lake table with checkpointing
(
    stream_df.writeStream.format("delta")
    .outputMode("append")
    .option("checkpointLocation", "/mnt/lakehouse/checkpoints/bronze_txns")
    .trigger(availableNow=True)
    .toTable("bronze_transactions")
)`,
        explanation:
          "Configures Auto Loader to stream incoming raw JSON files from ADLS Gen2, automatically evolving schema columns and capturing corrupted/unmapped data into _rescued_data.",
      },
    ],
    impactMetrics: [
      {
        metric: "Ingestion Throughput",
        value: "145k rec/sec",
        detail:
          "High-concurrency streaming throughput achieved across multi-worker clusters.",
      },
      {
        metric: "Data Freshness",
        value: "Near Real-Time",
        detail:
          "Data available for business queries within minutes of landing.",
      },
      {
        metric: "Schema Flexibility",
        value: "100% Uptime",
        detail:
          "Eliminated manual pipeline maintenance when upstream API schemas evolved.",
      },
    ],
    challenges: [
      {
        challenge: "Uncontrolled File Proliferation in Streaming",
        solution:
          "Frequent micro-batch streaming created tens of thousands of tiny Parquet files. Resolved by enabling Delta Auto-Compaction and running scheduled OPTIMIZE routines during off-peak hours.",
      },
    ],
  },
  {
    id: "hybrid-orchestrator",
    name: "Hybrid Data Pipeline Orchestrator (Airflow + ADF)",
    subtitle: "Enterprise Workflow Orchestration & Automated CI/CD",
    category: "Workflow Orchestration & Cloud Integration",
    description:
      "Engineered a robust hybrid workflow orchestration framework combining Python-based Apache Airflow DAGs with Azure Data Factory (ADF) execution pipelines. Managed DAG definitions under GitHub version control with automated PR checks, task retries, and failure alerts across ADLS Gen2 tiers.",
    tags: [
      { name: "apache-airflow", color: "#38BDF8" },
      { name: "azure-data-factory", color: "#38BDF8" },
      { name: "python", color: "#38BDF8" },
      { name: "orchestration", color: "#94A3B8" },
      { name: "azure-devops", color: "#38BDF8" },
    ],
    image: "/img/projects/hybrid-orchestrator-airflow-adf.svg",
    hldOverview:
      "Enterprise data architectures often face a divide between cloud-native serverless extract tools (ADF) and complex cross-system dependency schedulers (Apache Airflow). This project unifies both paradigms: Apache Airflow serves as the master programmatic controller governing cross-system dependencies, SLA timeouts, and custom Python hooks, while Azure Data Factory (ADF) executes high-throughput cloud copy activities and Databricks notebook runs. Workflows are version-controlled in GitHub with automated CI/CD deployment pipelines.",
    pillars: [
      {
        title: "Programmatic Airflow DAGs",
        description:
          "Dynamic Python DAG generation defining multi-step workflow dependencies, automated backfilling, custom task callbacks, and external sensor polling.",
        tech: "Apache Airflow 2.x, Python",
        icon: "fa-random",
      },
      {
        title: "Serverless ADF Execution",
        description:
          "Offloaded intensive cloud copy activities and serverless Databricks cluster lifecycle commands to Azure Data Factory managed pipelines.",
        tech: "Azure Data Factory, Managed Identity",
        icon: "fa-cloud",
      },
      {
        title: "Automated CI/CD Deployment",
        description:
          "Version-controlled DAG repository with GitHub Actions CI validating DAG syntax, running pytest suites, and syncing to production Airflow environments.",
        tech: "GitHub Actions, Pytest, Flake8",
        icon: "fa-code",
      },
      {
        title: "Real-Time Telemetry & Alerting",
        description:
          "Centralized monitoring with automated Teams/Slack webhooks and email notifications on SLA violations or pipeline failures.",
        tech: "Airflow Callbacks, Azure Monitor",
        icon: "fa-bell-o",
      },
    ],
    dataFlow: [
      {
        step: 1,
        phase: "Orchestration Trigger",
        title: "Airflow Master Schedule Initiation",
        detail:
          "Airflow scheduler initiates daily DAG run, verifying upstream file arrival sensors in ADLS Gen2 before kicking off ingestion workloads.",
      },
      {
        step: 2,
        phase: "ADF Trigger",
        title: "Azure Data Factory Pipeline Execution",
        detail:
          "Airflow AzureDataFactoryRunPipelineOperator invokes the ADF copy pipeline, monitoring execution status via asynchronous polling with exponential backoff.",
      },
      {
        step: 3,
        phase: "Databricks Execution",
        title: "PySpark Transformation Execution",
        detail:
          "Upon ADF copy success, Airflow triggers Databricks notebook jobs via REST API, tracking execution logs and cluster telemetry.",
      },
      {
        step: 4,
        phase: "SLA Verification",
        title: "Data Quality Verification & Downstream Notify",
        detail:
          "Post-transformation validation tasks assert row counts and trigger downstream Power BI dataset refreshes and status alerts.",
      },
    ],
    slaMetrics: [
      {
        label: "SLA Compliance",
        value: "99.8%",
        detail:
          "Automated retry policies and sensors prevented missed SLA deadlines.",
      },
      {
        label: "Deployment Speed",
        value: "< 5 Minutes",
        detail:
          "GitHub Actions automated CI/CD pushed validated DAG updates to production.",
      },
      {
        label: "Failure Alerting",
        value: "< 60 Seconds",
        detail:
          "Real-time webhook notifications sent to on-call data engineers upon failure.",
      },
    ],
    lld: {
      storageTiering:
        "Centralized configuration metadata stored in Azure Key Vault; Airflow connections configured with service principals and managed identities.",
      partitionStrategy:
        "Execution dates passed as parameterized jinja macros ({{ ds }}, {{ execution_date }}) enabling seamless historical backfilling without code modification.",
      cdcStrategy:
        "Airflow FileSensors and WasbPrefixSensors poll ADLS Gen2 storage endpoints with poke intervals and timeouts to ensure file completeness.",
      compactionAndOptimization: [
        "Enabled CeleryExecutor for distributed task execution across multiple Airflow worker nodes.",
        "Configured pool-based concurrency limits to prevent overwhelming Databricks cluster concurrency quotas.",
      ],
      qualityAndErrorHandling: [
        "Configured on_failure_callback functions sending formatted error diagnostics to incident webhooks.",
        "Configured retry_delay = timedelta(minutes=5) with retries = 3 on transient network steps.",
      ],
    },
    codeSnippets: [
      {
        title: "Airflow Master DAG with ADF Pipeline Trigger",
        filename: "hybrid_lakehouse_orchestrator.py",
        language: "python",
        code: `from datetime import datetime, timedelta
from airflow import DAG
from airflow.providers.microsoft.azure.operators.data_factory import (
    AzureDataFactoryRunPipelineOperator,
)
from airflow.providers.microsoft.azure.sensors.data_factory import (
    AzureDataFactoryPipelineRunSensor,
)
from airflow.operators.python import PythonOperator

default_args = {
    "owner": "data-engineering",
    "depends_on_past": False,
    "email_on_failure": True,
    "retries": 3,
    "retry_delay": timedelta(minutes=5),
}

with DAG(
    dag_id="hybrid_lakehouse_orchestration",
    default_args=default_args,
    start_date=datetime(2024, 1, 1),
    schedule_interval="0 2 * * *",
    catchup=False,
    tags=["azure", "databricks", "adf", "cognizant"],
) as dag:

    # Trigger Azure Data Factory Copy Pipeline
    trigger_adf_ingest = AzureDataFactoryRunPipelineOperator(
        task_id="trigger_adf_landing_copy",
        azure_data_factory_conn_id="azure_data_factory_prod",
        pipeline_name="PL_ADLS_Raw_Ingest",
        parameters={"run_date": "{{ ds }}"},
    )

    # Poll ADF pipeline completion status
    wait_for_adf = AzureDataFactoryPipelineRunSensor(
        task_id="wait_for_adf_landing_copy",
        azure_data_factory_conn_id="azure_data_factory_prod",
        run_id=trigger_adf_ingest.output["run_id"],
        poke_interval=30,
        timeout=1800,
    )

    trigger_adf_ingest >> wait_for_adf`,
        explanation:
          "Production Airflow DAG defining resilient cross-cloud dependencies. Invokes Azure Data Factory via parameterized REST APIs and monitors execution asynchronously.",
      },
    ],
    impactMetrics: [
      {
        metric: "Pipeline Uptime",
        value: "99.8%",
        detail:
          "Resilient task retries and sensor polling eliminated manual restarts.",
      },
      {
        metric: "Release Velocity",
        value: "3x Faster",
        detail:
          "CI/CD automated testing replaced manual production DAG deployments.",
      },
    ],
    challenges: [
      {
        challenge:
          "Handling Long-Running Heavy ETL without Blocking Airflow Workers",
        solution:
          "Standard synchronous operators tied up Celery worker slots. Switched to asynchronous Airflow Sensors with deferrable operators that release worker slots while waiting on ADF jobs.",
      },
    ],
  },
  {
    id: "informatica-mdm-powerbi",
    name: "Enterprise Informatica MDM & Operational Power BI Dashboard",
    subtitle: "Golden Record Master Data Harmonization & Executive Scorecards",
    category: "Master Data Management & Business Intelligence",
    description:
      "Configured match-and-merge rule sets, survivorship logic, and trust scores in Informatica MDM to eliminate duplicate customer and product master records across disparate source systems. Designed 6+ interactive Power BI dashboards with DAX KPI models delivering real-time operational visibility.",
    tags: [
      { name: "informatica-mdm", color: "#38BDF8" },
      { name: "power-bi", color: "#38BDF8" },
      { name: "dax", color: "#94A3B8" },
      { name: "master-data", color: "#9b59b6" },
      { name: "sql", color: "#38BDF8" },
    ],
    image: "/img/projects/informatica-mdm-powerbi.svg",
    hldOverview:
      "Disparate enterprise systems (CRM, ERP, Billing, and Logistics) created severe duplicate customer profiles and conflicting master data entities. This project implemented an end-to-end Master Data Management (MDM) and operational intelligence architecture. Informatica MDM harmonizes incoming feeds through tokenization, fuzzy match rules, trust scores, and survivorship logic, creating a unified Golden Master Customer Record. A conformed Power BI reporting layer connects directly to curated data marts, delivering executive KPI visibility.",
    pillars: [
      {
        title: "Match & Merge Engine",
        description:
          "Configured deterministic and probabilistic fuzzy match rules (Jaro-Winkler distance) to detect duplicate entity variations across disparate systems.",
        tech: "Informatica MDM, Tokenization",
        icon: "fa-random",
      },
      {
        title: "Trust Scores & Survivorship",
        description:
          "Engineered attribute-level trust decay curves and survivorship rules prioritizing reliable source systems for name, address, and financial attributes.",
        tech: "Informatica Hub Console",
        icon: "fa-shield",
      },
      {
        title: "Data Quality & Golden Record",
        description:
          "Created consolidated Golden Master entities with cross-reference (XREF) tracking to preserve source system lineage and auditability.",
        tech: "SQL, Oracle, MDM Hub",
        icon: "fa-check-circle",
      },
      {
        title: "Executive Power BI Dashboards",
        description:
          "Constructed 6+ interactive Power BI reports with complex DAX measures, time-intelligence calculations, and row-level security for executive leadership.",
        tech: "Power BI, DAX, Star Schema",
        icon: "fa-bar-chart",
      },
    ],
    dataFlow: [
      {
        step: 1,
        phase: "Source Landing",
        title: "Heterogeneous Source Feeds Extracted",
        detail:
          "Customer and product data from Oracle ERP, Salesforce CRM, and legacy billing feeds extracted into staging tables.",
      },
      {
        step: 2,
        phase: "Tokenization",
        title: "Informatica MDM Tokenization & Match Keys",
        detail:
          "MDM Hub generates phonetic and alphanumeric match tokens (Search Level: Typical) to cluster candidate duplicate profiles.",
      },
      {
        step: 3,
        phase: "Match & Merge",
        title: "Automated Consolidation & Golden Record",
        detail:
          "High-confidence candidate pairs merged automatically; borderline matches queued for Data Steward review. Trust scores select winning field values.",
      },
      {
        step: 4,
        phase: "BI Consumption",
        title: "Golden Data Mart & Power BI Scorecards",
        detail:
          "Golden records published to reporting marts and visualized in Power BI with dynamic DAX metrics tracking customer acquisition and operational SLAs.",
      },
    ],
    slaMetrics: [
      {
        label: "Duplicate Reduction",
        value: "95% Reduction",
        detail:
          "Consolidated hundreds of thousands of redundant customer profiles into golden records.",
      },
      {
        label: "Report Latency",
        value: "Sub-Second",
        detail:
          "Optimized star schema relationships deliver instant dashboard interactivity.",
      },
      {
        label: "Data Accuracy",
        value: "99.4% Precision",
        detail:
          "Fuzzy matching and trust decay achieved high-precision entity resolution.",
      },
    ],
    lld: {
      storageTiering:
        "Staging tables (C_STG_*), base objects (C_B_CUSTOMER), and cross-reference tables (C_B_CUSTOMER_XREF) hosted on partitioned relational stores.",
      partitionStrategy:
        "Relational tables indexed on match token columns and primary foreign keys to maximize Informatica Hub batch match performance.",
      cdcStrategy:
        "Delta detection configured via source system changed_on timestamps and last update dates.",
      compactionAndOptimization: [
        "Tuned match rule paths to minimize match matrix combinatorial explosion.",
        "Optimized Power BI VertiPaq engine compression by eliminating high-cardinality datetime seconds.",
      ],
      qualityAndErrorHandling: [
        "Configured manual task manager queues for Data Stewards to inspect uncertain match scores (scores 75-84).",
        "Enforced strict address validation and standardized format rules prior to tokenization.",
      ],
    },
    codeSnippets: [
      {
        title: "Power BI DAX Time-Intelligence KPI Measure",
        filename: "executive_kpi_measures.dax",
        language: "sql",
        code: `// Active Customers Growth YoY with Golden Record Filter
Active Customers YoY % = 
VAR CurrentCustomers = 
    CALCULATE(
        DISTINCTCOUNT('Dim_Golden_Customer'[Customer_ID]),
        'Dim_Golden_Customer'[Status] = "Active"
    )
VAR PriorYearCustomers = 
    CALCULATE(
        DISTINCTCOUNT('Dim_Golden_Customer'[Customer_ID]),
        'Dim_Golden_Customer'[Status] = "Active",
        SAMEPERIODLASTYEAR('Dim_Date'[Date])
    )
RETURN
    DIVIDE(
        CurrentCustomers - PriorYearCustomers,
        PriorYearCustomers,
        0
    )

// Pipeline Feed SLA Adherence Metric
Feed SLA Adherence % = 
VAR TotalFeeds = COUNTROWS('Fact_Pipeline_Runs')
VAR SuccessfulOnTimeFeeds = 
    COUNTROWS(
        FILTER(
            'Fact_Pipeline_Runs',
            'Fact_Pipeline_Runs'[Status] = "SUCCESS" &&
            'Fact_Pipeline_Runs'[Duration_Minutes] <= 'Fact_Pipeline_Runs'[SLA_Threshold_Minutes]
        )
    )
RETURN
    DIVIDE(SuccessfulOnTimeFeeds, TotalFeeds, 1.0)`,
        explanation:
          "Production DAX measures computing Year-over-Year customer growth based strictly on unified Golden Records, and tracking production feed SLA adherence percentages.",
      },
    ],
    impactMetrics: [
      {
        metric: "Entity Resolution",
        value: "95% Duplicates Removed",
        detail:
          "Single golden record achieved across 4 disparate enterprise source systems.",
      },
      {
        metric: "Executive Visibility",
        value: "6 Dashboards",
        detail:
          "Power BI dashboards adopted by practice leadership and business stakeholders.",
      },
    ],
    challenges: [
      {
        challenge: "Conflicting Customer Attributes Across Systems",
        solution:
          "Salesforce had newer phone numbers while Oracle ERP had verified tax IDs. Configured attribute-level trust decay curves that favored ERP for financial fields and CRM for contact info.",
      },
    ],
  },
];
