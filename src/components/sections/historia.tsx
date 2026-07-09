"use client";

import Image from "next/image";
import { animated, easings, useReducedMotion, useSpring } from "@react-spring/web";
import { Fragment, type ReactNode, useCallback, useRef, useState } from "react";

import { Inview } from "@/components/animation/springs/in-view";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/data/home";

/** História — editorial dark-chocolate story band with a horizontal drag gallery. */

type GalleryImage = {
  src: string;
  alt: string;
  aspect: "3/4" | "4/3" | "1/1";
};

/** Split `text` so `word` renders italic (mirrors SectionHeading's italicWord). */
function renderItalic(text: string, word: string): ReactNode {
  const idx = text.indexOf(word);
  if (idx === -1) return text;
  return (
    <Fragment>
      {text.slice(0, idx)}
      <em className="italic font-normal">{word}</em>
      {text.slice(idx + word.length)}
    </Fragment>
  );
}

const GALLERY_CONFIG = { tension: 180, friction: 28, mass: 1 };
const INERTIA_CONFIG = { tension: 160, friction: 26, mass: 1.2 };

/** Horizontal drag gallery — pointer drag + useSpring x + inertia on desktop;
 *  overflow-x-auto snap on mobile / reduced-motion. */
function DragGallery({ images }: { images: ReadonlyArray<GalleryImage> }) {
  const reduce = useReducedMotion();
  const [dragging, setDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const lastVelRef = useRef(0);
  const lastClientXRef = useRef(0);
  const lastTimeRef = useRef(0);

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: GALLERY_CONFIG,
  }));

  const getBounds = useCallback((): [number, number] => {
    const container = containerRef.current;
    if (!container) return [0, 0];
    const track = container.firstElementChild as HTMLElement | null;
    if (!track) return [0, 0];
    const max = Math.max(0, track.scrollWidth - container.clientWidth);
    return [-max, 0];
  }, []);

  const clampX = useCallback(
    (val: number): number => {
      const [lo, hi] = getBounds();
      return Math.min(hi, Math.max(lo, val));
    },
    [getBounds],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      isDraggingRef.current = true;
      setDragging(true);
      startXRef.current = e.clientX - currentXRef.current;
      lastClientXRef.current = e.clientX;
      lastTimeRef.current = performance.now();
      lastVelRef.current = 0;
      api.start({ x: currentXRef.current, immediate: true });
    },
    [api],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const newX = clampX(e.clientX - startXRef.current);
      currentXRef.current = newX;
      api.start({ x: newX, immediate: true });
      const now = performance.now();
      const dt = now - lastTimeRef.current;
      if (dt > 0) {
        const inst = (e.clientX - lastClientXRef.current) / dt;
        lastVelRef.current = lastVelRef.current * 0.6 + inst * 0.4;
      }
      lastClientXRef.current = e.clientX;
      lastTimeRef.current = now;
    },
    [api, clampX],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      isDraggingRef.current = false;
      setDragging(false);
      const vel = lastVelRef.current * 200;
      const projected = clampX(currentXRef.current + vel);
      currentXRef.current = projected;
      api.start({ x: projected, config: INERTIA_CONFIG });
    },
    [api, clampX],
  );

  /* ---- Reduced-motion / mobile fallback: native snap scroll ---- */
  if (reduce) {
    return (
      <div
        className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden select-none"
        style={{ WebkitOverflowScrolling: "touch" }}
        role="region"
        aria-label="Galeria da história — role para o lado"
        tabIndex={0}
      >
        <div className="flex snap-x snap-mandatory gap-4 px-6 md:px-8">
          {images.map((img) => (
            <figure
              key={img.src}
              className="shrink-0 w-[78vw] max-w-[22rem] snap-center relative aspect-[4/3] overflow-hidden rounded-card bg-cocoa/30"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 78vw, 40vw"
                className="object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    );
  }

  /* ---- Spring drag gallery ---- */
  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Galeria da história — arraste para navegar"
      tabIndex={0}
      className="w-full overflow-hidden select-none outline-none"
      style={{
        cursor: dragging ? "grabbing" : "grab",
        touchAction: "pan-y",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <animated.div
        className="flex gap-4 px-6 md:px-8"
        style={{ x, willChange: "transform" }}
      >
        {images.map((img) => (
          <figure
            key={img.src}
            className="shrink-0 w-[78vw] max-w-[22rem] relative aspect-[4/3] overflow-hidden rounded-card bg-cocoa/30"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 78vw, 40vw"
              className="object-cover"
              draggable={false}
            />
          </figure>
        ))}
      </animated.div>
    </div>
  );
}

export const Historia = () => {
  const { historia } = home;
  const { gallery } = historia;

  return (
    <section
      id="historia"
      className="w-full bg-chocolate py-[var(--section-pad-y-mobile)] text-cream md:py-[var(--section-pad-y)]"
    >
      {/* Editorial text block */}
      <div className="mx-auto max-w-4xl px-6 text-center md:px-8">
        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ duration: 600, easing: easings.easeOutCubic }}
        >
          <Eyebrow className="!text-yellow">{historia.eyebrow}</Eyebrow>
        </Inview>

        <div className="mt-6">
          <SectionHeading as="h2" italicWord="verdade">
            {historia.title}
          </SectionHeading>
        </div>

        <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-cream/80">
          {historia.paragraphs.map((p, i) => (
            <Inview
              key={i}
              tag="p"
              mode="once"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              delayIn={150 * i}
              config={{ duration: 700, easing: easings.easeOutQuart }}
            >
              {p}
            </Inview>
          ))}
        </div>
      </div>

      {/* Drag hint — above gallery */}
      <div
        className="mx-auto mt-12 flex max-w-5xl items-center justify-end gap-2 px-6 md:mt-16 md:px-8"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-[0.22em] text-cream/50">
          {gallery.dragHint} →
        </span>
      </div>

      {/* Horizontal drag gallery */}
      <div className="mt-3">
        <DragGallery images={gallery.images} />
      </div>

      {/* Statement */}
      <div className="mx-auto mt-20 max-w-4xl px-6 md:mt-28 md:px-8">
        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 24 }}
          to={{ opacity: 1, y: 0 }}
          config={{ duration: 800, easing: easings.easeOutQuart }}
          className="text-3xl font-display leading-[1.15] tracking-tight text-cream md:text-5xl"
        >
          {renderItalic(historia.statement, "tradição")}
        </Inview>
      </div>
    </section>
  );
};
