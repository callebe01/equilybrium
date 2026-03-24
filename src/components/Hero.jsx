import heroImg from '../assets/hero.jpg';

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: 'calc(100vh - 20px)' }}
    >
      {/* Full-bleed hero image */}
      <img
        src={heroImg}
        alt="Professional commuting on a train, looking out the window"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 30%',
          display: 'block',
        }}
      />

      {/* Gradient overlay — heavier at bottom for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right,
              rgba(26,26,24,0.82) 0%,
              rgba(26,26,24,0.6) 35%,
              rgba(26,26,24,0.15) 65%,
              rgba(26,26,24,0.0) 100%
            )
          `,
        }}
      />

      {/* Copy overlay — center left */}
      <div
        className="absolute top-0 bottom-0 left-0 right-0 flex items-center"
        style={{ padding: '0 clamp(1.25rem, 5vw, 3rem)' }}
      >
        <div style={{ maxWidth: '740px' }}>
          <h1
            className="opacity-0"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4.8vw, 4.5rem)',
              fontWeight: 400,
              color: '#fff',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              marginBottom: 'clamp(1.5rem, 2vw, 2.25rem)',
              animation: 'fadeUp 0.7s ease 0.5s forwards',
              textShadow:
                '0 1px 2px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15)',
            }}
          >
            Prevent Burnout
            <br />
            Before It Happens.
          </h1>
          <p
            className="opacity-0"
            style={{
              fontSize: 'clamp(1.0625rem, 0.3vw + 0.95rem, 1.25rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.82)',
              lineHeight: 1.65,
              maxWidth: '500px',
              letterSpacing: '0.015em',
              marginBottom: '2rem',
              animation: 'fadeUp 0.7s ease 0.6s forwards',
            }}
          >
            Equilybrium monitors your team's digital workload patterns and
            surfaces what needs your attention — quietly, before it becomes
            urgent.
          </p>
          <div
            className="flex items-center gap-5 opacity-0"
            style={{ animation: 'fadeUp 0.7s ease 0.7s forwards' }}
          >
            <a
              href="#"
              className="group no-underline hover:-translate-y-px"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: '#fff',
                border: '1px solid #fff',
                color: 'var(--ink)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                letterSpacing: '0.03em',
                padding: '14px 28px',
                borderRadius: '100px',
                cursor: 'pointer',
                transition: 'background 0.2s, transform 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.88)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
            >
              Start Now
              <span
                className="transition-transform group-hover:translate-x-[3px]"
                style={{ fontSize: '16px' }}
              >
                →
              </span>
            </a>
            <a
              href="#"
              className="no-underline hover:-translate-y-px"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: 'rgba(255,255,255,0.7)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                fontWeight: 400,
                letterSpacing: '0.03em',
                cursor: 'pointer',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.95)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              Request Demo
            </a>
            <span
              style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.02em',
              }}
            >
              Currently in private beta
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
