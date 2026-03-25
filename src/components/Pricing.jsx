import { useEffect, useRef, useState, useCallback } from 'react';
import { flushSync } from 'react-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import { useTranslation } from '../i18n';

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

/* ── Check icon ────────────────────────────────────────── */
function CheckIcon({ color = 'var(--ink)' }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      style={{ flexShrink: 0, marginTop: '2px' }}
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Plan data ─────────────────────────────────────────── */
function getIndividualPlans(t) {
  return [
    {
      name: t('pricing.individual.free.name'),
      price: t('pricing.individual.free.price'),
      subtitle: t('pricing.individual.free.subtitle'),
      features: [0, 1, 2, 3].map((i) => t(`pricing.individual.free.features.${i}`)),
      cta: t('pricing.individual.free.cta'),
      highlighted: false,
    },
    {
      name: t('pricing.individual.pro.name'),
      price: t('pricing.individual.pro.price'),
      subtitle: t('pricing.individual.pro.subtitle'),
      badge: t('pricing.badge.mostPopular'),
      features: [0, 1, 2, 3, 4, 5, 6].map((i) => t(`pricing.individual.pro.features.${i}`)),
      cta: t('pricing.individual.pro.cta'),
      highlighted: true,
    },
    {
      name: t('pricing.individual.proYearly.name'),
      price: t('pricing.individual.proYearly.price'),
      subtitle: t('pricing.individual.proYearly.subtitle'),
      features: [0, 1, 2, 3, 4, 5, 6].map((i) => t(`pricing.individual.proYearly.features.${i}`)),
      cta: t('pricing.individual.proYearly.cta'),
      highlighted: false,
    },
  ];
}

function getBusinessPlans(t) {
  return [
    {
      name: t('pricing.business.starter.name'),
      price: t('pricing.business.starter.price'),
      subtitle: t('pricing.business.starter.subtitle'),
      features: [0, 1, 2, 3, 4, 5].map((i) => t(`pricing.business.starter.features.${i}`)),
      cta: t('pricing.business.starter.cta'),
      highlighted: false,
    },
    {
      name: t('pricing.business.professional.name'),
      price: t('pricing.business.professional.price'),
      subtitle: t('pricing.business.professional.subtitle'),
      badge: t('pricing.badge.mostPopular'),
      features: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => t(`pricing.business.professional.features.${i}`)),
      cta: t('pricing.business.professional.cta'),
      highlighted: true,
    },
    {
      name: t('pricing.business.enterprise.name'),
      price: t('pricing.business.enterprise.price'),
      subtitle: t('pricing.business.enterprise.subtitle'),
      features: [0, 1, 2, 3, 4, 5, 6, 7].map((i) => t(`pricing.business.enterprise.features.${i}`)),
      cta: t('pricing.business.enterprise.cta'),
      highlighted: false,
    },
  ];
}

/* ── Business stats banner ─────────────────────────────── */
function StatsBanner({ visible, isMobile, t }) {
  const stats = [0, 1, 2, 3].map((i) => ({
    value: t(`pricing.stats.${i}.value`),
    label: t(`pricing.stats.${i}.label`),
  }));

  return (
    <div
      style={{
        background: 'var(--accent)',
        borderRadius: '24px',
        padding: 'clamp(32px, 4vw, 48px) clamp(24px, 4vw, 48px)',
        marginBottom: '48px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
      }}
    >
      <h3
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          fontWeight: 500,
          color: '#fff',
          textAlign: 'center',
          marginBottom: '32px',
          letterSpacing: '0.01em',
        }}
      >
        {t('pricing.stats.heading')}
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: '16px',
          textAlign: 'center',
        }}
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                fontWeight: 400,
                color: 'rgba(180,210,180,0.9)',
                lineHeight: 1.1,
                marginBottom: '6px',
                letterSpacing: '-0.02em',
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.02em',
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Sliding pill tab toggle ───────────────────────────── */
function TabToggle({ activeTab, onSwitch, t }) {
  const containerRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({});

  const tabItems = [
    { key: 'individuals', label: t('pricing.tabs.individuals') },
    { key: 'business', label: t('pricing.tabs.business') },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector(`[data-pricing-tab="${activeTab}"]`);
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
      {/* Sliding pill */}
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
          data-pricing-tab={tab.key}
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

/* ── View Transition styles ────────────────────────────── */
const viewTransitionStyles = `
  ::view-transition-old(pricing-cards),
  ::view-transition-new(pricing-cards) {
    animation-duration: 0.45s;
    animation-timing-function: cubic-bezier(0.4, 0, 0.15, 1);
  }
  ::view-transition-old(pricing-cards) {
    animation-name: pricing-fade-out;
  }
  ::view-transition-new(pricing-cards) {
    animation-name: pricing-fade-in;
    animation-delay: 0.04s;
    animation-fill-mode: both;
  }

  @keyframes pricing-fade-out {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(0.98); }
  }
  @keyframes pricing-fade-in {
    from { opacity: 0; transform: scale(1.01) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    ::view-transition-old(pricing-cards),
    ::view-transition-new(pricing-cards) {
      animation-duration: 0.01s;
    }
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 24px;
    align-items: stretch;
  }
  .pricing-stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  @media (max-width: 900px) {
    .pricing-grid {
      grid-template-columns: 1fr;
      max-width: 420px;
      margin-left: auto !important;
      margin-right: auto !important;
    }
    .pricing-stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
  }
`;

/* ── Pricing card ──────────────────────────────────────── */
function PricingCard({ plan, visible, delay }) {
  const [hovered, setHovered] = useState(false);
  const isHighlighted = plan.highlighted;

  const bg = isHighlighted ? 'var(--accent)' : 'rgba(230,225,218,0.45)';
  const textColor = isHighlighted ? '#fff' : 'var(--ink)';
  const mutedColor = isHighlighted ? 'rgba(255,255,255,0.55)' : 'var(--muted)';
  const checkColor = isHighlighted ? 'rgba(255,255,255,0.7)' : 'var(--sage)';
  const featureColor = isHighlighted ? 'rgba(255,255,255,0.85)' : 'var(--ink)';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: bg,
        borderRadius: '24px',
        padding: '44px 36px 40px',
        display: 'flex',
        flexDirection: 'column',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? 'translateY(-4px)'
            : 'translateY(0)'
          : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s, box-shadow 0.3s ease`,
        boxShadow: hovered
          ? isHighlighted
            ? '0 20px 60px rgba(61,90,69,0.25)'
            : '0 12px 40px rgba(0,0,0,0.08)'
          : '0 2px 12px rgba(0,0,0,0.03)',
      }}
    >
      {/* Badge */}
      {plan.badge && (
        <div
          style={{
            position: 'absolute',
            top: '-14px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--accent)',
            border: '3px solid var(--cream)',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '6px 20px',
            borderRadius: '100px',
            whiteSpace: 'nowrap',
          }}
        >
          {plan.badge}
        </div>
      )}

      {/* Plan name */}
      <p
        style={{
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: mutedColor,
          marginBottom: '20px',
        }}
      >
        {plan.name}
      </p>

      {/* Price row */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.25rem, 3vw, 3rem)',
            fontWeight: 400,
            color: textColor,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {plan.price}
        </h3>
        <span
          style={{
            fontSize: '14px',
            fontWeight: 300,
            color: mutedColor,
          }}
        >
          {plan.subtitle}
        </span>
      </div>

      {/* Spacer to align dividers */}
      <div style={{ height: '24px' }} />

      {/* Divider */}
      <div
        style={{
          height: '1px',
          background: isHighlighted ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)',
          marginBottom: '28px',
        }}
      />

      {/* Features */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          flex: 1,
          marginBottom: '36px',
        }}
      >
        {plan.features.map((feature) => (
          <li
            key={feature}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              fontSize: '14px',
              fontWeight: 400,
              color: featureColor,
              lineHeight: 1.4,
            }}
          >
            <CheckIcon color={checkColor} />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#"
        className="no-underline"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px 28px',
          borderRadius: '100px',
          fontSize: '14px',
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          cursor: 'pointer',
          transition: 'background 0.2s ease, transform 0.2s ease',
          background: isHighlighted ? '#fff' : 'transparent',
          color: isHighlighted ? 'var(--accent)' : 'var(--ink)',
          border: isHighlighted ? 'none' : '1px solid rgba(26,26,24,0.18)',
          textDecoration: 'none',
        }}
      >
        {plan.cta}
      </a>
    </div>
  );
}

/* ── Main section ──────────────────────────────────────── */
export default function Pricing() {
  const [activeTab, setActiveTab] = useState('individuals');
  const { ref, visible } = useInView(0.08);
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { t } = useTranslation();

  const plans = activeTab === 'individuals' ? getIndividualPlans(t) : getBusinessPlans(t);
  const footerText =
    activeTab === 'individuals'
      ? t('pricing.footer.individuals')
      : t('pricing.footer.business');

  const handleTabSwitch = useCallback((newTab) => {
    if (newTab === activeTab) return;
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
      id="pricing"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'var(--cream)',
        padding: 'clamp(80px, 12vw, 160px) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <style>{viewTransitionStyles}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '56px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
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
            {t('pricing.label')}
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 3.5vw, 52px)',
              fontWeight: 400,
              color: 'var(--ink)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              maxWidth: '520px',
              margin: '0 auto',
              marginBottom: '36px',
            }}
          >
            {t('pricing.heading')}
          </h2>

          <TabToggle activeTab={activeTab} onSwitch={handleTabSwitch} t={t} />
        </div>

        {/* Transitioning content */}
        <div style={{ viewTransitionName: 'pricing-cards' }}>
          {/* Stats banner (business only) */}
          {activeTab === 'business' && <StatsBanner visible={visible} isMobile={isMobile} t={t} />}

          {/* Cards */}
          <div className="pricing-grid" style={{ margin: '0 auto' }}>
            {plans.map((plan, i) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                visible={visible}
                delay={0.15 + i * 0.12}
              />
            ))}
          </div>

          {/* Footer note */}
          <p
            style={{
              textAlign: 'center',
              marginTop: '48px',
              fontSize: '13px',
              fontWeight: 400,
              color: 'var(--muted)',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.7s ease 0.6s',
            }}
          >
            {footerText}
          </p>
        </div>
      </div>
    </section>
  );
}
