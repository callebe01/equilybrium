import { useState, useEffect, useRef } from 'react';
import { useTranslation, SUPPORTED_LANGUAGES } from '../i18n';

export default function LanguageSelector({ mobile = false, compact = false }) {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === language);

  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  if (mobile) {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '4px 8px' }}>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            style={{
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: language === lang.code ? 500 : 400,
              fontFamily: "'DM Sans', sans-serif",
              color: language === lang.code ? '#fff' : 'var(--muted)',
              background: language === lang.code ? 'var(--accent)' : 'rgba(0,0,0,0.04)',
              border: 'none',
              borderRadius: '100px',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: compact ? '6px 10px' : '7px 12px',
          minHeight: compact ? '36px' : undefined,
          fontSize: compact ? '11px' : '12px',
          fontWeight: 500,
          fontFamily: "'DM Sans', sans-serif",
          color: 'var(--muted)',
          background: 'transparent',
          border: '1px solid rgba(26,26,24,0.1)',
          borderRadius: '100px',
          cursor: 'pointer',
          letterSpacing: '0.03em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(26,26,24,0.25)';
          e.currentTarget.style.color = 'var(--ink)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(26,26,24,0.1)';
          e.currentTarget.style.color = 'var(--muted)';
        }}
      >
        {current?.label ?? 'EN'}
        <svg
          width={compact ? '9' : '10'}
          height={compact ? '9' : '10'}
          viewBox="0 0 10 10"
          fill="none"
          style={{
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s ease',
          }}
        >
          <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            right: 0,
            minWidth: compact ? '140px' : '160px',
            background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(20px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)',
            padding: '6px',
            zIndex: 100,
          }}
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '10px 14px',
                fontSize: '13px',
                fontWeight: language === lang.code ? 500 : 400,
                fontFamily: "'DM Sans', sans-serif",
                color: language === lang.code ? 'var(--accent)' : 'var(--ink)',
                background: language === lang.code ? 'rgba(61,90,69,0.08)' : 'transparent',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => {
                if (language !== lang.code) e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
              }}
              onMouseLeave={(e) => {
                if (language !== lang.code) e.currentTarget.style.background = 'transparent';
              }}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
