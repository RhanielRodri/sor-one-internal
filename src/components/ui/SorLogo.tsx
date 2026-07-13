type SorLogoProps = {
  variant?: "horizontal" | "mark" | "core" | "loading";
  className?: string;
};

const serifFamily = "var(--font-serif), Georgia, ui-serif, serif";

function SorCoreMark({
  className,
  ariaLabel = "SOR Core",
}: {
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <svg
      className={className}
      width="32"
      height="32"
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label={ariaLabel}
    >
      <circle
        cx="32"
        cy="32"
        r="21"
        fill="#0D1418"
        stroke="#0EA5A4"
        strokeWidth="2.1"
      />
      <circle
        cx="32"
        cy="32"
        r="13.5"
        fill="none"
        stroke="#D6B56D"
        strokeOpacity="0.34"
        strokeWidth="1.45"
      />
      <circle cx="32" cy="32" r="4.4" fill="#162229" />
      <circle cx="32" cy="32" r="1.9" fill="#0EA5A4" fillOpacity="0.78" />
      <circle cx="46.8" cy="17.2" r="4.6" fill="#D6B56D" />
      <circle cx="22.1" cy="41.8" r="2.1" fill="#0EA5A4" fillOpacity="0.48" />
    </svg>
  );
}

export function SorLogo({
  variant = "horizontal",
  className,
}: SorLogoProps) {
  if (variant === "mark" || variant === "core") {
    return (
      <SorCoreMark
        className={className}
        ariaLabel={variant === "mark" ? "SOR Mark" : "SOR Core"}
      />
    );
  }

  if (variant === "loading") {
    return (
      <svg
        className={className}
        width="48"
        height="48"
        viewBox="0 0 96 96"
        fill="none"
        role="img"
        aria-label="SOR carregando"
      >
        <g
          className="motion-safe:animate-[spin_6s_linear_infinite]"
          style={{ transformOrigin: "48px 48px" }}
        >
          <circle cx="48" cy="48" r="28" fill="#081214" />
          <path
            d="M48 20 A28 28 0 0 1 76 48"
            fill="none"
            stroke="#0EA5A4"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M76 48 A28 28 0 0 1 48 76"
            fill="none"
            stroke="#0EA5A4"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <path
            d="M48 76 A28 28 0 0 1 20 48"
            fill="none"
            stroke="#0EA5A4"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.26"
          />
          <path
            d="M20 48 A28 28 0 0 1 48 20"
            fill="none"
            stroke="#0EA5A4"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.26"
          />
          <circle cx="68.6" cy="27.4" r="5.2" fill="#D6B56D" />
        </g>
        <circle cx="48" cy="48" r="4" fill="#0EA5A4" />
      </svg>
    );
  }

  return (
    <div className={className} aria-label="SOR ONE">
      <div className="flex items-center leading-none">
        <span
          style={{ fontFamily: serifFamily }}
          className="text-[26px] font-bold tracking-[-0.04em] text-slate-50"
        >
          S
        </span>
        <svg
          width="27"
          height="31"
          viewBox="0 0 64 64"
          fill="none"
          className="-mx-[1px]"
          aria-hidden="true"
        >
          <circle
            cx="32"
            cy="32"
            r="21"
            fill="#0D1418"
            stroke="#0EA5A4"
            strokeWidth="2.1"
          />
          <circle
            cx="32"
            cy="32"
            r="13.5"
            fill="none"
            stroke="#D6B56D"
            strokeOpacity="0.34"
            strokeWidth="1.45"
          />
          <circle cx="32" cy="32" r="1.9" fill="#0EA5A4" fillOpacity="0.78" />
          <circle cx="46.8" cy="17.2" r="4.6" fill="#D6B56D" />
        </svg>
        <span
          style={{ fontFamily: serifFamily }}
          className="text-[26px] font-bold tracking-[-0.04em] text-slate-50"
        >
          R
        </span>
        <span className="ml-2 font-mono text-[12px] font-bold tracking-[0.22em] text-slate-50">
          ONE
        </span>
      </div>
      <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.3em] text-[#C9A84C]">
        Sistemas &amp; operação
      </div>
    </div>
  );
}
