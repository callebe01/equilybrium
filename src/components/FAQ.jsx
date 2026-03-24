import { useState, useRef, useEffect } from 'react';

/* ── FAQ Data ──────────────────────────────────────────── */
const categories = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    questions: [
      {
        q: 'What is Equilybrium?',
        a: 'Equilybrium is a comprehensive wellness platform that uses AI and machine learning to help prevent burnout. It analyzes your work patterns, sleep data, and health metrics to provide personalized insights and early warnings about potential burnout risks.',
      },
      {
        q: 'What do I need to get started?',
        a: 'We recommend installing the Desktop Agent (required for 85% accuracy), the Browser Extension (for productivity tracking), and optionally the Mobile App (for health data from wearables). The more data sources connected, the more accurate your burnout predictions become.',
      },
      {
        q: 'How long is the free trial?',
        a: 'New users receive a 30 day free trial with full access to all Premium features. No credit card required to start. After the trial, you can upgrade to Premium or continue with the free tier.',
      },
      {
        q: 'How quickly will I see insights?',
        a: 'You will see initial data within hours of installing the Desktop Agent. Our ML models need at least 7 days of data for reliable predictions, and reach optimal accuracy after 30 days of continuous usage.',
      },
    ],
  },
  {
    id: 'billing',
    label: 'Account & Billing',
    questions: [
      {
        q: 'How much does Premium cost?',
        a: 'Premium is $9.99/month billed monthly, or $99.99/year (save 17%) billed annually. All prices include taxes where applicable. Enterprise pricing is available for organizations with 10 or more users.',
      },
      {
        q: 'How do I cancel my subscription?',
        a: 'You can cancel anytime from Settings, then Subscription, then Cancel Plan. Your Premium access continues until the end of your current billing period.',
      },
      {
        q: 'What is the difference between Free and Premium?',
        a: 'Premium includes all 8 wellness indicators, unlimited AI insights, 365 day data history, PDF reports, priority support, and advanced analytics. The Free tier provides 4 core indicators, 1 AI insight per week, 90 day history, and self service support.',
      },
      {
        q: 'Will I get a refund if I cancel?',
        a: 'We offer a 30 day money back guarantee for new Premium subscribers. If you are not satisfied within 30 days of upgrading, contact support for a full refund. After 30 days, cancellations take effect at the end of your billing period.',
      },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy & Security',
    questions: [
      {
        q: 'How is my data protected?',
        a: 'All data is encrypted using AES 256 encryption both in transit (TLS 1.3) and at rest. We use secure cloud infrastructure with SOC 2 Type II certification. Your data is stored in compliance with GDPR, LGPD, and HIPAA regulations.',
      },
      {
        q: 'Does Equilybrium sell my data?',
        a: 'Never. Your personal data is never sold, shared, or used for advertising purposes. We only use your data to provide you with personalized wellness insights. You maintain full ownership of your data at all times.',
      },
      {
        q: 'Can my employer see my data?',
        a: 'For personal accounts, your data is completely private. For corporate accounts, employers see only anonymized, aggregated team statistics. Individual data is never visible to managers without your explicit consent.',
      },
      {
        q: 'Can I export my data?',
        a: 'Yes. Go to Settings, then Privacy, then Export Data. You can download all your data in JSON or CSV format. Premium users get unlimited exports. Free users can export once per month. Your data belongs to you, and you control it.',
      },
    ],
  },
  {
    id: 'features',
    label: 'Features & Usage',
    questions: [
      {
        q: 'How accurate are the predictions?',
        a: 'With Desktop Agent and Browser Extension combined, accuracy reaches 85%. Adding the Mobile App can push that up to 98%. Our model is validated against clinical assessments (BAT, CBI, MBI) and continuously improves with more data.',
      },
      {
        q: 'What are the 8 wellness indicators?',
        a: 'Premium includes Burnout Risk, Sleep Quality, Work Life Balance, Mental Energy, Focus and Productivity, Physical Activity, Recovery Quality, and Stress Patterns. The Free tier provides the first 4 indicators.',
      },
      {
        q: 'What is the Confidence Score?',
        a: 'The Confidence Score (0 to 100%) indicates how reliable your burnout prediction is based on data quality. More data sources and consistent usage increase confidence. We recommend at least 70% confidence for actionable insights.',
      },
    ],
  },
  {
    id: 'support',
    label: 'Technical Support',
    questions: [
      {
        q: 'The Desktop Agent is not connecting. What should I do?',
        a: 'Check if the agent is running by looking for the tray icon. Restart the agent from the system tray. Verify your firewall settings allow the connection. If needed, reinstall the agent. It uses port 54321 for browser communication.',
      },
      {
        q: 'My data is not syncing. How do I fix it?',
        a: 'Check your internet connection first. Pull down to refresh on mobile, click Sync Now in the Desktop Agent, or log out and back in to force a full sync. If issues persist, contact tech@equilybrium.health.',
      },
      {
        q: 'What are the system requirements?',
        a: 'Desktop Agent requires Windows 10/11 or macOS 10.15 and above, 100MB disk space, 2GB RAM. Mobile App requires iOS 14 or above, or Android 8.0 and above. Browser Extension works with any modern browser including Chrome, Edge, Firefox, and Brave.',
      },
    ],
  },
];

/* ── Accordion Item ────────────────────────────────────── */
function AccordionItem({ question, answer, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(26,26,24,0.08)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '22px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 'clamp(15px, 1.6vw, 17px)',
          fontWeight: 450,
          color: 'var(--ink)',
          lineHeight: 1.4,
          letterSpacing: '-0.01em',
        }}
      >
        {question}
        <span
          style={{
            flexShrink: 0,
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: isOpen ? 'var(--accent)' : 'rgba(26,26,24,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.3s ease, transform 0.3s ease',
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transition: 'transform 0.3s ease',
              transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            <path
              d="M6 1v10M1 6h10"
              stroke={isOpen ? '#fff' : 'var(--ink)'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      <div
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: 'height 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div
          ref={contentRef}
          style={{
            paddingBottom: '22px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(14px, 1.4vw, 15px)',
            fontWeight: 300,
            color: 'var(--muted)',
            lineHeight: 1.75,
            maxWidth: '640px',
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

/* ── Main FAQ Section ──────────────────────────────────── */
export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [openIndex, setOpenIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const pillRef = useRef(null);
  const tabRefs = useRef({});

  /* Entrance animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Sliding pill position */
  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    const activeTab = tabRefs.current[activeCategory];
    if (activeTab) {
      setPillStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [activeCategory]);

  const currentCategory = categories.find((c) => c.id === activeCategory);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#fff',
        padding: 'clamp(80px, 12vw, 160px) clamp(1.25rem, 5vw, 3rem)',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 6vw, 64px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--sage)',
              marginBottom: '16px',
            }}
          >
            FAQ
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              fontWeight: 400,
              color: 'var(--ink)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        {/* Category tabs */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              gap: '4px',
              padding: '4px',
              background: 'rgba(26,26,24,0.04)',
              borderRadius: '100px',
              marginBottom: 'clamp(32px, 5vw, 48px)',
              overflowX: 'auto',
              scrollbarWidth: 'none',
            }}
          >
            {/* Sliding pill */}
            <div
              style={{
                position: 'absolute',
                top: '4px',
                height: 'calc(100% - 8px)',
                background: '#fff',
                borderRadius: '100px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                transition: 'left 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                ...pillStyle,
              }}
            />

            {categories.map((cat) => (
              <button
                key={cat.id}
                ref={(el) => (tabRefs.current[cat.id] = el)}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  padding: '10px 18px',
                  background: 'none',
                  border: 'none',
                  borderRadius: '100px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(11px, 1.3vw, 13px)',
                  fontWeight: activeCategory === cat.id ? 500 : 400,
                  color: activeCategory === cat.id ? 'var(--ink)' : 'var(--muted)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.3s ease',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
          }}
        >
          <div
            style={{
              borderTop: '1px solid rgba(26,26,24,0.08)',
            }}
          >
            {currentCategory?.questions.map((item, i) => (
              <AccordionItem
                key={`${activeCategory}-${i}`}
                question={item.q}
                answer={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* Still have questions */}
        <div
          style={{
            marginTop: 'clamp(40px, 6vw, 56px)',
            textAlign: 'center',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.7s ease 0.45s, transform 0.7s ease 0.45s',
          }}
        >
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              fontWeight: 400,
              color: 'var(--muted)',
              marginBottom: '16px',
            }}
          >
            Still have questions?
          </p>
          <a
            href="mailto:support@equilybrium.health"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--accent)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Contact Support
            <span style={{ fontSize: '16px' }}>→</span>
          </a>
        </div>
      </div>

      {/* Hide scrollbar on tabs */}
      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
