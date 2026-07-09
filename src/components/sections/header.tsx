"use client";

/**
 * Header — floating glass pill nav modeled on madie.es + Awwwards "Fluid Island".
 *
 * A centered, detached pill that floats over the hero with heavy glass blur.
 * Gains a cream + blur backdrop after `SCROLL_THRESHOLD` px of scroll.
 * Single-line on desktop; collapses to a hamburger + spring dropdown below 768px.
 *
 * Motion rules (AGENTS.md): every animation goes through the vendored
 * `@react-spring/web` primitives in `src/components/animation/springs/` —
 * `Spring` (declarative toggle) for the backdrop, dropdown and hamburger
 * cross-fade; `Hover` for the nav-link underline and contact-icon scale.
 * No CSS transitions, no framer-motion, no GSAP.
 *
 * Scroll source: the Zustand scroll store (`use-scroll`) holds the Lenis
 * instance; we subscribe to `lenis.on("scroll")` and read `lenis.scroll`.
 * This is the project's scroll system — never `window.addEventListener("scroll")`.
 *
 * z-index: `z-50` — above all section content; the mobile dropdown lives
 * inside the same fixed header so it inherits this stacking context.
 *
 * Text color note: the hero (`sections/hero.tsx`) is a full-bleed DARK video
 * with a chocolate scrim, so nav text must be CREAM at the top of the page
 * (transparent backdrop, over the dark video) and flip to INK/chocolate after
 * scroll (cream backdrop appears). The flip is driven by the existing
 * `scrolled` boolean (instant swap — the backdrop itself spring-fades).
 */

import { type ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { easings } from "@react-spring/web";
import {
  InstagramLogo,
  List,
  WhatsappLogo,
  X,
} from "@/components/ui/icons";

import { Spring } from "@/components/animation/springs/spring";
import { Hover } from "@/components/animation/springs/hover";
import { useScroll } from "@/hooks/smooth-scroll/use-scroll";
import { useWindowWidth } from "@/hooks/use-window-size";
import { home } from "@/data/home";

/** Scroll position (px) after which the cream backdrop fades in. */
const SCROLL_THRESHOLD = 120;
/** Phosphor icon size (px) — kept consistent across every icon. */
const ICON_SIZE = 18;
/** Desktop breakpoint (px) — matches `springsConfig.mobileWidth`. */
const DESKTOP_BREAKPOINT = 768;

const navItems = home.hero.navItems;
const { whatsapp, instagram } = home.contact;

/** One primary nav link with a spring-animated underline on hover. */
function NavLink({
  href,
  label,
  onNavigate,
  lightChrome,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
  lightChrome: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <li>
      <Link
        ref={ref}
        href={href}
        onClick={onNavigate}
        className={`relative inline-flex items-center px-1 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60 focus-visible:ring-offset-2 ${
          lightChrome
            ? "text-ink/85 hover:text-ink"
            : "text-cream/85 hover:text-cream"
        }`}
      >
        {label}
        <Hover
          tag="span"
          trigger={ref}
          from={{ scaleX: 0 }}
          to={{ scaleX: 1 }}
          config={{ tension: 220, friction: 24 }}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-1 -bottom-0.5 h-0.5 origin-left rounded-full ${
            lightChrome ? "bg-caramel" : "bg-yellow"
          }`}
        />
      </Link>
    </li>
  );
}

/**
 * One contact icon link: a real `<a>` (carries href/target/rel/aria) wrapping
 * a `Hover` that spring-scales the icon. Using `trigger` keeps the anchor
 * itself a plain, fully-typed element — `Hover` only animates its child span.
 */
function ContactIcon({
  href,
  label,
  lightChrome,
  children,
}: {
  href: string;
  label: string;
  lightChrome: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-full p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60 focus-visible:ring-offset-2 ${
        lightChrome
          ? "text-chocolate hover:text-caramel"
          : "text-cream hover:text-yellow"
      }`}
    >
      <Hover
        tag="span"
        trigger={ref}
        from={{ scale: 1 }}
        to={{ scale: 1.12 }}
        config={{ tension: 240, friction: 18 }}
        className="inline-flex items-center justify-center"
      >
        {children}
      </Hover>
    </a>
  );
}

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoOk, setLogoOk] = useState(true);
  const pathname = usePathname();
  // Home hero is dark; institutional pages start on cream. Keep chrome readable.
  const lightChrome = scrolled || pathname !== "/";

  const lenis = useScroll((state) => state.lenis);
  const stopScroll = useScroll((state) => state.stop);
  const startScroll = useScroll((state) => state.start);
  const width = useWindowWidth();

  // Scroll-driven backdrop: subscribe to the project's Lenis instance.
  // `lenis.scroll` is updated before each "scroll" emission.
  useEffect(() => {
    if (!lenis) return;
    const sync = () => setScrolled(lenis.scroll > SCROLL_THRESHOLD);
    sync();
    lenis.on("scroll", sync);
    return () => {
      lenis.off("scroll", sync);
    };
  }, [lenis]);

  // Close the mobile menu when crossing into desktop.
  useEffect(() => {
    if (width >= DESKTOP_BREAKPOINT) setOpen(false);
  }, [width]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock smooth scroll while the mobile menu is open (project scroll store).
  useEffect(() => {
    if (!open) return;
    stopScroll();
    return () => startScroll();
  }, [open, startScroll, stopScroll]);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={[
        "fixed top-4 md:top-6 left-1/2 z-50 -translate-x-1/2",
        "w-[calc(100%-1rem)] md:w-auto md:min-w-[600px] lg:min-w-[700px]",
      ].join(" ")}
    >
      {/* Pill shell keeps the glass clip; dropdown stays outside so it can open. */}
      <div
        className={[
          "relative overflow-hidden rounded-full",
          lightChrome
            ? "border border-chocolate/10 shadow-[var(--shadow-pill)]"
            : "border border-white/10 shadow-none",
        ].join(" ")}
      >
        <Spring
          tag="div"
          enabled={lightChrome}
          from={{ opacity: 0 }}
          to={{ opacity: 1 }}
          config={{ duration: 300, easing: easings.easeOutCubic }}
          className="absolute inset-0 rounded-full bg-cream/90 backdrop-blur-xl"
        />

        <nav
          aria-label="Principal"
          className="relative flex items-center justify-between px-4 py-3 md:px-6"
        >
          <Link
            href="/"
            aria-label="Brownie da Rô — página inicial"
            className="inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60 focus-visible:ring-offset-2"
          >
            {logoOk ? (
              <Image
                src="/assets/brand/logo.png"
                alt="Brownie da Rô"
                width={320}
                height={312}
                priority
                className="h-9 w-9 object-contain md:h-10 md:w-10"
                onError={() => setLogoOk(false)}
              />
            ) : (
              <span
                className={`font-display text-lg font-semibold ${
                  lightChrome ? "text-ink" : "text-cream"
                }`}
              >
                Brownie da Rô
              </span>
            )}
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                lightChrome={lightChrome}
              />
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            <ContactIcon
              href={whatsapp}
              label="Falar no WhatsApp (abre em nova aba)"
              lightChrome={lightChrome}
            >
              <WhatsappLogo size={ICON_SIZE} weight="duotone" />
            </ContactIcon>
            <ContactIcon
              href={instagram}
              label="Instagram da Brownie da Rô (abre em nova aba)"
              lightChrome={lightChrome}
            >
              <InstagramLogo size={ICON_SIZE} weight="duotone" />
            </ContactIcon>
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60 focus-visible:ring-offset-2 md:hidden ${
              lightChrome ? "text-chocolate" : "text-cream"
            }`}
          >
            <span className="relative inline-flex h-5 w-5 items-center justify-center">
              <Spring
                tag="span"
                enabled={!open}
                from={{ opacity: 0, scale: 0.5 }}
                to={{ opacity: 1, scale: 1 }}
                config={{ duration: 180, easing: easings.easeOutCubic }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <List size={ICON_SIZE} weight="duotone" />
              </Spring>
              <Spring
                tag="span"
                enabled={open}
                from={{ opacity: 0, scale: 0.5 }}
                to={{ opacity: 1, scale: 1 }}
                config={{ duration: 180, easing: easings.easeOutCubic }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <X size={ICON_SIZE} weight="duotone" />
              </Spring>
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile dropdown — sibling of the pill so overflow clipping cannot hide it. */}
      <Spring
        tag="div"
        enabled={open}
        from={{ opacity: 0, y: -10 }}
        to={{ opacity: 1, y: 0 }}
        config={{ duration: 280, easing: easings.easeOutCubic }}
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open ? true : undefined}
        className="absolute left-0 top-[calc(100%+0.5rem)] w-full rounded-card border border-chocolate/10 bg-cream px-6 pb-6 pt-2 shadow-[var(--shadow-pill)] md:hidden"
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={closeMenu}
                tabIndex={open ? 0 : -1}
                className="block rounded-panel px-3 py-3 text-base font-medium text-ink/85 hover:bg-cream-warm hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-3 border-t border-chocolate/10 pt-4">
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp (abre em nova aba)"
            tabIndex={open ? 0 : -1}
            className="inline-flex items-center justify-center rounded-full p-2 text-chocolate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60"
          >
            <WhatsappLogo size={ICON_SIZE} weight="duotone" />
          </a>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Brownie da Rô (abre em nova aba)"
            tabIndex={open ? 0 : -1}
            className="inline-flex items-center justify-center rounded-full p-2 text-chocolate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow/60"
          >
            <InstagramLogo size={ICON_SIZE} weight="duotone" />
          </a>
        </div>
      </Spring>
    </header>
  );
};
