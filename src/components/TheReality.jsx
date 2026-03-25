import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { useTranslation } from '../i18n';

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function TheReality() {
  const { ref, visible } = useInView(0.15);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { t } = useTranslation();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'var(--ink)',
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '80px 20px' : '160px 48px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '900px' }}>
        {/* Label */}
        <p
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '40px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          {t('theReality.label')}
        </p>

        {/* Headline */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4vw, 60px)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            marginBottom: '48px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s',
          }}
        >
          {t('theReality.heading.main')}
          <br />
          <em
            style={{
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            {t('theReality.heading.emphasis')}
          </em>
        </h2>

        {/* Body */}
        <p
          style={{
            fontSize: '17px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.75,
            maxWidth: '640px',
            margin: '0 auto',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.8s ease 0.35s, transform 0.8s ease 0.35s',
          }}
        >
          {t('theReality.body')}
        </p>
      </div>
    </section>
  );
}
