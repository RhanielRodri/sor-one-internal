"use client";

import { useEffect, useRef } from "react";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";
import type { ServiceShowcaseItem } from "@/data/service-catalog";

const stats = [
  { value: "4", label: "Projetos online" },
  { value: "100%", label: "Em produção" },
  { value: "3min", label: "Diagnóstico" },
  { value: "Vila Velha", label: "ES — Brasil" },
];

const consoleNav = [
  { icon: "▦", label: "Dashboard", active: true },
  { icon: "◎", label: "Leads", active: false },
  { icon: "◇", label: "Soluções", active: false },
  { icon: "⟳", label: "Automações", active: false },
  { icon: "↗", label: "Projetos", active: false },
  { icon: "⌁", label: "Config", active: false },
];

const projectCards = [
  "AgendaFácil — Studio Cut",
  "CatalogPro B2B",
  "MesaFlow",
  "Barber Prime",
];

const problems = [
  { icon: "↗", title: "Clientes não te encontram", text: "Seu negócio fica invisível enquanto o concorrente aparece no Google. Você perde venda antes de abrir a boca — e nem sabe quantas." },
  { icon: "◎", title: "Você perde cliente no WhatsApp", text: "Orçamentos sem resposta, atendimento desorganizado, cliente some. Falta de processo custa dinheiro todo dia — e é invisível no extrato." },
  { icon: "◇", title: "Produto bom que ninguém vê", text: "Catálogo em PDF ou foto no story não converte. Sem vitrine profissional, sem credibilidade — o cliente vai pro concorrente que parece maior." },
  { icon: "▦", title: "Tempo gasto no que não vende", text: "Agendamento manual, planilha de controle, resposta repetitiva no WhatsApp. Tarefas que um sistema resolve em segundos tomam horas do seu dia." },
];

const steps = [
  { number: "01", title: "Diagnóstico gratuito", text: "Responda 5 perguntas em 3 minutos. Analiso seu cenário e identifico o que está travando sua captação e vendas. Sem compromisso." },
  { number: "02", title: "Proposta clara", text: "Escopo definido, prazo real, preço justo. Você sabe exatamente o que vai receber, quando vai receber e o que vai custar — antes de fechar." },
  { number: "03", title: "Entrega e suporte", text: "Projeto no ar e funcionando. Você aprende a usar, tem suporte direto e pode evoluir conforme o negócio cresce." },
];

const buildFlow = (arr: string[]) =>
  arr.map((text, i) => ({ text, hl: i === 0 || i === arr.length - 1, connector: i < arr.length - 1 }));

const flows = [
  { icon: "◎", title: "Captura de Lead", nodes: buildFlow(["Cliente preenche diagnóstico", "Lead salvo no console", "Notificação no WhatsApp", "Resposta automática em 2 min"]) },
  { icon: "⟳", title: "Agendamento Automático", nodes: buildFlow(["Cliente acessa AgendaFácil", "Escolhe horário disponível", "Confirmação por WhatsApp", "Lembrete 1h antes"]) },
  { icon: "◇", title: "Catálogo + Pedido B2B", nodes: buildFlow(["Cliente acessa CatalogPro", "Seleciona produtos", "Solicita cotação", "Vendedor notificado na hora"]) },
];

export function SorHome({ showcase }: { showcase: ServiceShowcaseItem[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];
    const rafs: number[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.transitionDelay = (el.dataset.revealDelay || 0) + "ms";
            requestAnimationFrame(() => {
              el.style.opacity = "1";
              el.style.transform = "none";
            });
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((g) => {
      Array.from(g.querySelectorAll<HTMLElement>("[data-reveal]")).forEach((el, i) => {
        el.dataset.revealDelay = String(Math.min(i * 80, 480));
      });
    });

    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const kind = el.getAttribute("data-reveal");
      el.style.opacity = "0";
      el.style.transform =
        kind === "scale" ? "scale(.94) translateY(16px)" : kind === "left" ? "translateX(-28px)" : "translateY(26px)";
      el.style.transition = "opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)";
      if (reduce) {
        el.style.opacity = "1";
        el.style.transform = "none";
      } else {
        io.observe(el);
      }
    });

    const countUp = (el: HTMLElement) => {
      const raw = (el.textContent || "").trim();
      const m = raw.match(/^([^\d]*)([\d.]+)(.*)$/);
      if (!m) return;
      const prefix = m[1];
      const target = parseFloat(m[2]);
      const suffix = m[3];
      const decimals = (m[2].split(".")[1] || "").length;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1100);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + (target * eased).toFixed(decimals) + suffix;
        if (t < 1) rafs.push(requestAnimationFrame(step));
        else el.textContent = raw;
      };
      requestAnimationFrame(step);
    };

    const countIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            countUp(e.target as HTMLElement);
            countIo.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    if (!reduce) root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => countIo.observe(el));

    cleanups.push(() => {
      io.disconnect();
      countIo.disconnect();
    });

    const header = root.querySelector<HTMLElement>("[data-header]");
    const onScroll = () => {
      if (header) header.style.background = window.scrollY > 12 ? "rgba(6,7,9,0.96)" : "rgba(6,7,9,0.72)";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    if (!reduce) {
      root.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const move = (ev: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = ev.clientX - (r.left + r.width / 2);
          const dy = ev.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${dx * 0.24}px, ${dy * 0.36}px)`;
        };
        const leave = () => {
          el.style.transform = "translate(0,0)";
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });

      root.querySelectorAll<HTMLElement>("[data-spotlight]").forEach((card) => {
        const spot = card.querySelector<HTMLElement>("[data-spot]");
        if (!spot) return;
        const move = (ev: PointerEvent) => {
          const r = card.getBoundingClientRect();
          spot.style.background = `radial-gradient(360px circle at ${ev.clientX - r.left}px ${ev.clientY - r.top}px, rgba(201,168,106,0.10), transparent 60%)`;
          spot.style.opacity = "1";
        };
        const leave = () => {
          spot.style.opacity = "0";
        };
        card.addEventListener("pointermove", move);
        card.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", move);
          card.removeEventListener("pointerleave", leave);
        });
      });

      let nx = 0;
      let ny = 0;
      let cx = 0;
      let cy = 0;
      let scroll = 0;
      const heroes = Array.from(root.querySelectorAll<HTMLElement>("[data-hero]"));
      const onPointer = (ev: PointerEvent) => {
        nx = (ev.clientX / window.innerWidth - 0.5) * 2;
        ny = (ev.clientY / window.innerHeight - 0.5) * 2;
        heroes.forEach((hero) => {
          const glow = hero.querySelector<HTMLElement>("[data-cursor-glow]");
          if (glow) {
            const r = hero.getBoundingClientRect();
            glow.style.transform = `translate(${ev.clientX - r.left}px, ${ev.clientY - r.top}px)`;
            glow.style.opacity = "1";
          }
        });
      };
      const onScrollScene = () => {
        scroll = window.scrollY;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("scroll", onScrollScene, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("scroll", onScrollScene);
      });

      const tilts = Array.from(root.querySelectorAll<HTMLElement>("[data-tilt]"));
      const pars = Array.from(root.querySelectorAll<HTMLElement>("[data-par]"));
      const floor = root.querySelector<HTMLElement>("[data-floor]");
      pars.forEach((p) => {
        const cs = p.getAttribute("style") || "";
        if (cs.includes("translateX(-50%)")) p.dataset.parBase = "translateX(-50%)";
      });

      let sceneRaf = 0;
      const tick = () => {
        cx += (nx - cx) * 0.07;
        cy += (ny - cy) * 0.07;
        tilts.forEach((t) => {
          t.style.transform = `perspective(1200px) rotateX(${(-cy * 4).toFixed(2)}deg) rotateY(${(cx * 6).toFixed(2)}deg)`;
        });
        pars.forEach((p) => {
          const d = +(p.dataset.depth || 1);
          const base = p.dataset.parBase || "";
          p.style.transform = `${base} translate3d(${(cx * d * 14).toFixed(1)}px, ${(cy * d * 9).toFixed(1)}px, 0)`;
        });
        if (floor) floor.style.transform = `perspective(900px) rotateX(72deg) translateY(${(scroll * 0.06).toFixed(1)}px)`;
        sceneRaf = requestAnimationFrame(tick);
      };
      tick();
      cleanups.push(() => cancelAnimationFrame(sceneRaf));
    }

    return () => {
      cleanups.forEach((fn) => {
        try {
          fn();
        } catch {}
      });
      rafs.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  return (
    <div ref={rootRef} id="sor-home" className="sor-root">
      <style>{sorStyles}</style>

      <header data-header className="sor-header">
        <div className="sor-header-inner">
          <a href="#top" className="sor-brand">
            <span className="sor-logo">
              <span className="sor-logo-dot" />
            </span>
            <span className="sor-brand-text">
              <span className="sor-brand-name">SOR ONE</span>
              <span className="sor-brand-sub">SOLUÇÕES DIGITAIS</span>
            </span>
          </a>
          <nav className="sor-nav">
            <a className="sor-navlink" href="#problemas">Problemas</a>
            <a className="sor-navlink" href="#solucoes">Soluções</a>
            <a className="sor-navlink" href="#processo">Processo</a>
            <a className="sor-navlink" href="/projetos">Projetos</a>
            <a data-magnetic className="sor-btn sor-btn-primary sor-btn-sm" href="/diagnostico">Diagnóstico</a>
          </nav>
        </div>
      </header>

      <span id="top" />

      <section data-hero className="sor-hero">
        <div aria-hidden="true" className="sor-hero-scene">
          <div data-par data-depth="0.6" className="sor-glow-floor" />
          <div data-floor className="sor-floor" />
          <div data-par data-depth="1.4" className="sor-line" style={{ left: "30%" }} />
          <div data-par data-depth="1.8" className="sor-line" style={{ left: "50%" }} />
          <div data-par data-depth="1.4" className="sor-line" style={{ left: "70%" }} />
          <span className="sor-anim sor-flow" style={{ left: "38%", height: 100, animationDelay: ".3s", animationDuration: "2.6s" }} />
          <span className="sor-anim sor-flow" style={{ left: "58%", height: 118, animationDelay: ".9s", animationDuration: "2.1s" }} />
          <span className="sor-anim sor-flow" style={{ left: "66%", height: 96, animationDelay: "1.3s", animationDuration: "2.9s" }} />
          <div data-cursor-glow className="sor-cursor-glow" />
          <div className="sor-hero-vignette" />
        </div>

        <div className="sor-container sor-hero-container">
          <div data-hero-grid className="sor-hero-grid">
            <div>
              <span data-reveal className="sor-badge">
                <span className="sor-anim sor-pulse" />
                Sistema operacional · Vila Velha, ES
              </span>
              <h1 data-reveal className="sor-h1">
                Tecnologia que<br />
                <span className="sor-accent">gera resultado.</span>
              </h1>
              <p data-reveal className="sor-lead">
                Crio sites, sistemas e automações para negócios locais venderem mais e trabalharem menos.
              </p>
              <div data-reveal className="sor-hero-ctas">
                <a data-magnetic className="sor-btn sor-btn-primary" href="#cta">Solicitar diagnóstico</a>
                <a data-magnetic className="sor-btn sor-btn-ghost" href="#solucoes">Ver soluções →</a>
              </div>
              <div data-reveal-group className="sor-stats">
                {stats.map((s) => (
                  <div data-reveal="scale" key={s.label}>
                    <div data-count className="sor-stat-value">{s.value}</div>
                    <div className="sor-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div data-console-wrap className="sor-anim sor-console-wrap">
              <div data-tilt className="sor-console">
                <div className="sor-console-top">
                  <span className="sor-console-top-label">DASHBOARD · Projetos online</span>
                  <span className="sor-live">
                    <span className="sor-anim sor-pulse sm" />Sistema Ativo
                  </span>
                </div>
                <div className="sor-console-body">
                  <aside className="sor-console-aside">
                    <p className="sor-console-brand">SOR ONE</p>
                    <p className="sor-console-brand-sub">CONSOLE</p>
                    <nav className="sor-console-nav">
                      {consoleNav.map((n) => (
                        <span key={n.label} className={"sor-navitem" + (n.active ? " active" : "")}>
                          <span className="sor-navitem-icon">{n.icon}</span>
                          {n.label}
                        </span>
                      ))}
                    </nav>
                  </aside>
                  <main className="sor-console-main">
                    <div className="sor-console-head">
                      <div>
                        <p className="sor-console-title">Projetos publicados</p>
                        <p className="sor-console-caption">Status atual</p>
                      </div>
                      <div className="sor-console-count">
                        <p data-count className="sor-console-count-value">4</p>
                        <p className="sor-console-count-label">online</p>
                      </div>
                    </div>
                    <div className="sor-chart">
                      <svg viewBox="0 0 420 90" preserveAspectRatio="none" aria-hidden="true">
                        <defs>
                          <linearGradient id="sorArea" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="rgba(201,168,106,0.28)" />
                            <stop offset="100%" stopColor="rgba(201,168,106,0)" />
                          </linearGradient>
                        </defs>
                        <path d="M0 70 C60 58 100 64 150 44 S250 30 300 24 S380 16 420 12 L420 90 L0 90 Z" fill="url(#sorArea)" />
                        <path d="M0 70 C60 58 100 64 150 44 S250 30 300 24 S380 16 420 12" fill="none" stroke="#C9A86A" strokeWidth="2" />
                        <path d="M0 80 C70 74 120 70 180 60 S280 50 340 40 S400 34 420 30" fill="none" stroke="#0ea5a4" strokeWidth="1.4" strokeDasharray="4 4" opacity="0.7" />
                        <circle cx="420" cy="12" r="8" fill="rgba(201,168,106,0.18)" />
                        <circle cx="420" cy="12" r="3.2" fill="#D4B87A" />
                      </svg>
                    </div>
                    <div className="sor-console-cards">
                      {projectCards.map((name) => (
                        <div key={name} className="sor-console-card">
                          <span className="sor-console-card-name">{name}</span>
                          <span className="sor-tag-online">ONLINE</span>
                        </div>
                      ))}
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sor-anim sor-scroll-hint">
          <span className="sor-scroll-label">Scroll</span>
          <span className="sor-scroll-arrow">↓</span>
        </div>
      </section>

      <section id="problemas" className="sor-section sor-section-a">
        <div className="sor-container">
          <p data-reveal className="sor-eyebrow">Problemas que resolvo</p>
          <h2 data-reveal className="sor-h2">Se isso parece familiar, é hora de mudar.</h2>
          <div data-reveal-group className="sor-grid-2">
            {problems.map((p) => (
              <div data-reveal data-spotlight className="sor-card sor-card-lift" key={p.title}>
                <div data-spot className="sor-spot" />
                <div className="sor-card-inner">
                  <div className="sor-icon">{p.icon}</div>
                  <h3 className="sor-card-title">{p.title}</h3>
                  <p className="sor-card-text">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solucoes" className="sor-section sor-section-b">
        <div className="sor-container">
          <p data-reveal className="sor-eyebrow">Soluções</p>
          <h2 data-reveal className="sor-h2">O que posso desenvolver para o seu negócio</h2>
          <p data-reveal className="sor-section-lead">
            Cada solução é desenvolvida sob medida para o que o seu negócio precisa hoje — sem inflar escopo, sem cobrar pelo que você não vai usar.
          </p>
          <div data-reveal-group className="sor-grid-2 sor-grid-stretch">
            {showcase.map((s) => (
              <article data-reveal data-spotlight className="sor-service sor-card-lift" key={s.name}>
                <div data-spot className="sor-spot" />
                <div className="sor-service-inner">
                  <div className="sor-service-head">
                    <span className="sor-icon">{s.icon}</span>
                    <span className="sor-chip">{s.category}</span>
                  </div>
                  <h3 className="sor-service-name">{s.name}</h3>
                  <p className="sor-card-text">{s.description}</p>
                  <div className="sor-price">
                    <span className="sor-price-label">A partir de</span>
                    <span className="sor-price-value">{s.price}</span>
                  </div>
                  <div className="sor-service-foot">
                    <ul className="sor-includes">
                      {s.includes.map((line) => (
                        <li key={line}><span className="sor-check">✓</span>{line}</li>
                      ))}
                    </ul>
                    <div className="sor-meta">
                      <div><p className="sor-meta-label">Prazo</p><p className="sor-meta-value">{s.prazo}</p></div>
                      <div className="sor-meta-mid"><p className="sor-meta-label">Revisões</p><p className="sor-meta-value">{s.revisoes}</p></div>
                      <div><p className="sor-meta-label">Suporte</p><p className="sor-meta-value">{s.suporte}</p></div>
                    </div>
                    <div className="sor-service-cta">
                      <a data-magnetic className="sor-btn sor-btn-primary sor-btn-block" href="#cta">Solicitar diagnóstico gratuito</a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="processo" className="sor-section sor-section-a">
        <div className="sor-container">
          <p data-reveal className="sor-eyebrow">Como funciona</p>
          <h2 data-reveal className="sor-h2">Do diagnóstico à entrega em 3 passos.</h2>
          <p data-reveal className="sor-section-lead">
            Processo direto, sem reuniões intermináveis e sem enrolação. Você sabe onde está o projeto em cada etapa.
          </p>
          <div data-reveal-group className="sor-grid-3">
            {steps.map((step) => (
              <div data-reveal data-spotlight className="sor-card" key={step.number}>
                <div data-spot className="sor-spot" />
                <div className="sor-card-inner">
                  <span className="sor-step-num">{step.number}</span>
                  <h3 className="sor-card-title">{step.title}</h3>
                  <p className="sor-card-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sor-section sor-section-b">
        <div className="sor-container">
          <p data-reveal className="sor-eyebrow">Automações com IA</p>
          <h2 data-reveal className="sor-h2">Seu negócio respondendo enquanto você dorme.</h2>
          <p data-reveal className="sor-section-lead">
            Fluxos automáticos para captura, agendamento e vendas — o cliente é atendido na hora, mesmo fora do horário comercial.
          </p>
          <div data-reveal-group className="sor-grid-3">
            {flows.map((flow) => (
              <div data-reveal className="sor-card" key={flow.title}>
                <div className="sor-flow-head">
                  <span className="sor-icon sm">{flow.icon}</span>
                  <h3 className="sor-flow-title">{flow.title}</h3>
                </div>
                <div className="sor-flow-nodes">
                  {flow.nodes.map((node, i) => (
                    <div key={i}>
                      <div className={"sor-flow-node" + (node.hl ? " hl" : "")}>{node.text}</div>
                      {node.connector && <div className="sor-flow-connector" />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="sor-cta">
        <div data-par data-depth="0.5" aria-hidden="true" className="sor-cta-glow" />
        <div className="sor-container sor-cta-inner">
          <h2 data-reveal className="sor-h2 sor-cta-title">Pronto para parar de perder cliente?</h2>
          <div data-reveal className="sor-cta-btns">
            <a data-magnetic className="sor-btn sor-btn-primary sor-btn-lg" href="#top">Solicitar diagnóstico grátis</a>
            <a data-magnetic className="sor-btn sor-btn-ghost sor-btn-lg" href={SOR_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Falar no WhatsApp →</a>
          </div>
        </div>
      </section>

      <footer className="sor-footer">
        <div className="sor-container sor-footer-inner">
          <div className="sor-brand">
            <span className="sor-logo sm"><span className="sor-logo-dot" /></span>
            <span className="sor-brand-name">SOR ONE</span>
          </div>
          <nav aria-label="Navegação do rodapé" className="sor-footer-nav">
            <a className="sor-footer-link" href="#problemas">Problemas</a>
            <a className="sor-footer-link" href="#solucoes">Soluções</a>
            <a className="sor-footer-link" href="#processo">Processo</a>
            <a className="sor-footer-link" href="/projetos">Projetos</a>
            <a className="sor-footer-link" href="/diagnostico">Diagnóstico</a>
            <a
              className="sor-footer-link"
              href={SOR_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </nav>
          <p className="sor-footer-copy">© 2026 SOR ONE · Rhaniel Rodrigues · Vila Velha, ES</p>
        </div>
      </footer>
    </div>
  );
}

const sorStyles = `
#sor-home{position:relative;min-height:100vh;overflow-x:hidden;color:#F0EDEA;font-family:var(--font-inter),system-ui,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;background:radial-gradient(circle at 18% 6%, rgba(201,168,106,0.05), transparent 26%), radial-gradient(circle at 82% 20%, rgba(14,165,164,0.05), transparent 24%), linear-gradient(180deg,#060709 0%,#0a0c10 46%,#060709 100%);}
#sor-home *{box-sizing:border-box;}
#sor-home ::selection{background:rgba(201,168,106,0.24);color:#F2F0EB;}
#sor-home *::-webkit-scrollbar{width:10px;height:10px;}
#sor-home *::-webkit-scrollbar-thumb{background:#1f2733;border-radius:8px;}
.sor-container{max-width:1200px;margin:0 auto;padding:0 24px;}
@keyframes sor-pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.5;transform:scale(.65);}}
@keyframes sor-bounce-down{0%,100%{transform:translateY(0);}50%{transform:translateY(6px);}}
@keyframes sor-flow-down{0%{opacity:0;transform:translateY(0);}8%{opacity:1;}92%{opacity:.35;}100%{opacity:0;transform:translateY(-120px);}}
@keyframes sor-float{0%,100%{transform:translateY(0);}50%{transform:translateY(-9px);}}
@media (prefers-reduced-motion: reduce){.sor-anim{animation:none !important;}}

.sor-header{position:sticky;top:0;z-index:50;border-bottom:1px solid #181e27;background:rgba(6,7,9,0.72);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);transition:background .3s ease,border-color .3s ease;}
.sor-header-inner{max-width:1280px;margin:0 auto;padding:0 24px;min-height:70px;display:flex;align-items:center;justify-content:space-between;gap:24px;}
.sor-brand{display:flex;align-items:center;gap:11px;text-decoration:none;}
.sor-logo{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:linear-gradient(150deg,#C9A86A,#8B6B2A);box-shadow:0 4px 16px rgba(201,168,106,.28);}
.sor-logo.sm{width:26px;height:26px;border-radius:8px;box-shadow:none;}
.sor-logo-dot{width:11px;height:11px;background:#060709;transform:rotate(45deg);border-radius:2px;}
.sor-logo.sm .sor-logo-dot{width:9px;height:9px;}
.sor-brand-text{display:flex;flex-direction:column;line-height:1;}
.sor-brand-name{font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:15px;letter-spacing:-0.02em;color:#F0EDEA;}
.sor-brand-sub{font-family:ui-monospace,monospace;font-size:8px;letter-spacing:0.28em;color:#4A4D56;margin-top:3px;}
.sor-nav{display:flex;align-items:center;gap:8px;}
.sor-navlink{padding:8px 12px;font-size:13px;font-weight:600;color:#9A9DA6;text-decoration:none;border-radius:8px;transition:color .2s,background .2s;}
.sor-navlink:hover{color:#F0EDEA;background:rgba(201,168,106,0.06);}
@media (max-width:640px){.sor-navlink{display:none;}}

.sor-btn{display:inline-flex;align-items:center;justify-content:center;border-radius:12px;padding:14px 24px;font-size:14px;font-family:var(--font-manrope),sans-serif;font-weight:700;text-decoration:none;transition:box-shadow .3s,transform .2s,border-color .3s;}
.sor-btn-sm{padding:9px 18px;border-radius:10px;font-size:13px;margin-left:8px;}
.sor-btn-lg{padding:15px 28px;}
.sor-btn-block{width:100%;padding:11px 16px;}
.sor-btn-primary{background:#C9A86A;color:#060709;}
.sor-btn-primary:hover{box-shadow:0 12px 34px rgba(201,168,106,.4);}
.sor-btn-ghost{border:1px solid #181e27;color:#F0EDEA;font-weight:600;}
.sor-btn-ghost:hover{border-color:rgba(201,168,106,0.4);}

.sor-hero{position:relative;min-height:100vh;display:flex;align-items:center;overflow:hidden;padding-top:72px;}
.sor-hero-scene{position:absolute;inset:0;overflow:hidden;pointer-events:none;}
.sor-glow-floor{position:absolute;bottom:26%;left:50%;transform:translateX(-50%);width:900px;max-width:100%;height:190px;background:radial-gradient(ellipse 70% 60% at 50% 100%, rgba(201,168,106,0.20), transparent 70%);}
.sor-floor{position:absolute;bottom:-10%;left:-60%;width:220%;height:82%;background-image:linear-gradient(to right, rgba(201,168,106,0.11) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,168,106,0.11) 1px, transparent 1px);background-size:72px 72px;transform:perspective(900px) rotateX(72deg);transform-origin:bottom center;-webkit-mask-image:linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.7) 35%, rgba(0,0,0,.15) 65%, transparent 100%);mask-image:linear-gradient(to top, rgba(0,0,0,.95) 0%, rgba(0,0,0,.7) 35%, rgba(0,0,0,.15) 65%, transparent 100%);}
.sor-line{position:absolute;bottom:28%;width:1px;height:200px;background:linear-gradient(to top, rgba(201,168,106,.5), rgba(201,168,106,.08) 55%, transparent);}
.sor-flow{position:absolute;bottom:30%;width:1px;background:linear-gradient(to bottom, transparent, rgba(201,168,106,.7) 60%, rgba(212,184,122,.9));animation:sor-flow-down ease-in-out infinite;}
.sor-cursor-glow{position:absolute;top:0;left:0;width:520px;height:520px;margin:-260px 0 0 -260px;border-radius:9999px;background:radial-gradient(circle at center, rgba(201,168,106,0.10), transparent 62%);opacity:0;transition:opacity .4s ease;will-change:transform;}
.sor-hero-vignette{position:absolute;inset:0;background:linear-gradient(90deg,#060709 0%,transparent 14%,transparent 86%,#060709 100%), linear-gradient(to bottom,#060709 0%,transparent 22%);}
.sor-hero-container{position:relative;z-index:10;max-width:1280px;width:100%;padding-top:64px;padding-bottom:64px;}
.sor-hero-grid{display:grid;align-items:center;gap:56px;grid-template-columns:1fr;}
@media (min-width:1024px){.sor-hero-grid{grid-template-columns:1.05fr 0.95fr;}}
.sor-badge{display:inline-flex;align-items:center;gap:8px;border-radius:9999px;padding:6px 13px;font-size:12px;font-weight:600;border:1px solid rgba(201,168,106,0.18);background:rgba(201,168,106,0.08);color:#c4c0b8;}
.sor-pulse{width:7px;height:7px;border-radius:9999px;background:#22c55e;animation:sor-pulse-dot 2s ease-in-out infinite;}
.sor-pulse.sm{width:6px;height:6px;}
.sor-h1{margin:26px 0 0;font-family:var(--font-manrope),sans-serif;font-weight:800;letter-spacing:-0.04em;font-size:clamp(40px,6vw,72px);line-height:1.04;color:#F0EDEA;}
.sor-accent{color:#C9A86A;}
.sor-lead{margin:22px 0 0;max-width:480px;font-size:17px;line-height:1.65;color:#9A9DA6;}
.sor-hero-ctas{margin-top:34px;display:flex;flex-wrap:wrap;gap:12px;}
.sor-stats{margin-top:40px;display:grid;grid-template-columns:repeat(2,1fr);gap:20px 24px;max-width:560px;border-top:1px solid #181e27;padding-top:28px;}
.sor-stat-value{font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:clamp(22px,2.4vw,28px);color:#F0EDEA;}
.sor-stat-label{margin-top:5px;font-size:12px;color:#8A8D94;}

.sor-console-wrap{animation:sor-float 6s ease-in-out infinite;}
@media (max-width:767px){.sor-console-wrap{display:none;}}
.sor-console{border-radius:20px;border:1px solid rgba(201,168,106,0.18);background:linear-gradient(160deg,#111620,#0d1015);box-shadow:0 48px 120px rgba(0,0,0,.6),0 0 70px rgba(201,168,106,.05),0 1px 0 rgba(201,168,106,.12) inset;overflow:hidden;will-change:transform;}
.sor-console-top{display:flex;align-items:center;justify-content:space-between;padding:11px 16px;border-bottom:1px solid #181e27;background:rgba(6,7,9,0.6);font-size:10px;}
.sor-console-top-label{color:#9A9DA6;letter-spacing:0.16em;font-weight:600;}
.sor-live{display:inline-flex;align-items:center;gap:6px;color:#22c55e;font-weight:700;}
.sor-console-body{display:grid;grid-template-columns:120px minmax(0,1fr);}
.sor-console-aside{border-right:1px solid #181e27;padding:16px 12px;background:rgba(6,7,9,0.35);}
.sor-console-brand{margin:0;font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:15px;color:#F0EDEA;letter-spacing:-0.02em;}
.sor-console-brand-sub{margin:2px 0 0;font-family:ui-monospace,monospace;font-size:8px;color:#4A4D56;letter-spacing:0.2em;}
.sor-console-nav{margin-top:20px;display:grid;gap:3px;}
.sor-navitem{display:flex;align-items:center;gap:9px;padding:7px 9px;border-radius:8px;font-size:11px;color:#9A9DA6;border-left:2px solid transparent;transition:color .3s,background .3s;}
.sor-navitem.active{color:#C9A86A;background:rgba(201,168,106,0.06);border-left-color:#C9A86A;}
.sor-navitem-icon{width:13px;text-align:center;opacity:.85;}
.sor-console-main{padding:18px 20px;min-width:0;}
.sor-console-head{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;}
.sor-console-title{margin:0;font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:24px;color:#F0EDEA;letter-spacing:-0.03em;line-height:1.05;}
.sor-console-caption{margin:4px 0 0;font-size:11px;color:#4A4D56;}
.sor-console-count{text-align:right;}
.sor-console-count-value{margin:0;font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:20px;color:#C9A86A;}
.sor-console-count-label{margin:0;font-size:10px;color:#4A4D56;}
.sor-chart{margin-top:14px;}
.sor-chart svg{width:100%;height:74px;overflow:visible;}
.sor-console-cards{margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.sor-console-card{border:1px solid #181e27;border-radius:11px;background:rgba(6,7,9,0.45);padding:9px 11px;display:flex;align-items:center;justify-content:space-between;gap:8px;}
.sor-console-card-name{font-size:10px;font-weight:600;color:#F0EDEA;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.sor-tag-online{flex-shrink:0;font-size:8px;font-weight:700;letter-spacing:0.1em;color:#0ea5a4;border:1px solid rgba(14,165,164,0.3);background:rgba(14,165,164,0.08);border-radius:9999px;padding:2px 7px;}

.sor-scroll-hint{position:absolute;bottom:26px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:7px;color:#8A8D94;pointer-events:none;}
.sor-scroll-label{font-size:10px;text-transform:uppercase;letter-spacing:0.24em;}
.sor-scroll-arrow{font-size:14px;animation:sor-bounce-down 1.6s ease-in-out infinite;}

.sor-section{padding:88px 0;border-bottom:1px solid #181e27;}
.sor-section-a{background:#060709;border-top:1px solid #181e27;}
.sor-section-b{background:#0a0c10;}
.sor-eyebrow{margin:0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#C9A86A;}
.sor-h2{margin:16px 0 0;max-width:640px;font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:clamp(28px,3.6vw,40px);letter-spacing:-0.035em;line-height:1.1;color:#F0EDEA;}
.sor-section-lead{margin:20px 0 0;max-width:640px;font-size:16px;line-height:1.65;color:#c4c0b8;}

.sor-grid-2{margin-top:48px;display:grid;gap:16px;grid-template-columns:repeat(2,1fr);}
.sor-grid-3{margin-top:48px;display:grid;gap:24px;grid-template-columns:repeat(3,1fr);}
.sor-grid-stretch{align-items:stretch;}
@media (max-width:760px){.sor-grid-2,.sor-grid-3{grid-template-columns:1fr;}}

.sor-card{position:relative;border-radius:18px;border:1px solid #181e27;background:#0d1015;padding:28px;overflow:hidden;transition:transform .3s ease,border-color .3s ease;}
.sor-card-lift:hover{transform:translateY(-4px);border-color:rgba(201,168,106,0.28);}
.sor-card:hover{border-color:rgba(201,168,106,0.28);}
.sor-spot{position:absolute;inset:0;opacity:0;transition:opacity .3s ease;pointer-events:none;}
.sor-card-inner{position:relative;}
.sor-icon{display:grid;place-items:center;width:44px;height:44px;border-radius:12px;border:1px solid rgba(201,168,106,0.14);background:radial-gradient(circle at 35% 30%, rgba(201,168,106,0.14), transparent 48%), rgba(201,168,106,0.05);font-size:18px;color:#C9A86A;}
.sor-icon.sm{width:40px;height:40px;font-size:16px;}
.sor-card-title{margin:20px 0 0;font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:18px;color:#F0EDEA;}
.sor-card-text{margin:8px 0 0;font-size:14px;line-height:1.6;color:#8A8D94;}
.sor-step-num{display:inline-block;border-radius:12px;border:1px solid rgba(201,168,106,0.22);background:rgba(201,168,106,0.06);padding:6px 12px;font-family:var(--font-manrope),sans-serif;font-size:12px;font-weight:800;color:#C9A86A;}

.sor-service{position:relative;display:flex;flex-direction:column;overflow:hidden;border-radius:24px;border:1px solid #1C2530;padding:24px;background:radial-gradient(circle at 18% 0%, rgba(201,168,106,0.04), transparent 36%), linear-gradient(155deg, rgba(20,25,32,0.98), rgba(10,14,18,0.98));box-shadow:0 22px 55px rgba(0,0,0,.32),0 1px 0 rgba(201,168,106,.05) inset;transition:transform .3s ease,border-color .3s ease;}
.sor-service-inner{position:relative;display:flex;flex-direction:column;flex:1;}
.sor-service-head{display:flex;align-items:center;gap:12px;}
.sor-chip{border-radius:9999px;border:1px solid #1C2530;background:rgba(201,168,106,0.04);padding:4px 10px;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#8A8D94;}
.sor-service-name{margin:20px 0 0;font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:20px;letter-spacing:-0.02em;color:#F0EDEA;}
.sor-price{margin-top:16px;display:flex;align-items:baseline;gap:8px;}
.sor-price-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#8A8D94;}
.sor-price-value{font-size:16px;font-family:var(--font-manrope),sans-serif;font-weight:800;color:#C9A86A;}
.sor-service-foot{margin-top:20px;display:flex;flex-direction:column;flex:1;border-top:1px solid #1C2530;padding-top:20px;}
.sor-includes{margin:0;padding:0;list-style:none;display:grid;gap:8px;font-size:14px;color:#c4c0b8;}
.sor-includes li{display:flex;gap:8px;}
.sor-check{color:#C9A86A;}
.sor-meta{margin-top:20px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;border:1px solid #1C2530;border-radius:16px;background:rgba(0,0,0,0.1);padding:12px;text-align:center;}
.sor-meta-mid{border-left:1px solid #1C2530;border-right:1px solid #1C2530;}
.sor-meta-label{margin:0;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:#8A8D94;}
.sor-meta-value{margin:4px 0 0;font-size:12px;font-family:var(--font-manrope),sans-serif;font-weight:800;color:#F0EDEA;}
.sor-service-cta{margin-top:auto;padding-top:20px;}

.sor-flow-head{display:flex;align-items:center;gap:12px;}
.sor-flow-title{margin:0;font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:16px;color:#F0EDEA;}
.sor-flow-nodes{margin-top:20px;display:grid;gap:2px;}
.sor-flow-node{border-radius:12px;border:1px solid #181e27;background:rgba(6,7,9,0.4);padding:11px 14px;font-size:12px;font-weight:600;color:#9A9DA6;transition:border-color .3s,background .3s,color .3s;}
.sor-flow-node.hl{border-color:rgba(201,168,106,0.18);background:rgba(201,168,106,0.08);color:#C9A86A;}
.sor-flow-connector{margin:0 auto;width:1px;height:12px;background:#181e27;}

.sor-cta{position:relative;overflow:hidden;padding:128px 0;background:#060709;}
.sor-cta-glow{position:absolute;left:50%;top:50%;width:36rem;height:36rem;max-width:94vw;transform:translate(-50%,-50%);border-radius:9999px;background:radial-gradient(circle at center, rgba(201,168,106,0.16), transparent 60%);filter:blur(40px);pointer-events:none;}
.sor-cta-inner{position:relative;text-align:center;}
.sor-cta-title{margin:0 auto;font-size:clamp(30px,4.4vw,52px);letter-spacing:-0.04em;line-height:1.08;}
.sor-cta-btns{margin-top:36px;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}

.sor-footer{border-top:1px solid #181e27;padding:44px 0;background:#060709;}
.sor-footer-inner{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;}
.sor-footer-nav{display:flex;flex-wrap:wrap;align-items:center;gap:20px;}
.sor-footer-link{font-size:13px;font-weight:600;color:#9A9DA6;text-decoration:none;transition:color .2s;}
.sor-footer-link:hover{color:#C9A86A;}
.sor-footer-copy{margin:0;font-size:12px;color:#4A4D56;}
`;
