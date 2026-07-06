import Image from "next/image";

export type Project = {
  icon: string;
  category: string;
  name: string;
  usedBy?: string;
  description: string;
  demoUrl: string;
  demoHost: string;
  screenshot: string;
  screenshotAlt: string;
  eager?: boolean;
  highlights: string[];
};

function BrowserMockup({
  host,
  screenshot,
  screenshotAlt,
  eager = false,
}: {
  host: string;
  screenshot: string;
  screenshotAlt: string;
  eager?: boolean;
}) {
  return (
    <div
      className="w-full overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--border-soft)", background: "var(--card-deep)" }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{
          borderBottom: "1px solid var(--border-soft)",
          background: "rgba(6,7,9,0.6)",
        }}
      >
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#f5b34a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
        </span>
        <span
          className="ml-2 flex-1 truncate rounded-md border border-[var(--border-soft)] bg-black/35 px-3 py-1 text-[10px] text-[var(--text-soft-2)]"
        >
          {host}
        </span>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        <Image
          src={screenshot}
          alt={screenshotAlt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-[1.75rem] border p-6 transition duration-300 hover:-translate-y-1.5 ${className}`}
      style={{
        borderColor: "var(--border-soft)",
        background: "var(--card-deep)",
      }}
    >
      <div className="relative w-full">
        <BrowserMockup
          host={project.demoHost}
          screenshot={project.screenshot}
          screenshotAlt={project.screenshotAlt}
          eager={project.eager}
        />
        <span
          className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-[rgba(6,7,9,0.85)] px-2.5 py-1 text-[9px] font-bold text-[var(--green)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
          Online
        </span>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="service-icon-shell grid h-11 w-11 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-lg text-[var(--sor-champagne)]">
          {project.icon}
        </span>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--sor-champagne)]">
          {project.category}
        </p>
      </div>

      <h2 className="mt-3 text-2xl font-black tracking-[-0.025em]">
        {project.name}
      </h2>

      {project.usedBy ? (
        <p className="mt-2 text-sm font-semibold text-[var(--sor-champagne)]">
          Usado por: {project.usedBy}
        </p>
      ) : null}

      <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.highlights.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[var(--border-soft)] bg-white/2 px-3 py-1.5 text-xs font-medium text-soft"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-7">
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-[var(--champagne)] px-5 py-2.5 text-sm font-bold text-[#060709] transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sor-champagne)]"
        >
          Ver demo ao vivo →
        </a>
      </div>
    </article>
  );
}
