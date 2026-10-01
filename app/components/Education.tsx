"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { EducationModal } from "@/app/components/ui/EducationModal";
import { degrees, type Degree } from "@/app/data";

export default function Education() {
  const [activeDegree, setActiveDegree] = useState<Degree | null>(null);

  return (
    <section
      id="education"
      className="section-wrapper"
      style={{ color: "var(--text)" }}
    >
      <div className="section-inner">
        <SectionHeading title="Education & Academic Honors" divider="light" />

        <div
          style={{
            position: "relative",
            paddingBottom: "2rem",
            marginTop: "1rem",
          }}
        >
          {/* Vertical track */}
          <div
            style={{
              position: "absolute",
              left: "1px",
              top: 0,
              bottom: 0,
              width: "2px",
              background:
                "linear-gradient(to bottom, transparent 0%, rgba(56,189,248,0.2) 10%, rgba(56,189,248,0.2) 90%, transparent 100%)",
            }}
          />

          {degrees.map((d, i) => (
            <div
              key={d.shortName}
              style={{
                display: "flex",
                gap: "2rem",
                paddingTop: i === 0 ? "0.5rem" : "3rem",
                alignItems: "flex-start",
                flexWrap: "wrap",
              }}
            >
              {/* Dot + sticky label + logo (left column) */}
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
                    border: "2px solid var(--cyan)",
                    boxShadow: "0 0 8px rgba(56,189,248,0.5)",
                  }}
                />
                <span
                  style={{
                    color: "var(--text)",
                    fontWeight: 700,
                    fontSize: "1rem",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    lineHeight: 1.2,
                    maxWidth: "140px",
                    display: "inline-block",
                  }}
                >
                  {d.shortName}
                </span>
                <span
                  style={{
                    color: "var(--cyan)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    marginTop: "0.25rem",
                  }}
                >
                  {d.period}
                </span>
                <div
                  style={{
                    marginTop: "0.75rem",
                    width: "135px",
                    height: "55px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={d.logo}
                    alt={d.shortName}
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>

              {/* Content card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="card-glass"
                onClick={() => setActiveDegree(d)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveDegree(d);
                  }
                }}
                style={{
                  flex: 1,
                  minWidth: "280px",
                  cursor: "pointer",
                  transition:
                    "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "14px",
                  padding: "1.75rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--cyan)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(56,189,248,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "var(--cyan)",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        margin: "0 0 0.4rem",
                      }}
                    >
                      {d.degree}
                    </p>
                    <p
                      style={{
                        color: "var(--text)",
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                        margin: "0 0 0.35rem",
                        lineHeight: 1.25,
                      }}
                    >
                      {d.institution}
                    </p>
                  </div>
                  <span
                    style={{
                      background: "rgba(56,189,248,0.12)",
                      color: "var(--cyan)",
                      border: "1px solid var(--cyan)",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                    }}
                  >
                    CGPA {d.gpa}
                  </span>
                </div>

                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.82rem",
                    margin: "0.25rem 0 0.75rem",
                  }}
                >
                  {d.location}
                </p>

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                    margin: "0 0 0.85rem",
                  }}
                >
                  {d.overview}
                </p>

                {/* Highlight chips */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginBottom: "1rem",
                  }}
                >
                  {d.highlights.slice(0, 3).map((h, j) => (
                    <span
                      key={j}
                      style={{
                        color: "var(--cyan)",
                        fontSize: "0.72rem",
                        background: "rgba(56,189,248,0.08)",
                        border: "1px solid rgba(56,189,248,0.25)",
                        borderRadius: "4px",
                        padding: "0.25rem 0.55rem",
                        fontWeight: 600,
                      }}
                    >
                      {h.label}
                    </span>
                  ))}
                </div>

                <p
                  style={{
                    color: "var(--cyan)",
                    fontSize: "0.76rem",
                    fontWeight: 600,
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <i
                    className="fa fa-plus-circle"
                    style={{ fontSize: "0.8rem" }}
                  />
                  View Academic Highlights & Coursework
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <EducationModal
        degree={activeDegree}
        onClose={() => setActiveDegree(null)}
      />
    </section>
  );
}
