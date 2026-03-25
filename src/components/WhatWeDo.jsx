import useScrollProgress from '../hooks/useScrollProgress';
import useMediaQuery from '../hooks/useMediaQuery';
import { useTranslation } from '../i18n';

export default function WhatWeDo() {
  const { ref, progress } = useScrollProgress();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { t } = useTranslation();

  // Circles drift from left to right as user scrolls through the section
  const drift = progress * (isMobile ? 250 : 500);
  const circleSize = isMobile ? '400px' : '700px';

  return (
    <section
      id="what-we-do"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: '#fff',
        padding: isMobile ? '80px 20px' : '140px 48px',
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Overlapping circles — animated on scroll */}
      <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
        {/* Left circle */}
        <div
          style={{
            position: 'absolute',
            width: circleSize,
            height: circleSize,
            borderRadius: '50%',
            border: '1px solid rgba(122,140,118,0.15)',
            top: '50%',
            left: isMobile ? '-120px' : '-80px',
            transform: `translate(${drift * 0.8}px, -50%)`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        />
        {/* Right circle — overlapping, moves slightly faster */}
        <div
          style={{
            position: 'absolute',
            width: circleSize,
            height: circleSize,
            borderRadius: '50%',
            border: '1px solid rgba(122,140,118,0.15)',
            top: '50%',
            left: isMobile ? '40px' : '180px',
            transform: `translate(${drift}px, -50%)`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        />
        {/* Intersection glow — follows the average */}
        <div
          style={{
            position: 'absolute',
            width: circleSize,
            height: circleSize,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 70% 50%, rgba(122,140,118,0.06) 0%, transparent 70%)',
            top: '50%',
            left: isMobile ? '-120px' : '-80px',
            transform: `translate(${drift * 0.9}px, -50%)`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '40px' : '80px',
          alignItems: 'center',
        }}>
          {/* Left — Section intro */}
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--sage)',
                marginBottom: '20px',
              }}
            >
              {t('whatWeDo.label')}
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 3.5vw, 52px)',
                fontWeight: 400,
                color: 'var(--ink)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                marginBottom: '28px',
              }}
            >
              {t('whatWeDo.heading.line1')}
              <br />
              {t('whatWeDo.heading.line2')}
            </h2>
            <p
              style={{
                fontSize: isMobile ? '16px' : '17px',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: '440px',
              }}
            >
              {t('whatWeDo.body')}
            </p>
          </div>

          {/* Right — Feature points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '36px' : '48px' }}>
            {[
              {
                number: '01',
                title: t('whatWeDo.features.0.title'),
                desc: t('whatWeDo.features.0.desc'),
              },
              {
                number: '02',
                title: t('whatWeDo.features.1.title'),
                desc: t('whatWeDo.features.1.desc'),
              },
              {
                number: '03',
                title: t('whatWeDo.features.2.title'),
                desc: t('whatWeDo.features.2.desc'),
              },
            ].map((item) => (
              <div key={item.number} style={{ display: 'flex', gap: isMobile ? '16px' : '24px' }}>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: isMobile ? '28px' : '36px',
                    fontWeight: 400,
                    color: 'rgba(122,140,118,0.3)',
                    lineHeight: 1,
                    flexShrink: 0,
                    width: isMobile ? '36px' : '48px',
                  }}
                >
                  {item.number}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      letterSpacing: '0.01em',
                      marginBottom: '8px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 300,
                      color: 'var(--muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
