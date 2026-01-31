import React, { useEffect } from 'react';

export default function Footer() {
  useEffect(() => {
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
  }, []);

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <p className="footer-brand">SME IPO Partners</p>
            <p className="footer-desc">
              Building a premium SME IPO hand-holding and partner-to-partner collaboration layer for professional
              advisors.
            </p>
            <p className="footer-location">Faridabad, Haryana, India</p>
            <div className="footer-socials" aria-label="Social profiles">
              <a className="footer-social-link" href="#" aria-label="Follow on X (Twitter)">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M16.98 3.5h3.01l-6.58 7.52 7.75 9.48H16.5l-4.82-5.98-5.52 5.98H3.14l7.03-7.62L2.75 3.5h4.33l4.34 5.38 5.56-5.38Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a className="footer-social-link" href="#" aria-label="Visit on Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" />
                  <circle cx="17" cy="7" r="1" fill="currentColor" />
                </svg>
              </a>
              <a className="footer-social-link" href="#" aria-label="Connect on LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M6.5 6a2 2 0 1 1-4 0a2 2 0 0 1 4 0ZM3 9h3v12H3V9Zm6 0h3v1.7h.1A3.3 3.3 0 0 1 15 9c3 0 3.6 2 3.6 4.6V21H15v-6.2c0-1.5 0-3.4-2-3.4s-2.3 1.6-2.3 3.3V21H9V9Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a className="footer-social-link" href="#" aria-label="View GitHub profile">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.9 9.6.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4 1 1.4 1 .8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2.2-.3-4.5-1.2-4.5-5.2 0-1.1.4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9 9 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.6 0 4-2.3 4.9-4.5 5.2.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5a10.4 10.4 0 0 0 6.9-9.6C22 6.6 17.5 2 12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <p className="footer-h">Quick Links</p>
            <a className="footer-link" href="#about">About</a>
            <a className="footer-link" href="#team">Team</a>
            <a className="footer-link" href="#faqs">FAQs</a>
            <a className="footer-link" href="#collaborate">Contact</a>
          </div>
          <div>
            <p className="footer-h">Services</p>
            <a className="footer-link" href="#services">Eligibility & Readiness</a>
            <a className="footer-link" href="#services">Stakeholder Coordination</a>
            <a className="footer-link" href="#process">Execution Rhythm</a>
            <a className="footer-link" href="#services">Post-Listing Support</a>
          </div>
          <div>
            <p className="footer-h">Legal</p>
            <a className="footer-link" href="#">Privacy</a>
            <a className="footer-link" href="#">Terms</a>
            <a className="footer-link" href="#">Security</a>
          </div>
        </div>
        <div className="footer-copy">
          <p>© <span id="year">2024</span> SME IPO Partners. All rights reserved.</p>
          <p>Powered by <a href="https://www.smeipo.com" target="_blank">SME IPO Partners</a></p>
        </div>
      </div>
    </footer>
  );
}
