import { describe, expect, it } from 'vitest';

import { getAccessibleContrastColor, type CustomCSSProperties } from '@/shared/lib/colors/contrast';

type TenantTheme = {
  primary_color: string;
  secondary_color: string;
  accent_color: string;
};

function buildTenantStyles(theme: TenantTheme): CustomCSSProperties {
  return {
    '--color-primary': theme.primary_color,
    '--color-primary-foreground': getAccessibleContrastColor(theme.primary_color),
    '--color-secondary': theme.secondary_color,
    '--color-secondary-foreground': getAccessibleContrastColor(theme.secondary_color),
    '--color-accent': theme.accent_color,
    '--color-accent-foreground': getAccessibleContrastColor(theme.accent_color),
  };
}

describe('tenant theme style injection object', () => {
  it('builds css variable style object from tenant palette', () => {
    const theme: TenantTheme = {
      primary_color: '#D4AF37',
      secondary_color: '#1A1A1A',
      accent_color: '#FFD700',
    };

    const tenantStyles = buildTenantStyles(theme);

    expect(tenantStyles['--color-primary']).toBe('#D4AF37');
    expect(tenantStyles['--color-primary-foreground']).toBe(
      getAccessibleContrastColor('#D4AF37'),
    );

    expect(tenantStyles['--color-secondary']).toBe('#1A1A1A');
    expect(tenantStyles['--color-secondary-foreground']).toBe(
      getAccessibleContrastColor('#1A1A1A'),
    );

    expect(tenantStyles['--color-accent']).toBe('#FFD700');
    expect(tenantStyles['--color-accent-foreground']).toBe(
      getAccessibleContrastColor('#FFD700'),
    );
  });
});
