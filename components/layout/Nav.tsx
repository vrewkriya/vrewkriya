"use client";
import { useActiveSection } from '@/lib/useActiveSection';

export default function Nav() {
  const sections = ['services', 'portfolio', 'about', 'testimonials', 'contact'];
  const activeSection = useActiveSection(sections);

  // Smooth scroll handler (works great with Lenis)
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // You can just rely on native behavior which Lenis overrides, 
      // or explicitly use globalThis.scrollTo
      globalThis.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth',
      });
      // Optionally update URL to preserve state
      globalThis.history.pushState({}, '', `#${id}`);
    }
  };

  return (
    <nav>
      <div className="nav-logo">Vrew <span>Kriya</span></div>
      <ul className="nav-links">
        <li>
          <a
            href="#services"
            onClick={(e) => handleScroll(e, 'services')}
            className={activeSection === 'services' ? 'active text-primary' : ''}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#portfolio"
            onClick={(e) => handleScroll(e, 'portfolio')}
            className={activeSection === 'portfolio' ? 'active text-primary' : ''}
          >
            Portfolio
          </a>
        </li>
        <li>
          <a
            href="#about"
            onClick={(e) => handleScroll(e, 'about')}
            className={activeSection === 'about' ? 'active text-primary' : ''}
          >
            Studio
          </a>
        </li>
        <li>
          <a
            href="#testimonials"
            onClick={(e) => handleScroll(e, 'testimonials')}
            className={activeSection === 'testimonials' ? 'active text-primary' : ''}
          >
            Clients
          </a>
        </li>
      </ul>
      <a 
        href="#contact" 
        onClick={(e) => handleScroll(e, 'contact')}
        className={`nav-cta ${activeSection === 'contact' ? 'active' : ''}`}
      >
        Book a Shoot
      </a>
    </nav>
  );
}
