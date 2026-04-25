import { colors, fonts } from './tokens'

function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="16" cy="16" r="14" stroke={colors.ink} strokeWidth="1.5" />
      <path d="M10 20c2-4 4-8 6-8s4 4 6 8" stroke={colors.ink} strokeWidth="1.5" fill="none" />
      <path d="M12 18c1.5-3 3-5 4-5s2.5 2 4 5" stroke={colors.accentGreen} strokeWidth="1.2" fill="none" />
    </svg>
  )
}

export function Logo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <LogoMark />
      <span style={{
        fontFamily: fonts.sans,
        fontWeight: 600,
        fontSize: 18,
        lineHeight: '22px',
        letterSpacing: '-0.02em',
        color: colors.ink,
      }}>
        equilybrium
      </span>
    </div>
  )
}

export default Logo
