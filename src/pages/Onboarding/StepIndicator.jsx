import { colors, fonts } from './tokens'

function UserPlusIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </svg>
  )
}

function ShieldIcon({ color }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill={color} style={{ flexShrink: 0 }}>
      <path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" />
    </svg>
  )
}

function DesktopIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  )
}

const STEPS = [
  { id: 1, label: 'Sign up', Icon: UserPlusIcon },
  { id: 2, label: 'Privacy', Icon: ShieldIcon },
  { id: 3, label: 'Install', Icon: DesktopIcon },
]

function Dot({ active, Icon }) {
  const bg = active ? colors.ink : colors.lineSoft
  const iconColor = active ? '#FFFFFF' : colors.muted
  return (
    <div style={{
      width: 40,
      height: 40,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: bg,
      flexShrink: 0,
    }}>
      <Icon color={iconColor} />
    </div>
  )
}

export default function StepIndicator({ current }) {
  return (
    <div className="equil-step-indicator">
      <span style={{
        fontFamily: fonts.sans,
        fontWeight: 500,
        fontSize: 13,
        letterSpacing: '0.05em',
        color: colors.muted,
      }}>
        STEP {current} OF 3
      </span>
      <div className="equil-step-track">
        {STEPS.map((step, idx) => (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
            <div className="equil-step-slot" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 100, gap: 6, flexShrink: 0 }}>
              <Dot active={current === step.id} Icon={step.Icon} />
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 12,
                fontWeight: current === step.id ? 500 : 400,
                color: current === step.id ? colors.ink : colors.muted,
              }}>
                {step.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className="equil-step-connector" style={{ width: 64, height: 2, background: colors.line, flexShrink: 0 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
