import StepIndicator from '../StepIndicator'
import FloatingCTA from '../FloatingCTA'
import { colors, fonts } from '../tokens'

const paper = '#FBF7EC'

function BoundaryDiagram() {
  return (
    <div className="equil-boundary-diagram" style={{
      margin: '20px 0 8px',
      padding: '32px 3px',
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      gap: 40,
      alignItems: 'center',
      alignSelf: 'stretch',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{
          fontFamily: fonts.serif,
          fontWeight: 500,
          fontSize: 24,
          letterSpacing: '-0.01em',
          lineHeight: 1.5,
          color: colors.ink,
        }}>
          Your machine
        </span>
        <span style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          lineHeight: '20px',
          color: colors.inkSoft,
          maxWidth: 280,
        }}>
          Raw activity is processed on your computer, in memory, and never written to our servers.
        </span>
      </div>

      <div className="equil-boundary-svg" style={{ position: 'relative', width: 280, height: 150 }}>
        <svg viewBox="0 0 280 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <line x1="0" y1="75" x2="280" y2="75" stroke={colors.ink} strokeWidth="1" />
          <line x1="8" y1="71" x2="8" y2="79" stroke={colors.ink} strokeWidth="1" />
          <line x1="272" y1="71" x2="272" y2="79" stroke={colors.ink} strokeWidth="1" />

          <g transform="translate(12, 28)">
            <rect x="0" y="0" width="56" height="36" rx="3" stroke={colors.ink} strokeWidth="1.3" fill="none" />
            <line x1="0" y1="36" x2="56" y2="36" stroke={colors.ink} strokeWidth="1.3" />
            <line x1="-6" y1="44" x2="62" y2="44" stroke={colors.ink} strokeWidth="1.3" />
            <line x1="24" y1="8" x2="36" y2="8" stroke={colors.accentGreen} strokeWidth="1" />
            <line x1="20" y1="14" x2="40" y2="14" stroke={colors.accentGreen} strokeWidth="1" opacity="0.7" />
            <line x1="24" y1="20" x2="36" y2="20" stroke={colors.accentGreen} strokeWidth="1" opacity="0.5" />
          </g>

          <line x1="140" y1="4" x2="140" y2="148" stroke={colors.accentGreen} strokeWidth="1" strokeDasharray="3 5" />
          <text x="140" y="148" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="8" fill={colors.accentGreen} letterSpacing="2">
            BOUNDARY
          </text>

          <g transform="translate(208, 34)">
            <path d="M4 24 Q 0 10, 14 10 Q 16 0, 28 6 Q 40 4, 42 16 Q 54 18, 46 28 Q 46 40, 32 34 Q 20 40, 10 34 Q -4 34, 4 24 Z"
              stroke={colors.ink} strokeWidth="1.3" fill={paper} />
            <path d="M26 14 Q 22 20, 24 30" stroke={colors.accentGreen} strokeWidth="1" fill="none" />
          </g>
        </svg>

        <span className="equil-drift" style={{
          position: 'absolute',
          top: 18,
          left: 84,
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: '0.04em',
          color: paper,
          background: colors.ink,
          padding: '3px 8px',
          borderRadius: 2,
          whiteSpace: 'nowrap',
        }}>
          4h 23m · Figma
        </span>
        <span className="equil-drift" style={{
          position: 'absolute',
          top: 62,
          left: 102,
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: '0.04em',
          color: paper,
          background: colors.ink,
          padding: '3px 8px',
          borderRadius: 2,
          whiteSpace: 'nowrap',
          animationDelay: '1.3s',
        }}>
          12 switches
        </span>
        <span className="equil-drift" style={{
          position: 'absolute',
          top: 104,
          left: 82,
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: '0.04em',
          color: paper,
          background: colors.ink,
          padding: '3px 8px',
          borderRadius: 2,
          whiteSpace: 'nowrap',
          animationDelay: '2.6s',
        }}>
          3 meetings
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end', textAlign: 'right' }}>
        <span style={{
          fontFamily: fonts.serif,
          fontWeight: 500,
          fontSize: 24,
          letterSpacing: '-0.01em',
          lineHeight: 1.5,
          color: colors.ink,
        }}>
          Only the counts
        </span>
        <span style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          lineHeight: '20px',
          color: colors.inkSoft,
          maxWidth: 280,
        }}>
          Aggregated figures, like &ldquo;four hours in Figma&rdquo;, are what leave your computer. Nothing else.
        </span>
      </div>
    </div>
  )
}

function PromiseRow({ text, caption, strike, bold }) {
  return (
    <li style={{
      padding: '24px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      <span style={{
        fontFamily: fonts.serif,
        fontWeight: bold ? 700 : 400,
        fontSize: 22,
        lineHeight: '30px',
        letterSpacing: '-0.005em',
        color: strike ? colors.muted : colors.ink,
        textDecoration: strike ? 'line-through' : 'none',
        textDecorationThickness: '1px',
      }}>
        {text}
      </span>
      <span style={{
        fontFamily: fonts.mono,
        fontSize: 10,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: colors.muted,
      }}>
        {caption}
      </span>
    </li>
  )
}

export default function Privacy({ onBack, onContinue }) {
  return (
    <div style={{
      background: colors.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      width: '100%',
    }}>
      <article style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 36,
        width: 'min(1040px, calc(100% - 48px))',
        padding: '24px 0 64px',
      }}>
        <div className="equil-reveal equil-reveal-d0" style={{ alignSelf: 'center' }}>
          <StepIndicator current={2} />
        </div>

        <div className="equil-reveal equil-reveal-d2" style={{ paddingTop: 8 }}>
          <h1 style={{
            fontFamily: fonts.serif,
            fontWeight: 500,
            fontSize: 'clamp(44px, 6vw, 80px)',
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            color: colors.ink,
            margin: '24px 0 0',
          }}>
            A note on what we <span style={{ fontWeight: 500, color: colors.accentGreen }}>watch</span>,<br />
            and what we <span style={{ fontWeight: 500, color: colors.accentGreen }}>never will</span>.
            <span style={{
              display: 'block',
              fontFamily: fonts.sans,
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: 24,
              letterSpacing: '0.01em',
              lineHeight: 0.98,
              color: colors.inkSoft,
              marginTop: 18,
            }}>
              Plainly, without footnotes, and without asterisks.
            </span>
          </h1>
        </div>

        <p className="equil-reveal equil-reveal-d3" style={{
          maxWidth: 760,
          fontFamily: fonts.serif,
          fontWeight: 400,
          fontSize: 22,
          lineHeight: 1.5,
          color: colors.ink,
          margin: 0,
        }}>
          <span style={{
            float: 'left',
            fontFamily: fonts.serif,
            fontWeight: 500,
            fontSize: 86,
            lineHeight: 0.82,
            padding: '8px 14px 0 0',
            color: colors.accentGreen,
          }}>
            E
          </span>
          quilybrium measures the shape of your working day. It learns the rhythm. The cadence. The quiet drift between focus and fatigue. It does not read a single word you type, say, or save. What follows is the full list, kept as short as honesty allows.
        </p>

        <div className="equil-reveal equil-reveal-d4">
          <BoundaryDiagram />
        </div>

        <div className="equil-reveal equil-reveal-d5 equil-privacy-grid">
          <div>
            <h2 style={{
              fontFamily: fonts.sans,
              fontSize: 21,
              fontWeight: 900,
              letterSpacing: '0.126em',
              textTransform: 'uppercase',
              color: colors.accentGreen,
              paddingBottom: 22,
              margin: 0,
            }}>
              What Equilybrium counts
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <PromiseRow
                text="Time spent inside each application you open."
                caption="Aggregated hourly"
                bold
              />
              <PromiseRow
                text="Switches between apps and browser tabs."
                caption="Count only · not destinations"
                bold
              />
              <PromiseRow
                text="The hours of the day you tend to work."
                caption="Daily histogram"
                bold
              />
              <PromiseRow
                text="The density of meetings on your calendar."
                caption="Counts · not titles or invitees"
                bold
              />
              <PromiseRow
                text="The quiet gaps when your machine is idle."
                caption="Inferred from keyboard & mouse"
                bold
              />
            </ul>
          </div>

          <div aria-hidden="true" style={{ width: 1, justifySelf: 'center' }} />

          <div>
            <h2 style={{
              fontFamily: fonts.sans,
              fontSize: 21,
              fontWeight: 900,
              letterSpacing: '0.126em',
              textTransform: 'uppercase',
              color: colors.inkSoft,
              paddingBottom: 22,
              margin: 0,
            }}>
              What Equilybrium never reads
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <PromiseRow
                text="The content of messages you write or receive."
                caption="Not sampled, not stored, not inferred"
                strike
              />
              <PromiseRow
                text="The words inside any document or file."
                caption="We do not touch the filesystem"
                strike
              />
              <PromiseRow
                text="Screenshots or recordings of your screen."
                caption="Capture APIs are disabled"
                strike
              />
              <PromiseRow
                text="What you type, including credentials."
                caption="No keystroke access, by design"
                strike
              />
              <PromiseRow
                text="The URLs you visit in the browser."
                caption="Only that a browser was open"
                strike
              />
            </ul>
          </div>
        </div>

        <section className="equil-reveal equil-reveal-d6" style={{
          marginTop: 36,
          padding: '32px 36px',
          background: paper,
          position: 'relative',
        }}>
          <span style={{
            position: 'absolute',
            top: -13,
            left: 36,
            background: colors.bg,
            padding: '0 12px',
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontSize: 26,
            color: colors.accentGreen,
            lineHeight: 1,
          }}>
            §
          </span>
          <div style={{
            fontFamily: fonts.serif,
            fontSize: 17,
            lineHeight: 1.6,
            color: colors.ink,
          }}>
            This agreement remains in force for as long as you use Equilybrium. Raw activity is processed on your machine, in memory. Only the aggregated counts above ever leave your computer.
          </div>
        </section>

        <section className="equil-reveal equil-reveal-d7" style={{
          marginTop: 28,
          padding: '28px 32px',
          background: 'transparent',
          border: `1px solid ${colors.line}`,
          position: 'relative',
        }}>
          <h3 style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: colors.accentGreen,
            margin: '0 0 12px',
          }}>
            4 · Medical disclaimer
          </h3>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            lineHeight: 1.6,
            color: colors.ink,
            margin: '0 0 12px',
          }}>
            <strong style={{ fontWeight: 700 }}>Important:</strong> Equilybrium is not a medical device and is not intended to diagnose, treat, cure, or prevent any medical condition.
          </p>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            lineHeight: 1.6,
            color: colors.inkSoft,
            margin: 0,
          }}>
            The insights provided are for informational purposes only. Always consult with a qualified healthcare provider for medical advice. Do not disregard professional medical advice or delay seeking it because of something you have read or received from our service.
          </p>
        </section>

        <div style={{ height: 96 }} />
      </article>

      <FloatingCTA
        primary={{ label: "I'm ready to", italicPart: 'install', onClick: onContinue }}
        delay={0.9}
      />
    </div>
  )
}
