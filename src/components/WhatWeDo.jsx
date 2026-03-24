import useScrollProgress from '../hooks/useScrollProgress';

export default function WhatWeDo() {
  const { ref, progress } = useScrollProgress();

  // Circles drift from left to right as user scrolls through the section
  const drift = progress * 500;

  return (
    <section
      id="what-we-do"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: '#fff',
        padding: '140px 48px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Overlapping circles — animated on scroll */}
      <div className="absolute inset-0 pointer-events-none" style={{ overflow: 'hidden' }}>
        {/* Left circle */}
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            border: '1px solid rgba(122,140,118,0.15)',
            top: '50%',
            left: '-80px',
            transform: `translate(${drift * 0.8}px, -50%)`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        />
        {/* Right circle — overlapping, moves slightly faster */}
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            border: '1px solid rgba(122,140,118,0.15)',
            top: '50%',
            left: '180px',
            transform: `translate(${drift}px, -50%)`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        />
        {/* Intersection glow — follows the average */}
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 70% 50%, rgba(122,140,118,0.06) 0%, transparent 70%)',
            top: '50%',
            left: '-80px',
            transform: `translate(${drift * 0.9}px, -50%)`,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Left — Section intro */}
          <div>
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
              What Equilybrium does
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 3.5vw, 52px)',
                fontWeight: 400,
                color: 'var(--ink)',
                lineHeight: 1.12,
                letterSpacing: '-0.02em',
                marginBottom: '28px',
              }}
            >
              It reads the signals
              <br />
              you've learned to ignore.
            </h2>
            <p
              style={{
                fontSize: '17px',
                fontWeight: 300,
                color: 'var(--muted)',
                lineHeight: 1.7,
                maxWidth: '440px',
              }}
            >
              Equilybrium uses AI to analyze your work patterns, sleep data, and
              health metrics. It surfaces early signs of burnout weeks before you
              feel them, giving you time to act.
            </p>
          </div>

          {/* Right — Feature points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {[
              {
                number: '01',
                title: 'Early detection',
                desc: 'Identifies burnout signals 3 to 4 weeks before traditional methods. Patterns emerge in your data long before they surface as symptoms.',
              },
              {
                number: '02',
                title: 'Personalized insights',
                desc: 'Machine learning builds a model of your unique rhythms. Recommendations adapt to your patterns, not generic averages.',
              },
              {
                number: '03',
                title: 'Continuous monitoring',
                desc: 'A daily wellness score drawn from your activity, sleep, and workload. Track trends over time and understand what drives your energy.',
              },
            ].map((item) => (
              <div key={item.number} style={{ display: 'flex', gap: '24px' }}>
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '36px',
                    fontWeight: 400,
                    color: 'rgba(122,140,118,0.3)',
                    lineHeight: 1,
                    flexShrink: 0,
                    width: '48px',
                  }}
                >
                  {item.number}
                </span>
                <div>
                  <h3
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '16px',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      letterSpacing: '0.01em',
                      marginBottom: '8px',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 300,
                      color: 'var(--muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
