"use client";
import Image from "next/image";
import type { Degree } from "@/app/data";
import { Modal } from "./Modal";

interface EducationModalProps {
  degree: Degree | null;
  onClose: () => void;
}

export function EducationModal({ degree, onClose }: EducationModalProps) {
  return (
    <Modal open={!!degree} onClose={onClose}>
      {degree && (
        <>
          {/* Header */}
          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              alignItems: "flex-start",
              marginBottom: "1.5rem",
              flexWrap: "wrap",
              paddingRight: "2.5rem",
            }}
          >
            <Image
              src={degree.logo}
              alt={degree.shortName}
              width={80}
              height={80}
              style={{
                objectFit: "contain",
                borderRadius: "8px",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: "200px" }}>
              <h3
                style={{
                  color: "var(--text)",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  margin: "0 0 0.35rem",
                  lineHeight: 1.2,
                }}
              >
                {degree.degree}
              </h3>
              <p
                style={{
                  color: "var(--teal)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  margin: "0 0 0.25rem",
                }}
              >
                {degree.institution}
              </p>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.8rem",
                  margin: 0,
                }}
              >
                {degree.period} · {degree.location} · GPA {degree.gpa}
              </p>
            </div>
          </div>

          {/* Overview */}
          <p
            style={{
              color: "#ddd",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              margin: "0 0 1.5rem",
            }}
          >
            {degree.overview}
          </p>

          {/* Highlights */}
          <div style={{ marginBottom: "1.5rem" }}>
            <h4
              style={{
                color: "var(--teal)",
                fontSize: "0.78rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                margin: "0 0 0.85rem",
              }}
            >
              Key Highlights
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.85rem",
              }}
            >
              {degree.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{
                    padding: "0.85rem 1rem",
                    background: "rgba(24,188,156,0.06)",
                    border: "1px solid rgba(24,188,156,0.15)",
                    borderRadius: "8px",
                  }}
                >
                  <p
                    style={{
                      color: "var(--teal)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      margin: "0 0 0.3rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {h.label}
                  </p>
                  <p
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.82rem",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {h.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          {degree.projects.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h4
                style={{
                  color: "var(--teal)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  margin: "0 0 0.6rem",
                }}
              >
                Notable Projects
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {degree.projects.map((p, i) => (
                  <li
                    key={i}
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      paddingLeft: "1.25rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.35rem",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--teal)",
                      }}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Coursework */}
          {degree.coursework.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h4
                style={{
                  color: "var(--teal)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  margin: "0 0 0.6rem",
                }}
              >
                Coursework
              </h4>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                }}
              >
                {degree.coursework.map((c, i) => (
                  <span
                    key={i}
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.78rem",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "4px",
                      padding: "0.3rem 0.65rem",
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Achievements */}
          {degree.achievements.length > 0 && (
            <div>
              <h4
                style={{
                  color: "var(--teal)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  margin: "0 0 0.6rem",
                }}
              >
                Achievements
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                {degree.achievements.map((a, i) => (
                  <li
                    key={i}
                    style={{
                      color: "var(--muted)",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      paddingLeft: "1.25rem",
                      position: "relative",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "0.35rem",
                        color: "var(--teal)",
                        fontSize: "0.8rem",
                      }}
                    >
                      ★
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
