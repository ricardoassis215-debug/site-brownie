"use client";

import { Fragment } from "react";
import { ArrowRight } from "@/components/ui/icons";
import { easings } from "@react-spring/web";

import { Inview } from "@/components/animation/springs/in-view";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { home } from "@/data/home";

/**
 * Eventos — full-bleed editorial catering block (madie-inspired), client leaf.
 * Background video + ink scrim; content layered over it in cream.
 * Motion only via TextEngine (through <SectionHeading>) + springs; no CSS transitions.
 */
export const Eventos = () => {
  const { eventos, contact } = home;

  return (
    <section id="eventos" className="relative w-full overflow-hidden bg-ink">
      {/* Background layer — full-bleed video + ink scrim for legibility */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/events/events-table.jpg"
        aria-hidden
      >
        <source src="/assets/video/events-loop.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/55 to-ink/70"
      />

      {/* Content layer */}
      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center px-6 py-24 sm:px-8 md:min-h-[90vh] lg:px-16">
        <SectionHeading
          as="h2"
          italicWord="destaque"
          className="mt-5 max-w-[20ch] text-5xl text-cream md:text-7xl"
        >
          {eventos.title}
        </SectionHeading>

        {/* Body */}
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
          delayIn={150}
          config={{ duration: 700, easing: easings.easeOutQuart }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80"
        >
          {eventos.text}
        </Inview>

        {/* Bullets — inline list with yellow dot separators */}
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          delayIn={250}
          config={{ duration: 700, easing: easings.easeOutQuart }}
          className="mt-8 flex flex-wrap items-center gap-x-1 gap-y-2 text-base font-medium text-cream/90"
        >
          {eventos.bullets.map((b, i) => (
            <Fragment key={b}>
              {i > 0 && (
                <span className="px-3 text-yellow" aria-hidden>
                  ·
                </span>
              )}
              <span>{b}</span>
            </Fragment>
          ))}
        </Inview>

        {/* CTA — single, high-impact */}
        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          delayIn={350}
          config={{ duration: 700, easing: easings.easeOutQuart }}
          className="mt-10"
        >
          <MagneticButton>
            <Button
              href={contact.whatsappEvents}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={
                <ArrowRight className="h-5 w-5" weight="bold" aria-hidden />
              }
            >
              Pedir orçamento
            </Button>
          </MagneticButton>
        </Inview>
      </div>

    </section>
  );
};
