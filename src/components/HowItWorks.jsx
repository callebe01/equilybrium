import { useEffect, useRef, useState, useCallback } from 'react';
import useScrollProgress from '../hooks/useScrollProgress';

/* ── Reduced-motion check ──────────────────────────────── */
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

/* ── Forward-only progress: never goes backwards, latches at 1 ── */
function useLatched(value) {
  const ref = useRef(value);
  if (value > ref.current) ref.current = value;
  return ref.current;
}

/* ── Animated counter hook ─────────────────────────────── */
function useCountUp(target, active, duration = 900) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active || doneRef.current) return;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        doneRef.current = true;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, target, duration]);

  return value;
}

/* ── SVG Icons ─────────────────────────────────────────── */
const ChromeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </svg>
);

const FirefoxIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2C8 2 6 5 6 5s2-1 3 0c1 1 0 3 0 3s3-2 5-1 2 4 2 4 1-3-1-5c-1-1-2-2-1-3s2-1 3 0" />
  </svg>
);

const DesktopIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const WearableIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="2" width="12" height="20" rx="6" ry="6" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 6v2" />
  </svg>
);

/* ── Connecting dots animation ─────────────────────────── */
function ConnectingDots({ active }) {
  const [dots, setDots] = useState('');
  useEffect(() => {
    if (!active) return;
    let count = 0;
    const id = setInterval(() => {
      count = (count + 1) % 4;
      setDots('.'.repeat(count));
    }, 400);
    return () => clearInterval(id);
  }, [active]);

  return (
    <span style={{ display: 'inline-block', minWidth: '72px', textAlign: 'left' }}>
      {`Connecting${dots}`}
    </span>
  );
}

/* ── Pulse indicator for active status ─────────────────── */
function PulseIndicator() {
  return (
    <span
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '6px',
        height: '6px',
        marginRight: '4px',
      }}
    >
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: '#8fd68f',
          animation: 'hiw-pulse 2s ease-in-out infinite',
        }}
      />
      <span
        style={{
          position: 'absolute',
          inset: '-3px',
          borderRadius: '50%',
          background: 'rgba(143,214,143,0.4)',
          animation: 'hiw-pulse-ring 2s ease-in-out infinite',
        }}
      />
    </span>
  );
}

/* ── IntegrationsCard with staggered tool reveals ──────── */
function IntegrationsCard({ progress, reducedMotion }) {
  const p = useLatched(progress);

  const tools = [
    { name: 'Chrome Extension', status: 'Active', icon: ChromeIcon },
    { name: 'Firefox Extension', status: 'Active', icon: FirefoxIcon },
    { name: 'Desktop Agent', status: 'Active', icon: DesktopIcon },
    { name: 'Wearable Sync', status: 'Connecting...', icon: WearableIcon },
  ];

  const getToolVisible = (index) => {
    if (reducedMotion) return p > 0.1;
    const threshold = index * 0.15 + 0.1;
    return p >= threshold;
  };

  const cardVisible = p > 0.05;

  return (
    <div
      style={{
        background: 'var(--accent)',
        borderRadius: '20px',
        padding: '24px',
        color: '#fff',
        marginTop: '16px',
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        willChange: cardVisible ? 'auto' : 'opacity, transform',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e25' }} />
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fa3' }} />
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#5c5' }} />
        <span
          style={{
            marginLeft: '8px',
            fontSize: '11px',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Integrations
        </span>
      </div>

      <p
        style={{
          fontSize: '9px',
          fontWeight: 500,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          marginBottom: '14px',
        }}
      >
        Connected tools
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tools.map((tool, index) => {
          const visible = getToolVisible(index);
          return (
            <div
              key={tool.name}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '10px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(16px)',
                transition: `opacity 0.4s ease ${index * 0.08}s, transform 0.4s ease ${index * 0.08}s`,
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 400 }}>
                <tool.icon />
                {tool.name}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  padding: '3px 10px',
                  borderRadius: '100px',
                  background: tool.status === 'Active' ? 'rgba(92,180,92,0.25)' : 'rgba(250,180,50,0.25)',
                  color: tool.status === 'Active' ? '#8fd68f' : '#f0c060',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {tool.status === 'Active' && visible && <PulseIndicator />}
                {tool.status === 'Active' ? tool.status : <ConnectingDots active={visible} />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── InsightCard with animated counter ─────────────────── */
function InsightCard({ progress, reducedMotion }) {
  const p = useLatched(progress);
  const cardVisible = p > 0.1;
  const cardActive = p > 0.2;
  const countValue = useCountUp(60, cardActive, 1200);
  const descVisible = p > 0.5;

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        padding: '28px 24px',
        marginTop: '16px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        willChange: cardVisible ? 'auto' : 'opacity, transform',
      }}
    >
      <h4
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '22px',
          fontWeight: 400,
          color: 'var(--ink)',
          lineHeight: 1.25,
          marginBottom: '14px',
        }}
      >
        Focus windows dropped{' '}
        <span
          style={{
            display: 'inline-block',
            fontVariantNumeric: 'tabular-nums',
            minWidth: '2.2ch',
            textAlign: 'right',
          }}
        >
          {cardActive ? countValue : 0}%
        </span>{' '}
        this week
      </h4>

      {/* Animated bar representing the drop */}
      <div
        style={{
          height: '3px',
          borderRadius: '2px',
          background: 'rgba(0,0,0,0.06)',
          marginBottom: '16px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: '2px',
            background: 'var(--accent)',
            width: cardActive ? `${countValue}%` : '0%',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <p
        style={{
          fontSize: '13px',
          fontWeight: 300,
          color: 'var(--muted)',
          lineHeight: 1.6,
          opacity: descVisible ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        14 context switches in the last 3 hours. Last real recovery window was 4 days ago.
      </p>
    </div>
  );
}

/* ── ActionCard with cascading entries ─────────────────── */
function ActionCard({ progress, reducedMotion }) {
  const p = useLatched(progress);

  const actions = [
    {
      title: 'Block Thursday afternoon',
      desc: 'No deep work block in 6 days.',
      time: '2m',
    },
    {
      title: 'Stress pattern resolved',
      desc: 'Recovery trend improving.',
      time: '1d',
    },
  ];

  const bannerVisible = p > 0.1;

  const getItemVisible = (index) => {
    if (reducedMotion) return p > 0.15;
    return p > 0.2 + index * 0.2;
  };

  return (
    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {/* Emerging pattern banner */}
      <div
        style={{
          background: 'var(--accent)',
          borderRadius: '16px',
          padding: '16px 18px',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '12px',
          lineHeight: 1.5,
          opacity: bannerVisible ? 1 : 0,
          transform: bannerVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
        }}
      >
        <span
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: '#f0c060',
              animation: bannerVisible ? 'hiw-pulse 1.5s ease-in-out infinite' : 'none',
            }}
          />
          Emerging pattern to watch.
        </span>
      </div>

      {actions.map((action, index) => {
        const visible = getItemVisible(index);
        return (
          <div
            key={action.title}
            style={{
              background: 'var(--accent)',
              borderRadius: '16px',
              padding: '18px',
              display: 'flex',
              gap: '14px',
              alignItems: 'flex-start',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`,
            }}
          >
            <div style={{ flex: 1 }}>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#fff',
                  marginBottom: '4px',
                }}
              >
                {action.title}
              </p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                {action.desc}
              </p>
            </div>
            <span
              style={{
                fontSize: '10px',
                color: 'rgba(255,255,255,0.35)',
                flexShrink: 0,
              }}
            >
              {action.time}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Step data ─────────────────────────────────────────── */
const steps = [
  {
    number: '1',
    phase: 'Day one',
    title: 'Connect your existing tools',
    body: 'Equilybrium connects through browser extensions for Chrome and Firefox, a lightweight Desktop Agent, and optional wearable sync. No workflow changes required. It reads your patterns passively in the background.',
    card: IntegrationsCard,
  },
  {
    number: '2',
    phase: 'Ongoing',
    title: 'Surface early signals before they escalate',
    body: 'AI detects patterns linked to burnout risk: overload streaks, context-switching spikes, no recovery windows. It surfaces a weekly digest, personal or team-level.',
    card: InsightCard,
  },
  {
    number: '3',
    phase: 'When it matters',
    title: 'Act at exactly the right moment',
    body: 'When a pattern crosses a threshold, Equilybrium surfaces calm, specific guidance: a personal nudge, or an HR alert to check in with someone before things escalate.',
    card: ActionCard,
  },
];

/* ── Main section ──────────────────────────────────────── */
export default function HowItWorks() {
  const { ref, progress } = useScrollProgress();
  const reducedMotion = usePrefersReducedMotion();

  // Latch progress forward so cards never flicker backwards
  const latchedProgress = useLatched(progress);

  // Threshold-based visibility (boolean) instead of continuous inline style recalc.
  // CSS transitions handle the smoothness; scroll just flips the switch.
  const headerVisible = latchedProgress > 0.06;

  const getCardVisible = useCallback((index) => {
    return latchedProgress > 0.10 + index * 0.08;
  }, [latchedProgress]);

  const getCardContentProgress = useCallback((index) => {
    const cardStart = 0.10 + index * 0.10;
    const cardEnd = cardStart + 0.28;
    const raw = Math.min(1, Math.max(0, (latchedProgress - cardStart) / (cardEnd - cardStart)));
    return raw;
  }, [latchedProgress]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'var(--cream)',
        padding: '140px 48px',
      }}
    >
      {/* Injected keyframes for pulse animations */}
      <style>{`
        @keyframes hiw-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes hiw-pulse-ring {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0; transform: scale(1.6); }
        }
        @keyframes hiw-number-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(61,90,69,0); }
          50% { box-shadow: 0 0 0 6px rgba(61,90,69,0.12); }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Section header */}
        <div
          style={{
            marginBottom: '80px',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--sage)',
              marginBottom: '24px',
            }}
          >
            How Equilybrium works
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 3.5vw, 52px)',
              fontWeight: 400,
              color: 'var(--ink)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: '460px',
            }}
          >
            From silent signal
            <br />
            to clear action.
          </h2>
        </div>

        {/* Step cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '28px',
            alignItems: 'stretch',
            position: 'relative',
          }}
        >
          {steps.map((step, i) => {
            const CardComponent = step.card;
            const visible = getCardVisible(i);
            const contentProgress = useLatched(getCardContentProgress(i));
            const isActive = contentProgress > 0.3;
            const bodyVisible = contentProgress > 0.25;

            return (
              <div
                key={step.number}
                style={{
                  background: 'rgba(255,255,255,0.5)',
                  borderRadius: '28px',
                  padding: '40px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
                  willChange: visible ? 'auto' : 'opacity, transform',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Step number + phase */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                  <span
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '13px',
                      fontWeight: 500,
                      animation: isActive && !reducedMotion ? 'hiw-number-glow 2.5s ease-in-out infinite' : 'none',
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 500,
                      color: 'var(--accent)',
                      padding: '5px 14px',
                      borderRadius: '100px',
                      background: isActive ? 'rgba(61,90,69,0.12)' : 'rgba(61,90,69,0.08)',
                      transition: 'background 0.4s ease',
                    }}
                  >
                    {step.phase}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '24px',
                    fontWeight: 400,
                    color: 'var(--ink)',
                    lineHeight: 1.2,
                    letterSpacing: '-0.01em',
                    marginBottom: '16px',
                  }}
                >
                  {step.title}
                </h3>

                {/* Body */}
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 300,
                    color: 'var(--muted)',
                    lineHeight: 1.7,
                    opacity: reducedMotion ? 1 : (bodyVisible ? 1 : 0),
                    transition: 'opacity 0.5s ease',
                  }}
                >
                  {step.body}
                </p>

                {/* Mini UI card */}
                <div style={{ marginTop: 'auto' }}>
                  <CardComponent
                    progress={Math.max(0, (contentProgress - 0.25) / 0.75)}
                    reducedMotion={reducedMotion}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
