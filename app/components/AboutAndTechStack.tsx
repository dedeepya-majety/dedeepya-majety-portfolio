"use client";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { cards, stats, SKILLS } from "@/app/data";
import type { Skill } from "@/app/types";

export default function AboutAndTechStack() {
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS[0]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      className="section-wrapper"
      ref={ref}
      style={{ scrollMarginTop: "90px" }}
    >
      <div className="section-inner">
        <SectionHeading title="About & Tech Stack" divider="light" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
            marginTop: "1.5rem",
          }}
        >
          {/* LEFT: About Cards */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <h3
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "var(--text)",
                fontSize: "1.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: "0 0 0.5rem",
                fontWeight: 700,
              }}
            >
              Core Engineering Focus
            </h3>
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--cyan)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "8px",
                    background: "rgba(56, 189, 248, 0.12)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className={`fa ${c.icon}`}
                    style={{ color: "var(--cyan)", fontSize: "1.1rem" }}
                  />
                </div>
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-montserrat), sans-serif",
                      color: "var(--text)",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      margin: "0 0 0.25rem",
                    }}
                  >
                    {c.title}
                  </h4>
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.85rem",
                      lineHeight: "1.55",
                      margin: 0,
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CENTER: Interactive Tech Stack Matrix */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            <div>
              <p
                style={{
                  color: "var(--cyan)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                Interactive Skills Matrix
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "var(--text)",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: "0.2rem 0 1rem",
                  fontWeight: 700,
                }}
              >
                Production Technologies
              </h3>
            </div>

            {/* Selected Skill Spotlight Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSkill.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(9, 18, 39, 0.95) 100%)",
                  border: `1.5px solid ${selectedSkill.color}`,
                  borderRadius: "12px",
                  padding: "1.5rem",
                  boxShadow: `0 8px 24px -4px ${selectedSkill.color}25`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "6px",
                      background: `${selectedSkill.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className={`fa ${selectedSkill.icon}`}
                      style={{ color: selectedSkill.color, fontSize: "1.1rem" }}
                    />
                  </div>
                  <div>
                    <h4
                      style={{
                        margin: 0,
                        color: "#fff",
                        fontFamily: "var(--font-montserrat), sans-serif",
                        fontSize: "1.05rem",
                        fontWeight: 700,
                      }}
                    >
                      {selectedSkill.label}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: selectedSkill.color,
                        fontWeight: 600,
                      }}
                    >
                      Active Production Competency
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "0.9rem",
                    lineHeight: "1.6",
                    margin: "0.75rem 0 0",
                  }}
                >
                  {selectedSkill.shortDescription}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Skills Pills Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                gap: "0.75rem",
                marginTop: "0.5rem",
              }}
            >
              {SKILLS.map((skill) => {
                const isSelected = selectedSkill.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    onMouseEnter={() => setSelectedSkill(skill)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      background: isSelected
                        ? `${skill.color}25`
                        : "rgba(255, 255, 255, 0.04)",
                      border: `1px solid ${isSelected ? skill.color : "rgba(255, 255, 255, 0.1)"}`,
                      color: isSelected ? "#fff" : "#94a3b8",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <i
                      className={`fa ${skill.icon}`}
                      style={{ color: skill.color, fontSize: "0.9rem" }}
                    />
                    <span>{skill.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Stats */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ textAlign: "center", marginBottom: "0.25rem" }}>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "var(--cyan)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Track Record & Milestones
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "var(--text)",
                  fontSize: "1.25rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  margin: 0,
                  fontWeight: 700,
                }}
              >
                Career Metrics
              </h3>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "0.75rem",
              }}
            >
              {stats.map((s, i) => {
                const CardWrapper = s.href ? "a" : "div";
                return (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                    style={{ height: "100%" }}
                  >
                    <CardWrapper
                      href={s.href}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        height: "100%",
                        minHeight: "130px",
                        background:
                          "linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(9, 18, 39, 0.95) 100%)",
                        border: s.highlight
                          ? "1px solid rgba(56, 189, 248, 0.3)"
                          : "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "12px",
                        padding: "1rem 0.65rem",
                        textDecoration: "none",
                        cursor: s.href ? "pointer" : "default",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      onMouseEnter={(e) => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.borderColor = "var(--cyan)";
                        target.style.transform = "translateY(-3px)";
                        target.style.boxShadow =
                          "0 8px 24px -4px rgba(6, 182, 212, 0.25)";
                      }}
                      onMouseLeave={(e) => {
                        const target = e.currentTarget as HTMLElement;
                        target.style.borderColor = s.highlight
                          ? "rgba(56, 189, 248, 0.3)"
                          : "rgba(255, 255, 255, 0.08)";
                        target.style.transform = "translateY(0)";
                        target.style.boxShadow = "none";
                      }}
                    >
                      {s.icon && (
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "6px",
                            background: "rgba(56, 189, 248, 0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "0.45rem",
                          }}
                        >
                          <i
                            className={`fa ${s.icon}`}
                            style={{
                              color: "var(--cyan)",
                              fontSize: "0.85rem",
                            }}
                          />
                        </div>
                      )}
                      <h4
                        style={{
                          color: "var(--cyan)",
                          fontSize: "1.65rem",
                          fontWeight: 800,
                          margin: 0,
                          fontFamily: "var(--font-montserrat), sans-serif",
                          letterSpacing: "-0.02em",
                          lineHeight: 1.15,
                        }}
                      >
                        {s.value}
                      </h4>
                      <p
                        style={{
                          color: "#f1f5f9",
                          fontSize: "0.78rem",
                          marginTop: "0.35rem",
                          marginBottom: 0,
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          fontWeight: 700,
                          lineHeight: 1.25,
                        }}
                      >
                        {s.label}
                      </p>
                      {s.sublabel && (
                        <span
                          style={{
                            color: "#94a3b8",
                            fontSize: "0.68rem",
                            marginTop: "0.25rem",
                            fontWeight: 500,
                            lineHeight: 1.2,
                          }}
                        >
                          {s.sublabel}
                        </span>
                      )}
                    </CardWrapper>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
