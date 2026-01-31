/* main.js
   - Theme toggle (light/dark)
   - Smooth scrolling with sticky-nav offset
   - Mobile nav toggle
   - Hero canvas "3D" particle field
   - Accordion FAQs
   - Animated counters
   - Secure lead form submission to backend (/api/lead)
   - GSAP scroll-triggered animations (preferred) + lightweight fallback
*/

(() => {
  const navWrap = document.querySelector(".nav-wrap");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.getElementById("navMenu");
  const year = document.getElementById("year");
  const themeToggle = document.getElementById("themeToggle");
  const scrollTopBtn = document.getElementById("scrollTop");

  if (year) year.textContent = String(new Date().getFullYear());

  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Theme toggle
  const THEME_KEY = "smeipo.theme";
  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    themeToggle?.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark" || savedTheme === "light") applyTheme(savedTheme);
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = document.body.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // Mobile menu
  function setMenuOpen(isOpen) {
    if (!navWrap || !navToggle || !navMenu) return;
    navWrap.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  }

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });
  }

  document.addEventListener("click", (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (!navWrap?.classList.contains("is-open")) return;
    if (t.closest(".nav")) return;
    setMenuOpen(false);
  });

  // Smooth scroll with sticky offset
  function getNavOffset() {
    const rect = navWrap?.getBoundingClientRect();
    return rect ? Math.ceil(rect.height) + 10 : 78;
  }

  function scrollToHash(hash) {
    if (!hash || hash === "#") return;
    const target = document.querySelector(hash);
    if (!(target instanceof HTMLElement)) return;
    const top = target.getBoundingClientRect().top + window.scrollY - getNavOffset();
    window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
  }

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      if (!document.querySelector(href)) return;
      e.preventDefault();
      setMenuOpen(false);
      history.pushState(null, "", href);
      scrollToHash(href);
    });
  });

  window.addEventListener("load", () => {
    if (location.hash) setTimeout(() => scrollToHash(location.hash), 0);
  });

  // Scroll-to-top
  function updateScrollTop() {
    if (!scrollTopBtn) return;
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    scrollTopBtn.classList.toggle("is-visible", y > 700);
  }
  updateScrollTop();
  window.addEventListener("scroll", updateScrollTop, { passive: true });
  scrollTopBtn?.addEventListener("click", () => scrollToHash("#home"));

  // FAQ accordion (single-open)
  document.querySelectorAll("[data-accordion] .faq-item").forEach((item) => {
    const btn = item.querySelector(".faq-q");
    const panel = item.querySelector(".faq-a");
    if (!(btn instanceof HTMLButtonElement) || !(panel instanceof HTMLElement)) return;
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      document.querySelectorAll("[data-accordion] .faq-q").forEach((b) => {
        b.setAttribute("aria-expanded", "false");
      });
      document.querySelectorAll("[data-accordion] .faq-a").forEach((p) => {
        p.setAttribute("hidden", "");
      });
      if (!open) {
        btn.setAttribute("aria-expanded", "true");
        panel.removeAttribute("hidden");
      }
    });
  });

  // Hero canvas: lightweight particle field
  (function heroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const ctx = canvas.getContext("2d");
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
      // Connect nearby points for depth
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

    window.addEventListener("beforeunload", () => cancelAnimationFrame(raf));
  })();

  // Floating cards micro-motion (no framework)
  if (!prefersReduced) {
    const floats = Array.from(document.querySelectorAll(".float"));
    let t = 0;
    function floatTick() {
      t += 0.012;
      for (const el of floats) {
        const n = Number(el.getAttribute("data-float") || "1");
        const y = Math.sin(t + n) * 3;
        const r = Math.cos(t + n) * 0.6;
        (el instanceof HTMLElement) && (el.style.transform = `translateY(${y}px) rotate(${r}deg)`);
      }
      requestAnimationFrame(floatTick);
    }
    floatTick();
  }

  // Counters: animate when visible
  (function counters() {
    const els = Array.from(document.querySelectorAll("[data-count-to]"));
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
    els.forEach((el) => io.observe(el));
  })();

  // Lead form: validation + secure submit
  (function leadForm() {
    const form = document.getElementById("leadForm");
    const statusEl = document.getElementById("formStatus");
    if (!(form instanceof HTMLFormElement) || !(statusEl instanceof HTMLElement)) return;

    function setStatus(kind, text) {
      statusEl.dataset.kind = kind || "";
      statusEl.textContent = text || "";
    }
    function setSubmitting(isSubmitting) {
      const btn = form.querySelector(".form-submit");
      if (btn instanceof HTMLButtonElement) btn.disabled = isSubmitting;
      form.classList.toggle("is-submitting", isSubmitting);
    }
    function setErr(name, msg) {
      const el = form.querySelector(`[data-err-for="${CSS.escape(name)}"]`);
      if (el) el.textContent = msg || "";
    }
    function clearErrs() {
      form.querySelectorAll("[data-err-for]").forEach((el) => (el.textContent = ""));
    }
    function emailOk(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }
    function phoneOk(v) {
      const digits = v.replace(/[^\d+]/g, "");
      return digits.length >= 10;
    }

    function validate(payload) {
      clearErrs();
      let ok = true;
      if (!payload.name || payload.name.length < 2) (setErr("name", "Please enter your name."), (ok = false));
      if (!payload.firm || payload.firm.length < 2) (setErr("firm", "Please enter your firm name."), (ok = false));
      if (!payload.email || !emailOk(payload.email)) (setErr("email", "Please enter a valid email."), (ok = false));
      if (!payload.phone || !phoneOk(payload.phone)) (setErr("phone", "Please enter a valid phone."), (ok = false));
      if (!payload.partnerType) (setErr("partnerType", "Please select a partner type."), (ok = false));
      if (!payload.message || payload.message.length < 20)
        (setErr("message", "Please add at least 20 characters."), (ok = false));
      return ok;
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      setStatus("", "");

      const fd = new FormData(form);
      const payload = {
        name: String(fd.get("name") || "").trim(),
        firm: String(fd.get("firm") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        phone: String(fd.get("phone") || "").trim(),
        partnerType: String(fd.get("partnerType") || "").trim(),
        message: String(fd.get("message") || "").trim(),
        website: String(fd.get("website") || "").trim(), // honeypot
      };

      if (!validate(payload)) {
        setStatus("error", "Please fix the highlighted fields and try again.");
        return;
      }

      setSubmitting(true);
      try {
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data?.message || "Submission failed. Please try again.");
        }
        setStatus("success", "Thank you. Your request was received securely. We’ll contact you shortly.");
        form.reset();
      } catch (err) {
        setStatus("error", err instanceof Error ? err.message : "Submission failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    });
  })();

  // Animations
  if (prefersReduced) return;

  const hasGsap = typeof window.gsap !== "undefined";
  const hasScrollTrigger = hasGsap && typeof window.ScrollTrigger !== "undefined";

  if (hasGsap) {
    const gsap = window.gsap;
    gsap.set(".reveal-on-load", { opacity: 0, y: 18 });
    gsap.to(".reveal-on-load", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.08, delay: 0.12 });

    // Scroll indicator micro animation
    gsap.to(".scroll-dot", { y: 6, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1 });

    if (hasScrollTrigger) {
      gsap.registerPlugin(window.ScrollTrigger);

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
        gsap.fromTo(
          stagger,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.10,
            scrollTrigger: { trigger: stagger[0].closest(".services-flow, .services-grid, .process-track, .why-grid") || stagger[0], start: "top 80%" },
          }
        );
      }

      const team = gsap.utils.toArray(".reveal-team");
      if (team.length) {
        gsap.fromTo(
          team,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.65, ease: "power2.out", stagger: 0.10, scrollTrigger: { trigger: team[0].closest(".team-grid") || team[0], start: "top 82%" } }
        );
      }
    }
    return;
  }

  // Fallback: IntersectionObserver for reveals
  const revealEls = Array.from(document.querySelectorAll(".reveal, .reveal-left, .reveal-stagger, .reveal-team, .reveal-cta, .reveal-on-load"));
  if (!("IntersectionObserver" in window) || revealEls.length === 0) return;
  revealEls.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(14px)";
    el.style.transition = "opacity 600ms ease, transform 600ms ease";
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        io.unobserve(el);
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => io.observe(el));
})();

