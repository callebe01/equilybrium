import heroImg from '../assets/hero.jpg';
import useMediaQuery from '../hooks/useMediaQuery';
import { useTranslation } from '../i18n';

export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { t } = useTranslation();

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: 'calc(100vh - 20px)' }}
    >
      {/* Full-bleed hero image */}
      <img
        src={heroImg}
        alt={t('hero.img.alt')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: isMobile ? '70% 50%' : 'center 30%',
          display: 'block',
        }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isMobile
            ? `linear-gradient(to top,
                rgba(26,26,24,0.88) 0%,
                rgba(26,26,24,0.65) 35%,
                rgba(26,26,24,0.25) 65%,
                rgba(26,26,24,0.1) 100%
              )`
            : `linear-gradient(to right,
                rgba(26,26,24,0.82) 0%,
                rgba(26,26,24,0.6) 35%,
                rgba(26,26,24,0.15) 65%,
                rgba(26,26,24,0.0) 100%
              )`,
        }}
      />

      {/* Copy overlay */}
      <div
        className="absolute top-0 bottom-0 left-0 right-0 flex"
        style={{
          alignItems: isMobile ? 'flex-end' : 'center',
          padding: isMobile
            ? '0 clamp(1.25rem, 5vw, 2rem) 72px'
            : '0 clamp(1.25rem, 5vw, 3rem)',
        }}
      >
        <div style={{ maxWidth: '740px' }}>
          <h1
            className="opacity-0"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile
                ? '60px'
                : 'clamp(3rem, 6vw, 6.5rem)',
              fontWeight: isMobile ? 500 : 400,
              color: '#fff',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              marginBottom: isMobile ? '1.25rem' : 'clamp(1.5rem, 2vw, 2.25rem)',
              animation: 'fadeUp 0.7s ease 0.5s forwards',
              textShadow:
                '0 1px 2px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)',
            }}
          >
            {t('hero.heading.line1')}
            <br />
            {t('hero.heading.line2')}
          </h1>
          <p
            className="opacity-0"
            style={{
              fontSize: isMobile ? '1.0625rem' : 'clamp(1.0625rem, 0.3vw + 0.95rem, 1.25rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.65,
              maxWidth: '500px',
              letterSpacing: '0.015em',
              marginBottom: isMobile ? '1.75rem' : '2rem',
              animation: 'fadeUp 0.7s ease 0.6s forwards',
            }}
          >
            {t('hero.description')}
          </p>
          <div
            className="opacity-0"
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: isMobile ? '14px' : '20px',
              animation: 'fadeUp 0.7s ease 0.7s forwards',
            }}
          >
            <a
              href="#"
              className="group no-underline hover:-translate-y-px"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'flex-start',
                gap: '10px',
                background: '#fff',
                border: '1px solid #fff',
                color: 'var(--ink)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: isMobile ? '15px' : '13px',
                fontWeight: 500,
                letterSpacing: '0.03em',
                padding: isMobile ? '16px 32px' : '14px 28px',
                borderRadius: '100px',
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.88)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
            >
              {t('hero.cta.startNow')}
              <span
                className="transition-transform group-hover:translate-x-[3px]"
                style={{ fontSize: '16px' }}
              >
                →
              </span>
            </a>
            <a
              href="#"
              className="no-underline hover:-translate-y-px"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: isMobile ? 'center' : 'flex-start',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: isMobile ? '15px' : '13px',
                fontWeight: 400,
                letterSpacing: '0.03em',
                padding: isMobile ? '12px 0' : '0',
                cursor: 'pointer',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.95)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              {t('hero.cta.requestDemo')}
            </a>
            <span
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.02em',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              {t('hero.badge.privateBeta')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
