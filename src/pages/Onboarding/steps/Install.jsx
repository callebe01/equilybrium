import { useState } from 'react'
import StepIndicator from '../StepIndicator'
import FloatingCTA from '../FloatingCTA'
import { colors, fonts } from '../tokens'
import logoMark from '../../../assets/equilybrium-mark.png'

const paper = '#FBF7EC'
const menuBarInk = '#13261D'
const menuBarSheen = '#1F3A2C'

function ChevronDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16" fill={colors.muted} style={{ flexShrink: 0 }}>
      <path d="M465-363.5q-7-2.5-13-8.5L268-556q-11-11-11-28t11-28q11-11 28-11t28 11l156 156 156-156q11-11 28-11t28 11q11 11 11 28t-11 28L508-372q-6 6-13 8.5t-15 2.5q-8 0-15-2.5Z" />
    </svg>
  )
}

function AppleGlyph() {
  return (
    <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, opacity: 0.86 }}>
      <path d="M9.16 9.7c-.16.37-.35.71-.57 1.02-.3.43-.55.72-.74.89-.3.27-.62.41-.97.42-.25 0-.55-.07-.9-.21-.36-.14-.68-.21-.98-.21-.31 0-.65.07-1 .21-.36.14-.65.22-.86.22-.33.01-.66-.13-.98-.42-.2-.18-.46-.49-.78-.93-.34-.47-.62-1.02-.84-1.65C.31 8.36.18 7.7.18 7.06c0-.74.16-1.37.48-1.9.25-.43.59-.77 1.01-1.02.42-.25.88-.38 1.37-.39.27 0 .61.08 1.05.24.43.16.71.24.83.24.09 0 .4-.1.93-.28.51-.17.93-.24 1.28-.21 1 .08 1.74.47 2.24 1.18-.89.54-1.34 1.3-1.33 2.27 0 .76.27 1.39.83 1.89.25.23.53.41.84.54-.07.2-.13.39-.2.57Zm-2.27-9c0 .55-.2 1.07-.6 1.55-.49.57-1.08.9-1.72.85a1.7 1.7 0 0 1-.01-.21c0-.53.23-1.09.64-1.56a3 3 0 0 1 .96-.71c.4-.17.78-.27 1.13-.28.01.12.02.23.02.35 0 0-.42 0-.42 0Z" fill={paper} />
    </svg>
  )
}

function WifiGlyph() {
  return (
    <svg width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, opacity: 0.78 }}>
      <path d="M6.5 0C4.2 0 2.1.9.5 2.4l1 1c1.4-1.3 3.1-2 5-2s3.6.7 5 2l1-1A8.7 8.7 0 0 0 6.5 0Zm0 2.7c-1.6 0-3.1.6-4.2 1.7l1 1a4.4 4.4 0 0 1 6.4 0l1-1a5.7 5.7 0 0 0-4.2-1.7Zm0 2.6a2.7 2.7 0 0 0-2 .8l1 1c.3-.3.7-.4 1-.4.4 0 .7.1 1 .4l1-1a2.7 2.7 0 0 0-2-.8Zm0 2.4a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z" fill={paper} />
    </svg>
  )
}

function BatteryGlyph() {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, opacity: 0.78 }}>
      <rect x="0.5" y="0.5" width="18" height="9" rx="1.6" stroke={paper} strokeOpacity="0.85" />
      <rect x="2" y="2" width="13" height="6" rx="0.6" fill={paper} />
      <path d="M20 3.4v3.2c.6 0 1-.4 1-1V4.4c0-.6-.4-1-1-1Z" fill={paper} fillOpacity="0.85" />
    </svg>
  )
}

function MenuBarSpecimen() {
  return (
    <figure className="equil-menubar-figure" style={{ margin: 0 }}>
      <div className="equil-specimen-stack" style={{
        position: 'relative',
        width: '100%',
        maxWidth: 760,
        margin: '0 auto',
        padding: '8px 0 0',
      }}>
        <div className="equil-menubar" style={{
          background: `linear-gradient(180deg, ${menuBarSheen} 0%, ${menuBarInk} 100%)`,
          borderRadius: 8,
          height: 32,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 14px',
          gap: 18,
          color: paper,
          fontFamily: 'system-ui, -apple-system, "SF Pro Text", sans-serif',
          fontSize: 12.5,
          letterSpacing: '-0.005em',
          boxShadow: '0 18px 40px -22px rgba(13, 38, 28, 0.55), 0 8px 20px -10px rgba(13, 38, 28, 0.35)',
        }}>
          <AppleGlyph />
          <span style={{ fontWeight: 600 }}>Figma</span>
          <span style={{ opacity: 0.78 }}>File</span>
          <span style={{ opacity: 0.78 }}>Edit</span>
          <span style={{ opacity: 0.78 }}>View</span>
          <span style={{ opacity: 0.78 }}>Object</span>
          <span style={{ opacity: 0.78 }}>Window</span>
          <span style={{ opacity: 0.78 }}>Help</span>

          <span style={{ flex: 1 }} />

          <span className="equil-menubar-mark" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            borderRadius: 6,
            background: 'rgba(168, 211, 188, 0.16)',
            outline: '1px solid rgba(168, 211, 188, 0.45)',
          }}>
            <img
              src={logoMark}
              alt="Equilybrium"
              width="16"
              height="16"
              style={{ display: 'block', objectFit: 'contain', filter: 'brightness(1.15)' }}
            />
          </span>
          <WifiGlyph />
          <BatteryGlyph />
          <span style={{ opacity: 0.86, fontVariantNumeric: 'tabular-nums' }}>Wed 14:32</span>
        </div>

        <span
          aria-hidden="true"
          className="equil-menubar-line"
          style={{
            position: 'absolute',
            top: 42,
            right: 184,
            width: 0,
            height: 28,
            borderLeft: `1px dashed ${colors.accentGreen}`,
            opacity: 0.7,
          }}
        />
        <span
          aria-hidden="true"
          className="equil-menubar-line-dot"
          style={{
            position: 'absolute',
            top: 67,
            right: 181,
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: colors.accentGreen,
            opacity: 0.85,
          }}
        />

        <div className="equil-menubar-callout" style={{
          marginTop: 36,
          marginLeft: 'auto',
          marginRight: 44,
          maxWidth: 280,
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: colors.accentGreen,
            marginBottom: 8,
          }}>
            What you&apos;ll see
          </div>
          <div style={{
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 18,
            lineHeight: 1.32,
            letterSpacing: '-0.01em',
            color: colors.ink,
          }}>
            A small mark in your menu bar. Click it for today&apos;s score. That&rsquo;s the whole interface.
          </div>
        </div>
      </div>
    </figure>
  )
}

function SpecCell({ label, value }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      flex: 1,
      minWidth: 0,
    }}>
      <span style={{
        fontFamily: fonts.mono,
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: colors.muted,
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: fonts.serif,
        fontWeight: 500,
        fontSize: 17,
        letterSpacing: '-0.01em',
        color: colors.ink,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}>
        {value}
      </span>
    </div>
  )
}

function SpecsStrip() {
  return (
    <div className="equil-specs-strip" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      gap: 24,
      padding: '20px 28px',
      background: paper,
      border: `1px solid ${colors.line}`,
      borderRadius: 12,
      alignSelf: 'stretch',
    }}>
      <SpecCell label="File" value="Equilybrium.dmg" />
      <SpecCell label="Size" value="6.4 MB" />
      <SpecCell label="Version" value="1.0.4" />
      <SpecCell label="Requires" value="macOS 12.3+" />
    </div>
  )
}

function OSOption({ label, active, soon, onClick }) {
  return (
    <button
      type="button"
      onClick={soon ? undefined : onClick}
      disabled={soon}
      style={{
        pointerEvents: 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 16px',
        borderRadius: 999,
        background: active ? colors.ink : colors.surface,
        color: active ? '#FFFFFF' : (soon ? colors.muted : colors.ink),
        border: `1px solid ${active ? colors.ink : colors.line}`,
        cursor: soon ? 'default' : 'pointer',
        fontFamily: fonts.sans,
        fontWeight: 500,
        fontSize: 13,
        whiteSpace: 'nowrap',
        opacity: soon ? 0.65 : 1,
        transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
      }}
    >
      {label}
      {soon && (
        <span style={{
          fontFamily: fonts.mono,
          fontSize: 9,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: colors.muted,
        }}>
          Soon
        </span>
      )}
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
        <OSOption soon label="Windows" />
        <OSOption soon label="Linux" />
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
        gap: 44,
      }}>
        <div className="equil-reveal equil-reveal-d0" style={{ alignSelf: 'stretch', display: 'flex', justifyContent: 'center' }}>
          <StepIndicator current={3} />
        </div>

        <div className="equil-reveal equil-reveal-d1" style={{ display: 'flex', justifyContent: 'center', alignSelf: 'stretch' }}>
          <h1 className="equil-install-title" style={{
            color: colors.ink,
            maxWidth: 820,
          }}>
            Install Equilybrium.
          </h1>
        </div>

        <div className="equil-reveal equil-reveal-d2" style={{ alignSelf: 'stretch' }}>
          <MenuBarSpecimen />
        </div>

        <div className="equil-reveal equil-reveal-d3" style={{ alignSelf: 'stretch' }}>
          <SpecsStrip />
        </div>

        <div style={{ paddingBottom: 140 }} />
      </div>

      <FloatingCTA
        primary={{ label: 'Download for', italicPart: 'macOS', onClick: onDownload }}
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
