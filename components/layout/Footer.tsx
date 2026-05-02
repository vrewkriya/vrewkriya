"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setTimeStr(`BENGALURU, IN \u2014 ${formatter.format(new Date()).toUpperCase()}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-top">
        <div>
          <div className="footer-logo">Vrew <span>Kriya</span></div>
          <div className="footer-tagline">View the Vision. Kriya is the Action.</div>
        </div>
        <div className="footer-links">
          <Link href="/#services" className="footer-link">Services</Link>
          <Link href="/#portfolio" className="footer-link">Portfolio</Link>
          <Link href="/#about" className="footer-link">Studio</Link>
          <Link href="/#testimonials" className="footer-link">Clients</Link>
          <Link href="/#testimonials" className="footer-link">Testimonials</Link>
          <Link href="/#contact" className="footer-link">Contact</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div>
          <p className="footer-copy">© {currentYear} Vrew Kriya. All rights reserved.</p>
          <p className="footer-time" suppressHydrationWarning>
            {timeStr || 'BENGALURU, IN'}
          </p>
        </div>
        <div className="footer-social">
          <a href="https://instagram.com/vrewkriya" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://behance.net/vrewkriya" target="_blank" rel="noopener noreferrer">Behance</a>
          <a href="https://www.linkedin.com/in/vrewkriya-lab-4602683bb" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
