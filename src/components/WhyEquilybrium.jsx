import { useEffect, useRef, useState } from 'react';

/* ── Intersection observer ─────────────────────────────── */
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

/* ── Reduced motion ────────────────────────────────────── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* ── Balance visual (bolder version) ───────────────────── */
function BalanceVisual({ visible, reducedMotion }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px',
        height: '160px',
        margin: '0 auto',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.2s ease 0.4s',
      }}
    >
      <style>{`
        @keyframes why-settle {
          0%   { transform: rotate(8deg); }
          25%  { transform: rotate(-4deg); }
          50%  { transform: rotate(2deg); }
          75%  { transform: rotate(-0.6deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes why-breathe {
          0%, 100% { transform: rotate(0deg); }
          50%      { transform: rotate(0.35deg); }
        }
        @keyframes why-dot-appear {
          0%   { r: 0; opacity: 0; }
          60%  { r: 7; opacity: 0.9; }
          100% { r: 6; opacity: 0.8; }
        }
      `}</style>

      <svg
        viewBox="0 0 600 160"
        fill="none"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
      >
        {/* Fulcrum */}
        <path
          d="M300 120 L290 140 L310 140 Z"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="1.5"
          opacity="0.3"
        />

        {/* Balance beam group */}
        <g
          style={{
            transformOrigin: '300px 120px',
            animation: visible
              ? reducedMotion
                ? 'none'
                : 'why-settle 3s cubic-bezier(0.25, 0, 0.1, 1) forwards, why-breathe 7s ease-in-out 3s infinite'
              : 'none',
          }}
        >
          {/* Main beam */}
          <line
            x1="60"
            y1="120"
            x2="540"
            y2="120"
            stroke="var(--accent)"
            strokeWidth="1.5"
            opacity="0.25"
          />

          {/* Left weight — effort */}
          <circle cx="100" cy="120" r="5" fill="var(--accent)" opacity="0.2" />
          <text
            x="100"
            y="104"
            textAnchor="middle"
            fill="var(--ink)"
            fontSize="12"
            fontWeight="400"
            letterSpacing="0.12em"
            opacity="0.35"
            fontFamily="'DM Sans', sans-serif"
            textTransform="uppercase"
          >
            EFFORT
          </text>

          {/* Right weight — recovery */}
          <circle cx="500" cy="120" r="5" fill="var(--accent)" opacity="0.2" />
          <text
            x="500"
            y="104"
            textAnchor="middle"
            fill="var(--ink)"
            fontSize="12"
            fontWeight="400"
            letterSpacing="0.12em"
            opacity="0.35"
            fontFamily="'DM Sans', sans-serif"
          >
            RECOVERY
          </text>

          {/* Center equilibrium dot */}
          <circle
            cx="300"
            cy="120"
            r="6"
            fill="var(--accent)"
            style={{
              animation: visible && !reducedMotion
                ? 'why-dot-appear 0.8s ease 2.6s both'
                : 'none',
              opacity: visible && reducedMotion ? 0.8 : 0,
            }}
          />
        </g>
      </svg>
    </div>
  );
}

/* ── Main section ──────────────────────────────────────── */
export default function WhyEquilybrium() {
  const { ref, visible } = useInView(0.1);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="why"
      ref={ref}
      style={{
        background: '#f0f3ec',
        padding: 'clamp(80px, 10vw, 140px) clamp(1.25rem, 5vw, 3rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Large background circle for depth */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(110vw, 960px)',
          height: 'min(110vw, 960px)',
          borderRadius: '50%',
          border: '1px solid rgba(61,90,69,0.12)',
          pointerEvents: 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1.5s ease 0.2s',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
        {/* Heading — dramatically larger */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            fontWeight: 400,
            color: 'var(--ink)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '16px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.9s ease, transform 0.9s ease',
          }}
        >
          Why Equilybrium?
        </h2>

        {/* Spacer between heading and beam */}
        <div style={{ height: 'clamp(40px, 5vw, 64px)' }} />

        {/* Balance visual */}
        <BalanceVisual visible={visible} reducedMotion={reducedMotion} />

        {/* Manifesto statement — larger, more confident */}
        <div
          style={{
            marginTop: 'clamp(56px, 7vw, 96px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s',
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
              fontWeight: 400,
              color: 'var(--ink)',
              lineHeight: 1.55,
              maxWidth: '620px',
              margin: '0 auto',
              letterSpacing: '-0.01em',
            }}
          >
            Equilibrium is the point where effort and recovery meet.
            Where ambition stops costing your health.
          </p>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
              fontWeight: 300,
              color: 'var(--muted)',
              lineHeight: 1.8,
              maxWidth: '480px',
              margin: '32px auto 0',
            }}
          >
            We built Equilybrium because that balance should not be something
            you find by accident after burning out. It should be something
            you can see, measure, and protect.
          </p>
        </div>
      </div>
    </section>
  );
}
