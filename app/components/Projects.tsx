"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Tilt } from "react-tilt";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { ProjectModal } from "@/app/components/ui/ProjectModal";
import { projects, type Project } from "@/app/data";

function ProjectCard({
  project,
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: (p: Project) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
    >
      <Tilt options={{ max: 12, scale: 1.02, speed: 450 }}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => onSelect(project)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelect(project);
            }
          }}
          style={{
            background: "#0d1526",
            borderRadius: "1rem",
            padding: "1.25rem",
            width: "360px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            cursor: "pointer",
            textAlign: "left",
            transition: "border-color 0.25s ease, box-shadow 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
            e.currentTarget.style.boxShadow =
              "0 12px 36px rgba(56, 189, 248, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.4)";
          }}
        >
          <div>
            {/* Image Banner */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "190px",
                borderRadius: "0.75rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "#091227",
              }}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                style={{ objectFit: "cover" }}
                sizes="360px"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                  padding: "0.75rem",
                }}
              >
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub source"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.75)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="fa fa-github"
                      style={{ color: "#fff", fontSize: "16px" }}
                    />
                  </a>
                )}
                {project.deploy && (
                  <a
                    href={project.deploy}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live verification / demo"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.75)",
                      border: "1px solid var(--cyan)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="fa fa-external-link"
                      style={{ color: "var(--cyan)", fontSize: "14px" }}
                    />
                  </a>
                )}
              </div>
            </div>

            {/* Body */}
            <div style={{ marginTop: "1.25rem" }}>
              <span
                style={{
                  fontSize: "0.68rem",
                  color: "var(--cyan)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 700,
                  display: "block",
                  marginBottom: "0.3rem",
                }}
              >
                {project.category}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "var(--text)",
                  fontSize: "1rem",
                  margin: "0 0 0.5rem",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  lineHeight: 1.35,
                }}
              >
                {project.name}
              </h3>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {project.description}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div style={{ marginTop: "1rem" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.45rem",
              }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag.name}
                  style={{
                    color: tag.color,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    background: "rgba(255,255,255,0.03)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  #{tag.name}
                </span>
              ))}
            </div>

            {/* View Details Callout */}
            <div
              style={{
                marginTop: "1.1rem",
                paddingTop: "0.85rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  color: "var(--cyan)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <i
                  className="fa fa-plus-circle"
                  style={{ fontSize: "0.85rem" }}
                />
                View Details &amp; HLD
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#94A3B8",
                  fontWeight: 600,
                }}
              >
                Deep-Dive Spec
              </span>
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

function ProjectListRow({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.1rem 1rem",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        cursor: "pointer",
        transition: "background 0.2s ease, border-color 0.2s ease",
        background: hovered ? "rgba(56,189,248,0.06)" : "transparent",
        borderRadius: "8px",
      }}
    >
      <div style={{ flex: "0 0 280px" }}>
        <span
          style={{
            fontSize: "0.68rem",
            color: "var(--cyan)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            fontWeight: 700,
            display: "block",
            marginBottom: "2px",
          }}
        >
          {project.category}
        </span>
        <span
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            color: hovered ? "var(--cyan)" : "var(--text)",
            fontSize: "0.95rem",
            fontWeight: 700,
            transition: "color 0.2s",
            display: "block",
          }}
        >
          {project.name}
        </span>
      </div>

      <span
        style={{
          color: "#94a3b8",
          fontSize: "0.84rem",
          flex: 1,
          padding: "0 1.5rem",
          lineHeight: 1.5,
        }}
      >
        {project.description}
      </span>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flex: "0 0 240px",
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {project.tags.slice(0, 2).map((t) => (
            <span
              key={t.name}
              style={{ color: t.color, fontSize: "0.72rem", fontWeight: 600 }}
            >
              #{t.name}
            </span>
          ))}
        </div>

        <span
          style={{
            color: "var(--cyan)",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
            display: "inline-flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <i className="fa fa-plus-circle" />
          HLD
        </span>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 12, stiffness: 60 });
  const springY = useSpring(y, { damping: 12, stiffness: 60 });

  const handleMouseMove = (e: React.MouseEvent) => {
    x.set(e.clientX + 24);
    y.set(e.clientY + 16);
  };

  return (
    <section id="portfolio" className="section-wrapper">
      <div className="section-inner">
        <SectionHeading
          title="Featured Projects"
          subtitle="Enterprise Cloud Data Engineering"
          mb="1rem"
        />
        <p
          style={{
            color: "#94a3b8",
            fontSize: "1rem",
            lineHeight: "1.7",
            textAlign: "center",
            marginBottom: "1.75rem",
          }}
        >
          Enterprise Lakehouse platforms, Delta Lake medallion architectures,
          and automated cloud ETL orchestration. Click any project to inspect
          the High-Level Design (HLD), Low-Level Design (LLD), and production
          code.
        </p>

        {/* View toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          {(["grid", "list"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "0.4rem 1.1rem",
                borderRadius: "99px",
                border: "1px solid",
                borderColor:
                  view === v ? "var(--cyan)" : "rgba(255,255,255,0.15)",
                background:
                  view === v ? "rgba(56,189,248,0.12)" : "transparent",
                color: view === v ? "var(--cyan)" : "#94a3b8",
                fontSize: "0.8rem",
                fontWeight: 600,
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "all 0.2s",
              }}
            >
              <i
                className={`fa fa-${v === "grid" ? "th" : "list"}`}
                style={{ marginRight: "0.4rem" }}
              />
              {v}
            </button>
          ))}
        </div>

        {view === "grid" ? (
          <div
            ref={ref}
            className="section-body"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.75rem",
              justifyContent: "center",
            }}
          >
            {projects.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        ) : (
          <div onMouseMove={handleMouseMove} style={{ position: "relative" }}>
            {projects.map((project) => (
              <div
                key={project.name}
                onMouseEnter={() => setPreview(project.image)}
                onMouseLeave={() => setPreview(null)}
              >
                <ProjectListRow
                  project={project}
                  onSelect={setSelectedProject}
                />
              </div>
            ))}
            {preview && (
              <motion.div
                style={{
                  x: springX,
                  y: springY,
                  position: "fixed",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                  zIndex: 50,
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                  width: "320px",
                  height: "200px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <Image
                  src={preview}
                  alt="preview"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="320px"
                />
              </motion.div>
            )}
          </div>
        )}

        {/* PROJECT DEEP DIVE MODAL */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
