import { useState, useEffect } from 'react'
import { fonts, colors as onb } from '../tokens'

const dash = {
  bg: '#F4F5FB',
  surface: '#FFFFFF',
  line: '#E6E8F2',
  lineSoft: '#EEF0F8',
  ink: '#152A5A',
  inkSoft: '#4B587A',
  muted: '#8891AB',
  blue: '#1E3A8A',
  blueSoft: '#EEF3FF',
  mint: '#D9F5E3',
  mintInk: '#1E8A4C',
  amber: '#F5B400',
  amberSoft: '#FFF5D5',
  amberInk: '#8A6F1D',
  orange: '#F08A3E',
  red: '#E03A3A',
  redSoft: '#FCE6E6',
  violet: '#7C5BD9',
  violetSoft: '#EFE9FB',
  skyBar: '#3E7DF0',
  skyBarSoft: '#D8E6FB',
  mintBar: '#D7F3DE',
  violetBar: '#E7DFF9',
}

function Sparkle({ size = 18, color = dash.blue }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M12 2l1.9 5.6L19.5 9l-5.6 1.9L12 16l-1.9-5.6L4.5 9l5.6-1.9L12 2zm7 11l.9 2.6L22.5 17l-2.6.9L19 20l-.9-2.1L15.5 17l2.6-1.4L19 13zm-14 3l.7 2L8 18l-2.3.7L5 21l-.7-2.3L2 18l2.3-.7L5 16z" />
    </svg>
  )
}

function ChromeGlyph({ size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx="512" cy="512" r="400" fill="#FFFFFF" />
      <path d="M512 164c121 0 228 62 290 156l-263-14c-98-6-190 49-222 141L228 311c63-89 167-147 284-147z" fill="#EA4335" />
      <path d="M165 512c0-56 13-109 36-155l120 235c44 87 137 140 234 122l-74 145c-179-24-316-173-316-347z" fill="#FBBC05" />
      <path d="M676 638c54-82 53-189-11-263l162-8c21 44 32 94 32 145 0 185-145 337-327 347l144-221z" fill="#34A853" />
      <circle cx="512" cy="512" r="140" fill="#FFFFFF" />
      <circle cx="512" cy="512" r="110" fill="#4285F4" />
    </svg>
  )
}

function Bell() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dash.inkSoft} strokeWidth="1.8" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function Wifi() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dash.mintInk} strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M2 8.8a15 15 0 0 1 20 0" />
      <circle cx="12" cy="20" r="1" fill={dash.mintInk} />
    </svg>
  )
}

function Globe() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dash.inkSoft} strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  )
}

function Package() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={dash.inkSoft} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 16v-4a4 4 0 0 0-8 0v4m12 0H4l2-10h12l2 10z" />
    </svg>
  )
}

function InfoDot({ color = dash.muted }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  )
}

function Donut({ value, size = 120, stroke = 10, color = dash.amber, track = '#EDEDED' }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - value / 100)
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: 30, color: dash.ink }}>{value}</span>
        <span style={{ fontFamily: fonts.sans, fontSize: 11, color: dash.muted }}>/100</span>
      </div>
    </div>
  )
}

function Pill({ children, background, color }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 10px',
      borderRadius: 999,
      background,
      color,
      fontFamily: fonts.sans,
      fontWeight: 500,
      fontSize: 11,
    }}>
      {children}
    </span>
  )
}

function Bar({ value, color, track = dash.mintBar }) {
  return (
    <div style={{ width: '100%', height: 6, borderRadius: 999, background: track, overflow: 'hidden' }}>
      <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: 999 }} />
    </div>
  )
}

function MetricCard({ icon, iconBg, title, value, status, statusColor, body, barColor, barTrack, accent }) {
  const hasValue = value !== null && value !== undefined
  return (
    <div style={{
      flex: 1,
      background: dash.surface,
      borderRadius: 16,
      padding: 20,
      border: accent ? `2px solid ${accent}` : `1px solid ${dash.line}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      minHeight: 188,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {icon}
        </div>
        <h4 style={{
          fontFamily: fonts.serif,
          fontWeight: 600,
          fontSize: 18,
          color: dash.ink,
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          {title}
        </h4>
      </div>
      {hasValue ? (
        <>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: 34, color: barColor }}>{value}</span>
            <span style={{ fontFamily: fonts.sans, fontSize: 12, color: dash.muted }}>/100</span>
          </div>
          <Bar value={value} color={barColor} track={barTrack} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              fontFamily: fonts.sans,
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: statusColor,
            }}>
              {status}
            </span>
          </div>
          <span style={{ fontFamily: fonts.sans, fontSize: 12, color: dash.inkSoft }}>
            {body}
          </span>
        </>
      ) : (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', border: `1.5px solid ${dash.muted}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: dash.muted, fontFamily: fonts.sans, fontSize: 13 }}>?</div>
          <span style={{ fontFamily: fonts.sans, fontSize: 13, color: dash.muted }}>No data yet</span>
          <span style={{ fontFamily: fonts.sans, fontSize: 11, color: dash.muted, textAlign: 'center' }}>{body}</span>
        </div>
      )}
    </div>
  )
}

function DataSourceRow({ icon, name, state, meta, extensionPending, onInstall }) {
  const stateMap = {
    active: { bg: dash.mint, color: dash.mintInk, label: 'Active' },
    pending: { bg: dash.amberSoft, color: dash.amberInk, label: 'Install extension' },
    off: { bg: '#F0F0F2', color: dash.muted, label: 'Not connected' },
  }
  const s = stateMap[state]
  return (
    <div style={{
      padding: 14,
      borderRadius: 12,
      border: extensionPending ? `1px solid ${dash.amber}` : `1px solid ${dash.lineSoft}`,
      background: extensionPending ? dash.amberSoft : dash.surface,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: dash.blueSoft,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontFamily: fonts.sans, fontWeight: 500, fontSize: 14, color: dash.ink }}>{name}</span>
        <span style={{ fontFamily: fonts.sans, fontSize: 12, color: dash.muted }}>{meta}</span>
      </div>
      {extensionPending ? (
        <button type="button" onClick={onInstall} style={{
          padding: '8px 14px',
          borderRadius: 10,
          background: dash.ink,
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          fontFamily: fonts.sans,
          fontWeight: 500,
          fontSize: 13,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <ChromeGlyph size={14} />
          Add to Chrome
        </button>
      ) : (
        <Pill background={s.bg} color={s.color}>{s.label}</Pill>
      )}
    </div>
  )
}

function SourceBar({ label, value, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: fonts.sans, fontSize: 13 }}>
        <span style={{ color: dash.inkSoft }}>{label}</span>
        <span style={{ color: dash.ink, fontWeight: 600 }}>{value}%</span>
      </div>
      <Bar value={value} color={color} track={dash.mintBar} />
    </div>
  )
}

function KeyValue({ label, value, pillBg, pillColor, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: `1px solid ${dash.lineSoft}` }}>
      <span style={{ fontFamily: fonts.sans, fontSize: 13, color: dash.inkSoft }}>{label}</span>
      {pillBg ? (
        <Pill background={pillBg} color={pillColor || dash.ink}>{value}</Pill>
      ) : (
        <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 500, color: valueColor || dash.ink }}>{value}</span>
      )}
    </div>
  )
}

function DeviceQuality({ icon, label, value, max }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ width: 22, color: dash.muted }}>{icon}</div>
      <span style={{ flex: 1, fontFamily: fonts.sans, fontSize: 13, color: dash.inkSoft }}>{label}</span>
      <div style={{ flex: 2 }}>
        <Bar value={(value / max) * 100} color={dash.ink} track={dash.mintBar} />
      </div>
      <span style={{ fontFamily: fonts.sans, fontSize: 12, color: dash.ink, width: 50, textAlign: 'right' }}>{value}/{max}</span>
    </div>
  )
}

function StepDot({ status }) {
  const color = status === 'done' ? dash.mintInk : status === 'critical' ? dash.red : dash.amber
  return (
    <div style={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: color,
      flexShrink: 0,
    }} />
  )
}

function SetupStepRow({ status, label, hint, statusLabel, action }) {
  const statusColor = status === 'done' ? dash.mintInk : status === 'critical' ? dash.red : dash.amberInk

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: 16,
      padding: '14px 4px',
    }}>
      <div style={{ paddingTop: 7 }}>
        <StepDot status={status} />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: fonts.sans, fontWeight: 500, fontSize: 14, color: dash.ink }}>{label}</span>
          <span style={{
            fontFamily: fonts.sans,
            fontSize: 11,
            fontWeight: 500,
            color: statusColor,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            {statusLabel}
          </span>
          {action && (
            <button type="button" onClick={action.onClick} style={{
              marginLeft: 4,
              padding: '5px 12px',
              borderRadius: 8,
              background: 'transparent',
              color: dash.ink,
              border: `1px solid ${dash.line}`,
              cursor: 'pointer',
              fontFamily: fonts.sans,
              fontWeight: 500,
              fontSize: 12,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              whiteSpace: 'nowrap',
              transition: 'background 0.15s ease, border-color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = dash.ink
              e.currentTarget.style.color = '#FFFFFF'
              e.currentTarget.style.borderColor = dash.ink
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = dash.ink
              e.currentTarget.style.borderColor = dash.line
            }}>
              {action.label}
            </button>
          )}
        </div>
        <span style={{ fontFamily: fonts.sans, fontSize: 13, color: dash.inkSoft, lineHeight: '18px' }}>{hint}</span>
      </div>
    </div>
  )
}

function SetupStatusCard({ desktopActive, extensionInstalled, stepsDone, stepsTotal, onInstallDesktop, onInstallChrome }) {
  return (
    <div className="equil-reveal equil-reveal-d1" style={{
      borderRadius: 14,
      padding: '18px 22px',
      background: dash.surface,
      border: `1px solid ${dash.line}`,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', paddingBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <h3 style={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: 17, color: dash.ink, margin: 0, letterSpacing: '-0.01em' }}>
            Finish your setup
          </h3>
          <span style={{ fontFamily: fonts.sans, fontSize: 12, color: dash.muted }}>
            {stepsDone} of {stepsTotal} complete
          </span>
        </div>
        <div style={{ width: 120, height: 3, borderRadius: 999, background: dash.lineSoft, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(stepsDone / stepsTotal) * 100}%`,
            background: stepsDone === 0 ? dash.red : dash.mintInk,
            transition: 'width 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }} />
        </div>
      </div>

      <div style={{ height: 1, background: dash.lineSoft }} />

      <SetupStepRow
        status={desktopActive ? 'done' : 'critical'}
        label="Desktop agent"
        statusLabel={desktopActive ? 'Active' : 'Required'}
        hint={desktopActive
          ? 'Syncing your app activity now.'
          : 'Needed for the dashboard to come alive. Without it every metric stays empty.'}
        action={!desktopActive ? {
          label: 'Install',
          onClick: onInstallDesktop,
        } : null}
      />

      <div style={{ height: 1, background: dash.lineSoft }} />

      <SetupStepRow
        status={extensionInstalled ? 'done' : 'pending'}
        label="Chrome extension"
        statusLabel={extensionInstalled ? 'Active' : 'Recommended'}
        hint={extensionInstalled
          ? 'Browser activity is feeding in.'
          : 'Covers your browser tabs. Lifts prediction confidence by 20%.'}
        action={!extensionInstalled ? {
          label: 'Add to Chrome',
          onClick: onInstallChrome,
        } : null}
      />
    </div>
  )
}

function MeasuringScreen() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 90,
      background: onb.bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 45%, rgba(45, 106, 79, 0.18) 0%, transparent 55%)',
      }} />
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 32,
        position: 'relative',
      }}>
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          <div className="equil-ring" style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: `2px solid ${onb.accentGreen}`,
          }} />
          <div className="equil-ring" style={{
            position: 'absolute',
            inset: 12,
            borderRadius: '50%',
            border: `1px solid ${onb.ink}`,
            opacity: 0.4,
            animationDelay: '0.4s',
          }} />
          <div className="equil-orb" style={{
            position: 'absolute',
            inset: 32,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${onb.ink} 0%, ${onb.accentGreen} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 50px -10px rgba(26, 58, 42, 0.5)',
          }}>
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.9" />
              <path d="M10 20c2-4 4-8 6-8s4 4 6 8" stroke="#FFFFFF" strokeWidth="1.5" fill="none" />
              <path d="M12 18c1.5-3 3-5 4-5s2.5 2 4 5" stroke="#A8D3BC" strokeWidth="1.2" fill="none" />
            </svg>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <h2 style={{
            fontFamily: fonts.serif,
            fontWeight: 500,
            fontSize: 34,
            letterSpacing: '-0.02em',
            color: onb.ink,
            margin: 0,
            textAlign: 'center',
          }}>
            Setting your baseline
          </h2>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: 15,
            color: onb.inkSoft,
            margin: 0,
            maxWidth: 420,
            textAlign: 'center',
            lineHeight: '22px',
          }}>
            The desktop agent is checking in. Your dashboard is warming up.
          </p>
          <div style={{ display: 'flex', gap: 8, paddingTop: 6 }}>
            <span className="equil-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: onb.ink, animationDelay: '0s' }} />
            <span className="equil-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: onb.ink, animationDelay: '0.2s' }} />
            <span className="equil-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: onb.ink, animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Complete({ onRestart, desktopInstalled = true, initialChromeInstalled = false }) {
  const [phase, setPhase] = useState('measuring')
  const [extensionInstalled, setExtensionInstalled] = useState(initialChromeInstalled)
  const [desktopActive, setDesktopActive] = useState(desktopInstalled)

  useEffect(() => {
    const t = setTimeout(() => setPhase('dashboard'), 2200)
    return () => clearTimeout(t)
  }, [])

  const installExtension = () => setExtensionInstalled(true)
  const startDesktopFlow = () => {
    setDesktopActive(true)
  }

  const stepsDone = (desktopActive ? 1 : 0) + (extensionInstalled ? 1 : 0)
  const stepsTotal = 2
  const setupComplete = stepsDone === stepsTotal

  if (phase === 'measuring') {
    return <MeasuringScreen />
  }

  return (
    <div style={{
      background: dash.bg,
      minHeight: 'calc(100vh - 76px)',
      width: '100%',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: 'linear-gradient(90deg, #3E7DF0 0%, #7C5BD9 50%, #F5B400 100%)',
      }} />

      <div style={{
        background: dash.surface,
        borderBottom: `1px solid ${dash.line}`,
        padding: '14px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D7F6E9 0%, #A8D3BC 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="13" stroke={dash.blue} strokeWidth="1.8" fill="none" opacity="0.7" />
                <circle cx="14" cy="16" r="6" stroke={dash.blue} strokeWidth="1.8" fill="none" />
                <circle cx="18" cy="16" r="6" stroke={dash.blue} strokeWidth="1.8" fill="none" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: fonts.sans, fontWeight: 700, fontSize: 12, color: dash.blue, letterSpacing: '0.02em' }}>equilybrium</span>
              <span style={{ fontFamily: fonts.sans, fontSize: 8, color: dash.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>For your mind, for your life</span>
            </div>
          </div>
          <div style={{ width: 1, height: 28, background: dash.line, marginLeft: 8 }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: 22, color: dash.blue, margin: 0, letterSpacing: '-0.01em' }}>Dashboard</h1>
            <span style={{ fontFamily: fonts.sans, fontSize: 12, color: dash.inkSoft }}>Digital Wellbeing</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Pill background="#F4F5FB" color={dash.inkSoft}><Package /> v7.7.2</Pill>
          <div style={{ width: 1, height: 20, background: dash.line }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: dash.inkSoft, fontFamily: fonts.sans, fontSize: 13 }}>
            <Globe />
            EN
          </div>
          <div style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: dash.mint,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Wifi />
          </div>
          <Bell />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontFamily: fonts.sans, fontSize: 13, color: dash.ink, fontWeight: 500 }}>Hello, Callebe Silva</span>
              <span style={{ fontFamily: fonts.sans, fontSize: 11, color: dash.muted }}>callebe0@gmail.com</span>
            </div>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: dash.blue,
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.sans,
              fontWeight: 600,
              fontSize: 13,
            }}>
              CS
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1440, margin: '0 auto' }}>
        <div className="equil-reveal equil-reveal-d0">
          <h2 style={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: 26, color: dash.ink, margin: 0, letterSpacing: '-0.02em' }}>
            Welcome to Equilybrium, Callebe.
          </h2>
          <p style={{ fontFamily: fonts.sans, fontSize: 14, color: dash.inkSoft, margin: '4px 0 0' }}>
            {desktopActive
              ? 'Desktop agent is live. Patterns start appearing once you run a full workday.'
              : 'You can look around, but the dashboard stays quiet until you install the desktop agent.'}
          </p>
        </div>

        {!setupComplete && (
          <SetupStatusCard
            desktopActive={desktopActive}
            extensionInstalled={extensionInstalled}
            stepsDone={stepsDone}
            stepsTotal={stepsTotal}
            onInstallDesktop={startDesktopFlow}
            onInstallChrome={installExtension}
          />
        )}

        {setupComplete && (
          <div className="equil-reveal equil-reveal-d1" style={{
            borderRadius: 12,
            padding: '12px 18px',
            background: dash.surface,
            border: `1px solid ${dash.line}`,
            borderLeft: `3px solid ${dash.mintInk}`,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dash.mintInk} strokeWidth="2.5" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontFamily: fonts.sans, fontSize: 14, color: dash.ink }}>
              Setup complete. Patterns emerge in about five workdays.
            </span>
          </div>
        )}

        <div className="equil-reveal equil-reveal-d2" style={{ display: 'flex', gap: 16 }}>
          {['Overview', 'Progress', 'Insights'].map((t, i) => (
            <div key={t} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 16px',
              borderRadius: 12,
              background: i === 0 ? dash.surface : 'transparent',
              border: i === 0 ? `1px solid ${dash.line}` : 'none',
              fontFamily: fonts.sans,
              fontWeight: i === 0 ? 500 : 400,
              fontSize: 14,
              color: i === 0 ? dash.ink : dash.muted,
              cursor: 'default',
            }}>
              {t}
            </div>
          ))}
        </div>

        <div className="equil-reveal equil-reveal-d3" style={{
          background: dash.surface,
          borderRadius: 20,
          border: `2px solid ${dash.amber}`,
          padding: 28,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 36,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sparkle color={dash.amber} />
              <h3 style={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: 24, color: dash.ink, margin: 0, letterSpacing: '-0.01em' }}>
                Your Wellbeing Score
              </h3>
              <InfoDot />
            </div>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 11, color: dash.muted, letterSpacing: '0.12em' }}>WELLNESS</span>
                <Donut value={0} color={dash.amber} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 11, color: dash.muted, letterSpacing: '0.12em' }}>BURNOUT RISK</span>
                <Donut value={0} color={dash.orange} />
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: dash.amber }} />
              <span style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: dash.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Status</span>
            </div>
            <div>
              <h4 style={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: 30, color: dash.amber, margin: 0, letterSpacing: '-0.02em' }}>
                Learning your patterns
              </h4>
              <p style={{ fontFamily: fonts.sans, fontSize: 15, color: dash.inkSoft, margin: '6px 0 0' }}>
                Give Equilybrium about five workdays. Your score appears once we have enough signal to be trustworthy.
              </p>
            </div>
            <div style={{
              padding: '10px 14px',
              borderRadius: 10,
              background: dash.bg,
              fontFamily: fonts.sans,
              fontSize: 13,
              color: dash.inkSoft,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <span>—</span>
              <span style={{ fontWeight: 500, color: dash.ink }}>Baseline</span>
              <span style={{ color: dash.line }}>|</span>
              <span>Day 1 of 5</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ padding: '12px 14px', borderRadius: 10, border: `1px solid ${dash.lineSoft}` }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, color: dash.muted, fontWeight: 600, letterSpacing: '0.08em' }}>RISK LEVEL</div>
                <div style={{ fontFamily: fonts.serif, fontSize: 18, fontWeight: 600, color: dash.amber, marginTop: 4 }}>Calibrating</div>
              </div>
              <div style={{ padding: '12px 14px', borderRadius: 10, border: `1px solid ${dash.lineSoft}` }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, color: dash.muted, fontWeight: 600, letterSpacing: '0.08em' }}>TARGET</div>
                <div style={{ fontFamily: fonts.serif, fontSize: 18, fontWeight: 600, color: dash.ink, marginTop: 4 }}>75+</div>
              </div>
            </div>
          </div>
        </div>

        <div className="equil-reveal equil-reveal-d4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <MetricCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill={dash.skyBar} xmlns="http://www.w3.org/2000/svg"><path d="M13 3L4 14h6v7l9-11h-6V3z" /></svg>}
            iconBg={dash.blueSoft}
            title="Energy & Focus"
            value={null}
            body="Desktop is gathering signal"
            accent={dash.skyBar}
          />
          <MetricCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF7373" strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z" /></svg>}
            iconBg="#FCE6E6"
            title="Health & Recovery"
            value={null}
            body="Connect a device to see metrics"
          />
          <MetricCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dash.violet} strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>}
            iconBg={dash.violetSoft}
            title="Emotional Balance"
            value={null}
            body="Desktop + browser needed for this"
          />
          <MetricCard
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dash.inkSoft} strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2 2-7z" /></svg>}
            iconBg="#F0F0F5"
            title="Work-Life Balance"
            value={null}
            body="Needs a weekday of history"
          />
        </div>

        <div className="equil-reveal equil-reveal-d5" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div style={{ background: dash.surface, borderRadius: 16, border: `1px solid ${dash.line}`, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: 18, color: dash.ink, margin: 0, letterSpacing: '-0.01em' }}>Data Sources</h4>
              <Pill
                background={!desktopActive ? dash.redSoft : extensionInstalled ? dash.mint : dash.amberSoft}
                color={!desktopActive ? dash.red : extensionInstalled ? dash.mintInk : dash.amberInk}
              >
                {(desktopActive ? 1 : 0) + (extensionInstalled ? 1 : 0)}/3 Contributing
              </Pill>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <DataSourceRow
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={desktopActive ? dash.blue : dash.red} strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>}
                name="Desktop"
                state={desktopActive ? 'active' : 'off'}
                meta={desktopActive ? 'Last sync: 1 minute ago' : 'Install the agent to activate'}
              />
              <DataSourceRow
                icon={<ChromeGlyph size={18} />}
                name="Browser"
                state={extensionInstalled ? 'active' : 'pending'}
                meta={extensionInstalled ? 'Last sync: just now' : 'Chrome extension needed'}
                extensionPending={!extensionInstalled}
                onInstall={installExtension}
              />
              <DataSourceRow
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dash.inkSoft} strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="2" width="12" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>}
                name="Mobile"
                state="off"
                meta="Install app to connect"
              />
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 12, color: !desktopActive ? dash.red : dash.mintInk, fontWeight: 500, textAlign: 'center', paddingTop: 4 }}>
              {(desktopActive ? 1 : 0) + (extensionInstalled ? 1 : 0)} of 3 sources active
            </div>
          </div>

          <div style={{ background: dash.surface, borderRadius: 16, border: `1px solid ${dash.line}`, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h4 style={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: 18, color: dash.ink, margin: 0, flex: 1, letterSpacing: '-0.01em' }}>Prediction Confidence</h4>
              <InfoDot />
            </div>
            {(() => {
              const confidence = desktopActive
                ? (extensionInstalled ? 45 : 22)
                : 0
              const label = !desktopActive ? 'No signal' : extensionInstalled ? 'Fair' : 'Early'
              const labelColor = !desktopActive ? dash.red : dash.orange
              const labelBg = !desktopActive ? dash.redSoft : '#FFECDA'
              return (
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <InfoDot color={labelColor} />
                      <span style={{ fontFamily: fonts.sans, fontSize: 13, color: dash.inkSoft }}>Overall Confidence</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: fonts.serif, fontSize: 28, fontWeight: 600, color: labelColor }}>{confidence}%</span>
                      <Pill background={labelBg} color={labelColor}>{label}</Pill>
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <Bar value={confidence} color={labelColor} track={dash.mintBar} />
                  </div>
                  <p style={{ fontFamily: fonts.sans, fontSize: 12, color: dash.muted, margin: '8px 0 0' }}>
                    Higher confidence means more accurate burnout risk predictions.
                  </p>
                </div>
              )
            })()}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
              <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 13, color: dash.ink }}>Source Breakdown</span>
              <SourceBar label="Browser Extension" value={extensionInstalled ? 45 : 0} color={dash.ink} />
              <SourceBar label="Desktop Agent" value={desktopActive ? 45 : 0} color={dash.ink} />
              <SourceBar label="Mobile App" value={0} color={dash.ink} />
            </div>
            {!desktopActive && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: dash.redSoft, borderRadius: 10 }}>
                <Pill background={dash.surface} color={dash.red}>Critical</Pill>
                <span style={{ fontFamily: fonts.sans, fontSize: 12, color: dash.red, fontWeight: 500 }}>
                  Install the desktop agent to start collecting signal
                </span>
              </div>
            )}
            {desktopActive && !extensionInstalled && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: dash.blueSoft, borderRadius: 10 }}>
                <Pill background={dash.surface} color={dash.blue}>+20%</Pill>
                <span style={{ fontFamily: fonts.sans, fontSize: 12, color: dash.blue, fontWeight: 500 }}>
                  Add Chrome extension to improve confidence
                </span>
              </div>
            )}
          </div>

          <div style={{ background: dash.surface, borderRadius: 16, border: `1px solid ${dash.line}`, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontFamily: fonts.serif, fontWeight: 600, fontSize: 18, color: dash.ink, margin: 0, letterSpacing: '-0.01em' }}>ML Model Info</h4>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: dash.mint, display: 'flex', alignItems: 'center', justifyContent: 'center', color: dash.mintInk, fontFamily: fonts.sans, fontWeight: 600, fontSize: 12 }}>✓</div>
            </div>
            <div>
              <KeyValue label="Model Version" value="Equilybrium AI" pillBg={dash.blueSoft} pillColor={dash.blue} />
              <KeyValue label="Last Analysis" value="less than a minute ago" valueColor={dash.mintInk} />
              <KeyValue
                label="Device Scenario"
                value={!desktopActive ? 'No source' : extensionInstalled ? 'Browser + Desktop' : 'Desktop only'}
                pillBg={!desktopActive ? dash.redSoft : dash.mint}
                pillColor={!desktopActive ? dash.red : dash.mintInk}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontFamily: fonts.sans, fontSize: 13, color: dash.inkSoft }}>Data Quality</span>
              <Pill
                background={!desktopActive ? dash.redSoft : extensionInstalled ? dash.mint : dash.amberSoft}
                color={!desktopActive ? dash.red : extensionInstalled ? dash.mintInk : dash.amberInk}
              >
                {!desktopActive ? 'None' : extensionInstalled ? 'Good' : 'Fair'}
              </Pill>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <DeviceQuality
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dash.inkSoft} strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /></svg>}
                label="Desktop"
                value={desktopActive ? 22 : 0}
                max={22}
              />
              <DeviceQuality
                icon={<Globe />}
                label="Browser"
                value={extensionInstalled ? 17 : 0}
                max={17}
              />
              <DeviceQuality
                icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={dash.inkSoft} strokeWidth="2" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="2" width="12" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>}
                label="Mobile"
                value={0}
                max={12}
              />
            </div>
          </div>
        </div>

        <aside style={{
          marginTop: 12,
          padding: '22px 26px',
          borderRadius: 14,
          background: '#FFF7DB',
          border: '1px dashed #C9A84A',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              fontFamily: fonts.mono,
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#8A6F1D',
              background: '#F4E3A7',
              padding: '4px 10px',
              borderRadius: 999,
            }}>
              Nota do designer para a Equilybrium
            </div>
            <span style={{ fontFamily: fonts.sans, fontSize: 12, color: '#8A6F1D' }}>
              Tela de aterrissagem depois que o instalador fecha. Ideia central de UX: o próprio dashboard serve como próximo passo e mostra o valor do produto desde o primeiro dia.
            </span>
          </div>
          <p style={{ fontFamily: fonts.sans, fontSize: 14, lineHeight: '22px', color: '#4A3C0F', margin: 0 }}>
            Quando o instalador reporta sucesso, a aba do navegador carrega aqui automaticamente. O usuário vê uma tarefa clara em aberto, que é a extensão do Chrome, e percebe que adicioná-la aumenta a confiança das previsões. O design se comporta como um dashboard em operação para que o valor do produto esteja visível desde o primeiro dia.
          </p>
        </aside>

        <div style={{ paddingTop: 4, paddingBottom: 32, display: 'flex', justifyContent: 'center' }}>
          <button type="button" onClick={onRestart} style={{
            padding: '10px 18px',
            borderRadius: 999,
            background: 'transparent',
            border: `1px solid ${dash.line}`,
            cursor: 'pointer',
            fontFamily: fonts.sans,
            fontSize: 12,
            color: dash.muted,
            letterSpacing: '0.04em',
          }}>
            Restart prototype
          </button>
        </div>
      </div>
    </div>
  )
}
