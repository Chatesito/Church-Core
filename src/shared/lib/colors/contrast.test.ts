import { describe, it, expect } from 'vitest';

import {
  getAccessibleContrastColor,
  hexToRgb,
  isValidHex,
} from './contrast';

describe('isValidHex', () => {
  it('accepts valid 3 and 6 character hex values', () => {
    expect(isValidHex('#000')).toBe(true);
    expect(isValidHex('#FFF')).toBe(true);
    expect(isValidHex('#FFFFFF')).toBe(true);
    expect(isValidHex('abc')).toBe(true);
  });

  it('rejects invalid hex values', () => {
    expect(isValidHex('invalid-string')).toBe(false);
    expect(isValidHex('#XYZ')).toBe(false);
    expect(isValidHex('#1234')).toBe(false);
    expect(isValidHex('')).toBe(false);
  });
});

describe('hexToRgb', () => {
  it('parses valid 6-digit hex values', () => {
    expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('ffd700')).toEqual({ r: 255, g: 215, b: 0 });
  });

  it('parses valid 3-digit hex values', () => {
    expect(hexToRgb('#0f0')).toEqual({ r: 0, g: 255, b: 0 });
    expect(hexToRgb('abc')).toEqual({ r: 170, g: 187, b: 204 });
  });

  it('returns null for invalid values', () => {
    expect(hexToRgb('invalid-string')).toBeNull();
    expect(hexToRgb('#XYZ')).toBeNull();
    expect(hexToRgb('#12')).toBeNull();
  });
});

describe('getAccessibleContrastColor', () => {
  it('returns white for dark backgrounds', () => {
    expect(getAccessibleContrastColor('#000000')).toBe('#ffffff');
    expect(getAccessibleContrastColor('#1a1a1a')).toBe('#ffffff');
  });

  it('returns black for light backgrounds', () => {
    expect(getAccessibleContrastColor('#FFD700')).toBe('#000000');
    expect(getAccessibleContrastColor('#FFFFFF')).toBe('#000000');
  });

  it('returns safe fallback for invalid input', () => {
    expect(getAccessibleContrastColor('invalid-color')).toBe('#000000');
    expect(getAccessibleContrastColor('#XYZ')).toBe('#000000');
  });
});
