"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Tilt } from "react-tilt";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { projects, type Project } from "@/app/data";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
    >
      <Tilt options={{ max: 15, scale: 1.02, speed: 450 }}>
        <div
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
          }}
        >
          <div>
            {/* Image */}
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
              <h3
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "var(--text)",
                  fontSize: "1rem",
                  margin: "0 0 0.5rem",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
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
          <div
            style={{
              marginTop: "1.25rem",
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
        </div>
      </Tilt>
    </motion.div>
  );
}

function ProjectListRow({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.1rem 0",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        cursor: "default",
        transition: "background 0.2s",
        background: hovered ? "rgba(56,189,248,0.05)" : "transparent",
        borderRadius: "6px",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-montserrat), sans-serif",
          color: hovered ? "var(--cyan)" : "var(--text)",
          fontSize: "0.95rem",
          fontWeight: 700,
          transition: "color 0.2s",
          flex: "0 0 280px",
        }}
      >
        {project.name}
      </span>
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
          gap: "0.4rem",
          flexWrap: "wrap",
          justifyContent: "flex-end",
          flex: "0 0 220px",
        }}
      >
        {project.tags.slice(0, 3).map((t) => (
          <span
            key={t.name}
            style={{ color: t.color, fontSize: "0.72rem", fontWeight: 600 }}
          >
            #{t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [preview, setPreview] = useState<string | null>(null);

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
          subtitle="Enterprise & Research"
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
          Production-grade distributed backends, aviation telemetry
          architectures, and deep learning patent implementations.
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
              <ProjectCard key={project.name} project={project} index={i} />
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
                <ProjectListRow project={project} />
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
      </div>
    </section>
  );
}
