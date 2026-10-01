"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { Modal } from "@/app/components/ui/Modal";
import { recognitions } from "@/app/data";
import type { Recognition as RecognitionType } from "@/app/types";

const CATEGORIES = [
  { id: "all", label: "All Artifacts" },
  { id: "progression", label: "Career Progression Letters" },
  { id: "awards", label: "Executive Awards" },
  { id: "engineering", label: "Technical Excellence" },
  { id: "academic", label: "Academic Distinction" },
] as const;

export default function Recognition() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [index, setIndex] = useState(0);
  const [selectedProof, setSelectedProof] = useState<RecognitionType | null>(
    null,
  );

  const filtered =
    activeCategory === "all"
      ? recognitions
      : recognitions.filter((r) => r.category === activeCategory);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setIndex(0);
  };

  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const next = () => setIndex((i) => Math.min(i + 1, filtered.length - 1));
  const item = filtered[index] || filtered[0];

  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    flexShrink: 0,
    width: "44px",
    height: "64px",
    borderRadius: "6px",
    background: "rgba(56,189,248,0.12)",
    border: "2px solid var(--cyan)",
    color: "var(--cyan)",
    fontSize: "1.2rem",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.3 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  });

  return (
    <section id="recognition" className="section-wrapper">
      <div className="section-inner">
        <SectionHeading title="Recognition & Commendations" divider="light" />
        <p
          style={{
            color: "var(--muted)",
            fontSize: "0.9rem",
            marginTop: "-0.5rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background:
                "linear-gradient(135deg, rgba(24,188,156,0.2), rgba(56,189,248,0.2))",
              border: "1px solid rgba(24,188,156,0.4)",
              borderRadius: "20px",
              padding: "0.2rem 0.75rem",
              color: "var(--teal)",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.04em",
            }}
          >
            {recognitions.length} Verified Letters & Commendations
          </span>
          <span>from executive, HR & engineering leadership</span>
        </p>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            marginBottom: "1.5rem",
          }}
        >
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? recognitions.length
                : recognitions.filter((r) => r.category === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(24, 188, 156, 0.25) 100%)"
                    : "rgba(255, 255, 255, 0.04)",
                  border: isActive
                    ? "1px solid var(--cyan)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  color: isActive ? "#ffffff" : "var(--muted)",
                  boxShadow: isActive
                    ? "0 0 14px rgba(56, 189, 248, 0.25)"
                    : "none",
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    padding: "1px 6px",
                    borderRadius: "10px",
                    background: isActive
                      ? "rgba(56, 189, 248, 0.35)"
                      : "rgba(255, 255, 255, 0.08)",
                    color: isActive ? "#ffffff" : "var(--muted)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ position: "relative", marginTop: "0.5rem" }}>
          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous"
            className="hidden md:flex"
            style={{
              ...btnStyle(index === 0),
              position: "absolute",
              left: "-68px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            ◀
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              style={{
                background: "var(--card-bg)",
                border: "1px solid rgba(56,189,248,0.3)",
                borderRadius: "14px",
                padding: "2rem clamp(1.25rem, 4vw, 2.75rem)",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
              }}
            >
              {/* Badge */}
              {item.badge && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(56,189,248,0.15)",
                      color: "var(--cyan)",
                      border: "1px solid var(--cyan)",
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.badge}
                  </span>
                  {item.date && (
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.date}
                    </span>
                  )}
                </div>
              )}

              {/* Decorative quote mark */}
              <span
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1.5rem",
                  fontSize: "6rem",
                  lineHeight: 1,
                  color: "var(--cyan)",
                  opacity: 0.12,
                  fontFamily: "Georgia, serif",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                &ldquo;
              </span>

              <p
                style={{
                  color: "#e2e8f0",
                  fontSize: "1.05rem",
                  lineHeight: "1.85",
                  margin: "0 0 2rem",
                  whiteSpace: "pre-line",
                  position: "relative",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{item.quote}&rdquo;
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1.25rem",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: "1.25rem",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  {item.logo ? (
                    <div
                      style={{
                        width: "88px",
                        height: "40px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.logo}
                        alt={item.name || "Cognizant"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "rgba(56,189,248,0.13)",
                        border: "2px solid var(--cyan)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <i
                        className="fa fa-award"
                        style={{ color: "var(--cyan)", fontSize: "1.1rem" }}
                      />
                    </div>
                  )}
                  <div>
                    <p
                      style={{
                        color: "var(--text)",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        margin: 0,
                        fontFamily: "var(--font-montserrat), sans-serif",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        color: "var(--cyan)",
                        fontSize: "0.8rem",
                        margin: "0.15rem 0 0",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {item.title}
                    </p>
                  </div>
                </div>

                {/* View verified document button */}
                {item.image && (
                  <button
                    type="button"
                    onClick={() => setSelectedProof(item)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "9px",
                      padding: "9px 20px",
                      background:
                        "linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(24, 188, 156, 0.22) 100%)",
                      border: "1px solid #38bdf8",
                      borderRadius: "999px",
                      color: "#ffffff",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                      cursor: "pointer",
                      boxShadow:
                        "0 0 20px rgba(56, 189, 248, 0.35), inset 0 0 10px rgba(56, 189, 248, 0.15)",
                      transition: "all 0.25s ease",
                      outline: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, rgba(56, 189, 248, 0.45) 0%, rgba(24, 188, 156, 0.45) 100%)";
                      e.currentTarget.style.borderColor = "#7dd3fc";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.boxShadow =
                        "0 0 28px rgba(56, 189, 248, 0.75), inset 0 0 14px rgba(56, 189, 248, 0.3)";
                      e.currentTarget.style.transform =
                        "translateY(-2px) scale(1.02)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, rgba(56, 189, 248, 0.22) 0%, rgba(24, 188, 156, 0.22) 100%)";
                      e.currentTarget.style.borderColor = "#38bdf8";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.boxShadow =
                        "0 0 20px rgba(56, 189, 248, 0.35), inset 0 0 10px rgba(56, 189, 248, 0.15)";
                      e.currentTarget.style.transform =
                        "translateY(0) scale(1)";
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.background =
                        "linear-gradient(135deg, rgba(56, 189, 248, 0.6) 0%, rgba(24, 188, 156, 0.6) 100%)";
                      e.currentTarget.style.boxShadow =
                        "0 0 35px rgba(56, 189, 248, 0.95), inset 0 0 20px rgba(56, 189, 248, 0.5)";
                      e.currentTarget.style.color = "#ffffff";
                      e.currentTarget.style.transform =
                        "translateY(0) scale(0.98)";
                    }}
                  >
                    <i
                      className="fa fa-file-text-o"
                      style={{
                        color: "#38bdf8",
                        fontSize: "0.95rem",
                        filter: "drop-shadow(0 0 6px rgba(56,189,248,0.8))",
                      }}
                    />
                    <span
                      style={{
                        textShadow: "0 0 8px rgba(255,255,255,0.4)",
                      }}
                    >
                      View Letter / Artifact
                    </span>
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={index === filtered.length - 1}
            aria-label="Next"
            className="hidden md:flex"
            style={{
              ...btnStyle(index === filtered.length - 1),
              position: "absolute",
              right: "-68px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            ▶
          </button>
        </div>

        {/* Mobile Nav Buttons + Slide Dots */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1.25rem",
          }}
        >
          <button
            onClick={prev}
            disabled={index === 0}
            className="md:hidden"
            style={{
              padding: "6px 12px",
              background: "rgba(56,189,248,0.15)",
              border: "1px solid var(--cyan)",
              color: "var(--cyan)",
              borderRadius: "4px",
              cursor: index === 0 ? "not-allowed" : "pointer",
              opacity: index === 0 ? 0.3 : 1,
            }}
          >
            ◀
          </button>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  background:
                    i === index ? "var(--cyan)" : "rgba(255,255,255,0.25)",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={index === filtered.length - 1}
            className="md:hidden"
            style={{
              padding: "6px 12px",
              background: "rgba(56,189,248,0.15)",
              border: "1px solid var(--cyan)",
              color: "var(--cyan)",
              borderRadius: "4px",
              cursor: index === filtered.length - 1 ? "not-allowed" : "pointer",
              opacity: index === filtered.length - 1 ? 0.3 : 1,
            }}
          >
            ▶
          </button>
        </div>

        {/* Quick Jump Artifact Selector Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            justifyContent: "center",
            marginTop: "1.25rem",
            padding: "0 0.5rem",
          }}
        >
          {filtered.map((rec, i) => {
            const isSelected = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                style={{
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "0.78rem",
                  fontWeight: isSelected ? 700 : 500,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(56, 189, 248, 0.25) 0%, rgba(24, 188, 156, 0.25) 100%)"
                    : "rgba(255, 255, 255, 0.04)",
                  border: isSelected
                    ? "1px solid var(--cyan)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                  color: isSelected ? "#ffffff" : "#94a3b8",
                  boxShadow: isSelected
                    ? "0 0 12px rgba(56, 189, 248, 0.3)"
                    : "none",
                }}
              >
                <span>{rec.badge || `Artifact ${i + 1}`}</span>
                {rec.date && (
                  <span
                    style={{
                      marginLeft: "6px",
                      opacity: 0.65,
                      fontSize: "0.72rem",
                    }}
                  >
                    ({rec.date.split(" ")[0]})
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Lightbox Modal for Verification */}
        {selectedProof && selectedProof.image && (
          <Modal
            open={!!selectedProof}
            onClose={() => setSelectedProof(null)}
            maxWidth="900px"
          >
            <div style={{ padding: "0.5rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "1rem",
                }}
              >
                {selectedProof.logo && (
                  <div
                    style={{
                      width: "70px",
                      height: "32px",
                      borderRadius: "6px",
                      overflow: "hidden",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedProof.logo}
                      alt={selectedProof.name || "Cognizant"}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
                <span
                  style={{
                    background: "rgba(56,189,248,0.15)",
                    color: "var(--cyan)",
                    border: "1px solid var(--cyan)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  {selectedProof.badge || "Verified Artifact"}
                </span>
                <h3
                  style={{
                    margin: 0,
                    color: "#fff",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                  }}
                >
                  {selectedProof.title}
                </h3>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#0f172a",
                }}
              >
                <Image
                  src={selectedProof.image}
                  alt={selectedProof.name}
                  width={1200}
                  height={800}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                  marginTop: "1rem",
                  lineHeight: "1.6",
                }}
              >
                {selectedProof.quote}
              </p>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}
