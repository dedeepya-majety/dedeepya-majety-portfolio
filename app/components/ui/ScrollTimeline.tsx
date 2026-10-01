"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Job } from "@/app/types";
import { JobModal } from "./JobModal";

export function ScrollTimeline({ jobs }: { jobs: Job[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  useEffect(() => {
    if (lineRef.current) {
      setLineHeight(lineRef.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const filledHeight = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", paddingBottom: "2rem" }}
    >
      {/* Vertical track */}
      <div
        ref={lineRef}
        style={{
          position: "absolute",
          left: "1px",
          top: 0,
          bottom: 0,
          width: "2px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.12) 10%, rgba(255,255,255,0.12) 90%, transparent 100%)",
        }}
      >
        <motion.div
          style={{
            height: filledHeight,
            opacity: lineOpacity,
            width: "2px",
            background:
              "linear-gradient(to bottom, var(--teal) 0%, rgba(24,188,156,0.4) 80%, transparent 100%)",
            borderRadius: "2px",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </div>

      {jobs.map((job, i) => (
        <div
          key={`${job.company}-${job.role}-${job.period}`}
          style={{
            display: "flex",
            gap: "2rem",
            paddingTop: i === 0 ? "0.5rem" : "3rem",
            alignItems: "flex-start",
          }}
        >
          {/* Dot + sticky label */}
          <div
            style={{
              position: "sticky",
              top: "8rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              minWidth: "160px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "-23px",
                top: "6px",
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "var(--bg)",
                border: "2px solid var(--teal)",
                boxShadow: "0 0 8px rgba(24,188,156,0.5)",
              }}
            />
            <span
              style={{
                color: "var(--text)",
                fontWeight: 700,
                fontSize: "1rem",
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: 1.2,
                maxWidth: "150px",
                display: "inline-block",
              }}
            >
              {job.company}
            </span>
            <span
              style={{
                color: "var(--teal)",
                fontSize: "0.78rem",
                fontWeight: 600,
                marginTop: "0.35rem",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              {job.period}
            </span>
            {job.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={job.logo}
                alt={job.company}
                style={{
                  maxWidth: "135px",
                  maxHeight: "60px",
                  objectFit: "contain",
                  marginTop: "0.75rem",
                }}
              />
            )}
          </div>

          {/* Content card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="card-glass"
            onClick={() => setActiveJob(job)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveJob(job);
              }
            }}
            style={{
              flex: 1,
              cursor: "pointer",
              transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
              border: "1px solid var(--card-border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(24,188,156,0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 32px rgba(24,188,156,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--card-border)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
            }}
          >
            <p
              style={{
                color: "var(--teal)",
                fontWeight: 600,
                fontSize: "0.85rem",
                margin: "0 0 0.6rem",
              }}
            >
              {job.role}
            </p>
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.88rem",
                lineHeight: "1.7",
                margin: "0 0 0.6rem",
              }}
            >
              {job.desc}
            </p>
            <p
              style={{
                color: "#666",
                fontSize: "0.78rem",
                fontStyle: "italic",
                margin: "0 0 0.85rem",
              }}
            >
              {job.stack}
            </p>
            <p
              style={{
                color: "var(--teal)",
                fontSize: "0.74rem",
                fontWeight: 600,
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <i className="fa fa-plus-circle" style={{ fontSize: "0.8rem" }} />
              View details
            </p>
          </motion.div>
        </div>
      ))}

      <JobModal job={activeJob} onClose={() => setActiveJob(null)} />
    </div>
  );
}
