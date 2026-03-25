import { useEffect, useRef, useState } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

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
          The reality
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
          Burnout doesn't announce itself.
          <br />
          <em
            style={{
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            It accumulates — quietly —
            <br />
            until something breaks.
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
          Whether you're a knowledge worker running on fumes or an HR lead
          watching your team's energy decline, the signal is always there.
          Equilybrium helps you read it before the damage is done.
        </p>
      </div>
    </section>
  );
}
