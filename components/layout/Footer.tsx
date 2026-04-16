export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo">Vrew <span>Kriya</span></div>
          <div className="footer-tagline">Where jewelry brands find their light.</div>
        </div>
        <div className="footer-links">
          <a href="#services" className="footer-link">Services</a>
          <a href="#portfolio" className="footer-link">Portfolio</a>
          <a href="#about" className="footer-link">Studio</a>
          <a href="#clients" className="footer-link">Clients</a>
          <a href="#testimonials" className="footer-link">Testimonials</a>
          <a href="#contact" className="footer-link">Contact</a>
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
