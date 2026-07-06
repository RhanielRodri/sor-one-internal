import { siteUrl } from "@/lib/constants";

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SOR ONE",
  description:
    "Desenvolvedor freelance em Vila Velha, ES. Crio sites, sistemas e automações para pequenos negócios venderem mais, organizarem processos e reduzirem trabalho manual.",
  areaServed: ["Vila Velha, ES", "Brasil"],
  url: siteUrl,
  sameAs: ["https://instagram.com/soroneoficial"],
  priceRange: "R$500–R$4.000",
  knowsAbout: [
    "sites",
    "landing pages",
    "sistemas de agendamento",
    "catálogos digitais",
    "gestão de tráfego pago",
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(professionalServiceSchema),
      }}
    />
  );
}
