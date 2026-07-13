"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";
import { SorLogo } from "@/components/ui/SorLogo";

const DIAGNOSTIC_HREF = "/diagnostico";

const stats = [
  { value: "3", label: "Demonstrações online" },
  { value: "100%", label: "Configurado à operação" },
  { value: "3min", label: "Diagnóstico" },
  { value: "Vila Velha", label: "ES — Brasil" },
];

const consoleNav = [
  { icon: "▦", label: "Dashboard", active: true },
  { icon: "◎", label: "Leads", active: false },
  { icon: "◇", label: "Soluções", active: false },
  { icon: "⟳", label: "Automações", active: false },
  { icon: "↗", label: "Implantações", active: false },
  { icon: "⌁", label: "Config", active: false },
];

const consoleCards = [
  "NovaTech Assistência",
  "Studio Cut",
  "Lumière Estética",
];

const problems = [
  { icon: "◎", title: "Contato espalhado no WhatsApp", text: "Mensagens, orçamentos e pedidos se misturam na conversa. Sem processo, o cliente fica sem resposta e a oportunidade se perde — todo dia, sem aparecer no caixa." },
  { icon: "▦", title: "Controle no papel e em planilhas", text: "Agenda no caderno, clientes numa planilha, pedidos na cabeça. Dá erro, dá retrabalho e ninguém enxerga o todo para decidir o próximo passo." },
  { icon: "◇", title: "Ferramentas isoladas que não conversam", text: "Site de um lado, agenda de outro, catálogo em PDF. Nada integrado, tudo manual — e cada emenda entre uma ferramenta e outra vira trabalho seu." },
  { icon: "↗", title: "Sem acompanhamento nem visão de resultado", text: "Demora para responder, contato sem retorno e nenhum número para saber o que está funcionando. Você trabalha muito e não sabe onde está perdendo." },
];

const solutionCategories = [
  {
    icon: "↗",
    title: "Presença e conversão",
    items: ["Landing pages", "Sites institucionais", "Páginas comerciais", "SEO local", "Captação de contatos"],
  },
  {
    icon: "◎",
    title: "Agendamento e relacionamento",
    items: ["Agenda online", "Serviços e profissionais", "Horários e clientes", "Lembretes automáticos", "Painel administrativo"],
  },
  {
    icon: "◇",
    title: "Catálogos, pedidos e orçamentos",
    items: ["Catálogos e cardápios", "Pedidos e carrinhos", "Orçamentos", "Solicitações do cliente", "Acompanhamento de oportunidades"],
  },
  {
    icon: "▦",
    title: "Operação e gestão",
    items: ["Ordens de serviço", "Estoque e clientes", "Processos e tarefas", "Painéis", "Relatórios"],
  },
  {
    icon: "⟳",
    title: "Atendimento e automação",
    items: ["WhatsApp estruturado", "Inteligência artificial", "CRM e handoff humano", "Follow-ups e integrações", "Dashboards"],
  },
];

const tiers = [
  {
    tag: "Essencial",
    title: "Organize uma jornada específica",
    text: "Uma frente resolvida com qualidade: site, agendamento, catálogo, cardápio, orçamento ou WhatsApp estruturado.",
    items: ["Uma jornada principal completa", "Publicação e configuração inicial", "Pensado para pequenos negócios"],
    note: "Solução acessível para começar com o pé direito.",
  },
  {
    tag: "Operacional",
    title: "Conecte mais de uma etapa",
    text: "Quando o negócio precisa ligar atendimento, gestão e acompanhamento numa operação só.",
    items: ["Atendimento e gestão integrados", "Ordens, clientes e processos", "Automações e painéis"],
    note: "Para operações que já cresceram além de uma única frente.",
  },
  {
    tag: "Inteligente",
    title: "Operação completa e automatizada",
    text: "Para quem quer a operação rodando com inteligência artificial e integrações trabalhando junto.",
    items: ["IA no atendimento e WhatsApp", "CRM, handoff humano e automações", "Integrações, dashboards e relatórios"],
    note: "Projetos mais completos, sem limitar a SOR ONE a soluções baratas.",
  },
];

const demos = [
  {
    icon: "⟳",
    category: "Atendimento, triagem e operação",
    name: "NovaTech Assistência",
    text: "Uma assistência técnica demonstrativa que recebe o cliente, conduz a triagem, registra a solicitação e organiza o acompanhamento do serviço.",
    href: "https://demo-assistencia-tecnica.sor-os-demos.workers.dev",
    cta: "Explorar ambiente",
  },
  {
    icon: "◎",
    category: "Agendamento e gestão para barbearia",
    name: "Studio Cut",
    text: "Uma jornada de agendamento com serviços, profissionais, horários e painel administrativo.",
    href: "https://agendafacil-sistema.vercel.app/demo/studio-cut",
    cta: "Ver demonstração",
  },
  {
    icon: "◇",
    category: "Agendamento e relacionamento para estética",
    name: "Lumière Estética",
    text: "Uma experiência de agendamento com serviços, profissionais e identidade configurada para uma operação de estética.",
    href: "https://agendafacil-sistema.vercel.app/demo/lumiere",
    cta: "Ver implantação",
  },
];

const steps = [
  { number: "01", title: "Diagnóstico", text: "Você responde poucas perguntas e eu entendo o porte, os processos e o objetivo do seu negócio. Gratuito e sem compromisso." },
  { number: "02", title: "Definição do escopo", text: "Definimos juntos os módulos, integrações e jornadas que fazem sentido agora — o que entra e o que fica para depois." },
  { number: "03", title: "Configuração", text: "Preparo a solução para a sua operação, com os dados, textos e regras do seu negócio." },
  { number: "04", title: "Implementação", text: "Coloco o sistema no ar, integrado aos canais que você já usa, funcionando de ponta a ponta." },
  { number: "05", title: "Homologação", text: "Testamos o fluxo principal com você antes de abrir para os seus clientes." },
  { number: "06", title: "Treinamento", text: "Você e sua equipe aprendem a usar o sistema no dia a dia, sem depender de mim para operar." },
  { number: "07", title: "Operação e evolução", text: "Com a base rodando, novas frentes e integrações entram de forma planejada, quando o negócio pedir." },
];

export function SorHome() {
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
          <Link href="/" aria-label="SOR ONE — Início" className="sor-brand-link">
            <SorLogo variant="horizontal" />
          </Link>
          <nav className="sor-nav">
            <a className="sor-navlink" href="#solucoes">Soluções</a>
            <a className="sor-navlink" href="#portes">Portes</a>
            <a className="sor-navlink" href="#demonstracoes">Demonstrações</a>
            <a className="sor-navlink" href="#processo">Como trabalhamos</a>
          </nav>
          <div className="sor-header-actions">
            <Link data-magnetic className="sor-btn sor-btn-primary sor-btn-sm" href={DIAGNOSTIC_HREF}>Diagnóstico</Link>
          </div>
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
                SOR ONE · Vila Velha, ES
              </span>
              <h1 data-reveal className="sor-h1">
                Sistemas que organizam<br />
                <span className="sor-accent">atendimento, vendas e operação.</span>
              </h1>
              <p data-reveal className="sor-lead">
                A SOR ONE implanta sites, sistemas e automações configurados para a realidade de cada negócio — de operações essenciais para pequenos negócios a soluções completas com inteligência artificial e integrações.
              </p>
              <div data-reveal className="sor-hero-ctas">
                <Link data-magnetic className="sor-btn sor-btn-primary" href={DIAGNOSTIC_HREF}>Solicitar diagnóstico</Link>
                <a data-magnetic className="sor-btn sor-btn-ghost" href="#demonstracoes">Ver demonstrações →</a>
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
                  <span className="sor-console-top-label">CONSOLE · Implantações</span>
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
                        <p className="sor-console-title">Ambientes demonstrativos</p>
                        <p className="sor-console-caption">Status atual</p>
                      </div>
                      <div className="sor-console-count">
                        <p data-count className="sor-console-count-value">3</p>
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
                      {consoleCards.map((name) => (
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
      </section>

      <section id="problema" className="sor-section sor-section-a">
        <div className="sor-container">
          <p data-reveal className="sor-eyebrow">O problema</p>
          <h2 data-reveal className="sor-h2">Não falta esforço. Falta operação organizada.</h2>
          <p data-reveal className="sor-section-lead">
            A maioria dos negócios perde tempo e cliente porque a operação vive espalhada entre WhatsApp, planilha, papel e ferramentas que não conversam.
          </p>
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
          <h2 data-reveal className="sor-h2">O que a SOR ONE implanta, organizado por necessidade.</h2>
          <p data-reveal className="sor-section-lead">
            Não é um catálogo de produtos avulsos. É um conjunto de módulos e integrações que se combinam conforme a jornada do seu negócio — o escopo certo sai do diagnóstico.
          </p>
          <div data-reveal-group className="sor-grid-3 sor-cat-grid">
            {solutionCategories.map((cat) => (
              <div data-reveal data-spotlight className="sor-card sor-card-lift" key={cat.title}>
                <div data-spot className="sor-spot" />
                <div className="sor-card-inner">
                  <div className="sor-icon">{cat.icon}</div>
                  <h3 className="sor-card-title">{cat.title}</h3>
                  <ul className="sor-includes" style={{ marginTop: 16 }}>
                    {cat.items.map((item) => (
                      <li key={item}><span className="sor-check">✓</span>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portes" className="sor-section sor-section-a">
        <div className="sor-container">
          <p data-reveal className="sor-eyebrow">Portes de implantação</p>
          <h2 data-reveal className="sor-h2">Do essencial ao completo — no tamanho da sua operação.</h2>
          <p data-reveal className="sor-section-lead">
            Existe solução acessível para pequenos negócios e projeto completo para operações maiores. Nem todo projeto começa grande, e a SOR ONE não se limita a soluções baratas: o porte certo sai do diagnóstico.
          </p>
          <div data-reveal-group className="sor-grid-3">
            {tiers.map((tier) => (
              <div data-reveal data-spotlight className="sor-card sor-card-lift" key={tier.tag}>
                <div data-spot className="sor-spot" />
                <div className="sor-card-inner">
                  <span className="sor-chip">{tier.tag}</span>
                  <h3 className="sor-card-title" style={{ marginTop: 16 }}>{tier.title}</h3>
                  <p className="sor-card-text">{tier.text}</p>
                  <ul className="sor-includes" style={{ marginTop: 16 }}>
                    {tier.items.map((item) => (
                      <li key={item}><span className="sor-check">✓</span>{item}</li>
                    ))}
                  </ul>
                  <p className="sor-tier-note">{tier.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demonstracoes" className="sor-section sor-section-b">
        <div className="sor-container">
          <p data-reveal className="sor-eyebrow">Demonstrações</p>
          <h2 data-reveal className="sor-h2">Veja sistemas implantados pela SOR ONE, funcionando.</h2>
          <p data-reveal className="sor-section-lead">
            Ambientes demonstrativos de negócios fictícios, cada um usando um sistema configurado para a sua operação. Explore e veja como fica na prática.
          </p>
          <div data-reveal-group className="sor-grid-3">
            {demos.map((demo) => (
              <article data-reveal data-spotlight className="sor-card sor-card-lift sor-demo" key={demo.name}>
                <div data-spot className="sor-spot" />
                <div className="sor-card-inner">
                  <div className="sor-icon">{demo.icon}</div>
                  <p className="sor-demo-cat">{demo.category}</p>
                  <h3 className="sor-card-title" style={{ marginTop: 6 }}>{demo.name}</h3>
                  <p className="sor-card-text">{demo.text}</p>
                  <div className="sor-demo-foot">
                    <a data-magnetic className="sor-btn sor-btn-ghost sor-btn-block" href={demo.href} target="_blank" rel="noopener noreferrer">{demo.cta} →</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p data-reveal className="sor-demo-note">Ambiente demonstrativo desenvolvido pela SOR ONE.</p>
        </div>
      </section>

      <section id="processo" className="sor-section sor-section-a">
        <div className="sor-container">
          <p data-reveal className="sor-eyebrow">Como trabalhamos</p>
          <h2 data-reveal className="sor-h2">Do diagnóstico à operação, com escopo claro em cada etapa.</h2>
          <p data-reveal className="sor-section-lead">
            Você sabe onde o projeto está o tempo todo. Sem reuniões intermináveis e sem surpresa de escopo.
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

      <section id="sobre" className="sor-section sor-section-b">
        <div className="sor-container">
          <div className="sor-about">
            <div>
              <p data-reveal className="sor-eyebrow">Sobre a SOR ONE</p>
              <h2 data-reveal className="sor-h2">Uma empresa de implantação, não de software de prateleira.</h2>
            </div>
            <p data-reveal className="sor-section-lead">
              A SOR ONE implanta soluções digitais configuradas para o porte, os processos e os objetivos de cada empresa. Você não compra uma licença nem um plano genérico: recebe um sistema montado para a forma como o seu negócio realmente atende, vende e opera — instalado, integrado aos seus canais e pronto para a sua equipe usar.
            </p>
          </div>

          <div data-reveal className="sor-escopo">
            <p className="sor-escopo-label">Proteção de escopo</p>
            <p className="sor-escopo-text">
              Cada implantação é configurada dentro dos módulos, integrações e jornadas definidos no diagnóstico e formalizados na proposta.
            </p>
            <p className="sor-escopo-text">
              Funcionalidades, integrações e evoluções fora do escopo contratado são dimensionadas separadamente.
            </p>
          </div>
        </div>
      </section>

      <section id="cta" className="sor-cta">
        <div data-par data-depth="0.5" aria-hidden="true" className="sor-cta-glow" />
        <div className="sor-container sor-cta-inner">
          <h2 data-reveal className="sor-h2 sor-cta-title">Sua empresa não precisa acumular mais ferramentas. Precisa de uma operação organizada.</h2>
          <div data-reveal className="sor-cta-btns">
            <Link data-magnetic className="sor-btn sor-btn-primary sor-btn-lg" href={DIAGNOSTIC_HREF}>Solicitar diagnóstico</Link>
            <a data-magnetic className="sor-btn sor-btn-ghost sor-btn-lg" href={SOR_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Falar no WhatsApp →</a>
          </div>
        </div>
      </section>

      <footer className="sor-footer">
        <div className="sor-container sor-footer-inner">
          <div className="sor-footer-brand-col">
            <Link href="/" aria-label="SOR ONE — Início" className="sor-brand-link">
              <SorLogo variant="horizontal" />
            </Link>
            <nav aria-label="Navegação do rodapé" className="sor-footer-nav">
              <a className="sor-footer-link" href="#solucoes">Soluções</a>
              <a className="sor-footer-link" href="#portes">Portes</a>
              <a className="sor-footer-link" href="#demonstracoes">Demonstrações</a>
              <a className="sor-footer-link" href="#processo">Como trabalhamos</a>
              <Link className="sor-footer-link" href={DIAGNOSTIC_HREF}>Diagnóstico</Link>
            </nav>
          </div>

          <div className="sor-footer-contact">
            <span className="sor-footer-contact-label">Fale comigo</span>
            <div className="sor-footer-contact-actions">
              <a
                className="sor-contact-btn sor-contact-whatsapp"
                href={SOR_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                  <path d="M17.47 14.38c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.14-.19.29-.74.93-.9 1.12-.17.19-.33.21-.62.07-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.14-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.14.19 2.01 3.06 4.86 4.29.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zM12.05 21.5h-.01a9.42 9.42 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.45 9.44zm8.04-17.49A11.36 11.36 0 0 0 12.05.68C5.84.68.79 5.73.78 11.94c0 2.1.55 4.15 1.6 5.96L.68 24l6.25-1.64a11.3 11.3 0 0 0 5.41 1.38h.01c6.21 0 11.26-5.05 11.27-11.26a11.2 11.2 0 0 0-3.53-8.47z" />
                </svg>
                Falar no WhatsApp
              </a>
              <a
                className="sor-contact-btn sor-contact-instagram"
                href="https://instagram.com/soroneoficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                  <circle cx="12" cy="12" r="4.2" />
                  <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
                </svg>
                @soroneoficial
              </a>
            </div>
          </div>
        </div>

        <div className="sor-container">
          <p className="sor-footer-copy">© 2026 SOR ONE · Vila Velha, ES</p>
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
@keyframes sor-flow-down{0%{opacity:0;transform:translateY(0);}8%{opacity:1;}92%{opacity:.35;}100%{opacity:0;transform:translateY(-120px);}}
@keyframes sor-float{0%,100%{transform:translateY(0);}50%{transform:translateY(-9px);}}
@media (prefers-reduced-motion: reduce){.sor-anim{animation:none !important;}}

.sor-header{position:sticky;top:0;z-index:50;border-bottom:1px solid #181e27;background:rgba(6,7,9,0.72);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);transition:background .3s ease,border-color .3s ease;}
.sor-header-inner{max-width:1280px;margin:0 auto;padding:0 24px;min-height:70px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;}
.sor-brand-link{justify-self:start;display:inline-flex;align-items:center;text-decoration:none;}
.sor-brand{display:flex;align-items:center;gap:11px;text-decoration:none;}
.sor-logo{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;background:linear-gradient(150deg,#C9A86A,#8B6B2A);box-shadow:0 4px 16px rgba(201,168,106,.28);}
.sor-logo.sm{width:26px;height:26px;border-radius:8px;box-shadow:none;}
.sor-logo-dot{width:11px;height:11px;background:#060709;transform:rotate(45deg);border-radius:2px;}
.sor-logo.sm .sor-logo-dot{width:9px;height:9px;}
.sor-brand-name{font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:15px;letter-spacing:-0.02em;color:#F0EDEA;}
.sor-nav{display:flex;align-items:center;justify-content:center;gap:8px;}
.sor-header-actions{display:flex;align-items:center;justify-self:end;}
.sor-navlink{padding:8px 12px;font-size:13px;font-weight:600;color:#9A9DA6;text-decoration:none;border-radius:8px;transition:color .2s,background .2s;}
.sor-navlink:hover{color:#F0EDEA;background:rgba(201,168,106,0.06);}
@media (max-width:860px){.sor-nav{display:none;}}

.sor-btn{display:inline-flex;align-items:center;justify-content:center;border-radius:12px;padding:14px 24px;font-size:14px;font-family:var(--font-manrope),sans-serif;font-weight:700;text-decoration:none;transition:box-shadow .3s,transform .2s,border-color .3s;}
.sor-btn-sm{padding:9px 18px;border-radius:10px;font-size:13px;}
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
.sor-h1{margin:26px 0 0;font-family:var(--font-manrope),sans-serif;font-weight:800;letter-spacing:-0.04em;font-size:clamp(38px,5.4vw,64px);line-height:1.05;color:#F0EDEA;}
.sor-accent{color:#C9A86A;}
.sor-lead{margin:22px 0 0;max-width:520px;font-size:17px;line-height:1.65;color:#9A9DA6;}
.sor-hero-ctas{margin-top:34px;display:flex;flex-wrap:wrap;gap:12px;}
.sor-stats{margin-top:40px;display:grid;grid-template-columns:repeat(2,1fr);gap:20px 24px;max-width:560px;border-top:1px solid #181e27;padding-top:28px;}
.sor-stat-value{font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:clamp(20px,2.2vw,26px);color:#F0EDEA;}
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
.sor-console-title{margin:0;font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:22px;color:#F0EDEA;letter-spacing:-0.03em;line-height:1.05;}
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

.sor-section{padding:88px 0;border-bottom:1px solid #181e27;}
.sor-section-a{background:#060709;border-top:1px solid #181e27;}
.sor-section-b{background:#0a0c10;}
.sor-eyebrow{margin:0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#C9A86A;}
.sor-h2{margin:16px 0 0;max-width:680px;font-family:var(--font-manrope),sans-serif;font-weight:800;font-size:clamp(28px,3.6vw,40px);letter-spacing:-0.035em;line-height:1.1;color:#F0EDEA;}
.sor-section-lead{margin:20px 0 0;max-width:680px;font-size:16px;line-height:1.65;color:#c4c0b8;}

.sor-grid-2{margin-top:48px;display:grid;gap:16px;grid-template-columns:repeat(2,1fr);}
.sor-grid-3{margin-top:48px;display:grid;gap:24px;grid-template-columns:repeat(3,1fr);}
.sor-cat-grid{gap:16px;}
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
.sor-chip{display:inline-block;border-radius:9999px;border:1px solid rgba(201,168,106,0.22);background:rgba(201,168,106,0.06);padding:5px 12px;font-family:var(--font-manrope),sans-serif;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.12em;color:#C9A86A;}
.sor-tier-note{margin:16px 0 0;font-size:12px;line-height:1.55;color:#8A8D94;border-top:1px solid #181e27;padding-top:14px;}

.sor-includes{margin:0;padding:0;list-style:none;display:grid;gap:8px;font-size:14px;color:#c4c0b8;}
.sor-includes li{display:flex;gap:8px;}
.sor-check{color:#C9A86A;}

.sor-demo-cat{margin:18px 0 0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#C9A86A;}
.sor-demo-foot{margin-top:22px;}
.sor-demo-note{margin:28px 0 0;font-size:12px;color:#4A4D56;}

.sor-about{display:grid;gap:24px;grid-template-columns:1fr;}
@media (min-width:900px){.sor-about{grid-template-columns:1fr 1fr;align-items:center;gap:40px;}}
.sor-about .sor-section-lead{margin-top:0;}
.sor-escopo{margin-top:40px;border:1px solid rgba(201,168,106,0.16);border-radius:20px;background:linear-gradient(150deg,rgba(201,168,106,0.08),rgba(14,165,164,0.04));padding:26px 28px;}
.sor-escopo-label{margin:0;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.16em;color:#C9A86A;}
.sor-escopo-text{margin:14px 0 0;max-width:820px;font-size:15px;line-height:1.65;color:#c4c0b8;}

.sor-cta{position:relative;overflow:hidden;padding:128px 0;background:#060709;}
.sor-cta-glow{position:absolute;left:50%;top:50%;width:36rem;height:36rem;max-width:94vw;transform:translate(-50%,-50%);border-radius:9999px;background:radial-gradient(circle at center, rgba(201,168,106,0.16), transparent 60%);filter:blur(40px);pointer-events:none;}
.sor-cta-inner{position:relative;text-align:center;}
.sor-cta-title{margin:0 auto;max-width:820px;font-size:clamp(28px,4vw,46px);letter-spacing:-0.04em;line-height:1.1;}
.sor-cta-btns{margin-top:36px;display:flex;flex-wrap:wrap;justify-content:center;gap:12px;}

.sor-footer{border-top:1px solid #181e27;padding:48px 0 34px;background:#060709;}
.sor-footer-inner{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:28px;}
.sor-footer-brand-col{display:grid;gap:18px;}
.sor-footer-nav{display:flex;flex-wrap:wrap;align-items:center;gap:20px;}
.sor-footer-link{font-size:13px;font-weight:600;color:#9A9DA6;text-decoration:none;transition:color .2s;}
.sor-footer-link:hover{color:#C9A86A;}
.sor-footer-contact{display:grid;gap:12px;border:1px solid rgba(201,168,106,0.16);border-radius:18px;background:linear-gradient(150deg,rgba(201,168,106,0.09),rgba(14,165,164,0.04));padding:18px;box-shadow:0 18px 48px rgba(0,0,0,.22);}
.sor-footer-contact-label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.16em;color:#C9A86A;}
.sor-footer-contact-actions{display:flex;flex-wrap:wrap;gap:10px;}
.sor-contact-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:42px;border-radius:12px;padding:11px 15px;font-family:var(--font-manrope),sans-serif;font-size:13px;font-weight:800;text-decoration:none;transition:transform .2s,border-color .2s,background .2s,box-shadow .2s;}
.sor-contact-btn:hover{transform:translateY(-1px);}
.sor-contact-btn:focus-visible{outline:2px solid #C9A86A;outline-offset:3px;}
.sor-contact-whatsapp{background:#C9A86A;color:#060709;box-shadow:0 12px 32px rgba(201,168,106,.22);}
.sor-contact-instagram{border:1px solid rgba(201,168,106,0.2);background:rgba(255,255,255,0.03);color:#F0EDEA;}
.sor-contact-instagram:hover{border-color:rgba(201,168,106,0.42);background:rgba(201,168,106,0.06);}
.sor-footer-copy{margin:28px 0 0;font-size:12px;color:#4A4D56;}
@media (max-width:720px){.sor-footer-inner{align-items:stretch;}.sor-footer-brand-col,.sor-footer-contact{width:100%;}.sor-footer-contact-actions{display:grid;grid-template-columns:1fr;}.sor-contact-btn{width:100%;}.sor-footer-copy{text-align:left;}}
`;
