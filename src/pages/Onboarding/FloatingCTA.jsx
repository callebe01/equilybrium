import { createPortal } from 'react-dom'
import { colors, fonts } from './tokens'

const softAccent = '#A8D3BC'

function PrimaryButton({ label, italicPart, onClick }) {
  return (
    <button type="button" onClick={onClick} data-cta="primary" style={{
      pointerEvents: 'auto',
      fontFamily: fonts.serif,
      fontWeight: 500,
      fontSize: 17,
      color: '#FFFFFF',
      background: colors.ink,
      border: 'none',
      padding: '16px 30px',
      borderRadius: 10,
      cursor: 'pointer',
      letterSpacing: '-0.01em',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      boxShadow: '0 14px 32px -10px rgba(26, 58, 42, 0.45), 0 4px 10px -4px rgba(26, 58, 42, 0.25)',
      transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.boxShadow = '0 18px 40px -10px rgba(26, 58, 42, 0.5), 0 6px 14px -4px rgba(26, 58, 42, 0.3)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = '0 14px 32px -10px rgba(26, 58, 42, 0.45), 0 4px 10px -4px rgba(26, 58, 42, 0.25)'
    }}>
      <span>
        {label}
        {italicPart && (
          <> <em style={{ fontStyle: 'italic', fontWeight: 400, color: softAccent }}>{italicPart}</em></>
        )}
      </span>
      <span>&rarr;</span>
    </button>
  )
}

function GhostButton({ label, onClick }) {
  return (
    <button type="button" onClick={onClick} data-cta="secondary" style={{
      pointerEvents: 'auto',
      fontFamily: fonts.serif,
      fontWeight: 500,
      fontSize: 16,
      color: colors.ink,
      background: 'rgba(251, 247, 236, 0.92)',
      border: `1px solid ${colors.ink}`,
      padding: '15px 26px',
      borderRadius: 10,
      cursor: 'pointer',
      letterSpacing: '-0.01em',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)'
      e.currentTarget.style.background = '#FFFFFF'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.background = 'rgba(251, 247, 236, 0.92)'
    }}>
      {label}
    </button>
  )
}

function LinkButton({ label, icon, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{
      pointerEvents: 'auto',
      fontFamily: fonts.sans,
      fontWeight: 400,
      fontSize: 14,
      color: colors.inkSoft,
      background: 'transparent',
      border: 'none',
      padding: '12px 14px',
      cursor: 'pointer',
      textDecoration: 'underline',
      textDecorationColor: `${colors.muted}66`,
      textUnderlineOffset: 4,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      whiteSpace: 'nowrap',
      transition: 'color 0.2s ease, text-decoration-color 0.2s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = colors.ink
      e.currentTarget.style.textDecorationColor = colors.ink
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = colors.inkSoft
      e.currentTarget.style.textDecorationColor = `${colors.muted}66`
    }}>
      {icon}
      {label}
    </button>
  )
}

export default function FloatingCTA({ primary, secondary, tertiary, helpers, extras, prepend, delay = 0.5 }) {
  const SecondaryComponent = secondary?.variant === 'link' ? LinkButton : GhostButton
  const tertiaryList = Array.isArray(tertiary) ? tertiary : (tertiary ? [tertiary] : [])
  const helperList = Array.isArray(helpers) ? helpers : (helpers ? [helpers] : [])

  return createPortal(
    <>
      <div className="equil-cta-backdrop" style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        height: 160,
        pointerEvents: 'none',
        zIndex: 35,
        background: 'linear-gradient(to bottom, rgba(245, 240, 232, 0) 0%, rgba(245, 240, 232, 0.7) 45%, rgba(245, 240, 232, 0.95) 100%)',
        animation: `equilFadeIn 0.9s ease ${Math.max(0, delay - 0.15)}s both`,
      }} />
      <div style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        width: 720,
        maxWidth: '90vw',
        height: 110,
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 36,
        background: 'radial-gradient(ellipse at center, rgba(26, 58, 42, 0.14) 0%, rgba(26, 58, 42, 0.06) 40%, transparent 70%)',
        filter: 'blur(8px)',
        animation: `equilFadeIn 1s ease ${delay}s both`,
      }} />
      <div className="equil-cta-row" style={{
        position: 'fixed',
        bottom: 24,
        left: 0,
        right: 0,
        zIndex: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 14,
        pointerEvents: 'none',
        animation: `equilFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s both`,
      }}>
        {prepend}
        {helperList.map((h, i) => <LinkButton key={`helper-${i}`} {...h} />)}
        {tertiaryList.map((t, i) => <LinkButton key={`tertiary-${i}`} {...t} />)}
        {secondary && <SecondaryComponent {...secondary} />}
        <PrimaryButton {...primary} />
      </div>
      {extras}
    </>,
    document.body,
  )
}
