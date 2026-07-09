"use client";

import { easings } from "@react-spring/web";
import { ArrowUpRight, Star } from "@/components/ui/icons";

import { Inview } from "@/components/animation/springs/in-view";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { home } from "@/data/home";

const STARS = [0, 1, 2, 3, 4] as const;

export const Reviews = () => {
  const { reviews } = home;
  const ratingLabel = reviews.rating.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const countLabel = reviews.count.toLocaleString("pt-BR");

  return (
    <section
      id="avaliacoes"
      className="w-full bg-cream py-[var(--section-pad-y-mobile)] text-ink md:py-[var(--section-pad-y)]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <Inview
              tag="div"
              mode="once"
              from={{ opacity: 0, y: 12 }}
              to={{ opacity: 1, y: 0 }}
              config={{ duration: 600, easing: easings.easeOutCubic }}
            >
              <Eyebrow>{reviews.eyebrow}</Eyebrow>
            </Inview>

            <BlurReveal className="mt-6">
              <SectionHeading as="h2" italicWord="voltou">
                {reviews.title}
              </SectionHeading>
            </BlurReveal>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-cocoa">
              {reviews.intro}
            </p>

            <div className="mt-8 flex flex-wrap items-end gap-4">
              <p className="font-display text-6xl font-semibold leading-none text-chocolate">
                {ratingLabel}
              </p>
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-1 text-yellow" aria-hidden>
                  {STARS.map((i) => (
                    <Star key={i} weight="fill" className="h-5 w-5" />
                  ))}
                </span>
                <span className="text-sm text-cocoa">
                  {countLabel} avaliações no Google
                </span>
              </div>
            </div>

            <ul className="mt-8 flex flex-col gap-2 text-sm text-cocoa">
              {reviews.highlights.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-caramel" aria-hidden>
                    “
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button
                variant="outline"
                size="lg"
                href={reviews.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                icon={
                  <ArrowUpRight className="h-5 w-5" weight="bold" aria-hidden />
                }
              >
                {reviews.ctaLabel}
              </Button>
            </div>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1">
            {reviews.items.map((item, i) => (
              <li key={item.author}>
                <Inview
                  tag="article"
                  mode="once"
                  from={{ opacity: 0, y: 28 }}
                  to={{ opacity: 1, y: 0 }}
                  delayIn={i * 80}
                  config={{ duration: 700, easing: easings.easeOutQuart }}
                  className="flex h-full flex-col gap-4 rounded-panel border border-chocolate/10 bg-cream-warm p-6"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-chocolate">
                      {item.author}
                    </span>
                    <span
                      className="flex items-center gap-0.5 text-yellow"
                      aria-label="5 de 5 estrelas"
                    >
                      {STARS.map((s) => (
                        <Star key={s} weight="fill" className="h-4 w-4" />
                      ))}
                    </span>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-ink/80">
                    {item.text}
                  </p>
                  <p className="text-xs text-cocoa/70">{item.when}</p>
                </Inview>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
