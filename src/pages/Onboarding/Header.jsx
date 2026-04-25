import { Logo } from './Logo'
import { colors, fonts } from './tokens'

function CheckIcon({ size = 14, color = colors.ink }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={color} style={{ flexShrink: 0 }}>
      <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
    </svg>
  )
}

export default function Header({ email, progress = 0 }) {
  return (
    <header style={{
      width: '100%',
      background: colors.surface,
      borderBottom: `1px solid ${colors.line}`,
      position: 'relative',
      zIndex: 2,
    }}>
      <div className="equil-header-inner">
        <Logo />
        <div className="equil-header-meta" style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          {email && (
            <div className="equil-header-email" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '4px 9px',
              borderRadius: 999,
              background: colors.successSoft,
              color: colors.ink,
              fontFamily: fonts.sans,
              fontSize: 14,
              lineHeight: '18px',
              minWidth: 0,
            }}>
              <CheckIcon />
              <span>Signed in as {email}</span>
            </div>
          )}
          <span className="equil-header-setup-time" style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            lineHeight: '18px',
            color: colors.inkSoft,
          }}>
            Setup takes about 3 minutes
          </span>
        </div>
      </div>
      <div style={{
        position: 'absolute',
        left: 0,
        bottom: -1,
        width: '100%',
        height: 2,
        background: colors.line,
      }}>
        <div
          className="equil-progress-fill"
          style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(90deg, ${colors.ink} 0%, ${colors.accentGreen} 100%)`,
            transform: `scaleX(${progress / 100})`,
            transformOrigin: 'left center',
          }}
        />
      </div>
    </header>
  )
}
