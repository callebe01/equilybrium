import { useState, useEffect } from 'react';

const tags = [
  { label: 'Meeting load', direction: '↑', side: 'left', top: '27%', connector: 182 },
  { label: 'Context switching', direction: '↑', side: 'left', top: '51%', connector: 244 },
  { label: 'Sleep quality', direction: '↓', side: 'left', top: '76%', connector: 196 },
  { label: 'Late hours', direction: '↑', side: 'right', top: '26%', connector: 208 },
  { label: 'Focus', direction: '↓', side: 'right', top: '51%', connector: 252 },
  { label: 'Recovery', direction: '↓', side: 'right', top: '74%', connector: 202 },
];

const tagSparkOffsets = [
  { left: '10%', top: '48%', size: 2.5, blur: 0.4 },
  { left: '18%', top: '44%', size: 1.8, blur: 0.8 },
  { left: '28%', top: '52%', size: 3.4, blur: 0.2 },
  { left: '42%', top: '45%', size: 2.4, blur: 0.6 },
  { left: '56%', top: '55%', size: 1.8, blur: 0.5 },
  { left: '68%', top: '46%', size: 4.2, blur: 0.1 },
  { left: '82%', top: '53%', size: 2.2, blur: 0.7 },
  { left: '90%', top: '49%', size: 1.6, blur: 0.9 },
];

const silhouettePath = `
  M104.265,117.959c-0.304,3.58,2.126,22.529,3.38,29.959c0.597,3.52,2.234,9.255,1.645,12.3
  c-0.841,4.244-1.084,9.736-0.621,12.934c0.292,1.942,1.211,10.899-0.104,14.175c-0.688,1.718-1.949,10.522-1.949,10.522
  c-3.285,8.294-1.431,7.886-1.431,7.886c1.017,1.248,2.759,0.098,2.759,0.098c1.327,0.846,2.246-0.201,2.246-0.201
  c1.139,0.943,2.467-0.116,2.467-0.116c1.431,0.743,2.758-0.627,2.758-0.627c0.822,0.414,1.023-0.109,1.023-0.109
  c2.466-0.158-1.376-8.05-1.376-8.05c-0.92-7.088,0.913-11.033,0.913-11.033c6.004-17.805,6.309-22.53,3.909-29.24
  c-0.676-1.937-0.847-2.704-0.536-3.545c0.719-1.941,0.195-9.748,1.072-12.848c1.692-5.979,3.361-21.142,4.231-28.217
  c1.169-9.53-4.141-22.308-4.141-22.308c-1.163-5.2,0.542-23.727,0.542-23.727c2.381,3.705,2.29,10.245,2.29,10.245
  c-0.378,6.859,5.541,17.342,5.541,17.342c2.844,4.332,3.921,8.442,3.921,8.747c0,1.248-0.273,4.269-0.273,4.269l0.109,2.631
  c0.049,0.67,0.426,2.977,0.365,4.092c-0.444,6.862,0.646,5.571,0.646,5.571c0.92,0,1.931-5.522,1.931-5.522
  c0,1.424-0.348,5.687,0.42,7.295c0.919,1.918,1.595-0.329,1.607-0.78c0.243-8.737,0.768-6.448,0.768-6.448
  c0.511,7.088,1.139,8.689,2.265,8.135c0.853-0.407,0.073-8.506,0.073-8.506c1.461,4.811,2.569,5.577,2.569,5.577
  c2.411,1.693,0.92-2.983,0.585-3.909c-1.784-4.92-1.839-6.625-1.839-6.625c2.229,4.421,3.909,4.257,3.909,4.257
  c2.174-0.694-1.9-6.954-4.287-9.953c-1.218-1.528-2.789-3.574-3.245-4.789c-0.743-2.058-1.304-8.674-1.304-8.674
  c-0.225-7.807-2.155-11.198-2.155-11.198c-3.3-5.282-3.921-15.135-3.921-15.135l-0.146-16.635
  c-1.157-11.347-9.518-11.429-9.518-11.429c-8.451-1.258-9.627-3.988-9.627-3.988c-1.79-2.576-0.767-7.514-0.767-7.514
  c1.485-1.208,2.058-4.415,2.058-4.415c2.466-1.891,2.345-4.658,1.206-4.628c-0.914,0.024-0.707-0.733-0.707-0.733
  C115.068,0.636,104.01,0,104.01,0h-1.688c0,0-11.063,0.636-9.523,13.089c0,0,0.207,0.758-0.715,0.733
  c-1.136-0.03-1.242,2.737,1.215,4.628c0,0,0.572,3.206,2.058,4.415c0,0,1.023,4.938-0.767,7.514c0,0-1.172,2.73-9.627,3.988
  c0,0-8.375,0.082-9.514,11.429l-0.158,16.635c0,0-0.609,9.853-3.922,15.135c0,0-1.921,3.392-2.143,11.198
  c0,0-0.563,6.616-1.303,8.674c-0.451,1.209-2.021,3.255-3.249,4.789c-2.408,2.993-6.455,9.24-4.29,9.953
  c0,0,1.689,0.164,3.909-4.257c0,0-0.046,1.693-1.827,6.625c-0.35,0.914-1.839,5.59,0.573,3.909c0,0,1.117-0.767,2.569-5.577
  c0,0-0.779,8.099,0.088,8.506c1.133,0.555,1.751-1.047,2.262-8.135c0,0,0.524-2.289,0.767,6.448
  c0.012,0.451,0.673,2.698,1.596,0.78c0.779-1.608,0.429-5.864,0.429-7.295c0,0,0.999,5.522,1.933,5.522
  c0,0,1.099,1.291,0.648-5.571c-0.073-1.121,0.32-3.422,0.369-4.092l0.106-2.631c0,0-0.274-3.014-0.274-4.269
  c0-0.311,1.078-4.415,3.921-8.747c0,0,5.913-10.488,5.532-17.342c0,0-0.082-6.54,2.299-10.245c0,0,1.69,18.526,0.545,23.727
  c0,0-5.319,12.778-4.146,22.308c0.864,7.094,2.53,22.237,4.226,28.217c0.886,3.094,0.362,10.899,1.072,12.848
  c0.32,0.847,0.152,1.627-0.536,3.545c-2.387,6.71-2.083,11.436,3.921,29.24c0,0,1.848,3.945,0.914,11.033
  c0,0-3.836,7.892-1.379,8.05c0,0,0.192,0.523,1.023,0.109c0,0,1.327,1.37,2.761,0.627c0,0,1.328,1.06,2.463,0.116
  c0,0,0.91,1.047,2.237,0.201c0,0,1.742,1.175,2.777-0.098c0,0,1.839,0.408-1.435-7.886c0,0-1.254-8.793-1.945-10.522
  c-1.318-3.275-0.387-12.251-0.106-14.175c0.453-3.216,0.21-8.695-0.618-12.934c-0.606-3.038,1.035-8.774,1.641-12.3
  c1.245-7.423,3.685-26.373,3.38-29.959l1.008,0.354C103.809,118.312,104.265,117.959,104.265,117.959z
`;

function HumanSilhouette() {
  return (
    <div
      style={{
        position: 'relative',
        width: '260px',
        height: '540px',
      }}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '24px 40px 24px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 34%, rgba(235,210,180,0.22) 0%, rgba(235,210,180,0.1) 34%, transparent 74%)',
          filter: 'blur(34px)',
          opacity: 0.88,
        }}
      />

      <div
        className="absolute pointer-events-none"
        style={{
          inset: '6px 52px 48px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 24%, rgba(255,247,236,0.18) 0%, rgba(255,247,236,0.06) 46%, transparent 78%)',
          filter: 'blur(42px)',
          opacity: 0.72,
        }}
      />

      <svg
        width="260"
        height="520"
        viewBox="52 0 100 206.326"
        fill="none"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          zIndex: 2,
          overflow: 'visible',
        }}
      >
        <defs>
          <filter id="ambientBlur" x="-60%" y="-24%" width="220%" height="180%">
            <feGaussianBlur stdDeviation="9.5" />
          </filter>
          <filter id="bodyBlur" x="-40%" y="-20%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="3.8" />
          </filter>
          <filter id="innerGlowBlur" x="-90%" y="-80%" width="280%" height="280%">
            <feGaussianBlur stdDeviation="15" />
          </filter>
          <linearGradient id="bodyAmbient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(249,238,223,0.36)" />
            <stop offset="24%" stopColor="rgba(232,209,182,0.3)" />
            <stop offset="72%" stopColor="rgba(188,161,135,0.2)" />
            <stop offset="100%" stopColor="rgba(155,129,107,0.11)" />
          </linearGradient>
          <linearGradient id="bodyCore" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,245,232,0.72)" />
            <stop offset="22%" stopColor="rgba(237,212,181,0.64)" />
            <stop offset="70%" stopColor="rgba(192,165,138,0.42)" />
            <stop offset="100%" stopColor="rgba(157,130,109,0.2)" />
          </linearGradient>
          <radialGradient id="coreGlow" cx="50%" cy="26%" r="64%">
            <stop offset="0%" stopColor="rgba(255,248,238,0.5)" />
            <stop offset="36%" stopColor="rgba(239,214,184,0.22)" />
            <stop offset="100%" stopColor="rgba(239,214,184,0)" />
          </radialGradient>
        </defs>

        <g filter="url(#innerGlowBlur)" opacity="0.95">
          <path d={silhouettePath} fill="url(#coreGlow)" />
        </g>

        <g filter="url(#ambientBlur)" opacity="0.85">
          <path d={silhouettePath} fill="url(#bodyAmbient)" />
        </g>

        <g filter="url(#bodyBlur)" opacity="0.96">
          <path d={silhouettePath} fill="url(#bodyCore)" />
        </g>
      </svg>

      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          bottom: '8px',
          width: '134px',
          height: '20px',
          transform: 'translateX(-50%)',
          borderRadius: '999px',
          background: 'radial-gradient(ellipse, rgba(228,205,176,0.24) 0%, rgba(228,205,176,0.09) 44%, transparent 76%)',
          filter: 'blur(10px)',
          opacity: 0.85,
        }}
      />
    </div>
  );
}

function SignalTag({ tag, index, activeIndex, hoveredIndex, setHoveredIndex }) {
  const isHovered = hoveredIndex === index;
  const isActive = activeIndex === index;
  const isHighlighted = isHovered || isActive;
  const isNegative = tag.direction === '↓';
  const glowColor = isNegative ? 'rgba(206,220,200,0.18)' : 'rgba(246,214,180,0.22)';
  const strongGlowColor = isNegative ? 'rgba(231,242,225,0.28)' : 'rgba(255,228,198,0.36)';
  const textColor = isNegative
    ? isHighlighted
      ? 'rgba(242,246,236,0.92)'
      : 'rgba(197,204,192,0.48)'
    : isHighlighted
      ? 'rgba(255,239,216,0.96)'
      : 'rgba(205,190,171,0.48)';
  const arrowColor = isNegative
    ? isHighlighted
      ? 'rgba(239,245,233,0.94)'
      : 'rgba(200,207,196,0.5)'
    : isHighlighted
      ? 'rgba(255,237,212,0.96)'
      : 'rgba(204,188,168,0.52)';
  const connectorColor = isNegative ? 'rgba(210,221,205,0.2)' : 'rgba(247,217,184,0.26)';
  const rowJustify = tag.side === 'left' ? 'flex-end' : 'flex-start';

  return (
    <div
      style={{
        position: 'absolute',
        top: tag.top,
        [tag.side]: 0,
        width: '320px',
        transform: 'translateY(-50%)',
        display: 'flex',
        justifyContent: rowJustify,
        zIndex: isHighlighted ? 4 : 2,
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '18px',
          flexDirection: tag.side === 'left' ? 'row' : 'row-reverse',
        }}
      >
        <button
          type="button"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onFocus={() => setHoveredIndex(index)}
          onBlur={() => setHoveredIndex(null)}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 0',
            border: 'none',
            background: 'transparent',
            cursor: 'default',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(20px, 1.55vw, 32px)',
            fontWeight: isHighlighted ? 300 : 280,
            letterSpacing: '0.005em',
            color: textColor,
            textAlign: tag.side === 'left' ? 'right' : 'left',
            transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
            opacity: isHighlighted ? 1 : 0.82,
            transition: 'transform 0.35s ease, opacity 0.35s ease, color 0.35s ease, text-shadow 0.35s ease',
            textShadow: isHighlighted
              ? `0 0 12px ${strongGlowColor}, 0 0 30px ${glowColor}`
              : '0 0 10px rgba(226,209,189,0.05)',
          }}
        >
          <div
            className="absolute pointer-events-none"
            style={{
              inset: '-10px -24px',
              background: `radial-gradient(ellipse at center, ${strongGlowColor} 0%, rgba(255,255,255,0) 70%)`,
              filter: 'blur(18px)',
              opacity: isHighlighted ? 0.9 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
          {tagSparkOffsets.map((spark, sparkIndex) => (
            <span
              key={`${tag.label}-${sparkIndex}`}
              className="absolute pointer-events-none"
              style={{
                left: spark.left,
                top: spark.top,
                width: `${spark.size}px`,
                height: `${spark.size}px`,
                marginLeft: '-1px',
                marginTop: '-1px',
                borderRadius: '999px',
                background: isNegative ? 'rgba(240,247,236,0.85)' : 'rgba(255,242,222,0.9)',
                boxShadow: isHighlighted ? `0 0 12px ${strongGlowColor}` : 'none',
                filter: `blur(${spark.blur}px)`,
                opacity: isHighlighted ? 0.78 : 0,
                transition: 'opacity 0.35s ease',
              }}
            />
          ))}
          <span style={{ position: 'relative', zIndex: 1 }}>{tag.label}</span>
          <span
            style={{
              position: 'relative',
              zIndex: 1,
              fontSize: '1.3em',
              fontWeight: 400,
              lineHeight: 0.8,
              color: arrowColor,
              textShadow: isHighlighted
                ? `0 0 12px ${strongGlowColor}, 0 0 28px ${glowColor}`
                : 'none',
              transition: 'color 0.35s ease, text-shadow 0.35s ease',
            }}
          >
            {tag.direction}
          </span>
        </button>

        <div
          className="pointer-events-none"
          style={{
            position: 'relative',
            width: `${tag.connector}px`,
            height: '16px',
            flexShrink: 0,
            opacity: isHighlighted ? 1 : 0.45,
            transition: 'opacity 0.35s ease',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              transform: 'translateY(-50%)',
              background:
                tag.side === 'left'
                  ? `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${connectorColor} 48%, ${connectorColor} 100%)`
                  : `linear-gradient(90deg, ${connectorColor} 0%, ${connectorColor} 52%, rgba(255,255,255,0) 100%)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              [tag.side === 'left' ? 'right' : 'left']: 0,
              width: '7px',
              height: '7px',
              transform: 'translateY(-50%)',
              borderRadius: '999px',
              background: isNegative ? 'rgba(231,242,225,0.72)' : 'rgba(255,234,206,0.8)',
              boxShadow: isHighlighted ? `0 0 16px ${strongGlowColor}` : '0 0 8px rgba(255,235,210,0.08)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function OverloadOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    let timeoutId;

    const scheduleNextHighlight = () => {
      const nextDelay = 1800 + Math.random() * 2200;

      timeoutId = window.setTimeout(() => {
        setActiveIndex((currentIndex) => {
          let nextIndex = currentIndex;

          while (nextIndex === currentIndex) {
            nextIndex = Math.floor(Math.random() * tags.length);
          }

          return nextIndex;
        });

        scheduleNextHighlight();
      }, nextDelay);
    };

    scheduleNextHighlight();

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'var(--ink)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 48px',
      }}
    >
      {/* Warm atmospheric glow behind the figure */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180,160,130,0.15) 0%, rgba(180,160,130,0.05) 40%, transparent 70%)',
          top: '46%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content container */}
      <div style={{ position: 'relative', width: '800px', height: '640px' }}>
        {/* Title — centered at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            zIndex: 3,
            width: '100%',
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(24px, 2.8vw, 40px)',
              fontWeight: 400,
              color: 'var(--cream)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            What may be driving
            <br />
            overload this week?
          </h2>
        </div>

        {/* Human silhouette */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '50%',
            bottom: '32px',
            transform: 'translateX(-50%)',
            zIndex: 1,
          }}
        >
          <HumanSilhouette />
        </div>

        {/* Core glow on the figure */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '180px',
            height: '340px',
            left: '50%',
            bottom: '40px',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(ellipse at 50% 30%, rgba(220,200,170,0.18) 0%, transparent 60%)',
            filter: 'blur(25px)',
            zIndex: 0,
          }}
        />

        {/* Side signals */}
        <div
          style={{
            position: 'absolute',
            top: '46%',
            left: '50%',
            transform: 'translate(-50%, -20%)',
            width: '700px',
            height: '700px',
            zIndex: 2,
          }}
        >
          {tags.map((tag, index) => (
            <SignalTag
              key={tag.label}
              tag={tag}
              index={index}
              activeIndex={activeIndex}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
