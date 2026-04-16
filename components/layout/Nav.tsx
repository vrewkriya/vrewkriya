"use client";
import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <div className="nav-logo">Vrew <span>Kriya</span></div>
      <ul className="nav-links">
        <li><Link href="#services">Services</Link></li>
        <li><Link href="#portfolio">Portfolio</Link></li>
        <li><Link href="#about">Studio</Link></li>
        <li><Link href="#testimonials">Clients</Link></li>
      </ul>
      <Link href="#contact" className="nav-cta">Book a Shoot</Link>
    </nav>
  );
}
