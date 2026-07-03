"use client";

import { useEffect, useRef } from "react";

const navItems = [
  { icon: "▦", label: "Dashboard", active: true },
  { icon: "◎", label: "Leads", active: false },
  { icon: "◇", label: "Soluções", active: false },
  { icon: "⟳", label: "Automações", active: false },
  { icon: "↗", label: "Projetos", active: false },
  { icon: "⌁", label: "Configurações", active: false },
];

const projectCards = [
  { name: "AgendaFácil — Studio Cut", tag: "ONLINE" },
  { name: "CatalogPro B2B", tag: "ONLINE" },
  { name: "MenuZap", tag: "ONLINE" },
  { name: "Barber Prime", tag: "ONLINE" },
];

const stackBars = [
  { label: "React + Node.js", count: 2, width: "100%" },
  { label: "HTML + JS Vanilla", count: 2, width: "100%" },
  { label: "PostgreSQL + Prisma", count: 2, width: "100%" },
];

export function ConsoleMockup() {
  const consoleWrapRef = useRef<HTMLDivElement>(null);
  const consoleInnerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const innerElement = consoleInnerRef.current;
    if (!innerElement) return;

    let tiltRX = 0;
    let tiltRY = 0;
    let currentRX = 0;
    let currentRY = 0;

    const lerpTilt = () => {
      currentRX += (tiltRX - currentRX) * 0.1;
      currentRY += (tiltRY - currentRY) * 0.1;
      innerElement.style.transform = `perspective(1200px) rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;

      const settled =
        Math.abs(tiltRX - currentRX) < 0.01 &&
        Math.abs(tiltRY - currentRY) < 0.01;

      if (settled) {
        currentRX = tiltRX;
        currentRY = tiltRY;
        innerElement.style.transform = `perspective(1200px) rotateX(${currentRX}deg) rotateY(${currentRY}deg)`;
        innerElement.style.willChange = "auto";
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(lerpTilt);
    };

    const startTilt = () => {
      if (rafRef.current !== null) return;
      innerElement.style.willChange = "transform";
      rafRef.current = requestAnimationFrame(lerpTilt);
    };

    const onMouseMove = (e: MouseEvent) => {
      const wrap = consoleWrapRef.current;
      if (!wrap) return;
      const rect = wrap.getBoundingClientRect();
      const nearX = e.clientX >= rect.left - 200 && e.clientX <= rect.right + 200;
      const nearY = e.clientY >= rect.top - 200 && e.clientY <= rect.bottom + 200;
      if (!nearX || !nearY) {
        tiltRX = 0;
        tiltRY = 0;
        startTilt();
        return;
      }
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
      tiltRX = dy * 4;
      tiltRY = -dx * 6;
      startTilt();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("mousemove", onMouseMove);
      innerElement.style.transform = "";
      innerElement.style.willChange = "auto";
    };
  }, []);

  return (
    <div
      ref={consoleWrapRef}
      className="console-wrap"
      aria-hidden="true"
      style={{ animation: "float-up-down 6s ease-in-out infinite" }}
    >
      <div
        ref={consoleInnerRef}
        className="console-inner"
        style={{
          borderRadius: "20px",
          border: "1px solid var(--champagne-border)",
          background:
            "linear-gradient(160deg, var(--card-elevated), var(--card-deep))",
          boxShadow:
            "0 48px 120px rgba(0,0,0,0.6), 0 0 70px rgba(201,168,106,0.05), 0 1px 0 rgba(201,168,106,0.12) inset",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderBottom: "1px solid var(--border-soft)",
            background: "rgba(6,7,9,0.6)",
            fontSize: "10px",
          }}
        >
          <span
            style={{
              color: "var(--text-muted-2)",
              letterSpacing: "0.16em",
              fontWeight: 600,
            }}
          >
            DASHBOARD · Projetos online
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "var(--green)",
              fontWeight: 700,
            }}
          >
            <span
              className="status-pulse"
              style={{
                width: 6,
                height: 6,
                borderRadius: 9999,
                background: "var(--green)",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            Sistema Ativo
          </span>
        </div>

        <div className="console-layout grid grid-cols-[128px_minmax(0,1fr)] 2xl:grid-cols-[128px_minmax(0,1fr)_164px]">
          <aside
            style={{
              borderRight: "1px solid var(--border-soft)",
              padding: "18px 14px",
              background: "rgba(6,7,9,0.35)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-manrope), sans-serif",
                fontWeight: 800,
                fontSize: "16px",
                color: "var(--text)",
                letterSpacing: "-0.02em",
              }}
            >
              SOR OS
            </p>
            <p
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "9px",
                color: "var(--text-soft-2)",
                letterSpacing: "0.2em",
                marginTop: 2,
              }}
            >
              CONSOLE
            </p>

            <nav style={{ marginTop: 22, display: "grid", gap: 4 }}>
              {navItems.map((item) => (
                <span
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    borderRadius: 9,
                    fontSize: "11px",
                    fontWeight: item.active ? 700 : 500,
                    color: item.active ? "var(--champagne)" : "var(--text-muted-2)",
                    background: item.active ? "var(--champagne-dim)" : "transparent",
                    borderLeft: item.active
                      ? "2px solid var(--champagne)"
                      : "2px solid transparent",
                  }}
                >
                  <span style={{ width: 14, textAlign: "center", opacity: 0.85 }}>
                    {item.icon}
                  </span>
                  {item.label}
                </span>
              ))}
            </nav>
          </aside>

          <main style={{ padding: "20px 22px", minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontWeight: 800,
                    fontSize: "26px",
                    color: "var(--text)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                  }}
                >
                  Projetos publicados
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "var(--text-soft-2)",
                    marginTop: 4,
                  }}
                >
                  Status atual
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    fontFamily: "var(--font-manrope), sans-serif",
                    fontWeight: 800,
                    fontSize: "20px",
                    color: "var(--champagne)",
                  }}
                >
                  4 / 100%
                </p>
                <p style={{ fontSize: "10px", color: "var(--text-soft-2)" }}>
                  online
                </p>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <svg
                viewBox="0 0 420 90"
                preserveAspectRatio="none"
                style={{ width: "100%", height: 76, overflow: "visible" }}
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="consoleArea" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgba(201,168,106,0.28)" />
                    <stop offset="100%" stopColor="rgba(201,168,106,0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 70 C60 58 100 64 150 44 S250 30 300 24 S380 16 420 12 L420 90 L0 90 Z"
                  fill="url(#consoleArea)"
                />
                <path
                  d="M0 70 C60 58 100 64 150 44 S250 30 300 24 S380 16 420 12"
                  fill="none"
                  stroke="#C9A86A"
                  strokeWidth="2"
                />
                <path
                  d="M0 80 C70 74 120 70 180 60 S280 50 340 40 S400 34 420 30"
                  fill="none"
                  stroke="#0ea5a4"
                  strokeWidth="1.4"
                  strokeDasharray="4 4"
                  opacity="0.7"
                />
                <circle cx="420" cy="12" r="8" fill="rgba(201,168,106,0.18)" />
                <circle cx="420" cy="12" r="3.2" fill="#D4B87A" />
              </svg>
            </div>

            <div
              style={{
                marginTop: 14,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {projectCards.map((card) => (
                <div
                  key={card.name}
                  style={{
                    border: "1px solid var(--border-soft)",
                    borderRadius: 11,
                    background: "rgba(6,7,9,0.45)",
                    padding: "10px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "var(--text)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {card.name}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: "8px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "var(--petrol)",
                      border: "1px solid rgba(14,165,164,0.3)",
                      background: "rgba(14,165,164,0.08)",
                      borderRadius: 9999,
                      padding: "2px 7px",
                    }}
                  >
                    {card.tag}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 14, display: "grid", gap: 7 }}>
              {stackBars.map((bar) => (
                <div
                  key={bar.label}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      color: "var(--text-muted-2)",
                      width: 118,
                      flexShrink: 0,
                    }}
                  >
                    {bar.label}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 9999,
                      background: "var(--border-soft)",
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        height: "100%",
                        width: bar.width,
                        background:
                          "linear-gradient(90deg, #8B6B2A, #C9A86A)",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      color: "var(--champagne)",
                      width: 12,
                      textAlign: "right",
                    }}
                  >
                    {bar.count}
                  </span>
                </div>
              ))}
            </div>
          </main>

          <aside
            className="hidden 2xl:grid"
            style={{
              borderLeft: "1px solid var(--border-soft)",
              padding: "18px 14px",
              background: "rgba(6,7,9,0.35)",
              gap: 10,
              alignContent: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ color: "var(--champagne)", fontSize: 12 }}>⚡</span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--text)",
                }}
              >
                SOR Inteligência
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  width: 6,
                  height: 6,
                  borderRadius: 9999,
                  background: "var(--green)",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
            </div>

            <div
              style={{
                border: "1px solid var(--border-soft)",
                borderRadius: 11,
                background: "rgba(6,7,9,0.45)",
                padding: "10px 12px",
              }}
            >
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--text-soft-2)",
                  textTransform: "uppercase",
                }}
              >
                Status operacional
              </p>
              <p
                style={{
                  fontSize: "10px",
                  color: "var(--text-muted-2)",
                  marginTop: 5,
                  lineHeight: 1.5,
                }}
              >
                4 projetos publicados e funcionando em produção.
              </p>
            </div>

            <div
              style={{
                border: "1px solid var(--border-soft)",
                borderRadius: 11,
                background: "rgba(6,7,9,0.45)",
                padding: "10px 12px",
              }}
            >
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "var(--text-soft-2)",
                  textTransform: "uppercase",
                }}
              >
                Próximas entregas
              </p>
              <p
                style={{
                  fontSize: "10px",
                  color: "var(--text-muted-2)",
                  marginTop: 5,
                  lineHeight: 1.5,
                }}
              >
                AgendaFácil Lumière em integração. SOR OS redesign em andamento.
              </p>
            </div>

            <div style={{ display: "grid", gap: 7 }}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "10px",
                  color: "var(--text-muted-2)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 9999,
                    background: "var(--champagne)",
                    flexShrink: 0,
                  }}
                />
                Deploy AgendaFácil · Studio Cut
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "10px",
                  color: "var(--text-soft-2)",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 9999,
                    background: "var(--text-soft-2)",
                    flexShrink: 0,
                  }}
                />
                CatalogPro B2B live
              </span>
            </div>

            <div
              style={{
                border: "1px solid rgba(245,158,11,0.28)",
                borderRadius: 11,
                background: "rgba(245,158,11,0.06)",
                padding: "10px 12px",
              }}
            >
              <p
                style={{
                  fontSize: "10px",
                  color: "#f5b34a",
                  lineHeight: 1.5,
                  fontWeight: 500,
                }}
              >
                SOR OS redesign aprovado. Implementação em andamento.
              </p>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "var(--champagne)",
                }}
              >
                Ver projetos →
              </span>
            </div>
          </aside>
        </div>
      </div>

    </div>
  );
}
