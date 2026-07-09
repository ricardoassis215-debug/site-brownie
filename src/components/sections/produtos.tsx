"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "@/components/ui/icons";
import { easings } from "@react-spring/web";

import { Inview } from "@/components/animation/springs/in-view";
import { Handle } from "@/components/animation/springs/handle";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { ColorPanel } from "@/components/ui/color-panel";
import { TiltCard } from "@/components/ui/tilt-card";
import { Button } from "@/components/ui/button";
import { home } from "@/data/home";

/** A single cardápio item — mirrors home.cardapio.categories[].items[]. */
type CardapioItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  alt: string;
  panel:
    | "chocolate"
    | "caramel"
    | "blush"
    | "sage"
    | "rose"
    | "yellow"
    | "cream-warm";
  bestSeller: boolean;
  price: string | null;
};

/**
 * Cardápio — categorized menu with tabs, color-panel cards and best-seller seals.
 * Client leaf: only this file holds state.
 */
export const Produtos = () => {
  const { cardapio } = home;
  const categories = cardapio.categories;
  const [activeId, setActiveId] = useState<string>(categories[0].id);
  const panelId = useId();

  const activeCategory =
    categories.find((category) => category.id === activeId) ?? categories[0];
  const items = activeCategory.items as readonly CardapioItem[];
  const activeIndex = Math.max(
    0,
    categories.findIndex((category) => category.id === activeId),
  );

  const focusTab = (index: number) => {
    const next = categories[index];
    if (!next) return;
    setActiveId(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusTab((activeIndex + 1) % categories.length);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusTab((activeIndex - 1 + categories.length) % categories.length);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      focusTab(categories.length - 1);
    }
  };

  return (
    <section
      id="cardapio"
      aria-label="Cardápio"
      className="w-full bg-cream py-[var(--section-pad-y-mobile)] md:py-[var(--section-pad-y)]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header — eyebrow + heading + intro */}
        <div className="flex flex-col items-start gap-4">
          <Inview
            tag="span"
            mode="once"
            from={{ opacity: 0, y: 12 }}
            to={{ opacity: 1, y: 0 }}
            config={{ duration: 600, easing: easings.easeOutCubic }}
          >
            <Eyebrow as="span">{cardapio.eyebrow}</Eyebrow>
          </Inview>

          <BlurReveal>
            <SectionHeading as="h2" italicWord="estrelas">
              {cardapio.title}
            </SectionHeading>
          </BlurReveal>

          <p className="max-w-2xl text-cocoa">{cardapio.intro}</p>
        </div>

        {/* Tabs — one per category, accessible tab pattern */}
        <div
          role="tablist"
          aria-label="Categorias do cardápio"
          className="mt-10 flex snap-x gap-2 overflow-x-auto pb-2 pr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-16 md:gap-3 md:pr-0"
        >
          {categories.map((category) => {
            const selected = category.id === activeId;
            return (
              <button
                key={category.id}
                role="tab"
                type="button"
                id={`tab-${category.id}`}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(category.id)}
                onKeyDown={onTabKeyDown}
                className={[
                  "shrink-0 snap-start rounded-pill px-4 py-2.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60 focus-visible:ring-offset-2 md:px-5",
                  selected
                    ? "bg-yellow text-ink"
                    : "bg-transparent text-cocoa",
                ].join(" ")}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Active category count — madie-style mono number (decorative) */}
        <p
          aria-hidden="true"
          className="mt-6 font-mono text-xs tracking-widest text-caramel/80"
        >
          {String(activeCategory.count).padStart(2, "0")}
        </p>

        {/*
          Items — Handle stays mounted across tab changes (no key) so it can
          cache the previous category's <ul>, fade/slide it out, then fade/slide
          the new one in. role="tabpanel" lives on the animated wrapper.
        */}
        <Handle
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
          config={{ duration: 500, easing: easings.easeOutCubic }}
          role="tabpanel"
          id={panelId}
          aria-labelledby={`tab-${activeCategory.id}`}
          className="mt-4"
        >
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            {items.map((item, i) => (
              <li key={item.id}>
                <Inview
                  tag="article"
                  mode="once"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  delayIn={80 * i}
                  config={{ duration: 700, easing: easings.easeOutQuart }}
                  className="h-full"
                >
                  <TiltCard maxTilt={6} perspective={600}>
                    <ColorPanel tone={item.panel} className="h-full gap-5">
                      <div className="relative aspect-square w-full overflow-hidden rounded-card bg-cream/40 p-4">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain"
                        />
                      </div>

                      <div className="flex flex-1 flex-col gap-2">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-2xl font-semibold">{item.name}</h3>
                          {item.bestSeller && (
                            <span className="rounded-pill bg-yellow px-3 py-1 text-xs font-semibold text-ink">
                              Mais vendido
                            </span>
                          )}
                        </div>

                        <p className="text-sm opacity-80">{item.description}</p>

                        {item.price !== null && (
                          <p className="mt-auto text-lg font-semibold">
                            {item.price}
                          </p>
                        )}
                      </div>
                    </ColorPanel>
                  </TiltCard>
                </Inview>
              </li>
            ))}
          </ul>
        </Handle>

        {/* CTA */}
        <div className="mt-14 flex justify-center md:mt-20">
          <Button
            variant="outline"
            size="lg"
            href={cardapio.ctaHref}
            icon={<ArrowRight weight="bold" aria-hidden="true" />}
          >
            {cardapio.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
};