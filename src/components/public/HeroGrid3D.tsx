"use client";

import { useEffect, useRef } from "react";

const flowLines = [
  { left: "26%", height: 108, duration: "2.3s", delay: "0s" },
  { left: "38%", height: 96, duration: "2.8s", delay: "0.7s" },
  { left: "50%", height: 120, duration: "1.9s", delay: "0.3s" },
  { left: "58%", height: 100, duration: "2.5s", delay: "1.1s" },
  { left: "68%", height: 112, duration: "2.1s", delay: "0.5s" },
  { left: "74%", height: 92, duration: "2.7s", delay: "1.4s" },
];

const beams = ["30%", "50%", "70%"];

export function HeroGrid3D() {
  const gridPlaneRef = useRef<HTMLDivElement>(null);
  const gridPlaneFineRef = useRef<HTMLDivElement>(null);
  const horizonGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    let rafId: number | null = null;

    const updateGrid = () => {
      const y = window.scrollY;
      if (gridPlaneRef.current) {
        gridPlaneRef.current.style.transform = `perspective(900px) rotateX(72deg) translateY(${y * 0.07}px)`;
      }
      if (gridPlaneFineRef.current) {
        gridPlaneFineRef.current.style.transform = `perspective(900px) rotateX(72deg) translateY(${y * 0.05}px)`;
      }
      if (horizonGlowRef.current) {
        horizonGlowRef.current.style.transform = `translateX(-50%) translateY(${y * 0.04}px)`;
      }
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateGrid);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        ref={gridPlaneRef}
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-60%",
          width: "220%",
          height: "85%",
          backgroundImage:
            "linear-gradient(to right, rgba(201,168,106,0.11) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,168,106,0.11) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: "perspective(900px) rotateX(72deg)",
          transformOrigin: "bottom center",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.15) 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.15) 65%, transparent 100%)",
        }}
      />

      <div
        ref={gridPlaneFineRef}
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-60%",
          width: "220%",
          height: "85%",
          backgroundImage:
            "linear-gradient(to right, rgba(201,168,106,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,168,106,0.04) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          transform: "perspective(900px) rotateX(72deg)",
          transformOrigin: "bottom center",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
        }}
      />

      <div
        ref={horizonGlowRef}
        style={{
          position: "absolute",
          bottom: "28%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          maxWidth: "100%",
          height: "180px",
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(201,168,106,0.18) 0%, transparent 70%)",
        }}
      />

      {beams.map((left) => (
        <div
          key={left}
          style={{
            position: "absolute",
            left,
            bottom: "28%",
            width: "1px",
            height: "200px",
            background:
              "linear-gradient(to top, rgba(201,168,106,0.5), rgba(201,168,106,0.08) 55%, transparent)",
          }}
        />
      ))}

      {flowLines.map((line, index) => (
        <span
          key={index}
          className="hero-flow-line"
          style={{
            position: "absolute",
            left: line.left,
            width: "1px",
            height: `${line.height}px`,
            background:
              "linear-gradient(to bottom, transparent, rgba(201,168,106,0.7) 60%, rgba(212,184,122,0.9))",
            animation: `flow-down ${line.duration} ${line.delay} ease-in-out infinite`,
            opacity: 0,
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, var(--bg) 0%, transparent 14%, transparent 86%, var(--bg) 100%), linear-gradient(to bottom, var(--bg) 0%, transparent 22%)",
        }}
      />

      <style>{`
        .hero-flow-line::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: -1px;
          width: 3px;
          height: 3px;
          border-radius: 9999px;
          background: #D4B87A;
          animation: glow-pulse 1.6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-flow-line {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
