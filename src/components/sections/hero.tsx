"use client";

import { ArrowRight, Star, WhatsappLogo } from "@/components/ui/icons";
import { easings } from "@react-spring/web";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { Inview } from "@/components/animation/springs/in-view";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/data/home";

/**
 * Hero — full-bleed editorial hero, client leaf.
 * Background video + chocolate scrim; content layered over it in cream.
 * One <h1>; motion only via TextEngine (through <SectionHeading>) + springs.
 */
export const Hero = () => {
  const { hero, contact } = home;
  const { rating, reviewCount, reviewLabel, platform } = hero.socialProof;
  const ratingLabel = rating.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const reviewText = `${reviewCount.toLocaleString("pt-BR")} ${reviewLabel}`;

  return (
    <section id="top" className="relative w-full overflow-hidden bg-chocolate">
      {/* Background layer — full-bleed video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/assets/hero/hero-brownie.png"
        aria-hidden
      >
        <source src="/assets/video/hero-cut.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-chocolate/80 via-chocolate/30 to-transparent"
      />

      {/* Content layer */}
      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col justify-end px-6 pb-16 pt-[calc(var(--nav-height)+2rem)] sm:px-8 lg:px-16 lg:pb-24">
        {/* Social proof — small, above the headline */}
        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          delayIn={60}
          config={{ duration: 600, easing: easings.easeOutCubic }}
        >
          <Link
            href="#avaliacoes"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-cream/90 hover:text-cream"
          >
            <span className="flex items-center gap-0.5 text-yellow" aria-hidden>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} weight="fill" className="h-4 w-4" />
              ))}
            </span>
            <span className="font-semibold">{ratingLabel}</span>
            <span>· {reviewText}</span>
            <span className="text-cream/60">no {platform}</span>
          </Link>
        </Inview>

        {/* Headline — display Lora, gigantic, 2-line max, italic emphasis word.
            BlurReveal adds a heavy fade-up + blur-to-sharp reveal (Awwwards-tier);
            disabled on mobile and under prefers-reduced-motion. */}
        <BlurReveal delay={120} className="mt-5 max-w-[16ch]">
          <SectionHeading as="h1" italicWord="doce" className="text-cream">
            {hero.title}
          </SectionHeading>
        </BlurReveal>

        {/* Subtext — revealed on view */}
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
          delayIn={200}
          config={{ duration: 700, easing: easings.easeOutQuart }}
          className="mt-6 max-w-[65ch] text-lg leading-relaxed text-cream/80 md:text-xl"
        >
          {hero.subtitle}
        </Inview>

        {/* CTAs */}
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <MagneticButton>
            <Button
              href={contact.menu}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              icon={
                <ArrowRight
                  className="h-5 w-5"
                  weight="bold"
                  aria-hidden
                />
              }
            >
              Ver o cardápio
            </Button>
          </MagneticButton>

          <Button
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
            className="text-cream"
            icon={
              <WhatsappLogo
                className="h-5 w-5"
                weight="fill"
                aria-hidden
              />
            }
          >
            Pedir agora
          </Button>
        </div>
      </div>
    </section>
  );
};
