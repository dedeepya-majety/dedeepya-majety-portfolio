"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PipelineStage = "bronze" | "silver" | "gold";

interface StageInfo {
  id: PipelineStage;
  title: string;
  badge: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  source: string;
  target: string;
  throughput: string;
  description: string;
  features: string[];
  sampleQuery: string;
}

const STAGES: Record<PipelineStage, StageInfo> = {
  bronze: {
    id: "bronze",
    title: "Bronze Layer",
    badge: "Raw Ingestion",
    color: "#F59E0B",
    bgColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.35)",
    icon: "fa-database",
    source: "ADLS Gen2 / Kafka / ERP",
    target: "delta/bronze_raw",
    throughput: "145,000 rec/sec",
    description:
      "Automated streaming ingestion via Databricks Auto Loader. Preserves raw payload immutability with automated schema inference and evolution.",
    features: [
      "Auto Loader cloudFiles ingestion",
      "Immutable raw audit log preservation",
      "Schema inference and rescued data column",
    ],
    sampleQuery:
      "spark.readStream.format('cloudFiles').option('cloudFiles.format', 'json').load(adls_path)",
  },
  silver: {
    id: "silver",
    title: "Silver Layer",
    badge: "Cleansed & Conformed",
    color: "#38BDF8",
    bgColor: "rgba(56, 189, 248, 0.1)",
    borderColor: "rgba(56, 189, 248, 0.35)",
    icon: "fa-cogs",
    source: "delta/bronze_raw",
    target: "delta/silver_curated",
    throughput: "98,400 rec/sec",
    description:
      "Distributed PySpark transformations, quality rule enforcement, deduplication, and Delta Lake ACID MERGE INTO upserts.",
    features: [
      "Delta Lake ACID MERGE INTO upserts",
      "PySpark data cleansing and schema enforcement",
      "Partition pruning and broadcast join tuning",
    ],
    sampleQuery:
      "deltaTable.alias('t').merge(updates.alias('s'), 't.id = s.id').whenMatchedUpdateAll().execute()",
  },
  gold: {
    id: "gold",
    title: "Gold Layer",
    badge: "Business Aggregates",
    color: "#FACC15",
    bgColor: "rgba(250, 204, 21, 0.1)",
    borderColor: "rgba(250, 204, 21, 0.35)",
    icon: "fa-trophy",
    source: "delta/silver_curated",
    target: "gold_reporting_marts",
    throughput: "42,100 rec/sec",
    description:
      "Dimensional star schema models, golden record MDM harmonization, and high-performance DAX consumption for Power BI executive dashboards.",
    features: [
      "Star schema fact and dimensional tables",
      "Golden master customer/product entities",
      "Sub-second Power BI and DAX semantic layer",
    ],
    sampleQuery:
      "OPTIMIZE delta.`/mnt/gold/sales_mart` ZORDER BY (transaction_date, region_id)",
  },
};

export default function CognizantDatabricksEngine() {
  const [activeStage, setActiveStage] = useState<PipelineStage>("silver");
  const [recordsCount, setRecordsCount] = useState(1482930);
  const [isLive, setIsLive] = useState(true);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [isCompacting, setIsCompacting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live records counter simulation
  useEffect(() => {
    if (!isLive) return;
    const interval = setInterval(() => {
      setRecordsCount((prev) => prev + Math.floor(Math.random() * 45) + 15);
    }, 280);
    return () => clearInterval(interval);
  }, [isLive]);

  // Canvas particle stream animation across stages
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    interface Particle {
      x: number;
      y: number;
      speed: number;
      size: number;
      stage: number;
      hue: number;
      alpha: number;
    }

    const particles: Particle[] = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: 35 + Math.random() * (height - 70),
      speed: 1.2 + Math.random() * 2.2,
      size: 1.5 + Math.random() * 2.5,
      stage: 0,
      hue: 200,
      alpha: 0.3 + Math.random() * 0.7,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle conduit tracks
      const y1 = height * 0.32;
      const y2 = height * 0.5;
      const y3 = height * 0.68;

      [y1, y2, y3].forEach((yPos) => {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 6]);
        ctx.moveTo(10, yPos);
        ctx.lineTo(width - 10, yPos);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Update and draw streaming data packets
      particles.forEach((p) => {
        p.x += isLive ? p.speed : p.speed * 0.2;
        if (p.x > width) {
          p.x = 0;
          p.y = 25 + Math.random() * (height - 50);
        }

        // Color transition based on pipeline progress
        const progress = p.x / width;
        let color = "#F59E0B"; // Bronze
        if (progress > 0.33 && progress <= 0.66) {
          color = "#38BDF8"; // Silver
        } else if (progress > 0.66) {
          color = "#FACC15"; // Gold
        }

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLive]);

  const triggerMergeAction = () => {
    setActionNotice("Executing Delta Lake ACID MERGE INTO upsert...");
    setTimeout(() => {
      setActionNotice("MERGE SUCCESSFUL: 4,820 rows updated, 1,290 inserted");
      setTimeout(() => setActionNotice(null), 3200);
    }, 900);
  };

  const triggerOptimizeAction = () => {
    setIsCompacting(true);
    setActionNotice("Running OPTIMIZE & Z-ORDER compaction on Delta Lake...");
    setTimeout(() => {
      setIsCompacting(false);
      setActionNotice(
        "OPTIMIZED: Compacted 64 small Parquet files into 4 partition files",
      );
      setTimeout(() => setActionNotice(null), 3200);
    }, 1200);
  };

  const currentStage = STAGES[activeStage];

  return (
    <div
      style={{
        width: "100%",
        background:
          "linear-gradient(135deg, rgba(10, 20, 42, 0.95) 0%, rgba(6, 12, 28, 0.98) 100%)",
        border: "1px solid rgba(56, 189, 248, 0.3)",
        borderRadius: "16px",
        padding: "1.25rem",
        boxShadow:
          "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 35px rgba(56, 189, 248, 0.12)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-lato), sans-serif",
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255, 54, 33, 0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          left: "-40px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* TOP HEADER: Cognizant & Databricks Badges */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Cognizant badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(0, 51, 160, 0.25)",
              border: "1px solid rgba(0, 114, 206, 0.45)",
              color: "#60A5FA",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            <i className="fa fa-building-o" style={{ fontSize: "0.78rem" }} />
            <span>COGNIZANT</span>
          </div>

          {/* Databricks badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "rgba(255, 54, 33, 0.15)",
              border: "1px solid rgba(255, 54, 33, 0.4)",
              color: "#FF7A6B",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            <i
              className="fa fa-database"
              style={{ fontSize: "0.78rem", color: "#FF3621" }}
            />
            <span>DATABRICKS LAKEHOUSE</span>
          </div>
        </div>

        {/* Live Status indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: isLive ? "#10B981" : "#F59E0B",
              boxShadow: isLive ? "0 0 10px #10B981" : "none",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              color: isLive ? "#10B981" : "#94A3B8",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {isLive ? "Cluster Active" : "Paused"}
          </span>
          <button
            onClick={() => setIsLive(!isLive)}
            aria-label={isLive ? "Pause simulation" : "Resume simulation"}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "#CBD5E1",
              borderRadius: "4px",
              padding: "2px 8px",
              fontSize: "0.7rem",
              cursor: "pointer",
            }}
          >
            <i className={`fa ${isLive ? "fa-pause" : "fa-play"}`} />
          </button>
        </div>
      </div>

      {/* TELEMETRY HUD BAR */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.5rem",
          margin: "1rem 0",
          background: "rgba(15, 23, 42, 0.6)",
          padding: "0.65rem 0.85rem",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.06)",
        }}
      >
        <div>
          <span
            style={{ fontSize: "0.68rem", color: "#94A3B8", display: "block" }}
          >
            Total Ingested
          </span>
          <span
            style={{
              fontSize: "0.95rem",
              fontWeight: 800,
              color: "var(--cyan)",
              fontFamily: "monospace",
            }}
          >
            {recordsCount.toLocaleString()}
          </span>
        </div>
        <div>
          <span
            style={{ fontSize: "0.68rem", color: "#94A3B8", display: "block" }}
          >
            Delta Engine
          </span>
          <span
            style={{
              fontSize: "0.95rem",
              fontWeight: 800,
              color: "#38BDF8",
              fontFamily: "monospace",
            }}
          >
            Spark 3.5.0
          </span>
        </div>
        <div>
          <span
            style={{ fontSize: "0.68rem", color: "#94A3B8", display: "block" }}
          >
            SLA Adherence
          </span>
          <span
            style={{
              fontSize: "0.95rem",
              fontWeight: 800,
              color: "#10B981",
              fontFamily: "monospace",
            }}
          >
            99.8% Uptime
          </span>
        </div>
      </div>

      {/* ANIMATED PIPELINE CANVAS STREAM */}
      <div
        style={{
          position: "relative",
          height: "75px",
          borderRadius: "8px",
          background: "rgba(3, 7, 18, 0.5)",
          border: "1px solid rgba(56, 189, 248, 0.2)",
          marginBottom: "1rem",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
        {/* Stage overlays on canvas */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1rem",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#F59E0B",
              background: "rgba(245, 158, 11, 0.15)",
              padding: "2px 8px",
              borderRadius: "4px",
              border: "1px solid rgba(245, 158, 11, 0.3)",
            }}
          >
            Bronze Ingest
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#38BDF8",
              background: "rgba(56, 189, 248, 0.15)",
              padding: "2px 8px",
              borderRadius: "4px",
              border: "1px solid rgba(56, 189, 248, 0.3)",
            }}
          >
            Silver Merge
          </span>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#FACC15",
              background: "rgba(250, 204, 21, 0.15)",
              padding: "2px 8px",
              borderRadius: "4px",
              border: "1px solid rgba(250, 204, 21, 0.3)",
            }}
          >
            Gold Marts
          </span>
        </div>
      </div>

      {/* INTERACTIVE MEDALLION STAGE SELECTOR */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        {(["bronze", "silver", "gold"] as const).map((stageKey) => {
          const s = STAGES[stageKey];
          const isSelected = activeStage === stageKey;
          return (
            <button
              key={stageKey}
              onClick={() => setActiveStage(stageKey)}
              style={{
                background: isSelected
                  ? s.bgColor
                  : "rgba(255, 255, 255, 0.03)",
                border: isSelected
                  ? `1.5px solid ${s.color}`
                  : "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                padding: "0.6rem 0.5rem",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease",
                boxShadow: isSelected ? `0 0 16px ${s.bgColor}` : "none",
              }}
            >
              <i
                className={`fa ${s.icon}`}
                style={{
                  color: isSelected ? s.color : "#94A3B8",
                  fontSize: "1rem",
                  marginBottom: "4px",
                  display: "block",
                }}
              />
              <span
                style={{
                  display: "block",
                  color: isSelected ? "#FFFFFF" : "#CBD5E1",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                {s.title.split(" ")[0]}
              </span>
              <span
                style={{
                  display: "block",
                  color: isSelected ? s.color : "#64748B",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                }}
              >
                {s.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE STAGE DETAIL CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          style={{
            background: "rgba(15, 23, 42, 0.7)",
            border: `1px solid ${currentStage.borderColor}`,
            borderRadius: "10px",
            padding: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
              flexWrap: "wrap",
              gap: "6px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  color: currentStage.color,
                  fontWeight: 800,
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "0.95rem",
                }}
              >
                {currentStage.title}
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  background: currentStage.bgColor,
                  color: currentStage.color,
                  fontWeight: 700,
                }}
              >
                {currentStage.throughput}
              </span>
            </div>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#94A3B8",
                fontFamily: "monospace",
              }}
            >
              target: {currentStage.target}
            </span>
          </div>

          <p
            style={{
              fontSize: "0.82rem",
              color: "#CBD5E1",
              lineHeight: 1.5,
              margin: "0 0 0.75rem",
            }}
          >
            {currentStage.description}
          </p>

          {/* Key capability bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {currentStage.features.map((feat) => (
              <div
                key={feat}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                  fontSize: "0.75rem",
                  color: "#94A3B8",
                }}
              >
                <i
                  className="fa fa-check"
                  style={{
                    color: currentStage.color,
                    fontSize: "0.7rem",
                    marginTop: "3px",
                  }}
                />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Live Code/Query snippet */}
          <div
            style={{
              marginTop: "0.75rem",
              background: "rgba(3, 7, 18, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "6px",
              padding: "0.5rem 0.75rem",
              fontFamily: "monospace",
              fontSize: "0.7rem",
              color: "#38BDF8",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "#F59E0B" }}>&gt;&gt;</span>{" "}
            {currentStage.sampleQuery}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ACTION NOTICE TOAST */}
      <AnimatePresence>
        {actionNotice && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid #10B981",
              color: "#A7F3D0",
              fontSize: "0.75rem",
              fontWeight: 600,
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <i className="fa fa-check-circle" style={{ color: "#10B981" }} />
            <span>{actionNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* INTERACTIVE ACTION BUTTONS */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={triggerMergeAction}
          style={{
            flex: 1,
            minWidth: "140px",
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
            background:
              "linear-gradient(135deg, rgba(56, 189, 248, 0.2) 0%, rgba(14, 116, 144, 0.3) 100%)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            color: "#E0F2FE",
            fontSize: "0.75rem",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "var(--cyan)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)")
          }
        >
          <i className="fa fa-random" style={{ color: "var(--cyan)" }} />
          <span>Trigger Delta MERGE</span>
        </button>

        <button
          onClick={triggerOptimizeAction}
          disabled={isCompacting}
          style={{
            flex: 1,
            minWidth: "140px",
            padding: "0.5rem 0.75rem",
            borderRadius: "6px",
            background:
              "linear-gradient(135deg, rgba(255, 54, 33, 0.15) 0%, rgba(185, 28, 28, 0.25) 100%)",
            border: "1px solid rgba(255, 54, 33, 0.35)",
            color: "#FFE4E6",
            fontSize: "0.75rem",
            fontWeight: 700,
            cursor: isCompacting ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            opacity: isCompacting ? 0.6 : 1,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255, 54, 33, 0.7)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "rgba(255, 54, 33, 0.35)")
          }
        >
          <i
            className={`fa ${isCompacting ? "fa-refresh fa-spin" : "fa-magic"}`}
            style={{ color: "#FF7A6B" }}
          />
          <span>
            {isCompacting ? "Compacting..." : "Run OPTIMIZE & Z-ORDER"}
          </span>
        </button>
      </div>

      {/* FOOTER: Cognizant Delivery Track Record */}
      <div
        style={{
          marginTop: "1rem",
          paddingTop: "0.75rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "0.7rem",
          color: "#94A3B8",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        <span>
          <strong style={{ color: "#E2E8F0" }}>Cognizant Verified:</strong> 40+
          Workflows Migrated
        </span>
        <span style={{ color: "var(--cyan)" }}>
          40% Speedup · ~30% Cloud Cost Savings
        </span>
      </div>
    </div>
  );
}
