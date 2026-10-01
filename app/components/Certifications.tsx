"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/app/components/ui/SectionHeading";
import { certifications } from "@/app/data";

export default function Certifications() {
  return (
    <section id="certifications" className="section-wrapper">
      <div className="section-inner">
        <SectionHeading title="Honors & Key Recognitions" divider="light" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.06 * i }}
              className="card-glass"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "1rem",
                padding: "1.75rem 1.25rem",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--cyan)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cert.badge}
                alt={cert.name}
                style={{
                  height: "72px",
                  width: "72px",
                  objectFit: "contain",
                }}
              />
              <div>
                <p
                  style={{
                    color: "var(--text)",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    margin: "0 0 0.4rem",
                    lineHeight: 1.35,
                  }}
                >
                  {cert.name}
                </p>
                <p
                  style={{
                    color: "var(--cyan)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    margin: "0 0 0.25rem",
                  }}
                >
                  {cert.issuer}
                </p>
                {cert.metric && (
                  <div
                    style={{ marginTop: "0.45rem", marginBottom: "0.25rem" }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        background:
                          "linear-gradient(135deg, rgba(56, 189, 248, 0.14) 0%, rgba(24, 188, 156, 0.14) 100%)",
                        border: "1px solid rgba(56, 189, 248, 0.35)",
                        borderRadius: "20px",
                        padding: "3px 10px",
                        color: "#38bdf8",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {cert.metric}
                    </span>
                  </div>
                )}
                {cert.date && (
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.75rem",
                      margin: "0.25rem 0 0",
                    }}
                  >
                    {cert.date}
                  </p>
                )}
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      color: "var(--cyan)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      marginTop: "0.6rem",
                      textDecoration: "none",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      border: "1px solid rgba(56, 189, 248, 0.4)",
                      background: "rgba(56, 189, 248, 0.08)",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(56, 189, 248, 0.2)";
                      e.currentTarget.style.borderColor = "var(--cyan)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(56, 189, 248, 0.08)";
                      e.currentTarget.style.borderColor =
                        "rgba(56, 189, 248, 0.4)";
                    }}
                  >
                    <span>Verify Gazette Record</span>
                    <i
                      className="fa fa-external-link"
                      style={{ fontSize: "0.7rem" }}
                    />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
