import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const NAV_LINKS = [
  { label: 'What we do', href: '#what-we-do' },
  { label: 'Who it\'s for', href: '#who-its-for' },
  { label: 'Why Equilybrium', href: '#why' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Pricing', href: '#pricing' },
];

const linkStyle = {
  fontSize: '13px',
  fontWeight: 400,
  color: 'var(--muted)',
  padding: '8px 14px',
  borderRadius: '100px',
  letterSpacing: '0.02em',
  transition: 'color 0.2s',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50"
      style={{ padding: '12px 20px 0' }}
    >
      <nav
        className="flex items-center justify-between"
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          padding: '0 32px',
          height: '56px',
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
          borderRadius: '16px',
          boxShadow: scrolled
            ? '0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)'
            : '0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)',
          border: '1px solid rgba(255,255,255,0.6)',
          transition: 'box-shadow 0.3s ease',
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
              style={{ height: '30px', width: 'auto', display: 'block' }}
            />
          </a>
        </div>
        <div
          className="flex items-center gap-0.5 opacity-0"
          style={{ animation: 'fadeUp 0.7s ease 0.2s forwards' }}
        >
          {NAV_LINKS.map(({ label, href }) => (
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
            Start now
          </a>
        </div>
      </nav>
    </div>
  );
}
