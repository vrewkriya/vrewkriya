export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ];

  const socialLinks = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Behance", href: "https://behance.net" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ];

  return (
    <footer
      className="py-12 px-8 md:px-16"
      style={{ background: "var(--bg-3)" }}
    >
      {/* Top row — logo + tagline (left) + nav links (right) */}
      <div className="mb-8 pb-8 border-b border-gold-dim/20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left */}
          <div>
            <h3 className="font-display font-light text-cream text-2xl tracking-widest3 mb-2">
              VREW KRIYA
            </h3>
            <p
              className="font-sans font-extralight text-cream-dim"
              style={{ fontSize: "0.8rem" }}
            >
              Where jewelry meets light.
            </p>
          </div>

          {/* Right — nav grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans font-extralight text-cream-dim uppercase text-xs tracking-widest2 transition-colors hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row — copyright (left) + social (right) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <p
          className="font-sans font-extralight text-cream-dim text-xs"
          style={{ fontSize: "0.7rem" }}
        >
          © {currentYear} Vrew Kriya. All rights reserved.
        </p>

        {/* Social links */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-extralight text-cream-dim uppercase text-xs tracking-widest2 transition-colors hover:text-cream"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
