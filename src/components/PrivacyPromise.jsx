import { useEffect, useRef, useState } from 'react';
import trustBg from '../assets/trust.png';


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

/* ── SVG Icons ─────────────────────────────────────────── */
const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#b8860b" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#b8860b" />
    <circle cx="12" cy="16.5" r="1.5" fill="#b8860b" stroke="none" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#7a6340" />
    <circle cx="12" cy="12" r="3" stroke="#7a6340" />
    <circle cx="12" cy="12" r="1" fill="#7a6340" stroke="none" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l7 4v6c0 5.25-3.5 10-7 11.5C8.5 22 5 17.25 5 12V6l7-4z" stroke="#9e4a4a" />
    <path d="M9 12l2 2 4-4" stroke="#9e4a4a" />
  </svg>
);

/* ── Privacy pillar card ───────────────────────────────── */
function PillarCard({ icon, iconBg, title, desc, delay, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(245,242,236,0.9)' : 'rgba(245,242,236,0.55)',
        borderRadius: '18px',
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '18px',
        cursor: 'default',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? 'translateY(-2px)'
            : 'translateY(0)'
          : 'translateY(16px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s, background 0.3s ease`,
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'transform 0.3s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {icon}
      </div>
      <div>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--ink)',
            lineHeight: 1.3,
            marginBottom: '6px',
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: '13px',
            fontWeight: 300,
            color: 'var(--muted)',
            lineHeight: 1.6,
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ── Trust card (right column) — image with text overlay ── */
function TrustCard({ visible }) {
  return (
    <div
      style={{
        borderRadius: '28px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '480px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
      }}
    >
      {/* Background image */}
      <img
        src={trustBg}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      />

      {/* Gradient overlay for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(30,42,34,0.92) 0%, rgba(30,42,34,0.6) 45%, rgba(30,42,34,0.15) 100%)',
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(32px, 5vw, 56px) clamp(28px, 4vw, 48px)',
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.625rem, 2vw, 2rem)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.2,
            letterSpacing: '-0.015em',
            marginBottom: '14px',
            maxWidth: '300px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.7s ease 0.6s, transform 0.7s ease 0.6s',
          }}
        >
          Your data stays
          <br />
          yours. Always.
        </h3>

        <p
          style={{
            fontSize: '14px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.65)',
            lineHeight: 1.5,
            maxWidth: '260px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s',
          }}
        >
          Equilybrium sees patterns, not people.
        </p>
      </div>
    </div>
  );
}

/* ── Privacy pillars data ──────────────────────────────── */
const pillars = [
  {
    icon: <LockIcon />,
    iconBg: 'rgba(184,134,11,0.1)',
    title: 'Individual data never reaches employers',
    desc: 'Your personal plan data is yours alone. Managers only ever see team-level, anonymized patterns.',
    delay: 0.35,
  },
  {
    icon: <EyeIcon />,
    iconBg: 'rgba(122,99,64,0.1)',
    title: 'Full transparency on both sides',
    desc: 'Everyone, individuals and teams, can see exactly what is monitored. Opt out of anything, anytime.',
    delay: 0.5,
  },
  {
    icon: <ShieldCheckIcon />,
    iconBg: 'rgba(158,74,74,0.1)',
    title: 'GDPR & SOC 2 compliant',
    desc: 'Enterprise-grade security for companies. Personal data sovereignty for individuals.',
    delay: 0.65,
  },
];

/* ── Main section ──────────────────────────────────────── */
export default function PrivacyPromise() {
  const { ref: sectionRef, visible } = useInView(0.1);

  return (
    <section
      id="privacy"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: '#fff',
        padding: 'clamp(80px, 12vw, 160px) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      {/* Responsive grid */}
      <style>{`
        .privacy-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(28px, 4vw, 56px);
          align-items: stretch;
        }
        @media (max-width: 768px) {
          .privacy-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div className="privacy-grid">
          {/* Left column — text + pillars */}
          <div>
            {/* Section label */}
            <p
              style={{
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--sage)',
                marginBottom: '24px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              Privacy & Trust
            </p>

            {/* Heading */}
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                fontWeight: 400,
                color: 'var(--ink)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                maxWidth: '480px',
                marginBottom: '24px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
              }}
            >
              Your wellbeing data requires a different standard.
            </h2>

            {/* Body text */}
            <p
              style={{
                fontSize: 'clamp(0.9375rem, 0.3vw + 0.85rem, 1.0625rem)',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: '460px',
                marginBottom: '44px',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
              }}
            >
              Whether you are an individual or an HR lead, the answer to "what
              does the other side see?" should always be: nothing they should not.
              Equilybrium is built around that commitment.
            </p>

            {/* Pillar cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pillars.map((pillar) => (
                <PillarCard
                  key={pillar.title}
                  {...pillar}
                  visible={visible}
                />
              ))}
            </div>
          </div>

          {/* Right column — trust card */}
          <TrustCard visible={visible} />
        </div>
      </div>
    </section>
  );
}
