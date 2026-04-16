"use client";

export default function Nav() {
  return (
    <nav>
      <div className="nav-logo">Vrew <span>Kriya</span></div>
      <ul className="nav-links">
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#about">Studio</a></li>
        <li><a href="#testimonials">Clients</a></li>
      </ul>
      <a href="#contact" className="nav-cta">Book a Shoot</a>
    </nav>
  );
}
