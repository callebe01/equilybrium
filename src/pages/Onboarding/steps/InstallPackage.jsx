import { useState } from 'react'
import { colors, fonts } from '../tokens'

function CheckIcon({ color = colors.ink, size = 20 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={color} style={{ flexShrink: 0 }}>
      <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
    </svg>
  )
}

function XIcon({ color = colors.muted, size = 20 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 -960 960 960" width={size} fill={color} style={{ flexShrink: 0 }}>
      <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
    </svg>
  )
}

function StepDot({ label, state }) {
  const isDone = state === 'done'
  const isActive = state === 'active'
  const bg = isActive || isDone ? '#D7F6E9' : colors.lineSoft
  const border = isActive || isDone ? `0.5px solid ${colors.ink}` : 'none'
  const textColor = isActive || isDone ? colors.ink : colors.muted
  const opacity = isDone ? 0.44 : 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, width: 100 }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: bg,
        border,
        opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: fonts.sans,
        fontWeight: 500,
        fontSize: 18,
        color: colors.ink,
      }}>
        {isDone ? <CheckIcon size={18} /> : (label === 'Accessibility' && state === 'active' ? '1' : '2')}
      </div>
      <span style={{
        fontFamily: fonts.sans,
        fontWeight: isActive ? 500 : 400,
        fontSize: 12,
        color: textColor,
      }}>
        {label}
      </span>
    </div>
  )
}

function BulletRow({ icon, text, color = colors.ink, muted = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      {icon}
      <span style={{
        fontFamily: fonts.sans,
        fontSize: 14,
        lineHeight: '18px',
        color: muted ? colors.muted : color,
      }}>
        {text}
      </span>
    </div>
  )
}

function SettingsPane({ title, items, highlightIndex }) {
  return (
    <div style={{
      flex: 1,
      borderRadius: 14,
      background: '#F6F6F6',
      border: `1px solid #E1E1E1`,
      display: 'flex',
      minHeight: 340,
      overflow: 'hidden',
      boxShadow: '0 20px 60px -20px rgba(0,0,0,0.25)',
    }}>
      <div style={{
        width: 150,
        background: '#EBEBEB',
        padding: '12px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
        {['General', 'Apple ID', 'Wi-Fi', 'Bluetooth', 'Notifications', 'Privacy & Security', 'Displays', 'Sound'].map((item, i) => (
          <div key={item} style={{
            padding: '6px 8px',
            borderRadius: 6,
            background: i === 5 ? '#C8C8CC' : 'transparent',
            fontFamily: fonts.sans,
            fontSize: 12,
            color: i === 5 ? '#1A1A1A' : '#4A4A4A',
            fontWeight: i === 5 ? 500 : 400,
          }}>
            {item}
          </div>
        ))}
      </div>
      <div style={{
        flex: 1,
        background: '#FFFFFF',
        padding: '16px 20px',
      }}>
        <div style={{
          fontFamily: fonts.sans,
          fontWeight: 600,
          fontSize: 15,
          color: '#1A1A1A',
          paddingBottom: 12,
          borderBottom: `1px solid #EEEEEE`,
        }}>
          {title}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: 4 }}>
          {items.map((item, i) => (
            <div key={item.name} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 6px',
              borderBottom: i < items.length - 1 ? `1px solid #F3F3F3` : 'none',
              background: i === highlightIndex ? '#E6F0FF' : 'transparent',
              borderRadius: i === highlightIndex ? 6 : 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: 5,
                  background: item.iconBg || '#D7D7D9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#FFFFFF',
                }}>
                  {item.iconLabel || 'E'}
                </div>
                <span style={{ fontFamily: fonts.sans, fontSize: 13, color: '#1A1A1A' }}>
                  {item.name}
                </span>
              </div>
              <Toggle on={item.on} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Toggle({ on }) {
  return (
    <div style={{
      width: 32,
      height: 18,
      borderRadius: 999,
      background: on ? '#30C85E' : '#D1D1D1',
      position: 'relative',
      transition: 'background 0.3s',
    }}>
      <div style={{
        position: 'absolute',
        top: 1,
        left: on ? 15 : 1,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: '#FFFFFF',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        transition: 'left 0.3s',
      }} />
    </div>
  )
}

function WindowChrome() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#E24B4A' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#E0E0E0' }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#E0E0E0' }} />
    </div>
  )
}

function Screen({ step, title, titleItalic, body, grantsLabel, grants, deniesLabel, denies, settings, onGrant }) {
  return (
    <div style={{
      width: 1040,
      maxWidth: '96vw',
      height: 680,
      maxHeight: '92vh',
      background: colors.surface,
      borderRadius: 24,
      boxShadow: '0 40px 100px -20px rgba(0,0,0,0.45), 0 16px 40px -10px rgba(0,0,0,0.25)',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: '440px 1fr',
    }}>
      <div style={{
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        overflow: 'auto',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <WindowChrome />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" stroke={colors.ink} strokeWidth="1.5" />
              <path d="M10 20c2-4 4-8 6-8s4 4 6 8" stroke={colors.ink} strokeWidth="1.5" fill="none" />
              <path d="M12 18c1.5-3 3-5 4-5s2.5 2 4 5" stroke={colors.accentGreen} strokeWidth="1.2" fill="none" />
            </svg>
            <span style={{
              fontFamily: fonts.sans,
              fontWeight: 600,
              fontSize: 14,
              color: colors.ink,
              letterSpacing: '-0.02em',
            }}>
              equilybrium
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', paddingTop: 4 }}>
          <StepDot label="Accessibility" state={step === 1 ? 'active' : 'done'} />
          <div style={{ width: 48, height: 2, background: colors.line, marginTop: -20 }} />
          <StepDot label="Screen Recording" state={step === 2 ? 'active' : 'pending'} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 style={{
            fontFamily: fonts.serif,
            fontWeight: 500,
            fontSize: 28,
            lineHeight: '34px',
            letterSpacing: '-0.02em',
            color: colors.ink,
            margin: 0,
          }}>
            {title}
            <span style={{ fontStyle: 'italic' }}> {titleItalic}</span>
          </h2>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            lineHeight: '22px',
            color: colors.inkSoft,
            margin: 0,
          }}>
            {body}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: '0.04em',
            color: colors.ink,
            textTransform: 'uppercase',
          }}>
            {grantsLabel}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {grants.map((g) => (
              <BulletRow key={g} icon={<CheckIcon size={16} />} text={g} />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{
            fontFamily: fonts.mono,
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: '0.04em',
            color: colors.muted,
            textTransform: 'uppercase',
          }}>
            {deniesLabel}
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {denies.map((d) => (
              <BulletRow key={d} icon={<XIcon size={16} />} text={d} muted />
            ))}
          </div>
        </div>

        <button type="button" onClick={onGrant} style={{
          marginTop: 'auto',
          padding: '16px 24px',
          borderRadius: 12,
          background: colors.ink,
          color: '#FFFFFF',
          border: 'none',
          cursor: 'pointer',
          fontFamily: fonts.sans,
          fontWeight: 500,
          fontSize: 18,
        }}>
          Grant Access
        </button>
      </div>

      <div style={{
        background: '#EDEDEF',
        padding: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {settings}
      </div>
    </div>
  )
}

export default function InstallPackage({ onClose }) {
  const [step, setStep] = useState(1)

  const advance = () => {
    if (step === 1) {
      setStep(2)
    } else {
      onClose()
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(15, 28, 21, 0.55)',
        backdropFilter: 'blur(12px)',
      }} />
      <div className="equil-modal-scale" key={step} style={{ position: 'relative', zIndex: 1 }}>
        {step === 1 ? (
          <Screen
            step={1}
            title="Accessibility,"
            titleItalic="first"
            body="macOS uses this name for apps that need to know which app you're in. That is all Equilybrium reads from it."
            grantsLabel="This grants"
            grants={[
              'See which app is focused right now',
              'Measure how long each app stays active',
            ]}
            deniesLabel="This does not grant"
            denies={[
              'Reading content inside apps',
              'Controlling your mouse or keyboard',
              'Intercepting keystrokes or passwords',
            ]}
            settings={(
              <SettingsPane
                title="Accessibility"
                highlightIndex={0}
                items={[
                  { name: 'Equilybrium', on: true, iconBg: colors.ink, iconLabel: 'E' },
                  { name: 'Raycast', on: true, iconBg: '#FF6363', iconLabel: 'R' },
                  { name: 'Shortcuts', on: false, iconBg: '#7B61FF', iconLabel: 'S' },
                  { name: 'Keyboard Maestro', on: false, iconBg: '#3B82F6', iconLabel: 'K' },
                ]}
              />
            )}
            onGrant={advance}
          />
        ) : (
          <Screen
            step={2}
            title="Screen Recording,"
            titleItalic="but not really"
            body="Without this permission, macOS only tells us an app is open. It won't tell us which one. Apple files this capability under 'Screen Recording' because the same underlying permission is what screen recorders use. We do not record anything."
            grantsLabel="This lets us"
            grants={[
              'See which app you are in (Chrome vs Figma vs Terminal)',
              'Measure how long you spend in each one',
            ]}
            deniesLabel="We never"
            denies={[
              'Record your screen or take screenshots',
              'Read pixels or visual content',
              'Capture video of any kind',
              'See your URLs or document names',
            ]}
            settings={(
              <SettingsPane
                title="Screen Recording"
                highlightIndex={0}
                items={[
                  { name: 'Equilybrium', on: true, iconBg: colors.ink, iconLabel: 'E' },
                  { name: 'Loom', on: true, iconBg: '#625DF5', iconLabel: 'L' },
                  { name: 'CleanShot X', on: false, iconBg: '#F0504A', iconLabel: 'C' },
                  { name: 'Zoom', on: false, iconBg: '#2D8CFF', iconLabel: 'Z' },
                ]}
              />
            )}
            onGrant={advance}
          />
        )}
      </div>
    </div>
  )
}
