"use client";
import React, { useState } from "react";
import type { Job } from "@/app/types";
import { Modal } from "./Modal";

interface JobModalProps {
  job: Job | null;
  onClose: () => void;
}

type TabType = "architecture" | "solutions" | "stack";

export function JobModal({ job, onClose }: JobModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>("architecture");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Modal open={!!job} onClose={onClose} maxWidth="880px">
      {job && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              alignItems: "center",
              paddingRight: "2.5rem",
            }}
          >
            {job.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={job.logo}
                alt={job.company}
                style={{
                  maxWidth: "110px",
                  maxHeight: "52px",
                  objectFit: "contain",
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.03)",
                  padding: "4px 8px",
                  borderRadius: "8px",
                }}
              />
            )}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    color: "var(--text)",
                    fontSize: "1.35rem",
                    margin: 0,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                  }}
                >
                  {job.company}
                </h2>
                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: "rgba(24, 188, 156, 0.15)",
                    color: "var(--teal)",
                    fontWeight: 600,
                  }}
                >
                  {job.period}
                </span>
              </div>
              <p
                style={{
                  color: "var(--teal)",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  margin: "0.25rem 0 0",
                }}
              >
                {job.role}
              </p>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.78rem",
                  margin: "0.15rem 0 0",
                }}
              >
                {job.location}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              paddingBottom: "0.5rem",
              marginTop: "0.25rem",
            }}
          >
            <button
              onClick={() => setActiveTab("architecture")}
              style={{
                background:
                  activeTab === "architecture"
                    ? "var(--teal)"
                    : "rgba(255,255,255,0.05)",
                color: activeTab === "architecture" ? "#000" : "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 14px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              📐 Architecture &amp; Scale
            </button>
            <button
              onClick={() => setActiveTab("solutions")}
              style={{
                background:
                  activeTab === "solutions"
                    ? "var(--teal)"
                    : "rgba(255,255,255,0.05)",
                color: activeTab === "solutions" ? "#000" : "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 14px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              ⚡ Solutions &amp; Code ({job.solutions?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("stack")}
              style={{
                background:
                  activeTab === "stack"
                    ? "var(--teal)"
                    : "rgba(255,255,255,0.05)",
                color: activeTab === "stack" ? "#000" : "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "6px 14px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              🏆 Stack &amp; Recognition
            </button>
          </div>

          {/* TAB 1: Architecture & Scale */}
          {activeTab === "architecture" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Problem statement if available */}
              {job.problemStatement && (
                <div
                  style={{
                    background: "rgba(24, 188, 156, 0.06)",
                    border: "1px solid rgba(24, 188, 156, 0.3)",
                    borderRadius: "10px",
                    padding: "1rem 1.25rem",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "var(--teal)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "0.3rem",
                    }}
                  >
                    Engineering Challenge &amp; Bottleneck
                  </span>
                  <p
                    style={{
                      color: "#e2e8f0",
                      fontSize: "0.86rem",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {job.problemStatement}
                  </p>
                </div>
              )}

              {/* Architecture Diagram */}
              {job.diagram && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      System Architecture Diagram
                    </span>
                    <a
                      href={job.diagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--teal)",
                        fontSize: "0.75rem",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      View Full SVG ↗
                    </a>
                  </div>
                  <div
                    style={{
                      background: "#080e1a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      padding: "1rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={job.diagram}
                      alt={`${job.company} System Architecture`}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "340px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Metrics Grid */}
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--teal)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.6rem",
                  }}
                >
                  Verified Production Metrics
                </span>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "0.6rem",
                  }}
                >
                  {job.metrics.map((m, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "8px",
                        padding: "0.65rem 0.85rem",
                        fontSize: "0.82rem",
                        color: "#f1f5f9",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: "var(--teal)", fontWeight: 700 }}>
                        ✓
                      </span>
                      {m}
                    </div>
                  ))}
                </div>
              </div>

              {/* Overview text */}
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "0.88rem",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {job.overview}
              </p>
            </div>
          )}

          {/* TAB 2: Solutions & Code */}
          {activeTab === "solutions" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {job.solutions && job.solutions.length > 0 ? (
                job.solutions.map((sol, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "10px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "0.85rem 1.1rem",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      <h4
                        style={{
                          margin: 0,
                          fontSize: "0.95rem",
                          color: "var(--teal)",
                          fontFamily: "var(--font-montserrat), sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        {sol.title}
                      </h4>
                      <p
                        style={{
                          color: "var(--muted)",
                          fontSize: "0.82rem",
                          lineHeight: 1.5,
                          margin: "0.3rem 0 0",
                        }}
                      >
                        {sol.desc}
                      </p>
                    </div>

                    {sol.codeSnippet && (
                      <div
                        style={{ background: "#050914", position: "relative" }}
                      >
                        {sol.filename && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "0.4rem 1rem",
                              background: "rgba(255,255,255,0.04)",
                              borderBottom: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.72rem",
                                color: "#94a3b8",
                                fontFamily: "monospace",
                              }}
                            >
                              {sol.filename}
                            </span>
                            <button
                              onClick={() => copyCode(sol.codeSnippet!, i)}
                              style={{
                                background: "none",
                                border: "none",
                                color:
                                  copiedIndex === i ? "var(--teal)" : "#94a3b8",
                                fontSize: "0.72rem",
                                cursor: "pointer",
                                fontWeight: 600,
                              }}
                            >
                              {copiedIndex === i ? "Copied! ✓" : "Copy Code"}
                            </button>
                          </div>
                        )}
                        <pre
                          style={{
                            margin: 0,
                            padding: "0.85rem 1rem",
                            fontSize: "0.78rem",
                            lineHeight: 1.5,
                            color: "#38bdf8",
                            fontFamily:
                              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                            overflowX: "auto",
                          }}
                        >
                          <code>{sol.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p style={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                  Engineering highlights and responsibilities:
                </p>
              )}

              {/* Highlights List */}
              <div style={{ marginTop: "0.5rem" }}>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--teal)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.6rem",
                  }}
                >
                  Key Architectural Highlights
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.6rem",
                  }}
                >
                  {job.highlights.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "8px",
                        padding: "0.75rem 1rem",
                      }}
                    >
                      <strong
                        style={{
                          color: "#f8fafc",
                          fontSize: "0.84rem",
                          display: "block",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {h.label}
                      </strong>
                      <p
                        style={{
                          color: "var(--muted)",
                          fontSize: "0.8rem",
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
            </div>
          )}

          {/* TAB 3: Stack & Recognition */}
          {activeTab === "stack" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Recognition / Quotes */}
              {job.recognition && job.recognition.length > 0 && (
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--teal)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "0.6rem",
                    }}
                  >
                    Peer &amp; Leadership Testimonials
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                    }}
                  >
                    {job.recognition.map((rec, i) => (
                      <div
                        key={i}
                        style={{
                          background: "rgba(24, 188, 156, 0.05)",
                          borderLeft: "3px solid var(--teal)",
                          borderRadius: "4px 8px 8px 4px",
                          padding: "0.75rem 1rem",
                          fontSize: "0.84rem",
                          color: "#e2e8f0",
                          fontStyle: "italic",
                          lineHeight: 1.6,
                        }}
                      >
                        &ldquo;{rec}&rdquo;
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              <div>
                <span
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--teal)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.6rem",
                  }}
                >
                  Technology Stack
                </span>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}
                >
                  {job.stackList.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "6px",
                        padding: "4px 10px",
                        fontSize: "0.78rem",
                        color: "#f1f5f9",
                        fontWeight: 600,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
