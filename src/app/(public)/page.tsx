import { SorHome } from "@/components/public/sor-home";
import { getActiveServices, type PublicService } from "@/lib/services";
import {
  staticServiceShowcase,
  toShowcaseFromServices,
  type ServiceShowcaseItem,
} from "@/data/service-catalog";

export const revalidate = 3600;

export default async function HomePage() {
  let showcaseItems: ServiceShowcaseItem[] = staticServiceShowcase;

  try {
    const dbServices: PublicService[] = await getActiveServices();
    if (dbServices.length > 0) {
      showcaseItems = toShowcaseFromServices(dbServices);
    }
  } catch (caughtError) {
    console.error(
      "[Home] Falha ao carregar vitrine de serviços",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
  }

  return <SorHome showcase={showcaseItems} />;
}
