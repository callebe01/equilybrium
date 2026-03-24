import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.15) {
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

export default function GetStarted() {
  const { ref, visible } = useInView(0.15);

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--accent)',
        padding: 'clamp(100px, 14vw, 200px) clamp(1.25rem, 5vw, 3rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        {/* Label */}
        <p
          style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '40px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          Get started
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '36px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          A team that doesn't burn out
          <br />
          <em
            style={{
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            doesn't just perform better.
          </em>
          <br />
          They stay.
        </h2>

        {/* Body */}
        <p
          style={{
            fontSize: 'clamp(15px, 1.2vw, 17px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7,
            maxWidth: '520px',
            margin: '0 auto 48px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}
        >
          Start free as an individual, or bring Equilybrium to your whole
          team. Either way, the best time to start is before anyone feels it.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
          }}
        >
          <a
            href="#"
            className="no-underline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '16px 40px',
              background: '#fff',
              color: 'var(--accent)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            Start now <span>→</span>
          </a>
          <a
            href="#"
            className="no-underline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 40px',
              background: 'transparent',
              color: '#fff',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.25)',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease',
            }}
          >
            Request Demo
          </a>
        </div>
      </div>
    </section>
  );
}
