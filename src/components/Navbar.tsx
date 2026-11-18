import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface Props {
  currentPath?: string;
}

export default function Navbar({ currentPath = '/' }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activePath, setActivePath] = useState(currentPath);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname);
    }
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Events', href: '/events' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return activePath === '/' || activePath === '';
    return activePath.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-[300] bg-paper-2/95 backdrop-blur-md border-b border-rule transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Official Society Identity */}
          <a
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-navy active:translate-y-px"
          >
            <div className="w-11 h-11 rounded-lg bg-navy p-1 flex items-center justify-center shrink-0 border border-deep-navy shadow-sm">
              <img
                src="/images/ues-logo-transparent-dark-bg.svg"
                alt="UES Official Logo"
                className="w-9 h-9 object-contain"
              />
            </div>

            <span className="font-bold text-base tracking-tight text-ink group-hover:text-navy transition-colors">
              UOSahiwal Entrepreneurship Society
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-navy active:translate-y-px ${
                    active
                      ? 'bg-paper-3 text-ink font-bold'
                      : 'text-muted hover:text-ink hover:bg-paper-3'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://github.com/ues-sahiwal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-ink flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-paper-3 transition-colors focus-visible:outline-2 focus-visible:outline-navy active:translate-y-px"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted" />
            </a>

            <a
              href="/join"
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-opacity shadow-sm focus-visible:outline-2 focus-visible:outline-navy active:translate-y-px ${
                activePath === '/join'
                  ? 'bg-accent text-accent-ink'
                  : 'bg-navy text-white hover:opacity-95'
              }`}
            >
              Join the society
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md bg-paper-3 text-ink hover:text-navy border border-rule focus-visible:outline-2 focus-visible:outline-navy active:translate-y-px"
              aria-label="Toggle Navigation"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-paper-2 border-b border-rule px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-navy active:translate-y-px ${
                isActive(link.href)
                  ? 'bg-paper-3 text-ink font-bold'
                  : 'text-muted hover:text-ink hover:bg-paper-3'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-rule flex flex-col gap-2">
            <a
              href="https://github.com/ues-sahiwal"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted py-2 flex items-center justify-between transition-colors focus-visible:outline-2 focus-visible:outline-navy active:translate-y-px"
            >
              <span>GitHub organization</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/join"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2 rounded-lg text-xs font-bold text-white bg-navy hover:opacity-95 transition-opacity focus-visible:outline-2 focus-visible:outline-navy active:translate-y-px"
            >
              Join the society
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
