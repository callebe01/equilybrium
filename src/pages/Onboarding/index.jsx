import { useState, useEffect } from 'react'
import Header from './Header'
import SignUp from './steps/SignUp'
import Privacy from './steps/Privacy'
import Install from './steps/Install'
import InstallPackage from './steps/InstallPackage'
import InstallProgress from './steps/InstallProgress'
import Complete from './steps/Complete'
import { colors } from './tokens'
import './animations.css'

const STEPS = ['signup', 'privacy', 'install', 'install-progress', 'complete']

export default function Onboarding() {
  const [stepIndex, setStepIndex] = useState(0)
  const [email, setEmail] = useState('')
  const [showPackage, setShowPackage] = useState(false)
  const [desktopInstalled, setDesktopInstalled] = useState(false)
  const [chromeInstalled, setChromeInstalled] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [stepIndex])

  useEffect(() => {
    document.body.style.overflow = showPackage ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showPackage])

  const goTo = (index) => setStepIndex(Math.max(0, Math.min(STEPS.length - 1, index)))
  const next = () => goTo(stepIndex + 1)
  const back = () => goTo(stepIndex - 1)
  const jumpToDashboard = () => goTo(STEPS.indexOf('complete'))
  const resetAndRestart = () => {
    setDesktopInstalled(false)
    setChromeInstalled(false)
    goTo(0)
  }

  const step = STEPS[stepIndex]
  const showHeader = step !== 'complete'
  const headerEmail = stepIndex >= 1 ? (email || 'callebe0@gmail.com') : ''
  const progress = ((stepIndex + 1) / STEPS.length) * 100

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {showHeader && <Header email={headerEmail} progress={progress} />}

      <div key={step} className="equil-step" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        width: '100%',
      }}>
        {step === 'signup' && (
          <SignUp onContinue={(submittedEmail) => {
            setEmail(submittedEmail)
            next()
          }} />
        )}
        {step === 'privacy' && (
          <Privacy onBack={back} onContinue={next} />
        )}
        {step === 'install' && (
          <Install
            onDownload={() => setShowPackage(true)}
            onSkip={jumpToDashboard}
          />
        )}
        {step === 'install-progress' && (
          <InstallProgress
            onContinue={() => { setChromeInstalled(true); jumpToDashboard() }}
            onSkipChrome={jumpToDashboard}
          />
        )}
        {step === 'complete' && (
          <Complete
            onRestart={resetAndRestart}
            desktopInstalled={desktopInstalled}
            initialChromeInstalled={chromeInstalled}
          />
        )}
      </div>

      {showPackage && (
        <InstallPackage onClose={() => {
          setShowPackage(false)
          setDesktopInstalled(true)
          goTo(STEPS.indexOf('install-progress'))
        }} />
      )}

      {showHeader && step !== 'signup' && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: 'flex',
          gap: 8,
          zIndex: 50,
        }}>
          <button type="button" onClick={back} style={{
            padding: '8px 14px',
            borderRadius: 999,
            background: colors.surface,
            border: `1px solid ${colors.line}`,
            cursor: 'pointer',
            fontSize: 12,
            fontFamily: 'DM Mono, monospace',
            color: colors.inkSoft,
            letterSpacing: '0.04em',
          }}>
            ← PREV
          </button>
          <button type="button" onClick={next} style={{
            padding: '8px 14px',
            borderRadius: 999,
            background: colors.ink,
            color: '#FFFFFF',
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '0.04em',
          }}>
            NEXT →
          </button>
        </div>
      )}
    </div>
  )
}
