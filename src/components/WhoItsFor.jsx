import useScrollProgress from '../hooks/useScrollProgress';

export default function WhoItsFor() {
  const { ref, progress } = useScrollProgress();

  // Circles start overlapping and spread apart as user scrolls
  const spread = progress * 300;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: 'var(--ink)',
        padding: '140px 48px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Overlapping circles — separate on scroll */}
      <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
        {/* Left circle — drifts left */}
        <div
          style={{
            position: 'absolute',
            width: '900px',
            height: '900px',
            borderRadius: '50%',
            border: '1px solid rgba(122,140,118,0.12)',
            background: 'radial-gradient(circle at center, rgba(122,140,118,0.04) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% - ${spread}px), -50%)`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        />
        {/* Right circle — drifts right */}
        <div
          style={{
            position: 'absolute',
            width: '900px',
            height: '900px',
            borderRadius: '50%',
            border: '1px solid rgba(122,140,118,0.12)',
            background: 'radial-gradient(circle at center, rgba(122,140,118,0.04) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: `translate(calc(-50% + ${spread}px), -50%)`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        />
        {/* Intersection glow — fades as circles separate */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(122,140,118,0.08) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: Math.max(0, 1 - progress * 2),
            transition: 'opacity 0.05s linear',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Section header — centered */}
        <div style={{ textAlign: 'center', marginBottom: '100px' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--sage)',
              marginBottom: '20px',
            }}
          >
            Who it's for
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(32px, 3.5vw, 52px)',
              fontWeight: 400,
              color: 'var(--cream)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            Two sides of the same balance.
          </h2>
        </div>

        {/* Two audience cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px',
          }}
        >
          {/* Individuals card */}
          <div
            style={{
              background: 'rgba(245,242,236,0.04)',
              border: '1px solid rgba(245,242,236,0.08)',
              borderRadius: '24px',
              padding: '56px 48px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1.5px solid var(--sage)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px',
                opacity: 0.6,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: 400,
                color: 'var(--cream)',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              For individuals
            </h3>
            <p
              style={{
                fontSize: '15px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                marginBottom: '36px',
              }}
            >
              You know the feeling. Working late becomes the default. Sleep
              shortens. Focus fades. Equilybrium watches the patterns you
              can't see and tells you when to step back, before you
              have to.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Daily wellness score from your real data',
                'Smart alerts when your patterns shift',
                'Personalized recovery recommendations',
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--sage)',
                      flexShrink: 0,
                      opacity: 0.5,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Teams card */}
          <div
            style={{
              background: 'rgba(245,242,236,0.04)',
              border: '1px solid rgba(245,242,236,0.08)',
              borderRadius: '24px',
              padding: '56px 48px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: '1.5px solid var(--sage)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '32px',
                opacity: 0.6,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="1.5">
                <circle cx="9" cy="7" r="3" />
                <circle cx="17" cy="7" r="3" />
                <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                <path d="M21 21v-2a3 3 0 0 0-2-2.83" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '28px',
                fontWeight: 400,
                color: 'var(--cream)',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              For teams
            </h3>
            <p
              style={{
                fontSize: '15px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                marginBottom: '36px',
              }}
            >
              Burnout spreads quietly through a team. By the time someone
              speaks up, the damage is already compounding. Equilybrium
              gives leaders visibility into team wellness without
              compromising anyone's privacy.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Aggregate team wellness trends',
                'Early warning before attrition spikes',
                'Anonymous, privacy-first architecture',
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--sage)',
                      flexShrink: 0,
                      opacity: 0.5,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
