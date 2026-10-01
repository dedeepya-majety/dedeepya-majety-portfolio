"use client";

import React, { useState } from "react";
import type { Project } from "@/app/data/projects";
import { Modal } from "./Modal";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

type ProjectTabType = "hld" | "lld" | "code" | "impact";

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<ProjectTabType>("hld");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Modal open={!!project} onClose={onClose} maxWidth="940px">
      {project && (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {/* MODAL HEADER */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              paddingRight: "2.5rem",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              paddingBottom: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  padding: "3px 10px",
                  borderRadius: "999px",
                  background: "rgba(56, 189, 248, 0.15)",
                  color: "var(--cyan)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {project.category}
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  color: "#94A3B8",
                  fontWeight: 600,
                }}
              >
                Cognizant Enterprise Architecture
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "var(--text)",
                fontSize: "clamp(1.2rem, 3vw, 1.65rem)",
                margin: 0,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                fontWeight: 800,
                lineHeight: 1.25,
              }}
            >
              {project.name}
            </h2>

            <p
              style={{
                color: "var(--cyan)",
                fontSize: "0.92rem",
                fontWeight: 600,
                margin: 0,
              }}
            >
              {project.subtitle}
            </p>

            {/* Tag Pills */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                marginTop: "0.25rem",
              }}
            >
              {project.tags.map((t) => (
                <span
                  key={t.name}
                  style={{
                    color: t.color,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    background: "rgba(255, 255, 255, 0.04)",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  #{t.name}
                </span>
              ))}
            </div>
          </div>

          {/* TAB BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              paddingBottom: "0.75rem",
            }}
          >
            <button
              onClick={() => setActiveTab("hld")}
              style={{
                background:
                  activeTab === "hld"
                    ? "var(--cyan)"
                    : "rgba(255, 255, 255, 0.05)",
                color: activeTab === "hld" ? "#091227" : "#CBD5E1",
                border: "none",
                borderRadius: "6px",
                padding: "7px 16px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <i className="fa fa-sitemap" />
              <span>High-Level Design (HLD)</span>
            </button>

            <button
              onClick={() => setActiveTab("lld")}
              style={{
                background:
                  activeTab === "lld"
                    ? "var(--cyan)"
                    : "rgba(255, 255, 255, 0.05)",
                color: activeTab === "lld" ? "#091227" : "#CBD5E1",
                border: "none",
                borderRadius: "6px",
                padding: "7px 16px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <i className="fa fa-cogs" />
              <span>Low-Level Design (LLD)</span>
            </button>

            <button
              onClick={() => setActiveTab("code")}
              style={{
                background:
                  activeTab === "code"
                    ? "var(--cyan)"
                    : "rgba(255, 255, 255, 0.05)",
                color: activeTab === "code" ? "#091227" : "#CBD5E1",
                border: "none",
                borderRadius: "6px",
                padding: "7px 16px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <i className="fa fa-code" />
              <span>Code Implementation ({project.codeSnippets.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("impact")}
              style={{
                background:
                  activeTab === "impact"
                    ? "var(--cyan)"
                    : "rgba(255, 255, 255, 0.05)",
                color: activeTab === "impact" ? "#091227" : "#CBD5E1",
                border: "none",
                borderRadius: "6px",
                padding: "7px 16px",
                fontSize: "0.82rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <i className="fa fa-line-chart" />
              <span>Impact &amp; Metrics</span>
            </button>
          </div>

          {/* TAB 1: HIGH-LEVEL DESIGN (HLD) */}
          {activeTab === "hld" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {/* Architecture Diagram Preview */}
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
                      color: "var(--cyan)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    System Architecture Diagram
                  </span>
                  <a
                    href={project.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "var(--cyan)",
                      fontSize: "0.78rem",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      background: "rgba(56, 189, 248, 0.1)",
                      border: "1px solid rgba(56, 189, 248, 0.3)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontWeight: 600,
                    }}
                  >
                    <i className="fa fa-external-link" />
                    <span>View Full SVG Diagram</span>
                  </a>
                </div>

                <div
                  style={{
                    background: "#080F1E",
                    border: "1.5px solid rgba(56, 189, 248, 0.25)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    padding: "0.75rem",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={`${project.name} Architecture Diagram`}
                    style={{
                      width: "100%",
                      maxHeight: "360px",
                      objectFit: "contain",
                      display: "block",
                      borderRadius: "6px",
                    }}
                  />
                </div>
              </div>

              {/* HLD Overview narrative */}
              <div
                style={{
                  background: "rgba(56, 189, 248, 0.05)",
                  border: "1px solid rgba(56, 189, 248, 0.2)",
                  borderRadius: "10px",
                  padding: "1.1rem 1.25rem",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--cyan)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "0.4rem",
                  }}
                >
                  High-Level Architecture Overview
                </span>
                <p
                  style={{
                    color: "#E2E8F0",
                    fontSize: "0.88rem",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {project.hldOverview}
                </p>
              </div>

              {/* Core Architectural Pillars */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    color: "var(--text)",
                    fontSize: "0.95rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    margin: "0 0 0.85rem",
                    fontWeight: 700,
                  }}
                >
                  Core Architectural Pillars
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    gap: "0.85rem",
                  }}
                >
                  {project.pillars.map((pillar) => (
                    <div
                      key={pillar.title}
                      style={{
                        background: "rgba(15, 23, 42, 0.6)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "8px",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.4rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "6px",
                            background: "rgba(56, 189, 248, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--cyan)",
                            fontSize: "0.85rem",
                            flexShrink: 0,
                          }}
                        >
                          <i className={`fa ${pillar.icon}`} />
                        </div>
                        <h4
                          style={{
                            margin: 0,
                            color: "#FFFFFF",
                            fontSize: "0.88rem",
                            fontWeight: 700,
                          }}
                        >
                          {pillar.title}
                        </h4>
                      </div>

                      <p
                        style={{
                          margin: "0.25rem 0 0",
                          color: "#94A3B8",
                          fontSize: "0.82rem",
                          lineHeight: 1.55,
                        }}
                      >
                        {pillar.description}
                      </p>

                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--cyan)",
                          fontWeight: 600,
                          marginTop: "auto",
                          paddingTop: "0.4rem",
                        }}
                      >
                        Tech: {pillar.tech}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* End-to-End Data Flow */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    color: "var(--text)",
                    fontSize: "0.95rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    margin: "0 0 0.85rem",
                    fontWeight: 700,
                  }}
                >
                  End-to-End Data Flow Stages
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {project.dataFlow.map((flow) => (
                    <div
                      key={flow.step}
                      style={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "flex-start",
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        borderRadius: "8px",
                        padding: "0.85rem 1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #1E3A8A 0%, #0284C7 100%)",
                          color: "#FFFFFF",
                          fontWeight: 800,
                          fontSize: "0.82rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          border: "1px solid rgba(56, 189, 248, 0.5)",
                        }}
                      >
                        {flow.step}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexWrap: "wrap",
                            marginBottom: "0.25rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.68rem",
                              color: "var(--cyan)",
                              textTransform: "uppercase",
                              letterSpacing: "0.05em",
                              fontWeight: 700,
                            }}
                          >
                            {flow.phase}
                          </span>
                          <span
                            style={{ color: "#64748B", fontSize: "0.7rem" }}
                          >
                            ·
                          </span>
                          <h4
                            style={{
                              margin: 0,
                              color: "#FFFFFF",
                              fontSize: "0.86rem",
                              fontWeight: 700,
                            }}
                          >
                            {flow.title}
                          </h4>
                        </div>
                        <p
                          style={{
                            margin: 0,
                            color: "#94A3B8",
                            fontSize: "0.82rem",
                            lineHeight: 1.55,
                          }}
                        >
                          {flow.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SLA & Non-Functional Specifications */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    color: "var(--text)",
                    fontSize: "0.95rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    margin: "0 0 0.85rem",
                    fontWeight: 700,
                  }}
                >
                  SLAs &amp; Architectural Quality Metrics
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "0.75rem",
                  }}
                >
                  {project.slaMetrics.map((sla) => (
                    <div
                      key={sla.label}
                      style={{
                        background: "rgba(16, 185, 129, 0.05)",
                        border: "1px solid rgba(16, 185, 129, 0.25)",
                        borderRadius: "8px",
                        padding: "0.85rem 1rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "#94A3B8",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                          display: "block",
                          fontWeight: 600,
                        }}
                      >
                        {sla.label}
                      </span>
                      <span
                        style={{
                          fontSize: "1.15rem",
                          color: "#10B981",
                          fontWeight: 800,
                          display: "block",
                          margin: "0.2rem 0",
                          fontFamily: "var(--font-montserrat), sans-serif",
                        }}
                      >
                        {sla.value}
                      </span>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#CBD5E1",
                          lineHeight: 1.4,
                        }}
                      >
                        {sla.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LOW-LEVEL DESIGN (LLD) */}
          {activeTab === "lld" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Storage Tiering & Namespace */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "1.1rem 1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "0.4rem",
                  }}
                >
                  <i
                    className="fa fa-folder-open-o"
                    style={{ color: "var(--cyan)" }}
                  />
                  <h4
                    style={{
                      margin: 0,
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                    }}
                  >
                    ADLS Gen2 Storage Hierarchy &amp; Network Security
                  </h4>
                </div>
                <p
                  style={{
                    margin: 0,
                    color: "#CBD5E1",
                    fontSize: "0.84rem",
                    lineHeight: 1.6,
                  }}
                >
                  {project.lld.storageTiering}
                </p>
              </div>

              {/* Partitioning Strategy */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "1.1rem 1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "0.4rem",
                  }}
                >
                  <i
                    className="fa fa-columns"
                    style={{ color: "var(--cyan)" }}
                  />
                  <h4
                    style={{
                      margin: 0,
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                    }}
                  >
                    Delta Lake Partitioning &amp; Indexing Strategy
                  </h4>
                </div>
                <p
                  style={{
                    margin: 0,
                    color: "#CBD5E1",
                    fontSize: "0.84rem",
                    lineHeight: 1.6,
                  }}
                >
                  {project.lld.partitionStrategy}
                </p>
              </div>

              {/* CDC Strategy */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "1.1rem 1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "0.4rem",
                  }}
                >
                  <i
                    className="fa fa-refresh"
                    style={{ color: "var(--cyan)" }}
                  />
                  <h4
                    style={{
                      margin: 0,
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                    }}
                  >
                    Change Data Capture (CDC) &amp; Idempotency Mechanisms
                  </h4>
                </div>
                <p
                  style={{
                    margin: 0,
                    color: "#CBD5E1",
                    fontSize: "0.84rem",
                    lineHeight: 1.6,
                  }}
                >
                  {project.lld.cdcStrategy}
                </p>
              </div>

              {/* Compaction & Performance Optimization */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "1.1rem 1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "0.6rem",
                  }}
                >
                  <i
                    className="fa fa-tachometer"
                    style={{ color: "var(--cyan)" }}
                  />
                  <h4
                    style={{
                      margin: 0,
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                    }}
                  >
                    Compaction, Z-Ordering &amp; File Sizing Policies
                  </h4>
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1.25rem",
                    color: "#CBD5E1",
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                  }}
                >
                  {project.lld.compactionAndOptimization.map((rule, idx) => (
                    <li key={idx} style={{ marginBottom: "0.3rem" }}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Quality & Exception Quarantine */}
              <div
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "10px",
                  padding: "1.1rem 1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "0.6rem",
                  }}
                >
                  <i
                    className="fa fa-shield"
                    style={{ color: "var(--cyan)" }}
                  />
                  <h4
                    style={{
                      margin: 0,
                      color: "#FFFFFF",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                    }}
                  >
                    Data Quality Checks &amp; Dead-Letter Queue (DLQ) Strategy
                  </h4>
                </div>
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1.25rem",
                    color: "#CBD5E1",
                    fontSize: "0.82rem",
                    lineHeight: 1.65,
                  }}
                >
                  {project.lld.qualityAndErrorHandling.map((rule, idx) => (
                    <li key={idx} style={{ marginBottom: "0.3rem" }}>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: CODE IMPLEMENTATION */}
          {activeTab === "code" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {project.codeSnippets.map((snippet, idx) => (
                <div
                  key={snippet.title}
                  style={{
                    background: "#080F1E",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  {/* Code Header Bar */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.65rem 1rem",
                      background: "rgba(15, 23, 42, 0.9)",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#FFFFFF",
                          fontFamily: "var(--font-montserrat), sans-serif",
                        }}
                      >
                        {snippet.title}
                      </span>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color: "var(--cyan)",
                          background: "rgba(56, 189, 248, 0.12)",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontFamily: "monospace",
                        }}
                      >
                        {snippet.filename}
                      </span>
                    </div>

                    <button
                      onClick={() => copyCode(snippet.code, idx)}
                      style={{
                        background:
                          copiedIndex === idx
                            ? "rgba(16, 185, 129, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                        border: `1px solid ${
                          copiedIndex === idx
                            ? "#10B981"
                            : "rgba(255, 255, 255, 0.15)"
                        }`,
                        color: copiedIndex === idx ? "#10B981" : "#CBD5E1",
                        borderRadius: "6px",
                        padding: "4px 10px",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <i
                        className={`fa ${copiedIndex === idx ? "fa-check" : "fa-copy"}`}
                      />
                      <span>
                        {copiedIndex === idx ? "Copied!" : "Copy Code"}
                      </span>
                    </button>
                  </div>

                  {/* Code Body */}
                  <pre
                    style={{
                      margin: 0,
                      padding: "1rem",
                      fontFamily: "Consolas, Monaco, 'Courier New', monospace",
                      fontSize: "0.8rem",
                      lineHeight: 1.55,
                      color: "#38BDF8",
                      background: "rgba(3, 7, 18, 0.75)",
                      overflowX: "auto",
                      maxHeight: "360px",
                    }}
                  >
                    <code>{snippet.code}</code>
                  </pre>

                  {/* Code Explanation */}
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      background: "rgba(15, 23, 42, 0.5)",
                      borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                      fontSize: "0.78rem",
                      color: "#94A3B8",
                      lineHeight: 1.5,
                    }}
                  >
                    <strong style={{ color: "#E2E8F0" }}>
                      Implementation Rationale:
                    </strong>{" "}
                    {snippet.explanation}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: IMPACT & METRICS */}
          {activeTab === "impact" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Quantified Metrics Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {project.impactMetrics.map((item) => (
                  <div
                    key={item.metric}
                    style={{
                      background: "rgba(15, 23, 42, 0.7)",
                      border: "1px solid rgba(56, 189, 248, 0.3)",
                      borderRadius: "10px",
                      padding: "1rem",
                      textAlign: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#94A3B8",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontWeight: 600,
                        display: "block",
                      }}
                    >
                      {item.metric}
                    </span>
                    <span
                      style={{
                        fontSize: "1.45rem",
                        color: "var(--cyan)",
                        fontWeight: 800,
                        fontFamily: "var(--font-montserrat), sans-serif",
                        display: "block",
                        margin: "0.3rem 0",
                      }}
                    >
                      {item.value}
                    </span>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "#CBD5E1",
                        lineHeight: 1.35,
                        display: "block",
                      }}
                    >
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>

              {/* Real-World Engineering Challenges & Architectural Solutions */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    color: "var(--text)",
                    fontSize: "0.95rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    margin: "0.5rem 0 0.85rem",
                    fontWeight: 700,
                  }}
                >
                  Key Engineering Challenges &amp; Architectural Solutions
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                  }}
                >
                  {project.challenges.map((c, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "rgba(255, 255, 255, 0.02)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        borderRadius: "8px",
                        padding: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "#F59E0B",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          marginBottom: "0.4rem",
                        }}
                      >
                        <i className="fa fa-exclamation-triangle" />
                        <span>Problem: {c.challenge}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                          color: "#E2E8F0",
                          fontSize: "0.82rem",
                          lineHeight: 1.6,
                        }}
                      >
                        <i
                          className="fa fa-check-circle"
                          style={{
                            color: "#10B981",
                            marginTop: "3px",
                            flexShrink: 0,
                          }}
                        />
                        <span>
                          <strong style={{ color: "#10B981" }}>
                            Architectural Solution:
                          </strong>{" "}
                          {c.solution}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cognizant Delivery Endorsement Footer */}
              <div
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0, 51, 160, 0.15) 0%, rgba(15, 23, 42, 0.8) 100%)",
                  border: "1px solid rgba(0, 114, 206, 0.35)",
                  borderRadius: "8px",
                  padding: "0.85rem 1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: "#60A5FA",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      display: "block",
                    }}
                  >
                    Cognizant Technology Solutions · Delivery Practice
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
                    Verified enterprise delivery artifact · Zero downtime
                    production release
                  </span>
                </div>

                <button
                  onClick={onClose}
                  style={{
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#FFFFFF",
                    borderRadius: "6px",
                    padding: "6px 14px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Close Specification
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
