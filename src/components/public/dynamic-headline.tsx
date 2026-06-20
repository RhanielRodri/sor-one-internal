"use client";

import { useEffect, useRef, useState } from "react";

const words = [
  "vendas",
  "atendimento",
  "catálogo",
  "agendamentos",
  "operação",
];

export function DynamicHeadline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const transitionTimeout = useRef<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false);
      transitionTimeout.current = window.setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setVisible(true);
      }, 300);
    }, 2600);

    return () => {
      window.clearInterval(interval);

      if (transitionTimeout.current !== null) {
        window.clearTimeout(transitionTimeout.current);
      }
    };
  }, []);

  return (
    <h1 className="text-balance mt-7 text-4xl font-black leading-[1.03] tracking-[-0.06em] sm:text-5xl lg:text-[4.15rem]">
      Organize{" "}
      <span
        className={`dynamic-word bg-[linear-gradient(90deg,var(--sor-champagne-light),var(--sor-petrol))] bg-clip-text text-transparent ${
          visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        {words[index]}
      </span>{" "}
      em uma estrutura digital profissional.
    </h1>
  );
}
