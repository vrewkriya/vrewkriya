"use client";
import { useActiveSection } from '@/lib/useActiveSection';
import { useLenis } from '@studio-freight/react-lenis';

export default function Nav() {
  const sections = ['services', 'portfolio', 'about', 'testimonials', 'contact'];
  const activeSection = useActiveSection(sections);
  const lenis = useLenis();

  // Smooth scroll handler using Lenis specifically
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      e.preventDefault();
      // Use lenis.scrollTo for perfectly synchronized buttery scrolling
      lenis.scrollTo(element, { offset: -80 }); // Offset for the fixed nav
      
      // Optionally update URL to preserve state
      globalThis.history.pushState({}, '', `/#${id}`);
    }
  };

  return (
    <nav>
      <div className="nav-logo">Vrew <span>Kriya</span></div>
      <ul className="nav-links">
        <li>
          <a
            href="/#services"
            onClick={(e) => handleScroll(e, 'services')}
            className={activeSection === 'services' ? 'active text-primary' : ''}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="/#portfolio"
            onClick={(e) => handleScroll(e, 'portfolio')}
            className={activeSection === 'portfolio' ? 'active text-primary' : ''}
          >
            Portfolio
          </a>
        </li>
        <li>
          <a
            href="/#about"
            onClick={(e) => handleScroll(e, 'about')}
            className={activeSection === 'about' ? 'active text-primary' : ''}
          >
            Studio
          </a>
        </li>
        <li>
          <a
            href="/#testimonials"
            onClick={(e) => handleScroll(e, 'testimonials')}
            className={activeSection === 'testimonials' ? 'active text-primary' : ''}
          >
            Clients
          </a>
        </li>
      </ul>
      <a 
        href="/#contact" 
        onClick={(e) => handleScroll(e, 'contact')}
        className={`nav-cta ${activeSection === 'contact' ? 'active' : ''}`}
      >
        Let&apos;s Connect
      </a>
    </nav>
  );
}
