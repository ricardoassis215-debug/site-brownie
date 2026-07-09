"use client";

import Image from "next/image";
import { easings } from "@react-spring/web";
import { Fragment, type ReactNode, useRef } from "react";
import { InstagramLogo } from "@/components/ui/icons";

import { Inview } from "@/components/animation/springs/in-view";
import { Hover } from "@/components/animation/springs/hover";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/data/home";

/**
 * Instagram — eyebrow + headline + follower line + handle link + 2×3 photo grid.
 */

/** Weave the follower count into the body copy, pt-BR formatted. */
function renderBody(body: string, count: number): ReactNode {
  const formatted = count.toLocaleString("pt-BR");
  const marker = "milhares";
  const idx = body.indexOf(marker);
  if (idx === -1) {
    return body;
  }
  return (
    <Fragment>
      {body.slice(0, idx)}
      <strong className="font-semibold text-chocolate">{formatted}</strong>
      {body.slice(idx + marker.length)}
    </Fragment>
  );
}

type Post = { src: string; alt: string };

/** One grid cell: anchor link to IG wrapping a square image + hover overlay. */
function PostCell({ post }: { post: Post }) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      href={home.instagram.handleHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${home.instagram.handle} no Instagram — ${post.alt}`}
      className="group relative block aspect-square overflow-hidden rounded-card"
    >
      <Hover
        tag="div"
        trigger={ref}
        from={{ scale: 1 }}
        to={{ scale: 1.03 }}
        config={{ tension: 220, friction: 22 }}
        aria-hidden="true"
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={post.src}
          alt={post.alt}
          fill
          sizes="(max-width: 768px) 44vw, 220px"
          className="object-cover"
          draggable={false}
        />
      </Hover>

      <Hover
        tag="div"
        trigger={ref}
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ tension: 220, friction: 22 }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cream-warm/80 text-chocolate"
      >
        <InstagramLogo size={32} weight="duotone" />
      </Hover>
    </a>
  );
}

export const Instagram = () => {
  const { instagram } = home;
  const videoSrc = instagram.videoSrc;

  return (
    <section
      id="instagram"
      className="w-full bg-cream-warm py-[var(--section-pad-y-mobile)] text-ink md:py-[var(--section-pad-y)]"
    >
      <div className="mx-auto max-w-4xl px-8 text-center">
        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          config={{ duration: 600, easing: easings.easeOutCubic }}
        >
          <Eyebrow>{instagram.eyebrow}</Eyebrow>
        </Inview>

        <div className="mt-6">
          <SectionHeading as="h2" italicWord="forno">
            {instagram.title}
          </SectionHeading>
        </div>

        <Inview
          tag="p"
          mode="once"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          delayIn={120}
          config={{ duration: 700, easing: easings.easeOutQuart }}
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink/70"
        >
          {renderBody(instagram.body, instagram.followerCount)}
        </Inview>

        <Inview
          tag="div"
          mode="once"
          from={{ opacity: 0, y: 16 }}
          to={{ opacity: 1, y: 0 }}
          delayIn={220}
          config={{ duration: 600, easing: easings.easeOutCubic }}
          className="mt-8"
        >
          <a
            href={instagram.handleHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-chocolate underline-offset-4 hover:underline"
          >
            <InstagramLogo size={20} weight="duotone" aria-hidden="true" />
            <span>{instagram.handle}</span>
            <span className="text-caramel" aria-hidden="true">
              no Instagram →
            </span>
          </a>
        </Inview>
      </div>

      {/* 2×3 photo grid */}
      <div className="mx-auto mt-12 max-w-5xl px-8">
        <ul
          className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
          role="list"
          aria-label="Fotos do Instagram"
        >
          {videoSrc ? (
            <li>
              <Inview
                tag="div"
                mode="once"
                from={{ opacity: 0, y: 24 }}
                to={{ opacity: 1, y: 0 }}
                config={{ duration: 700, easing: easings.easeOutQuart }}
              >
                <a
                  href={instagram.handleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${instagram.handle} — reel no Instagram`}
                  className="relative block aspect-square overflow-hidden rounded-card"
                >
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden
                  >
                    <source src={videoSrc} type="video/mp4" />
                  </video>
                </a>
              </Inview>
            </li>
          ) : null}
          {instagram.posts.map((post, i) => (
            <li key={post.src}>
              <Inview
                tag="div"
                mode="once"
                from={{ opacity: 0, y: 24 }}
                to={{ opacity: 1, y: 0 }}
                delayIn={i * 60}
                config={{ duration: 700, easing: easings.easeOutQuart }}
              >
                <PostCell post={post} />
              </Inview>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
