import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'About',        href: '#about'        },
  { label: 'Research',     href: '#research'      },
  { label: 'Publications', href: '#publications'  },
  { label: 'Experience',   href: '#experience'    },
  { label: 'Education',    href: '#education'     },
  { label: 'Skills',       href: '#skills'        },
  { label: 'Coursework',   href: '#coursework'    },
  { label: 'Awards',       href: '#awards'        },
  { label: 'Contact',      href: '#contact'       },
];

export default function Navbar() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="navbar">
      <a href="#hero" className="navbar-logo">
        Mario <span>Jerez</span>
      </a>
      <div className="navbar-links">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className={active === href.slice(1) ? 'active' : ''}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
