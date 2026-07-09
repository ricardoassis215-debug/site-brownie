"use client";

import { type ReactNode } from "react";
import { easings, useReducedMotion } from "@react-spring/web";

import { Inview } from "@/components/animation/springs/in-view";
import { Tags } from "@/types/springs";

/**
 * BlurReveal — "heavy fade-up" scroll reveal (Awwwards-tier pattern).
 *
 * Composes `Inview` with an opacity + translate-y + blur-to-sharp reveal.
 * GPU-expensive `filter: blur()` is gated behind `prefers-reduced-motion` and
 * disabled on mobile by default — use sparingly, only on above-the-fold
 * headings and primary cards (the plan caps this at ~3-4 per page).
 *
 * Motion rules (AGENTS.md): pure `@react-spring/web` via `Inview`; no CSS
 * transitions, no framer-motion.
 */
export interface BlurRevealProps {
  children: ReactNode;
  /** HTML tag for the animated wrapper. */
  tag?: Tags;
  /** Reveal delay in ms. */
  delay?: number;
  /** Vertical travel distance (px). Default 32. */
  y?: number;
  /** Blur radius at rest (px). Default 8. */
  blur?: number;
  /** Disable the blur on touch/small screens (keeps the fade+rise). */
  disableOnMobile?: boolean;
  className?: string;
}

export const BlurReveal = ({
  children,
  tag = "div",
  delay = 0,
  y = 32,
  blur = 8,
  disableOnMobile = true,
  className,
}: BlurRevealProps) => {
  const reduce = useReducedMotion();

  // Reduced motion: render the content statically, no spring wrapper.
  if (reduce) {
    return <>{children}</>;
  }

  return (
    <Inview
      tag={tag}
      mode="once"
      from={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      to={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      delayIn={delay}
      config={{ duration: 700, easing: easings.easeOutQuart }}
      disableOnMobile={disableOnMobile}
      className={className}
    >
      {children}
    </Inview>
  );
};