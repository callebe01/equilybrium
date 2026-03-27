import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../i18n';

const CATEGORY_SCHEMA = [
  { id: 'getting-started', key: 'gettingStarted', itemCount: 4 },
  { id: 'billing', key: 'billing', itemCount: 4 },
  { id: 'privacy', key: 'privacy', itemCount: 4 },
  { id: 'features', key: 'features', itemCount: 3 },
  { id: 'support', key: 'support', itemCount: 3 },
];

function getCategories(t) {
  return CATEGORY_SCHEMA.map((category) => ({
    id: category.id,
    label: t(`faq.categories.${category.key}.label`),
    questions: Array.from({ length: category.itemCount }, (_, index) => ({
      q: t(`faq.categories.${category.key}.items.${index}.q`),
      a: t(`faq.categories.${category.key}.items.${index}.a`),
    })),
  }));
}

function AccordionItem({ question, answer, isOpen, onToggle }) {

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(26,26,24,0.08)',
      }}
    >
      <button
        type="button"
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
          display: 'grid',
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div
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
    </div>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
  const categories = getCategories(t);
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [openIndex, setOpenIndex] = useState(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const tabRefs = useRef({});

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
            {t('faq.label')}
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
            {t('faq.heading')}
          </h2>
        </div>

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
                type="button"
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
            {t('faq.contactPrompt')}
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
            {t('faq.contactCta')}
            <span style={{ fontSize: '16px' }}>→</span>
          </a>
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
