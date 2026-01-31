import React, { useState, useEffect } from 'react';

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateScrollTop = () => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        setIsVisible(y > 700);
    };
    window.addEventListener("scroll", updateScrollTop, { passive: true });
    updateScrollTop();
    return () => window.removeEventListener("scroll", updateScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      id="scrollTop" 
      className={`scroll-top ${isVisible ? 'is-visible' : ''}`} 
      type="button" 
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 5 4.5 12.5l1.6 1.6L11 9.2V19h2V9.2l4.9 4.9 1.6-1.6L12 5Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
}
