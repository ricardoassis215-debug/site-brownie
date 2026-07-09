import { createElement, ReactNode } from "react";

type EyebrowTag = "p" | "span" | "div" | "label";

export interface EyebrowProps {
  children: ReactNode;
  className?: string;
  as?: EyebrowTag;
}

export function Eyebrow({ children, className, as = "p" }: EyebrowProps) {
  return createElement(
    as,
    {
      className: `text-[0.75rem] uppercase tracking-[0.22em] font-medium text-caramel ${className ?? ""}`.trim(),
    },
    children,
  );
}