import { useState, useEffect, useRef, useCallback } from 'react';
import { flushSync } from 'react-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import { useTranslation } from '../i18n';
import yourSpaceImg from '../assets/your-space.png';
import focusTimeImg from '../assets/focus-time.png';
import recoveryImg from '../assets/recovery.png';
import hrLeadImg from '../assets/hr-lead.png';
import teamViewImg from '../assets/team-view.png';
import peopleOpsImg from '../assets/people-ops.png';

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

/* ── Reduced motion check ──────────────────────────────── */
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

/* ── Tab data ──────────────────────────────────────────── */
function getTabsData(t) {
  return {
    individuals: {
      label: t('builtForBoth.individuals.label'),
      headline: (
        <>
          {t('builtForBoth.individuals.headline')}
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--muted)' }}>{t('builtForBoth.individuals.headlineEmphasis')}</em>
        </>
      ),
      body: t('builtForBoth.individuals.body'),
      primaryCta: t('builtForBoth.individuals.primaryCta'),
      secondaryCta: t('builtForBoth.individuals.secondaryCta'),
      cards: [
        { label: t('builtForBoth.individuals.cards.yourSpace'), image: yourSpaceImg },
        { label: t('builtForBoth.individuals.cards.focusTime'), image: focusTimeImg },
        { label: t('builtForBoth.individuals.cards.recovery'), image: recoveryImg },
      ],
    },
    companies: {
      label: t('builtForBoth.companies.label'),
      headline: (
        <>
          {t('builtForBoth.companies.headline')}
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--muted)' }}>{t('builtForBoth.companies.headlineEmphasis')}</em>
        </>
      ),
      body: t('builtForBoth.companies.body'),
      primaryCta: t('builtForBoth.companies.primaryCta'),
      secondaryCta: t('builtForBoth.companies.secondaryCta'),
      cards: [
        { label: t('builtForBoth.companies.cards.hrLead'), image: hrLeadImg },
        { label: t('builtForBoth.companies.cards.teamView'), image: teamViewImg },
        { label: t('builtForBoth.companies.cards.peopleOps'), image: peopleOpsImg },
      ],
    },
  };
}

/* ── View Transition styles ────────────────────────────── */
const viewTransitionStyles = `
  /* Image grid morph */
  ::view-transition-old(bfb-images),
  ::view-transition-new(bfb-images) {
    animation-duration: 0.5s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.15, 1);
  }
  ::view-transition-old(bfb-images) {
    animation-name: bfb-fade-out;
  }
  ::view-transition-new(bfb-images) {
    animation-name: bfb-fade-in;
  }

  /* Text content morph */
  ::view-transition-old(bfb-copy),
  ::view-transition-new(bfb-copy) {
    animation-duration: 0.45s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.15, 1);
  }
  ::view-transition-old(bfb-copy) {
    animation-name: bfb-slide-out;
  }
  ::view-transition-new(bfb-copy) {
    animation-name: bfb-slide-in;
    animation-delay: 0.06s;
    animation-fill-mode: both;
  }

  @keyframes bfb-fade-out {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(0.97); }
  }
  @keyframes bfb-fade-in {
    from { opacity: 0; transform: scale(1.02); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes bfb-slide-out {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-12px); }
  }
  @keyframes bfb-slide-in {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(bfb-images),
    ::view-transition-new(bfb-images),
    ::view-transition-old(bfb-copy),
    ::view-transition-new(bfb-copy) {
      animation-duration: 0.01s;
    }
  }

  /* Responsive grid */
  .bfb-content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 72px;
    align-items: center;
  }
  @media (max-width: 768px) {
    .bfb-content-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
`;

/* ── Image grid ────────────────────────────────────────── */
function ImageGrid({ cards, isMobile }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1.1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '12px',
        height: '100%',
        minHeight: isMobile ? '280px' : '480px',
      }}
    >
      {cards.map((card, i) => (
        <div
          key={card.label}
          style={{
            gridRow: i === 0 ? '1 / 3' : undefined,
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            background: '#ddd',
          }}
        >
          {card.image && (
            <img
              src={card.image}
              alt={card.label}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}
          <span
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.7)',
              zIndex: 1,
              textShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          >
            {card.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Sliding pill tab toggle ───────────────────────────── */
function TabToggle({ activeTab, onSwitch, t }) {
  const containerRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({});

  const tabItems = [
    { key: 'individuals', label: t('builtForBoth.tabs.individuals') },
    { key: 'companies', label: t('builtForBoth.tabs.companies') },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector(`[data-tab="${activeTab}"]`);
    if (!activeBtn) return;

    setPillStyle({
      width: activeBtn.offsetWidth + 'px',
      transform: `translateX(${activeBtn.offsetLeft}px)`,
    });
  }, [activeTab]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'inline-flex',
        borderRadius: '100px',
        border: '1px solid rgba(26,26,24,0.12)',
        position: 'relative',
        padding: '4px',
      }}
    >
      {/* Sliding pill background */}
      <div
        style={{
          position: 'absolute',
          top: '4px',
          left: 0,
          height: 'calc(100% - 8px)',
          borderRadius: '100px',
          background: 'var(--accent)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.15, 1), width 0.4s cubic-bezier(0.4, 0, 0.15, 1)',
          zIndex: 0,
          ...pillStyle,
        }}
      />

      {tabItems.map((tab) => (
        <button
          key={tab.key}
          type="button"
          data-tab={tab.key}
          onClick={() => onSwitch(tab.key)}
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '12px 28px',
            fontSize: '14px',
            fontWeight: 500,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '0.01em',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '100px',
            background: 'transparent',
            color: activeTab === tab.key ? '#fff' : 'var(--ink)',
            transition: 'color 0.3s ease',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

/* ── Main section ──────────────────────────────────────── */
export default function BuiltForBoth() {
  const [activeTab, setActiveTab] = useState('individuals');
  const { ref, visible } = useInView(0.1);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { t } = useTranslation();
  const tabsData = getTabsData(t);
  const data = tabsData[activeTab];

  const handleTabSwitch = useCallback((newTab) => {
    if (newTab === activeTab) return;

    // Use View Transitions API if supported
    if (document.startViewTransition && !reducedMotion) {
      document.startViewTransition(() => {
        flushSync(() => setActiveTab(newTab));
      });
    } else {
      setActiveTab(newTab);
    }
  }, [activeTab, reducedMotion]);

  return (
    <section
      id="who-its-for"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'var(--cream)',
        padding: 'clamp(80px, 12vw, 140px) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <style>{viewTransitionStyles}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Section header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '72px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
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
            {t('builtForBoth.label')}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 3.8vw, 56px)',
              fontWeight: 400,
              color: 'var(--ink)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: '36px',
            }}
          >
            {t('builtForBoth.heading.line1')}
            <br />
            {t('builtForBoth.heading.line2')}
          </h2>

          <TabToggle activeTab={activeTab} onSwitch={handleTabSwitch} t={t} />
        </div>

        {/* Content area */}
        <div
          className="bfb-content-grid"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.8s ease 0.25s, transform 0.8s ease 0.25s',
          }}
        >
          {/* Left — Image grid (view-transition target) */}
          <div style={{ viewTransitionName: 'bfb-images' }}>
            <ImageGrid cards={data.cards} isMobile={isMobile} />
          </div>

          {/* Right — Copy (view-transition target) */}
          <div style={{ viewTransitionName: 'bfb-copy' }}>
            <p
              style={{
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                marginBottom: '20px',
              }}
            >
              {data.label}
            </p>

            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(26px, 2.6vw, 38px)',
                fontWeight: 400,
                color: 'var(--ink)',
                lineHeight: 1.2,
                letterSpacing: '-0.015em',
                marginBottom: '28px',
              }}
            >
              {data.headline}
            </h3>

            <p
              style={{
                fontSize: '16px',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.7,
                marginBottom: '40px',
              }}
            >
              {data.body}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a
                href="#"
                className="no-underline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 32px',
                  background: 'var(--accent)',
                  color: '#fff',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '100px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
              >
                {data.primaryCta} <span>→</span>
              </a>
              <a
                href="#"
                className="no-underline"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 32px',
                  background: 'transparent',
                  color: 'var(--ink)',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '14px',
                  fontWeight: 500,
                  borderRadius: '100px',
                  border: '1px solid rgba(26,26,24,0.18)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
              >
                {data.secondaryCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
