'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import type { NavbarProps, NavItem } from '../model/types';

export function Navbar({ churchName, items, currentPath }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const resolvedItems = useMemo<NavItem[]>(() => {
    const hasReadingsLink = items.some((item) => item.href === '/lecturas');
    if (hasReadingsLink) {
      return items;
    }

    return [
      ...items,
      {
        id: 'readings',
        label: 'Lecturas',
        href: '/lecturas',
      },
    ];
  }, [items]);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const effectivePath = currentPath ?? pathname;

  const normalizePath = (path: string): string => {
    if (path === '/') {
      return path;
    }

    return path.endsWith('/') ? path.slice(0, -1) : path;
  };

  const isHrefActive = (href?: string): boolean => {
    if (!href) {
      return false;
    }

    const normalizedCurrentPath = normalizePath(effectivePath);
    const normalizedHref = normalizePath(href);

    if (normalizedHref === '/') {
      return normalizedCurrentPath === '/';
    }

    return (
      normalizedCurrentPath === normalizedHref ||
      normalizedCurrentPath.startsWith(`${normalizedHref}/`)
    );
  };

  const isActive = (item: NavItem): boolean => {
    if (isHrefActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child) => isHrefActive(child.href));
    }
    return false;
  };

  const toggleDropdown = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  return (
    <nav className="bg-surface shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Church Name */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-primary hover:text-primary/80 transition-colors font-semibold text-lg"
            >
              {churchName}
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {resolvedItems.map((item) => {
              const active = isActive(item);
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                return (
                  <div key={item.id} className="relative">
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className={`flex items-center gap-1 transition-colors py-2 ${
                        active
                          ? 'text-primary border-b-2 border-primary'
                          : 'text-secondary/70 hover:text-primary'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          activeDropdown === item.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {activeDropdown === item.id && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-surface rounded-lg shadow-lg border border-secondary/20 py-2">
                        {item.children?.map((child) => (
                          <Link
                            key={child.id}
                            href={child.href || '#'}
                            onClick={handleNavClick}
                            className="block w-full text-left px-4 py-2 text-secondary/70 hover:bg-accent transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href || '#'}
                  className={`transition-colors py-2 ${
                    active
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-secondary/70 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-secondary/70"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-secondary/20">
            {resolvedItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                return (
                  <div key={item.id}>
                    <div className="px-4 py-2 text-secondary/50 text-sm font-medium">
                      {item.label}
                    </div>
                    {item.children?.map((child) => (
                      <Link
                        key={child.id}
                        href={child.href || '#'}
                        onClick={handleNavClick}
                        className="block w-full text-left px-8 py-2 text-secondary/70 hover:bg-accent transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  href={item.href || '#'}
                  onClick={handleNavClick}
                  className="block w-full text-left px-4 py-2 text-secondary/70 hover:bg-accent transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
