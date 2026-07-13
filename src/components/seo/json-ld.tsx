import { siteUrl } from "@/lib/constants";

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "SOR ONE",
  description:
    "A SOR ONE implanta sites, sistemas e automações configurados para o porte, os processos e os objetivos de cada empresa, de operações essenciais a soluções completas com inteligência artificial e integrações.",
  areaServed: ["Vila Velha, ES", "Brasil"],
  url: siteUrl,
  sameAs: ["https://instagram.com/soroneoficial"],
  knowsAbout: [
    "implantação de sistemas",
    "presença e conversão",
    "agendamento e relacionamento",
    "catálogos, pedidos e orçamentos",
    "operação e gestão",
    "atendimento e automação com inteligência artificial",
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
