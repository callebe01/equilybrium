import logo from '../assets/logo.png';
import { useTranslation } from '../i18n';

/* ── SVG Social Icons ──────────────────────────────────── */
const XIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

function getSocialLinks(t) {
  return [
    { icon: XIcon, href: '#', label: t('footer.social.twitter') },
    { icon: LinkedInIcon, href: '#', label: t('footer.social.linkedin') },
    { icon: InstagramIcon, href: '#', label: t('footer.social.instagram') },
  ];
}

/* ── Footer link columns ───────────────────────────────── */
function getFooterLinks(t) {
  return [
    {
      heading: t('footer.columns.product'),
      links: [
        { label: t('footer.columns.product.howItWorks'), href: '#' },
        { label: t('footer.columns.product.forIndividuals'), href: '#' },
        { label: t('footer.columns.product.forTeams'), href: '#' },
        { label: t('footer.columns.product.pricing'), href: '#' },
      ],
    },
    {
      heading: t('footer.columns.support'),
      links: [
        { label: t('footer.columns.support.contact'), href: '#' },
        { label: t('footer.columns.support.privacyPolicy'), href: '#' },
        { label: t('footer.columns.support.termsOfService'), href: '#' },
      ],
    },
  ];
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  const socialLinks = getSocialLinks(t);
  const footerLinks = getFooterLinks(t);

  return (
    <footer
      style={{
        background: 'var(--ink)',
        padding: 'clamp(64px, 8vw, 96px) clamp(1.25rem, 5vw, 3rem) 0',
        color: 'rgba(255,255,255,0.6)',
      }}
    >
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr;
          gap: clamp(32px, 4vw, 64px);
        }
        .footer-link {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.4;
          transition: color 0.2s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: rgba(255,255,255,0.85);
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <img
              src={logo}
              alt="Equilybrium"
              style={{
                height: '36px',
                width: 'auto',
                marginBottom: '20px',
                filter: 'brightness(10)',
                opacity: 0.9,
              }}
            />
            <p
              style={{
                fontSize: '14px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.7,
                maxWidth: '280px',
                marginBottom: '28px',
              }}
            >
              {t('footer.description')}
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="no-underline"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(255,255,255,0.4)',
                    transition: 'background 0.2s ease, color 0.2s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.75)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                  }}
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.25)',
                  marginBottom: '20px',
                }}
              >
                {col.heading}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: 'clamp(48px, 6vw, 72px)',
            padding: '24px 0',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <p
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.25)',
            }}
          >
            {t('footer.copyright').replace('{year}', currentYear)}
          </p>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.2)',
              fontStyle: 'italic',
            }}
          >
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
