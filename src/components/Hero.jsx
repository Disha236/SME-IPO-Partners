import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!ctx || prefersReduced) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    const pts = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.floor(canvas.clientWidth * dpr);
      h = Math.floor(canvas.clientHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      pts.length = 0;
      const count = Math.max(42, Math.floor((w * h) / (26000 * dpr)));
      for (let i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25 * dpr,
          vy: (Math.random() - 0.5) * 0.25 * dpr,
          r: (Math.random() * 1.4 + 0.6) * dpr,
        });
      }
    }

    function color() {
      return document.body.dataset.theme === "dark" ? "rgba(0,194,168,.55)" : "rgba(11,28,45,.18)";
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color();
      const link = document.body.dataset.theme === "dark" ? "rgba(0,194,168,.10)" : "rgba(11,28,45,.07)";
      
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -40) p.x = w + 40;
        if (p.x > w + 40) p.x = -40;
        if (p.y < -40) p.y = h + 40;
        if (p.y > h + 40) p.y = -40;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.strokeStyle = link;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const max = 140 * dpr;
          if (dist < max) {
            const alpha = 1 - dist / max;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);
    resize();
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section id="home" className="hero" aria-label="Hero">
      <div className="hero-bg" aria-hidden="true">
        <canvas ref={canvasRef} id="heroCanvas" className="hero-canvas"></canvas>
        <div className="hero-orb orb-1"></div>
        <div className="hero-orb orb-2"></div>
        <div className="hero-gridlines"></div>
      </div>

      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="pill reveal-on-load">
            <span className="pill-dot" aria-hidden="true"></span>
            <span>Fintech • Capital Markets • Partner-to-Partner</span>
          </div>

          <h1 className="hero-title reveal-on-load">
            End-to-End SME IPO Hand-Holding Through Strategic P2P Collaboration
          </h1>
          <p className="hero-subtitle reveal-on-load">
            Helping partners deliver seamless SME IPO solutions without execution risk.
          </p>

          <div className="hero-actions reveal-on-load">
            <a className="btn btn-primary" href="#collaborate" onClick={(e) => {
                e.preventDefault();
                document.querySelector('#collaborate')?.scrollIntoView({behavior: 'smooth'});
            }}>Get Started</a>
          </div>

          <div className="trust-row reveal-on-load" aria-label="Trust signals">
            <div className="trust-pill">
              <span className="dot" aria-hidden="true"></span>
              High-trust execution model
            </div>
            <div className="trust-pill">
              <span className="dot dot-gold" aria-hidden="true"></span>
              Partner retains client ownership
            </div>
            <div className="trust-pill">
              <span className="dot dot-teal" aria-hidden="true"></span>
              Revenue share aligned incentives
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
