"use client";
import createGlobe, { type Arc, type Marker } from "cobe";
import { useEffect, useRef, useState } from "react";

// Enterprise Azure Cloud & Lakehouse Data Fabric Hubs
const MARKERS: Marker[] = [
  { location: [13.0827, 80.2707], size: 0.085 }, // Chennai (Base: Cognizant Delivery Hub & Azure India South)
  { location: [17.385, 78.4867], size: 0.065 }, // Hyderabad (Azure India Central)
  { location: [12.9716, 77.5946], size: 0.06 }, // Bengaluru (Tech Hub)
  { location: [19.076, 72.8777], size: 0.06 }, // Mumbai (Azure India West)
  { location: [1.3521, 103.8198], size: 0.05 }, // Singapore (Azure Southeast Asia)
  { location: [50.1109, 8.6821], size: 0.05 }, // Frankfurt (Azure Germany West Central)
  { location: [52.3676, 4.9041], size: 0.045 }, // Amsterdam (Azure West Europe)
  { location: [51.5074, -0.1278], size: 0.05 }, // London (Azure UK South)
  { location: [39.0438, -77.4874], size: 0.06 }, // Ashburn, VA (Azure East US)
  { location: [41.8781, -87.6298], size: 0.045 }, // Chicago (Azure North Central US)
  { location: [37.3382, -121.8863], size: 0.055 }, // San Jose, CA (Azure West US)
  { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo (Azure Japan East)
  { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney (Azure Australia East)
];

// High-throughput Cloud Lakehouse Replication Arcs
const ARCS: Arc[] = [
  { from: [13.0827, 80.2707], to: [17.385, 78.4867] }, // Chennai <-> Hyderabad
  { from: [13.0827, 80.2707], to: [12.9716, 77.5946] }, // Chennai <-> Bengaluru
  { from: [13.0827, 80.2707], to: [1.3521, 103.8198] }, // Chennai <-> Singapore
  { from: [17.385, 78.4867], to: [19.076, 72.8777] }, // Hyderabad <-> Mumbai
  { from: [13.0827, 80.2707], to: [39.0438, -77.4874] }, // Chennai <-> Azure East US
  { from: [19.076, 72.8777], to: [50.1109, 8.6821] }, // Mumbai <-> Frankfurt
  { from: [50.1109, 8.6821], to: [51.5074, -0.1278] }, // Frankfurt <-> London
  { from: [52.3676, 4.9041], to: [39.0438, -77.4874] }, // Amsterdam <-> Azure East US
  { from: [39.0438, -77.4874], to: [37.3382, -121.8863] }, // Azure East US <-> Azure West US
  { from: [1.3521, 103.8198], to: [35.6762, 139.6503] }, // Singapore <-> Tokyo
];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 1.35; // Centered near India and Asian/European cloud regions
    let width = canvas.offsetWidth;
    let animId: number;

    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.18,
      dark: 1,
      diffuse: 1.45,
      mapSamples: 20000,
      mapBrightness: 5.8,
      baseColor: [0.1, 0.16, 0.28],
      markerColor: [0.22, 0.74, 0.98],
      glowColor: [0.15, 0.5, 0.85],
      markers: MARKERS,
      arcs: ARCS,
      arcColor: [0.22, 0.74, 0.98],
      arcWidth: 1.6,
      arcHeight: 0.32,
    });

    const animate = () => {
      phi += 0.003;
      globe.update({ phi, width: width * 2, height: width * 2 });
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    setTimeout(() => setIsLoaded(true), 400);

    return () => {
      cancelAnimationFrame(animId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* HUD pill */}
      <div
        style={{
          position: "absolute",
          bottom: "18px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(9, 18, 39, 0.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(56, 189, 248, 0.32)",
          borderRadius: "999px",
          padding: "5px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            background: "#10B981",
            boxShadow: "0 0 7px #10B981",
            flexShrink: 0,
            animation: "pulse-dot 2s ease-in-out infinite",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontSize: "0.7rem",
            color: "var(--cyan)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Azure Lakehouse Mesh: {MARKERS.length} Regions
        </span>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
