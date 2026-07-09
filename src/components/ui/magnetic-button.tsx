"use client";

import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import { useRef, useState, type ReactNode } from "react";
import { isMobileDisabled } from "@/lib/springs/config";
import { useWindowWidth } from "@/hooks/use-window-size";

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton = ({
  children,
  className,
  strength = 8,
}: MagneticButtonProps) => {
  const reduce = useReducedMotion();
  const width = useWindowWidth();
  const mobile = isMobileDisabled(true, width);

  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const style = useSpring({
    to: {
      x: hovering ? offsetX * strength : 0,
      y: hovering ? offsetY * strength : 0,
    },
    config: { tension: 300, friction: 18 },
  });

  const handleMove = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setOffsetX(x);
    setOffsetY(y);
  };

  if (reduce || mobile) {
    return (
      <div className={className} style={{ display: "inline-block" }}>
        {children}
      </div>
    );
  }

  return (
    <animated.div
      ref={ref}
      style={{ ...style, display: "inline-block" }}
      className={`will-change-transform ${className ?? ""}`}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => {
        setHovering(false);
        setOffsetX(0);
        setOffsetY(0);
      }}
      onPointerMove={handleMove}
    >
      {children}
    </animated.div>
  );
};
