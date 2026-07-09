"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animated, useReducedMotion, useSpring } from "@react-spring/web";

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
}

const DESKTOP_BREAKPOINT = 768;

export const TiltCard = ({
  children,
  className,
  maxTilt = 8,
  perspective = 800,
  scale = 1.02,
}: TiltCardProps) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const spring = useSpring({
    to: {
      rotateX: hovering ? tiltY * maxTilt : 0,
      rotateY: hovering ? tiltX * maxTilt : 0,
      scale: hovering ? scale : 1,
    },
    config: { tension: 300, friction: 20 },
  });

  const highlightSpring = useSpring({
    to: { opacity: hovering ? 1 : 0 },
    config: { tension: 300, friction: 20 },
  });

  const handleMove = (e: React.PointerEvent) => {
    if (!ref.current || !isDesktop) return;
    const rect = ref.current.getBoundingClientRect();
    setTiltX((e.clientX - rect.left) / rect.width - 0.5);
    setTiltY((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleEnter = () => {
    if (!isDesktop) return;
    setHovering(true);
  };
  const handleLeave = () => {
    setHovering(false);
    setTiltX(0);
    setTiltY(0);
  };

  if (reduce || !isDesktop) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <animated.div
      ref={ref}
      className={className}
      style={{
        ...spring,
        transformStyle: "preserve-3d",
        perspective,
        willChange: "transform",
      }}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      {children}
      <animated.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          ...highlightSpring,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />
    </animated.div>
  );
};
