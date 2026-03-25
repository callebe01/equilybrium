import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import useMediaQuery from '../hooks/useMediaQuery';
import { useTranslation } from '../i18n';
import LanguageSelector from './LanguageSelector';

function getNavLinks(t) {
  return [
    { label: t('navbar.links.whatWeDo'), href: '#what-we-do' },
    { label: t('navbar.links.whoItsFor'), href: '#who-its-for' },
    { label: t('navbar.links.whyEquilybrium'), href: '#why' },
    { label: t('navbar.links.privacy'), href: '#privacy' },
    { label: t('navbar.links.pricing'), href: '#pricing' },
  ];
}

const linkStyle = {
  fontSize: '13px',
  fontWeight: 400,
  color: 'var(--muted)',
  padding: '8px 14px',
  borderRadius: '100px',
  letterSpacing: '0.02em',
  transition: 'color 0.2s',
};

function HamburgerIcon({ open }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      style={{ display: 'block' }}
    >
      <line
        x1="0" y1="1" x2="20" y2="1"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
          transformOrigin: 'center',
          transition: 'transform 0.25s ease',
        }}
      />
      <line
        x1="0" y1="7" x2="20" y2="7"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          opacity: open ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      />
      <line
        x1="0" y1="13" x2="20" y2="13"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
          transformOrigin: 'center',
          transition: 'transform 0.25s ease',
        }}
      />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { t } = useTranslation();
  const navLinks = getNavLinks(t);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when switching to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      style={{ padding: isMobile ? '8px 12px 0' : '12px 20px 0' }}
    >
      <nav
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: isMobile ? '0 16px' : '0 32px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          borderRadius: menuOpen ? '16px 16px 0 0' : '16px',
          boxShadow: scrolled
            ? '0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)'
            : '0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)',
          border: '1px solid rgba(255,255,255,0.6)',
          borderBottom: menuOpen ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.6)',
          transition: 'box-shadow 0.3s ease, border-radius 0.25s ease',
          position: 'relative',
        }}
      >
        <div
          className="opacity-0"
          style={{ animation: 'fadeUp 0.7s ease 0.1s forwards' }}
        >
          <a href="#" style={{ display: 'block' }}>
            <img
              src={logo}
              alt="Equilybrium"
              style={{ height: isMobile ? '26px' : '30px', width: 'auto', display: 'block' }}
            />
          </a>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div
            className="flex items-center gap-0.5 opacity-0"
            style={{ animation: 'fadeUp 0.7s ease 0.2s forwards' }}
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="no-underline"
                style={linkStyle}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {label}
              </a>
            ))}
            <div style={{ marginLeft: '8px' }}>
              <LanguageSelector />
            </div>
            <a
              href="#"
              className="no-underline"
              style={{
                fontSize: '13px',
                fontWeight: 500,
                background: 'var(--ink)',
                color: '#fff',
                padding: '9px 22px',
                borderRadius: '100px',
                letterSpacing: '0.02em',
                marginLeft: '8px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#2d2d2a')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--ink)')}
            >
              {t('navbar.cta.startNow')}
            </a>
          </div>
        )}

        {/* Hamburger button */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t('navbar.aria.closeMenu') : t('navbar.aria.openMenu')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        )}
      </nav>

      {/* Mobile dropdown panel */}
      {isMobile && (
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            maxHeight: menuOpen ? '400px' : '0',
            opacity: menuOpen ? 1 : 0,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(20px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
            borderRadius: '0 0 16px 16px',
            border: menuOpen ? '1px solid rgba(255,255,255,0.6)' : 'none',
            borderTop: 'none',
            boxShadow: menuOpen
              ? '0 8px 24px rgba(0,0,0,0.08)'
              : 'none',
            transition: 'max-height 0.3s ease, opacity 0.25s ease',
          }}
        >
          <div style={{ padding: '8px 8px 16px' }}>
            {navLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="no-underline"
                style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'var(--muted)',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  letterSpacing: '0.01em',
                  transition: 'background 0.15s, color 0.15s',
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                  e.currentTarget.style.color = 'var(--ink)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--muted)';
                }}
              >
                {label}
              </a>
            ))}
            <div style={{ padding: '8px 8px 4px' }}>
              <LanguageSelector mobile />
            </div>
            <div style={{ padding: '4px 8px 0' }}>
              <a
                href="#"
                onClick={() => setMenuOpen(false)}
                className="no-underline"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: 500,
                  background: 'var(--ink)',
                  color: '#fff',
                  padding: '14px 24px',
                  borderRadius: '100px',
                  letterSpacing: '0.02em',
                }}
              >
                {t('navbar.cta.startNow')}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
