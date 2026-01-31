import React, { useEffect, useRef } from 'react';

export default function Why() {
  const countersRef = useRef([]);

  useEffect(() => {
    const els = countersRef.current;
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const to = Number(el.getAttribute("data-count-to") || "0");
          const start = performance.now();
          const dur = 900;
          function step(now) {
            const p = Math.min(1, (now - start) / dur);
            const v = Math.round(to * (1 - Math.pow(1 - p, 3)));
            el.textContent = String(v);
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
          io.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => {
        if(el) io.observe(el)
    });

    return () => io.disconnect();
  }, []);

  return (
    <section id="why" className="section section-white">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title reveal">Why Partner With Us</h2>
          <p className="section-lede reveal">
            Built to help you win and retain SME clients—without taking execution risk onto your team.
          </p>
        </div>

        <div className="why-layout">
          <div className="why-column reveal">
            <h3 className="why-heading">What you gain</h3>
            <ol className="why-list">
              <li>
                <strong>End-to-end IPO expertise</strong>
                <span>Specialist execution across the full journey, embedded into your practice.</span>
              </li>
              <li>
                <strong>Revenue participation without execution risk</strong>
                <span>You retain client ownership and relationship; we carry execution responsibility.</span>
              </li>
              <li>
                <strong>Faster client conversion</strong>
                <span>Clear, de-risked path that helps SME promoters move from “thinking” to “doing”.</span>
              </li>
            </ol>
          </div>

          <div className="why-column reveal">
            <h3 className="why-heading">For you & your clients</h3>
            <div className="why-strips">
              <div className="why-strip">
                <span className="why-pill">You</span>
                <p>Scalable IPO offering, upgraded market credibility, and zero fixed-cost build-out.</p>
              </div>
              <div className="why-strip">
                <span className="why-pill">Your clients</span>
                <p>Hand-holding through complex capital markets work with clear accountability.</p>
              </div>
              <div className="why-strip">
                <span className="why-pill">Your firm</span>
                <p>
                  Long-term retention and cross-sell opportunities across audit, tax, and advisory post listing.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="trust-band reveal" aria-label="Trust badges">
          <div className="trust-badge">Compliance-first execution</div>
          <div className="trust-badge">Partner governance</div>
          <div className="trust-badge">Capital markets expertise</div>
          <div className="trust-badge">Secure lead handling</div>
        </div>

        <div className="counters reveal" aria-label="Animated counters">
          <div className="counter">
            <p className="counter-value" data-count-to="5" ref={el => countersRef.current[0] = el}>0</p>
            <p className="counter-label">Core execution workstreams</p>
          </div>
          <div className="counter">
            <p className="counter-value" data-count-to="0" ref={el => countersRef.current[1] = el}>0</p>
            <p className="counter-label">Fixed-cost hiring required</p>
          </div>
          <div className="counter">
            <p className="counter-value" data-count-to="100" ref={el => countersRef.current[2] = el}>0</p>
            <p className="counter-label">Partner-aligned communication</p>
          </div>
        </div>
      </div>
    </section>
  );
}
