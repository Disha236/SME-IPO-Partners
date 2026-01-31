import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('smeipo.theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
      document.body.dataset.theme = savedTheme;
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.body.dataset.theme = next;
    localStorage.setItem('smeipo.theme', next);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close menu when clicking outside (simple version covering the main interactive parts)
  useEffect(() => {
    const handleClick = (e) => {
        if (isOpen && !e.target.closest('.nav')) {
            setIsOpen(false);
        }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);


  const scrollToSection = (e, id) => {
    e.preventDefault();
    closeMenu();
    // Update URL hash without scroll (optional, or let the custom scroll handle it)
    history.pushState(null, "", id);

    const target = document.querySelector(id);
    if (target) {
        const navHeight = document.querySelector('.nav-wrap')?.getBoundingClientRect().height || 78;
        const offset = navHeight + 10;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' }); // Simplified smooth scroll
    }
  };


  return (
    <header className={`nav-wrap ${isOpen ? 'is-open' : ''}`} role="banner">
      <nav className="nav container" aria-label="Primary">
        <a className="brand" href="#home" aria-label="SME IPO Partners (home)" onClick={(e) => scrollToSection(e, '#home')}>
          <span className="brand-mark" aria-hidden="true"></span>
          <span className="brand-text">SME IPO Partners</span>
        </a>

        <div className="nav-actions">
          <button
            id="themeToggle"
            className="icon-btn"
            type="button"
            aria-label="Toggle theme"
            aria-pressed={theme === 'dark'}
            title="Toggle light/dark"
            onClick={toggleTheme}
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M21 12.8A8.5 8.5 0 0 1 11.2 3a7 7 0 1 0 9.8 9.8Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button 
            className="nav-toggle" 
            type="button" 
            aria-expanded={isOpen} 
            aria-controls="navMenu"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open menu</span>
            <span className="nav-toggle-bars" aria-hidden="true"></span>
          </button>
        </div>

        <div id="navMenu" className="nav-menu">
          {['Home', 'About', 'Services', 'Process', 'Why', 'FAQs'].map((item) => {
             const lower = item.toLowerCase();
             const href = item === 'Why' ? '#why' : `#${lower}`;
             return (
               <a 
                 key={item} 
                 className="nav-link" 
                 href={href}
                 onClick={(e) => scrollToSection(e, href)}
               >
                 {item === 'Why' ? 'Why Partner With Us' : item}
               </a>
             )
          })}
          <a className="nav-cta" href="#collaborate" onClick={(e) => scrollToSection(e, '#collaborate')}>Collaborate With Us</a>
        </div>
      </nav>
    </header>
  );
}
