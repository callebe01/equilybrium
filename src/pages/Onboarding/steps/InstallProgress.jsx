import StepIndicator from '../StepIndicator'
import FloatingCTA from '../FloatingCTA'
import { colors, fonts } from '../tokens'

function ChromeIcon({ size = 18 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width={size} height={size} fill="#FFFFFF" style={{ flexShrink: 0 }}>
      <path d="M928 512.3v-.3c0-229.8-186.2-416-416-416S96 282.2 96 512v.4c0 229.8 186.2 416 416 416s416-186.2 416-416v-.3.2zM676.7 638.2c53.5-82.2 52.5-189.4-11.1-263.7l162.4-8.4c20.5 44.4 32 93.8 32 145.9 0 185.2-144.6 336.6-327.1 347.4l143.8-221.2zM512 652.3c-77.5 0-140.2-62.7-140.2-140.2 0-77.7 62.7-140.2 140.2-140.2S652.2 434.5 652.2 512 589.5 652.3 512 652.3zM512 164c121.3 0 228.2 62.1 290.4 156.2l-263.6-13.9c-97.5-5.7-190.2 49.2-222.3 141.1L227.8 311c63.1-88.9 166.9-147 284.2-147zM164 512c0-55.9 13.2-108.7 36.6-155.5l119.7 235.4c44.1 86.7 137.4 139.7 234 121.6l-74 145.1C302.9 842.5 164 693.5 164 512z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function NumberPill({ n, active }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 22,
      height: 22,
      padding: '6px 8px',
      borderRadius: 999,
      background: active ? colors.ink : colors.lineSoft,
      color: active ? '#FFFFFF' : colors.muted,
      fontFamily: fonts.sans,
      fontWeight: 600,
      fontSize: 12,
      flexShrink: 0,
    }}>
      {n}
    </div>
  )
}

function StepCard({ n, title, body, active, action }) {
  return (
    <div style={{
      background: colors.surface,
      borderRadius: 12,
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      opacity: active ? 1 : 0.63,
      alignSelf: 'stretch',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ paddingTop: 4 }}>
          <NumberPill n={n} active={active} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          <h3 style={{
            fontFamily: fonts.serif,
            fontWeight: 600,
            fontSize: 20,
            lineHeight: '26px',
            letterSpacing: '-0.02em',
            color: colors.ink,
            margin: 0,
          }}>
            {title}
          </h3>
          <p style={{
            fontFamily: fonts.sans,
            fontSize: 14,
            lineHeight: '22px',
            color: colors.inkSoft,
            margin: 0,
          }}>
            {body}
          </p>
          {action && (
            <button type="button" onClick={action.onClick} style={{
              alignSelf: 'flex-start',
              marginTop: 4,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 8,
              background: colors.ink,
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontFamily: fonts.sans,
              fontWeight: 500,
              fontSize: 14,
            }}>
              <ChromeIcon size={16} />
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function BrowserMock() {
  return (
    <div className="equil-browser-mock" style={{
      width: 437,
      borderRadius: 18,
      background: colors.surface,
      border: `0.5px solid #C6C6C6`,
      overflow: 'hidden',
      position: 'relative',
      minHeight: 420,
      flexShrink: 0,
      alignSelf: 'stretch',
    }}>
      <div style={{
        background: colors.warmWindow,
        height: 49,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: 12,
      }}>
        <div style={{ display: 'flex', gap: 8, opacity: 0.35 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: colors.red }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: colors.amber }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: colors.lime }} />
        </div>
        <div style={{
          flex: 1,
          height: 25,
          borderRadius: 10,
          background: colors.surface,
          border: `0.5px solid ${colors.warmWindow}`,
          opacity: 0.55,
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
        }}>
          <span style={{
            fontFamily: fonts.sans,
            fontSize: 10,
            color: colors.inkSoft,
          }}>
            app.equilybrium.com/setup
          </span>
        </div>
        <div style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: colors.ink,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <DownloadIcon />
        </div>
      </div>

      <div style={{
        position: 'absolute',
        right: 20,
        top: 70,
        background: colors.surface,
        border: `0.5px solid ${colors.pill}`,
        boxShadow: `3px 2px 13px ${colors.pill}66`,
        borderRadius: 11,
        padding: '5px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <div style={{
          width: 19,
          height: 21,
          background: 'linear-gradient(135deg, #F7F2E9 0%, #E8E2D9 100%)',
          borderRadius: 3,
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 6,
            height: 6,
            background: colors.surface,
            borderBottomLeftRadius: 2,
          }} />
        </div>
        <span style={{
          fontFamily: fonts.sans,
          fontSize: 10,
          color: '#000000',
        }}>
          Equilybrium.dmg
        </span>
      </div>

      <div style={{
        position: 'absolute',
        left: 18,
        right: 18,
        top: 110,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        opacity: 0.2,
      }}>
        <div style={{ width: '42%', height: 9, borderRadius: 999, background: '#BABAB9' }} />
        <div style={{ width: '58%', height: 9, borderRadius: 999, background: '#DCDAD5' }} />
      </div>

      <div style={{
        position: 'absolute',
        left: 18,
        right: 18,
        top: 176,
        display: 'flex',
        gap: 12,
      }}>
        <div style={{ flex: 1, height: 75, borderRadius: 10, background: '#F7FAF9' }} />
        <div style={{ flex: 1, height: 75, borderRadius: 10, background: '#F9F7F2' }} />
        <div style={{ flex: 1, height: 75, borderRadius: 10, background: '#F7F6F1' }} />
      </div>

      <div style={{
        position: 'absolute',
        left: 18,
        right: 18,
        top: 280,
        height: 144,
        borderRadius: 10,
        background: '#FCFBF9',
      }} />
    </div>
  )
}

const CHROME_EXT_URL = 'https://chromewebstore.google.com/detail/equilybrium-burnout-preve/efaefilbmhbhkfdehnhjagichjcjfchl'

export default function InstallProgress({ onContinue, onSkipChrome }) {
  const handleAddToChrome = () => {
    window.open(CHROME_EXT_URL, '_blank', 'noopener,noreferrer')
    onContinue()
  }
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 28,
        width: '100%',
        maxWidth: 1071,
        padding: '0 24px',
        boxSizing: 'border-box',
      }}>
        <div className="equil-reveal equil-reveal-d0" style={{ alignSelf: 'stretch', display: 'flex', justifyContent: 'center' }}>
          <StepIndicator current={3} />
        </div>

        <div className="equil-reveal equil-reveal-d1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, alignSelf: 'stretch' }}>
          <h1 className="equil-install-progress-title" style={{ color: colors.ink }}>
            You&apos;re 2 minutes from your dashboard
          </h1>
          <p className="equil-install-subtitle" style={{ color: colors.inkSoft }}>
            Download is finishing in the corner of your browser. Two quick things, then you&apos;re set.
          </p>
        </div>

        <div className="equil-reveal equil-reveal-d2 equil-install-progress-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, minWidth: 0, maxWidth: 540, width: '100%' }}>
            <StepCard
              n={1}
              title="Open the installer"
              body="Find Equilybrium.dmg in your Downloads, then drag the app into Applications. Launch it once so it can set itself up."
            />
            <StepCard
              n={2}
              active
              title="Add the browser extension"
              body="Needed to measure what happens inside the browser. Opens the Chrome Web Store in a new tab, takes one click."
            />
          </div>
          <BrowserMock />
        </div>

        <ClientNote />

        <div style={{ paddingBottom: 96 }} />
      </div>

      <FloatingCTA
        primary={{ label: 'Add to', italicPart: 'Chrome', onClick: handleAddToChrome }}
        secondary={{ label: 'Skip the extension for now', onClick: onSkipChrome, variant: 'link' }}
        delay={0.7}
      />
    </div>
  )
}

function ClientNote() {
  return (
    <aside style={{
      alignSelf: 'stretch',
      marginTop: 16,
      padding: '24px 28px',
      borderRadius: 14,
      background: '#FFF7DB',
      border: '1px dashed #C9A84A',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      position: 'relative',
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
        <span style={{
          fontFamily: fonts.sans,
          fontSize: 12,
          color: '#8A6F1D',
        }}>
          Item apenas de alinhamento. Aponta questões em aberto de produto e engenharia para esta tela.
        </span>
      </div>

      <div style={{
        fontFamily: fonts.sans,
        fontSize: 14,
        lineHeight: '22px',
        color: '#4A3C0F',
      }}>
        <strong style={{ fontWeight: 600 }}>O agente de desktop é um bloqueio obrigatório.</strong> O produto só funciona depois que ele está instalado, então este passo não pode ser pulado ou adiado. Precisamos de um jeito de saber que o usuário concluiu a instalação antes de chegar no dashboard.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#8A6F1D',
        }}>
          Fluxo proposto de transferência
        </div>
        <ol style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          lineHeight: '22px',
          color: '#4A3C0F',
          margin: 0,
          paddingLeft: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}>
          <li>Quando o usuário clica em Download, o servidor emite um token de instalação de curta duração vinculado à sessão dele.</li>
          <li>O instalador lê esse token ao abrir. O usuário já está autenticado e pula a tela de login.</li>
          <li>O token expira em alguns minutos. Se ele expirar antes do instalador abrir, o instalador mostra o fluxo de login normal.</li>
          <li>Quando a instalação termina, o instalador se fecha sozinho e devolve o foco para o navegador.</li>
          <li>O navegador aterrissa no dashboard com um convite claro para adicionar a extensão do Chrome como próximo passo.</li>
        </ol>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{
          fontFamily: fonts.mono,
          fontWeight: 500,
          fontSize: 12,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#8A6F1D',
        }}>
          Questão em aberto para engenharia
        </div>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: 14,
          lineHeight: '22px',
          color: '#4A3C0F',
          margin: 0,
        }}>
          Como o navegador descobre que a instalação terminou? Caminhos possíveis incluem um callback do agente de desktop, um endpoint de polling, ou um deep link de volta para o navegador assim que a instalação é concluída. Vale também decidir qual deve ser a duração do token e como uma instalação com falha é recuperada.
        </p>
      </div>
    </aside>
  )
}
