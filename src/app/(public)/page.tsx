import { Hero } from "@/components/public/sor-home/hero";
import { ProblemContrast } from "@/components/public/sor-home/problem-contrast";
import { SolutionCategories } from "@/components/public/sor-home/solution-categories";
import { ImplementationLevels } from "@/components/public/sor-home/implementation-levels";
import { ImplementationShowcase } from "@/components/public/sor-home/implementation-showcase";
import { Methodology } from "@/components/public/sor-home/methodology";
import { About } from "@/components/public/sor-home/about";
import { FinalCta } from "@/components/public/sor-home/final-cta";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemContrast />
      <SolutionCategories />
      <ImplementationLevels />
      <ImplementationShowcase />
      <Methodology />
      <About />
      <FinalCta />
    </>
  );
}
