"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FlipWords } from "@/app/components/ui/FlipWords";

const ROLES = [
  "3+ Years Architecting Enterprise Azure Lakehouses",
  "Databricks Certified Spark Associate Developer",
  "Ex-Associate Data Engineer @ Cognizant",
  "Automated Delta Lake & PySpark Pipelines",
  "Unity Catalog & Azure Data Factory Orchestration",
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/dedeepya-majety/",
    icon: "fa-linkedin",
    label: "LinkedIn",
  },
  {
    href: "https://github.com/dedeepya-majety",
    icon: "fa-github",
    label: "GitHub",
  },
  {
    href: "mailto:majetydedeepya0@gmail.com",
    icon: "fa-envelope",
    label: "Email",
  },
];

export default function Hero() {
  return (
    <header
      id="page-top"
      className="text-center text-white"
      style={{
        backgroundColor: "var(--bg)",
        paddingTop: "clamp(120px, 14vh, 155px)",
        paddingBottom: "50px",
        width: "100%",
        display: "block",
      }}
    >
      <div className="section-inner" style={{ textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div
            style={{
              position: "relative",
              width: "180px",
              height: "180px",
              margin: "0 auto",
              borderRadius: "50%",
              padding: "4px",
              background:
                "linear-gradient(135deg, var(--cyan) 0%, rgba(56, 189, 248, 0.3) 100%)",
              boxShadow: "0 10px 30px rgba(56, 189, 248, 0.25)",
              overflow: "hidden",
            }}
          >
            <Image
              src="/img/dedeepya.jpeg"
              alt="Dedeepya Majety"
              width={180}
              height={180}
              priority
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                width: "100%",
                height: "100%",
                display: "block",
                background: "#091227",
              }}
            />
          </div>

          <h1
            className="text-uppercase"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "clamp(1.35rem, 4.2vw, 2.6rem)",
              letterSpacing: "0.04em",
              margin: "1.2rem 0 0.4rem",
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            Dedeepya Majety
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              margin: "0.5rem 0",
              color: "var(--cyan)",
            }}
          >
            <span
              style={{
                width: "30px",
                height: "2px",
                background: "var(--cyan)",
              }}
            />
            <i className="fa fa-database" style={{ fontSize: "0.9rem" }} />
            <span
              style={{
                width: "30px",
                height: "2px",
                background: "var(--cyan)",
              }}
            />
          </div>

          <span
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: "clamp(0.85rem, 2.2vw, 1.25rem)",
              letterSpacing: "0.04em",
              color: "var(--cyan)",
              fontWeight: 600,
              display: "block",
              minHeight: "2.2em",
              position: "relative",
            }}
          >
            <FlipWords words={ROLES} duration={2800} />
          </span>

          <p
            className="mt-4 mx-auto max-w-3xl"
            style={{
              fontSize: "1.05rem",
              letterSpacing: "0.02em",
              lineHeight: "1.75",
              color: "#cbd5e1",
            }}
          >
            Azure Data Engineer with 3+ years at Cognizant architecting
            enterprise Lakehouse platforms, migrating legacy Informatica ETL
            workloads to Azure Databricks with PySpark, and automating medallion
            architecture pipelines (Bronze/Silver/Gold) with Azure Data Factory
            and Apache Airflow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          {socialLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "var(--text)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--cyan)";
                e.currentTarget.style.borderColor = "var(--cyan)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <i className={`fa ${icon}`} style={{ fontSize: "20px" }} />
            </a>
          ))}
        </motion.div>

        {/* Dual Status Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 18px",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid #10B981",
              borderRadius: "999px",
              fontSize: "0.82rem",
              color: "#10B981",
              fontWeight: 600,
              fontFamily: "var(--font-montserrat), sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#10B981",
                display: "inline-block",
                boxShadow: "0 0 8px #10B981",
              }}
            />
            Databricks & Microsoft Power BI Certified
          </span>

          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "7px 18px",
              background: "rgba(56, 189, 248, 0.12)",
              border: "1px solid var(--cyan)",
              borderRadius: "999px",
              fontSize: "0.82rem",
              color: "var(--cyan)",
              fontWeight: 600,
              fontFamily: "var(--font-montserrat), sans-serif",
              letterSpacing: "0.03em",
            }}
          >
            <i className="fa fa-briefcase" style={{ fontSize: "0.85rem" }} />
            Open to Azure Data Engineer & Databricks Roles
          </span>
        </motion.div>

        {/* Action Button: Download Master Resume PDF */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mt-6 flex items-center justify-center gap-4"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 24px",
              background: "linear-gradient(135deg, #1E3A8A 0%, #0284C7 100%)",
              border: "1px solid rgba(56, 189, 248, 0.5)",
              borderRadius: "8px",
              fontSize: "0.88rem",
              color: "#FFFFFF",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(2, 132, 199, 0.3)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(56, 189, 248, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(2, 132, 199, 0.3)";
            }}
          >
            <i className="fa fa-file-pdf-o" style={{ fontSize: "1rem" }} />
            <span>Download Master Resume (PDF)</span>
          </a>
        </motion.div>
      </div>
    </header>
  );
}
