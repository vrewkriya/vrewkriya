import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo">Vrew <span>Kriya</span></div>
          <div className="footer-tagline">Where jewellery brands find their light.</div>
        </div>
        <div className="footer-links">
          <Link href="#services" className="footer-link">Services</Link>
          <Link href="#portfolio" className="footer-link">Portfolio</Link>
          <Link href="#about" className="footer-link">Studio</Link>
          <Link href="#clients" className="footer-link">Clients</Link>
          <Link href="#testimonials" className="footer-link">Testimonials</Link>
          <Link href="#contact" className="footer-link">Contact</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2025 Vrew Kriya. All rights reserved.</p>
        <div className="footer-social">
          <a href="https://instagram.com/vrewkriya">Instagram</a>
          <a href="https://behance.net/vrewkriya">Behance</a>
          <a href="https://linkedin.com/company/vrewkriya">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
