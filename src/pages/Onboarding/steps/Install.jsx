import { useState } from 'react'
import StepIndicator from '../StepIndicator'
import FloatingCTA from '../FloatingCTA'
import { colors, fonts } from '../tokens'

function DesktopSmall({ color = colors.ink, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

function PlusIcon({ color = '#E3E3E3' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill={color} style={{ flexShrink: 0 }}>
      <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
    </svg>
  )
}

function ChromeIcon({ size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width={size} height={size} fill={colors.ink} style={{ flexShrink: 0 }}>
      <path d="M928 512.3v-.3c0-229.8-186.2-416-416-416S96 282.2 96 512v.4c0 229.8 186.2 416 416 416s416-186.2 416-416v-.3.2zm-6.7-74.6l.6 3.3-.6-3.3zM676.7 638.2c53.5-82.2 52.5-189.4-11.1-263.7l162.4-8.4c20.5 44.4 32 93.8 32 145.9 0 185.2-144.6 336.6-327.1 347.4l143.8-221.2zM512 652.3c-77.5 0-140.2-62.7-140.2-140.2 0-77.7 62.7-140.2 140.2-140.2S652.2 434.5 652.2 512 589.5 652.3 512 652.3zm369.2-331.7l-3-5.7 3 5.7zM512 164c121.3 0 228.2 62.1 290.4 156.2l-263.6-13.9c-97.5-5.7-190.2 49.2-222.3 141.1L227.8 311c63.1-88.9 166.9-147 284.2-147zM102.5 585.8c26 145 127.1 264 261.6 315.1C229.6 850 128.5 731 102.5 585.8zM164 512c0-55.9 13.2-108.7 36.6-155.5l119.7 235.4c44.1 86.7 137.4 139.7 234 121.6l-74 145.1C302.9 842.5 164 693.5 164 512zm324.7 415.4c4 .2 8 .4 12 .5-4-.2-8-.3-12-.5z" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill={colors.muted} style={{ flexShrink: 0 }}>
      <path d="M465-363.5q-7-2.5-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5q-8 0-15-2.5Z" />
    </svg>
  )
}

function OptionCard({ icons, title, description, recommended, label }) {
  return (
    <div style={{
      flex: 1,
      background: colors.surface,
      borderRadius: 16,
      padding: '22px 24px 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      alignSelf: 'stretch',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <span style={{
          fontFamily: fonts.mono,
          fontSize: 12,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: recommended ? colors.accentGreen : colors.muted,
          fontWeight: 500,
        }}>
          {label}{recommended ? ' · Recommended' : ''}
        </span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: colors.ink }}>
          {icons}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3 style={{
          fontFamily: fonts.serif,
          fontWeight: 600,
          fontSize: 24,
          lineHeight: '30px',
          letterSpacing: '-0.02em',
          color: colors.ink,
          margin: 0,
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: 15,
          lineHeight: '22px',
          color: colors.inkSoft,
          margin: 0,
        }}>
          {description}
        </p>
      </div>
    </div>
  )
}

function OSOption({ label, active, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{
      pointerEvents: 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px',
      borderRadius: 999,
      background: active ? colors.ink : colors.surface,
      color: active ? '#FFFFFF' : colors.ink,
      border: `1px solid ${active ? colors.ink : colors.line}`,
      cursor: 'pointer',
      fontFamily: fonts.sans,
      fontWeight: 500,
      fontSize: 13,
      whiteSpace: 'nowrap',
      transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
    }}>
      {label}
    </button>
  )
}

function OSPanel({ onSelect }) {
  return (
    <div className="equil-os-panel" style={{
      pointerEvents: 'auto',
      maxWidth: 'calc(100vw - 32px)',
      padding: '12px 14px',
      borderRadius: 14,
      background: 'rgba(255, 255, 255, 0.96)',
      border: `1px solid ${colors.line}`,
      boxShadow: '0 18px 40px -12px rgba(26, 58, 42, 0.28), 0 6px 14px -6px rgba(26, 58, 42, 0.18)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      alignSelf: 'center',
      animation: 'equilFadeUp 0.28s cubic-bezier(0.22, 1, 0.36, 1) both',
    }}>
      <span style={{
        fontFamily: fonts.mono,
        fontSize: 11,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: colors.muted,
        padding: '2px 6px',
      }}>
        Choose your operating system
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
        <OSOption active label="macOS" onClick={() => onSelect('macOS')} />
        <OSOption label="Windows" onClick={() => onSelect('Windows')} />
        <OSOption label="Linux" onClick={() => onSelect('Linux')} />
      </div>
    </div>
  )
}

export default function Install({ onDownload, onSkip }) {
  const [osOpen, setOsOpen] = useState(false)
  return (
    <div style={{
      background: colors.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      width: '100%',
      minWidth: 0,
    }}>
      <div className="equil-install-root" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 28,
      }}>
        <div className="equil-reveal equil-reveal-d0" style={{ alignSelf: 'stretch', display: 'flex', justifyContent: 'center' }}>
          <StepIndicator current={3} />
        </div>

        <div className="equil-reveal equil-reveal-d1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, alignSelf: 'stretch' }}>
          <h1 className="equil-install-title" style={{ color: colors.ink }}>
            Install Equilybrium
          </h1>
          <p className="equil-install-subtitle" style={{ color: colors.inkSoft }}>
            Works in the background. You will barely notice it running.
          </p>
        </div>

        <div className="equil-reveal equil-reveal-d2 equil-install-options">
          <OptionCard
            label="Option A"
            recommended
            icons={(
              <>
                <DesktopSmall />
                <PlusIcon />
                <ChromeIcon />
              </>
            )}
            title="Mac app + Chrome extension"
            description="Covers your desktop apps and your browser tabs. Best signal for pattern detection."
          />
          <OptionCard
            label="Option B"
            icons={<DesktopSmall />}
            title="Mac app only"
            description="Good if you do most of your work in native apps. Add the browser later from settings."
          />
        </div>

        <div style={{ paddingBottom: 140 }} />
      </div>

      <FloatingCTA
        primary={{ label: 'Download for', italicPart: 'macOS + Browser Ext', onClick: onDownload }}
        secondary={{ label: 'Mac only', onClick: onDownload, variant: 'ghost' }}
        helpers={[
          {
            label: 'Choose a different OS',
            icon: <span style={{ display: 'inline-block', transition: 'transform 0.2s ease', transform: osOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}><ChevronDown /></span>,
            onClick: () => setOsOpen((v) => !v),
          },
          { label: "Skip for now. I'll install later.", onClick: onSkip },
        ]}
        prepend={osOpen ? <OSPanel onSelect={() => setOsOpen(false)} /> : null}
        delay={0.7}
      />
    </div>
  )
}
