"use client";

import TextEngine from "spring-text-engine";
import { easings } from "@react-spring/web";
import { Fragment, ReactNode } from "react";

type HeadingTag = "h1" | "h2" | "h3";

export interface SectionHeadingProps {
  children: ReactNode;
  as?: HeadingTag;
  italicWord?: string;
  className?: string;
}

const sizeClasses: Record<HeadingTag, string> = {
  h1: "text-5xl md:text-7xl lg:text-8xl",
  h2: "text-4xl md:text-6xl",
  h3: "text-3xl md:text-5xl",
};

export function SectionHeading({
  children,
  as = "h2",
  italicWord,
  className,
}: SectionHeadingProps) {
  let content: ReactNode = children;

  if (italicWord && typeof children === "string") {
    const idx = children.indexOf(italicWord);
    if (idx !== -1) {
      const before = children.slice(0, idx);
      const after = children.slice(idx + italicWord.length);
      content = (
        <Fragment>
          {before}
          <em className="italic font-normal">{italicWord}</em>
          {after}
        </Fragment>
      );
    }
  }

  return (
    <TextEngine
      tag={as}
      mode="once"
      overflow
      lineIn={{ y: "0%", opacity: 1 }}
      lineOut={{ y: "110%", opacity: 0 }}
      lineStagger={100}
      lineConfig={{ duration: 800, easing: easings.easeOutCubic }}
      className={`${sizeClasses[as]} leading-[1.1] tracking-tight ${className ?? ""}`.trim()}
    >
      {content}
    </TextEngine>
  );
}