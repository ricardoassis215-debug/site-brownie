"use client";

import Image from "next/image";
import { easings } from "@react-spring/web";

import { BlurReveal } from "@/components/ui/blur-reveal";
import { Inview } from "@/components/animation/springs/in-view";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/data/home";

/**
 * Diferenciais — asymmetric bento band (client leaf).
 *
 * Layout intent: avoid the 50/50 split used by `loja.tsx`. Here the ingredients
 * image is a tall tile spanning two rows on the left (5/12), while the heading
 * and a 2x2 grid of differentials fill the right 7 cols — a deliberately
 * unbalanced bento, not a mirrored split.
 */
export const Diferenciais = () => {
  const { diferenciais } = home;

  return (
    <section
      id="diferenciais"
      className="w-full bg-cream px-8 py-[var(--section-pad-y-mobile)] md:py-[var(--section-pad-y)] lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
        {/* Tall image tile — spans two rows on the left. */}
        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, scale: 0.95 }}
          to={{ opacity: 1, scale: 1 }}
          config={{ duration: 900, easing: easings.easeOutCubic }}
          className="relative aspect-[4/3] overflow-hidden rounded-panel lg:col-span-5 lg:row-span-2"
        >
          <Image
            src={diferenciais.img}
            alt="Ingredientes de verdade dos brownies da Brownie da Rô"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </Inview>

        {/* Heading — top-right of the bento. */}
        <div className="flex flex-col gap-3 lg:col-span-7">
          <BlurReveal>
            <SectionHeading as="h2">{diferenciais.title}</SectionHeading>
          </BlurReveal>
        </div>

        {/* 2x2 grid of differentials — fills the remaining right space. */}
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
          {diferenciais.items.map((item, i) => (
            <Inview
              key={item.title}
              tag="div"
              mode="once"
              from={{ opacity: 0, y: 24 }}
              to={{ opacity: 1, y: 0 }}
              delayIn={100 * i}
              className="flex flex-col gap-1"
            >
              <dt className="flex items-center gap-2 text-lg font-semibold text-ink">
                <span className="h-2 w-2 rounded-full bg-yellow" />
                {item.title}
              </dt>
              <dd className="text-cocoa">{item.desc}</dd>
            </Inview>
          ))}
        </dl>
      </div>
    </section>
  );
};