import type { CSSProperties } from 'react';

type RGB = { r: number; g: number; b: number };

const HEX_COLOR_REGEX = /^#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
const WCAG_AA_MIN_CONTRAST = 4.5;
const BLACK_HEX = '#000000';
const WHITE_HEX = '#ffffff';

function normalizeHex(hex: string): string {
  const trimmed = hex.trim();
  if (!trimmed.startsWith('#')) {
    return `#${trimmed}`;
  }

  return trimmed;
}

function expandHex(hex: string): string {
  if (hex.length !== 4) {
    return hex;
  }

  const [, r, g, b] = hex;
  return `#${r}${r}${g}${g}${b}${b}`;
}

function channelToLinear(channel: number): number {
  const normalized = channel / 255;
  if (normalized <= 0.03928) {
    return normalized / 12.92;
  }

  return ((normalized + 0.055) / 1.055) ** 2.4;
}

export function isValidHex(hex: string): boolean {
  return HEX_COLOR_REGEX.test(hex.trim());
}

export function hexToRgb(hex: string): RGB | null {
  if (!isValidHex(hex)) {
    return null;
  }

  const normalized = expandHex(normalizeHex(hex));
  const red = Number.parseInt(normalized.slice(1, 3), 16);
  const green = Number.parseInt(normalized.slice(3, 5), 16);
  const blue = Number.parseInt(normalized.slice(5, 7), 16);

  return { r: red, g: green, b: blue };
}

export function getRelativeLuminance(rgb: RGB): number {
  const red = channelToLinear(rgb.r);
  const green = channelToLinear(rgb.g);
  const blue = channelToLinear(rgb.b);

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function getContrastRatio(lum1: number, lum2: number): number {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function getAccessibleContrastColor(hexColor: string): string {
  const backgroundRgb = hexToRgb(hexColor);

  if (!backgroundRgb) {
    return BLACK_HEX;
  }

  const backgroundLuminance = getRelativeLuminance(backgroundRgb);
  const contrastWithWhite = getContrastRatio(backgroundLuminance, 1);
  const contrastWithBlack = getContrastRatio(backgroundLuminance, 0);

  if (
    contrastWithWhite >= WCAG_AA_MIN_CONTRAST &&
    contrastWithWhite >= contrastWithBlack
  ) {
    return WHITE_HEX;
  }

  if (contrastWithBlack >= WCAG_AA_MIN_CONTRAST) {
    return BLACK_HEX;
  }

  return contrastWithWhite > contrastWithBlack ? WHITE_HEX : BLACK_HEX;
}

export type CustomCSSProperties = CSSProperties & {
  [key: `--${string}`]: string | number;
};
