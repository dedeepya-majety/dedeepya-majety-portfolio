"use client";
import createGlobe, { type Arc, type Marker } from "cobe";
import { useEffect, useRef, useState } from "react";

// City markers — career and infrastructure footprint across tech hubs
const MARKERS: Marker[] = [
  { location: [32.7157, -117.1611], size: 0.06 }, // San Diego
  { location: [33.1194, -117.0861], size: 0.055 }, // Carlsbad
  { location: [29.7604, -95.3698], size: 0.05 }, // Houston
  { location: [40.7128, -74.006], size: 0.055 }, // New York
  { location: [37.7749, -122.4194], size: 0.06 }, // San Francisco
  { location: [51.5074, -0.1278], size: 0.045 }, // London
  { location: [48.8566, 2.3522], size: 0.04 }, // Paris
  { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
  { location: [1.3521, 103.8198], size: 0.04 }, // Singapore
  { location: [28.6139, 77.209], size: 0.04 }, // New Delhi
  { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
];

// Animated arcs — global infrastructure data flow
const ARCS: Arc[] = [
  { from: [33.1194, -117.0861], to: [40.7128, -74.006] },
  { from: [32.7157, -117.1611], to: [51.5074, -0.1278] },
  { from: [29.7604, -95.3698], to: [35.6762, 139.6503] },
  { from: [37.7749, -122.4194], to: [1.3521, 103.8198] },
  { from: [40.7128, -74.006], to: [48.8566, 2.3522] },
  { from: [33.1194, -117.0861], to: [28.6139, 77.209] },
  { from: [37.7749, -122.4194], to: [-33.8688, 151.2093] },
];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 0.6;
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
      theta: 0.15,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 20000,
      mapBrightness: 5.5,
      baseColor: [0.12, 0.18, 0.28],
      markerColor: [0.22, 0.74, 0.98],
      glowColor: [0.15, 0.5, 0.8],
      markers: MARKERS,
      arcs: ARCS,
      arcColor: [0.22, 0.74, 0.98],
      arcWidth: 1.5,
      arcHeight: 0.3,
    });

    // cobe v2: drive rotation manually via globe.update() + rAF
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
          background: "rgba(9, 18, 39, 0.82)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(56, 189, 248, 0.28)",
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
          Systems Online · {MARKERS.length} Nodes
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
