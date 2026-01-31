import React, { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Why from './components/Why';
import Team from './components/Team';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollTop from './components/ScrollTop';

gsap.registerPlugin(ScrollTrigger);

function App() {
  
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Reveal on load
    gsap.set(".reveal-on-load", { opacity: 0, y: 18 });
    gsap.to(".reveal-on-load", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.08, delay: 0.12 });

    // Scroll indicator micro animation (if present)
    gsap.to(".scroll-dot", { y: 6, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1 });

    // Scroll triggers
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 82%" } }
      );
    });

    gsap.utils.toArray(".reveal-left").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, x: -18 },
        { opacity: 1, x: 0, duration: 0.75, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } }
      );
    });

    const stagger = gsap.utils.toArray(".reveal-stagger");
    if (stagger.length) {
      // Find grouping container to trigger them together or close enough
      // For simplicity, we can trigger each, or group them by parent.
      // The original code grouped by closest container.
      
      // Let's rely on the original logic approximately or just trigger per item for simplicity if grouping is hard
      // But let's try to match original logic
      
      // Helper to find unique parents
      const parents = [...new Set(stagger.map(el => el.closest(".services-flow, .services-grid, .process-track, .process-timeline-steps, .why-grid") || el.parentElement))];
      
      parents.forEach(parent => {
          const children = parent.querySelectorAll('.reveal-stagger');
          gsap.fromTo(
            children,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.10,
              scrollTrigger: { trigger: parent, start: "top 80%" }
            }
          );
      });
    }

    const team = gsap.utils.toArray(".reveal-team");
    if (team.length) {
      gsap.fromTo(
        team,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", stagger: 0.10, scrollTrigger: { trigger: team[0].closest(".team-grid") || team[0], start: "top 82%" } }
      );
    }
    
    // Float micro-animation
    const floats = Array.from(document.querySelectorAll(".float"));
    if(floats.length > 0) {
        let t = 0;
        let rafId;
        function floatTick() {
          t += 0.012;
          for (const el of floats) {
            const n = Number(el.getAttribute("data-float") || "1");
            const y = Math.sin(t + n) * 3;
            const r = Math.cos(t + n) * 0.6;
            el.style.transform = `translateY(${y}px) rotate(${r}deg)`;
          }
          rafId = requestAnimationFrame(floatTick);
        }
        floatTick();
        return () => cancelAnimationFrame(rafId);
    }

  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Process />
        <Why />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <ScrollTop />
      <Footer />
    </>
  );
}

export default App;
