import { ReactNode } from "react";

type PanelTone =
  | "chocolate"
  | "chocolate-deep"
  | "caramel"
  | "blush"
  | "sage"
  | "rose"
  | "yellow"
  | "cream-warm";

export interface ColorPanelProps {
  tone: PanelTone;
  children: ReactNode;
  className?: string;
}

const toneClasses: Record<PanelTone, string> = {
  chocolate: "bg-chocolate text-cream",
  "chocolate-deep": "bg-chocolate text-cream",
  caramel: "bg-caramel text-ink",
  blush: "bg-blush text-chocolate",
  sage: "bg-sage text-ink",
  rose: "bg-rose text-chocolate",
  yellow: "bg-yellow text-ink",
  "cream-warm": "bg-cream-warm text-chocolate",
};

export function ColorPanel({ tone, children, className }: ColorPanelProps) {
  return (
    <div
      className={`rounded-panel p-8 md:p-12 min-h-[20rem] flex flex-col ${toneClasses[tone]} ${className ?? ""}`.trim()}
    >
      {children}
    </div>
  );
}