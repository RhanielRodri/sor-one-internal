import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <Badge>{eyebrow}</Badge>
      <h2 className="text-balance mt-5 text-3xl font-extrabold tracking-[-0.035em] text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">{description}</p>
      ) : null}
    </div>
  );
}
