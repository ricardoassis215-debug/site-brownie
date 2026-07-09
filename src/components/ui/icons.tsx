import type { CSSProperties, ReactNode, SVGProps } from "react";

export interface IconProps {
  size?: number | string;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  className?: string;
  color?: string;
  "aria-hidden"?: boolean | "true" | "false";
  [key: string]: unknown;
}

type Weight = NonNullable<IconProps["weight"]>;

const isFilledWeight = (weight: Weight): boolean =>
  weight === "fill" || weight === "duotone" || weight === "bold";

const strokeWidthFor = (weight: Weight): number => {
  switch (weight) {
    case "bold":
      return 2.5;
    case "fill":
    case "duotone":
      return 0;
    case "light":
      return 1;
    case "thin":
      return 0.75;
    case "regular":
    default:
      return 1.75;
  }
};

interface IconSvgProps extends IconProps {
  filled: boolean;
  sw: number;
  children?: ReactNode;
}

function IconSvg({
  size = 24,
  className,
  color,
  filled,
  sw,
  "aria-hidden": ah,
  children,
  ...rest
}: IconSvgProps) {
  const style: CSSProperties | undefined =
    color !== undefined ? { color } : undefined;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ah ?? true}
      style={style}
      {...(rest as SVGProps<SVGSVGElement>)}
    >
      {children}
    </svg>
  );
}

export function ArrowRight({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = filled ? 2.5 : strokeWidthFor(weight);
  return (
    <IconSvg
      size={size}
      filled={filled}
      sw={sw}
      className={className}
      {...rest}
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </IconSvg>
  );
}

export function ArrowDown({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = filled ? 2.5 : strokeWidthFor(weight);
  return (
    <IconSvg
      size={size}
      filled={filled}
      sw={sw}
      className={className}
      {...rest}
    >
      <path d="M12 5v14" />
      <path d="M6 13l6 6 6-6" />
    </IconSvg>
  );
}

export function ArrowUpRight({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = filled ? 2.5 : strokeWidthFor(weight);
  return (
    <IconSvg
      size={size}
      filled={filled}
      sw={sw}
      className={className}
      {...rest}
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </IconSvg>
  );
}

export function Star({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = strokeWidthFor(weight);
  const starPath =
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";
  return (
    <IconSvg
      size={size}
      filled={filled}
      sw={sw}
      className={className}
      {...rest}
    >
      <path
        d={starPath}
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    </IconSvg>
  );
}

export function WhatsappLogo({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = strokeWidthFor(weight);
  const path =
    "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.46 3.44 1.33 4.94L2 22l5.3-1.38a9.86 9.86 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.13c-.25.7-1.44 1.33-1.99 1.36-.5.03-1.14.2-3.84-.8-3.24-1.27-5.32-4.57-5.48-4.78-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.63-.4.84-.4l.6.01c.19.01.45-.07.7.54.25.62.86 2.13.93 2.29.07.16.12.35.02.56-.1.21-.15.34-.3.52-.15.18-.32.4-.45.54-.15.15-.31.31-.13.61.18.3.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.48 1.53.3.15.48.13.66-.08.18-.21.76-.89.96-1.19.2-.3.4-.25.67-.15.27.1 1.71.81 2 .96.29.15.48.22.55.35.07.13.07.75-.18 1.45z";
  return (
    <IconSvg
      size={size}
      filled={filled}
      sw={sw}
      className={className}
      {...rest}
    >
      <path
        d={path}
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    </IconSvg>
  );
}

export function InstagramLogo({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = strokeWidthFor(weight);
  return (
    <IconSvg
      size={size}
      filled={false}
      sw={sw}
      className={className}
      {...rest}
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        ry="5"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        strokeWidth={sw}
      />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </IconSvg>
  );
}

export function List({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = filled ? 2.5 : strokeWidthFor(weight);
  return (
    <IconSvg
      size={size}
      filled={false}
      sw={sw}
      className={className}
      {...rest}
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconSvg>
  );
}

export function X({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = filled ? 2.5 : strokeWidthFor(weight);
  return (
    <IconSvg
      size={size}
      filled={false}
      sw={sw}
      className={className}
      {...rest}
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </IconSvg>
  );
}

export function MapPin({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = strokeWidthFor(weight);
  const pinPath = "M12 22s7-7.16 7-12a7 7 0 1 0-14 0c0 4.84 7 12 7 12z";
  return (
    <IconSvg
      size={size}
      filled={filled}
      sw={sw}
      className={className}
      {...rest}
    >
      <path
        d={pinPath}
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      {filled ? (
        <circle cx="12" cy="10" r="2.5" fill="white" stroke="none" />
      ) : (
        <circle
          cx="12"
          cy="10"
          r="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
        />
      )}
    </IconSvg>
  );
}

export function Clock({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = strokeWidthFor(weight);
  return (
    <IconSvg
      size={size}
      filled={filled}
      sw={sw}
      className={className}
      {...rest}
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={sw}
      />
      <path
        d="M12 7v5l3 2"
        fill="none"
        stroke={filled ? "white" : "currentColor"}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconSvg>
  );
}

export function Phone({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = strokeWidthFor(weight);
  const path =
    "M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z";
  return (
    <IconSvg
      size={size}
      filled={filled}
      sw={sw}
      className={className}
      {...rest}
    >
      <path
        d={path}
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
    </IconSvg>
  );
}

export function Envelope({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = strokeWidthFor(weight);
  return (
    <IconSvg
      size={size}
      filled={filled}
      sw={sw}
      className={className}
      {...rest}
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M3 7l9 6 9-6"
        fill="none"
        stroke={filled ? "white" : "currentColor"}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconSvg>
  );
}

export function Train({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = strokeWidthFor(weight);
  return (
    <IconSvg
      size={size}
      filled={false}
      sw={sw}
      className={className}
      {...rest}
    >
      <rect
        x="5"
        y="3"
        width="14"
        height="14"
        rx="3"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path d="M5 11h14" stroke="currentColor" strokeWidth={sw} />
      <circle
        cx="8.5"
        cy="14"
        r="1"
        fill={filled ? "white" : "currentColor"}
      />
      <circle
        cx="15.5"
        cy="14"
        r="1"
        fill={filled ? "white" : "currentColor"}
      />
      <path
        d="M8 17l-2 4M16 17l2 4"
        fill="none"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconSvg>
  );
}

export function CheckCircle({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = strokeWidthFor(weight);
  const circlePath = "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z";
  return (
    <IconSvg
      size={size}
      filled={filled}
      sw={sw}
      className={className}
      {...rest}
    >
      <path
        d={circlePath}
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M7.5 12l3 3 6-6"
        fill="none"
        stroke={filled ? "white" : "currentColor"}
        strokeWidth={filled ? 2.2 : sw}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconSvg>
  );
}

export function Warning({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = strokeWidthFor(weight);
  const triPath = "M12 3L2 20h20L12 3z";
  return (
    <IconSvg
      size={size}
      filled={filled}
      sw={sw}
      className={className}
      {...rest}
    >
      <path
        d={triPath}
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M12 9v5"
        fill="none"
        stroke={filled ? "white" : "currentColor"}
        strokeWidth={filled ? 2 : sw}
        strokeLinecap="round"
      />
      <circle
        cx="12"
        cy="17"
        r="1"
        fill={filled ? "white" : "currentColor"}
        stroke="none"
      />
    </IconSvg>
  );
}

export function CircleNotch({
  size = 24,
  weight = "regular",
  className,
  ...rest
}: IconProps) {
  const filled = isFilledWeight(weight);
  const sw = filled ? 2.5 : strokeWidthFor(weight);
  return (
    <IconSvg
      size={size}
      filled={false}
      sw={sw}
      className={className}
      {...rest}
    >
      <path
        d="M12 3a9 9 0 1 0 9 9"
        fill="none"
        stroke="currentColor"
        strokeWidth={sw}
        strokeLinecap="round"
      />
    </IconSvg>
  );
}