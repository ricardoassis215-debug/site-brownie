"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { easings } from "@react-spring/web";
import {
  ArrowUpRight,
  Clock,
  Envelope,
  InstagramLogo,
  MapPin,
  Phone,
} from "@/components/ui/icons";

import { Inview } from "@/components/animation/springs/in-view";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { home } from "@/data/home";

/** Phosphor icon edge size (px) — kept consistent across every panel row. */
const ICON_SIZE = 22;

/** One contact/info row in the side panel. */
type InfoRow = {
  label: string;
  value: string;
  icon: ReactNode;
  href?: string;
  external?: boolean;
};

/**
 * Loja — physical store band with store photo + contact panel.
 * Client leaf: motion only via <Inview> springs.
 */
export const Loja = () => {
  const { loja, contact } = home;
  const { map } = loja;

  const phoneHref = `tel:${contact.phone.replace(/[^+\d]/g, "")}`;
  const emailHref = `mailto:${contact.email}`;
  const igHandle = `@${contact.instagram.replace(/\/+$/, "").split("/").pop()}`;

  const infoRows: readonly InfoRow[] = [
    {
      label: "Endereço",
      value: contact.address,
      href: map.mapsHref,
      external: true,
      icon: <MapPin size={ICON_SIZE} weight="fill" aria-hidden="true" />,
    },
    {
      label: "Horário",
      value: contact.hours,
      icon: <Clock size={ICON_SIZE} weight="regular" aria-hidden="true" />,
    },
    {
      label: "Telefone",
      value: contact.phone,
      href: phoneHref,
      icon: <Phone size={ICON_SIZE} weight="regular" aria-hidden="true" />,
    },
    {
      label: "E-mail",
      value: contact.email,
      href: emailHref,
      icon: <Envelope size={ICON_SIZE} weight="regular" aria-hidden="true" />,
    },
    {
      label: "Instagram",
      value: igHandle,
      href: contact.instagram,
      external: true,
      icon: <InstagramLogo size={ICON_SIZE} weight="regular" aria-hidden="true" />,
    },
  ];

  return (
    <section
      id="loja"
      aria-label="Nossa loja no Centro"
      className="w-full bg-chocolate py-[var(--section-pad-y-mobile)] text-cream md:py-[var(--section-pad-y)]"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header — heading + lead */}
        <div className="flex flex-col items-start gap-4">
          <Inview
            tag="div"
            mode="once"
            from={{ opacity: 0, y: 12 }}
            to={{ opacity: 1, y: 0 }}
            config={{ duration: 600, easing: easings.easeOutCubic }}
          >
            <SectionHeading as="h2" italicWord="Centro">
              {loja.title}
            </SectionHeading>
          </Inview>

          <Inview
            tag="p"
            mode="once"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            delayIn={150}
            config={{ duration: 700, easing: easings.easeOutQuart }}
            className="max-w-xl text-lg leading-relaxed text-cream/80"
          >
            {loja.text}
          </Inview>
        </div>

        {/* Stylized map + info panel */}
        <div className="mt-14 grid grid-cols-1 gap-10 md:mt-20 lg:grid-cols-2 lg:gap-16 lg:items-stretch">
          {/* Left column: store photo */}
          <Inview
            tag="div"
            mode="once"
            from={{ opacity: 0, scale: 0.96 }}
            to={{ opacity: 1, scale: 1 }}
            config={{ duration: 900, easing: easings.easeOutCubic }}
            className="relative overflow-hidden rounded-panel border border-cream/10 aspect-[4/3] lg:aspect-auto lg:min-h-[28rem]"
          >
            <Image
              src={loja.img}
              alt="Interior da loja Brownie da Rô"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Inview>

          {/* Info panel — address, hours, phone, email, instagram + CTA */}
          <div className="rounded-panel border border-cream/10 bg-chocolate-deep/30 p-8 md:p-10">
            <ul className="flex flex-col divide-y divide-cream/10">
              {infoRows.map((row, i) => {
                const content = (
                  <>
                    <span className="mt-0.5 shrink-0 text-yellow">{row.icon}</span>
                    <span className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-[0.18em] text-cream/50">
                        {row.label}
                      </span>
                      <span
                        className={[
                          "text-base text-cream",
                          row.href ? "hover:text-yellow" : "",
                        ].join(" ")}
                      >
                        {row.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={row.label}>
                    <Inview
                      tag="div"
                      mode="once"
                      from={{ opacity: 0, y: 16 }}
                      to={{ opacity: 1, y: 0 }}
                      delayIn={i * 80}
                      config={{ duration: 600, easing: easings.easeOutCubic }}
                    >
                      {row.href ? (
                        <a
                          href={row.href}
                          target={row.external ? "_blank" : undefined}
                          rel={row.external ? "noopener noreferrer" : undefined}
                          className="group flex items-start gap-4 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60 focus-visible:ring-offset-4 focus-visible:ring-offset-chocolate-deep"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-4 py-5">{content}</div>
                      )}
                    </Inview>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6">
              <Button
                variant="primary"
                size="lg"
                href={map.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                icon={<ArrowUpRight size={20} weight="bold" aria-hidden="true" />}
              >
                {map.ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
