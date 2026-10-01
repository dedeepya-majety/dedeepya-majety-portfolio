"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { Modal } from "@/app/components/ui/Modal";
import { publications, type Publication } from "@/app/data";

const typeIcon: Record<Publication["type"], string> = {
  patent: "fa-certificate",
  conference: "fa-microphone",
  ieee: "fa-bookmark",
  "book-chapter": "fa-book",
  journal: "fa-newspaper-o",
};

const typeLabel: Record<Publication["type"], string> = {
  patent: "Patent Publication",
  conference: "Conference Paper",
  ieee: "IEEE Publication",
  "book-chapter": "Book Chapter",
  journal: "Journal Article",
};

const typeColor: Record<Publication["type"], string> = {
  patent: "#F59E0B",
  conference: "#e67e22",
  ieee: "#38BDF8",
  "book-chapter": "#10B981",
  journal: "#38BDF8",
};

export default function Publications() {
  const [selectedPatent, setSelectedPatent] = useState<Publication | null>(
    null,
  );

  if (!publications || publications.length === 0) {
    return null;
  }

  return (
    <section id="publications" className="section-wrapper">
      <div className="section-inner">
        <SectionHeading
          title="Patents & Deep Learning Research"
          divider="light"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.75rem",
            marginTop: "1rem",
          }}
        >
          {publications.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="card-glass"
              style={{
                padding: "2rem",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderLeft: `5px solid ${pub.badgeColor || typeColor[pub.type]}`,
                display: "flex",
                gap: "2rem",
                alignItems: "flex-start",
                flexWrap: "wrap",
                borderRadius: "14px",
                boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
              }}
            >
              {/* Content */}
              <div style={{ flex: 1, minWidth: "280px" }}>
                {/* Top row: icon + type + badge */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.85rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      color: typeColor[pub.type],
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    <i
                      className={`fa ${typeIcon[pub.type]}`}
                      style={{ fontSize: "0.95rem" }}
                    />
                    {typeLabel[pub.type]}
                  </span>
                  {pub.badge && (
                    <span
                      style={{
                        background: `${pub.badgeColor || typeColor[pub.type]}22`,
                        color: pub.badgeColor || typeColor[pub.type],
                        border: `1px solid ${pub.badgeColor || typeColor[pub.type]}55`,
                        borderRadius: "999px",
                        padding: "3px 10px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {pub.badge}
                    </span>
                  )}
                  <span
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                    }}
                  >
                    {pub.year}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    color: "var(--text)",
                    fontSize: "1.25rem",
                    lineHeight: "1.4",
                    margin: "0 0 0.5rem",
                    fontWeight: 700,
                  }}
                >
                  {pub.title}
                </h3>

                {/* Authors */}
                <p
                  style={{
                    color: "var(--cyan)",
                    fontSize: "0.88rem",
                    margin: "0 0 0.4rem",
                    fontWeight: 600,
                  }}
                >
                  {pub.authors}
                </p>

                {/* Venue & Publisher */}
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                    margin: "0 0 1rem",
                    fontStyle: "italic",
                  }}
                >
                  {pub.venue}
                  {pub.publisher && ` · ${pub.publisher}`}
                </p>

                {/* Topic Abstract */}
                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "0.9rem",
                    lineHeight: "1.7",
                    margin: "0 0 1.25rem",
                  }}
                >
                  {pub.topic}
                </p>

                {/* Impact / Metadata Pills */}
                {pub.impact && pub.impact.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: "0.6rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {pub.impact.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "rgba(255, 255, 255, 0.04)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          borderRadius: "6px",
                          padding: "6px 12px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.72rem",
                            color: "#94a3b8",
                            display: "block",
                          }}
                        >
                          {item.label}
                        </span>
                        <span
                          style={{
                            fontSize: "0.84rem",
                            color: "#f8fafc",
                            fontWeight: 600,
                          }}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Links & Preview Trigger */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.85rem",
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {pub.links.map((link, j) => (
                    <a
                      key={j}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--cyan)",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        border: "1px solid var(--cyan)",
                        borderRadius: "6px",
                        padding: "6px 14px",
                        transition: "all 0.2s",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(56, 189, 248, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <i
                        className="fa fa-external-link"
                        style={{ fontSize: "0.75rem" }}
                      />
                      {link.label}
                    </a>
                  ))}

                  {pub.thumbnail && (
                    <button
                      onClick={() => setSelectedPatent(pub)}
                      style={{
                        color: "#fff",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: "6px",
                        padding: "6px 14px",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.06)";
                      }}
                    >
                      <i
                        className="fa fa-search-plus"
                        style={{ fontSize: "0.8rem" }}
                      />
                      View Gazette Scan
                    </button>
                  )}
                </div>
              </div>

              {/* Patent Gazette Thumbnail */}
              {pub.thumbnail && (
                <div
                  onClick={() => setSelectedPatent(pub)}
                  style={{
                    flexShrink: 0,
                    width: "210px",
                    height: "280px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "#ffffff",
                    position: "relative",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    padding: "6px",
                    cursor: "pointer",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <Image
                    src={pub.thumbnail}
                    alt={pub.title}
                    fill
                    style={{
                      objectFit: "contain",
                      borderRadius: "6px",
                    }}
                    sizes="210px"
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0,0,0,0.75)",
                      color: "#fff",
                      fontSize: "0.72rem",
                      textAlign: "center",
                      padding: "4px 0",
                      fontWeight: 600,
                    }}
                  >
                    Click to Enlarge
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Modal for full gazette inspection */}
        {selectedPatent && selectedPatent.thumbnail && (
          <Modal
            open={!!selectedPatent}
            onClose={() => setSelectedPatent(null)}
            maxWidth="920px"
          >
            <div style={{ padding: "0.5rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <span
                    style={{
                      background: "rgba(155, 89, 182, 0.2)",
                      color: "#9b59b6",
                      border: "1px solid #9b59b6",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    OFFICIAL GAZETTE PUBLICATION
                  </span>
                  <h3
                    style={{
                      margin: "0.5rem 0 0",
                      color: "#fff",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                    }}
                  >
                    {selectedPatent.title}
                  </h3>
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxHeight: "75vh",
                  overflowY: "auto",
                  borderRadius: "8px",
                  background: "#ffffff",
                  padding: "8px",
                }}
              >
                <Image
                  src={selectedPatent.thumbnail}
                  alt={selectedPatent.title}
                  width={1200}
                  height={1600}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}
