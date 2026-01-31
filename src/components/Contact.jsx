import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    firm: '',
    email: '',
    phone: '',
    partnerType: '',
    message: '',
    website: '' // honeypot
  });
  
  const [status, setStatus] = useState({ kind: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error for field when modified
    if (errors[e.target.name]) {
        setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const phoneOk = (v) => {
    const digits = v.replace(/[^\d+]/g, "");
    return digits.length >= 10;
  };

  const validate = () => {
    const newErrors = {};
    let ok = true;
    if (!formData.name || formData.name.length < 2) { newErrors.name = "Please enter your name."; ok = false; }
    if (!formData.firm || formData.firm.length < 2) { newErrors.firm = "Please enter your firm name."; ok = false; }
    if (!formData.email || !emailOk(formData.email)) { newErrors.email = "Please enter a valid email."; ok = false; }
    if (!formData.phone || !phoneOk(formData.phone)) { newErrors.phone = "Please enter a valid phone."; ok = false; }
    if (!formData.partnerType) { newErrors.partnerType = "Please select a partner type."; ok = false; }
    if (!formData.message || formData.message.length < 20) { newErrors.message = "Please add at least 20 characters."; ok = false; }
    
    setErrors(newErrors);
    return ok;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ kind: '', text: '' });

    if (!validate()) {
      setStatus({ kind: 'error', text: 'Please fix the highlighted fields and try again.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.message || "Submission failed. Please try again.");
      }
      setStatus({ kind: 'success', text: "Thank you. Your request was received securely. We’ll contact you shortly." });
      setFormData({
        name: '', firm: '', email: '', phone: '', partnerType: '', message: '', website: ''
      });
    } catch (err) {
      setStatus({ kind: 'error', text: err.message || "Submission failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="collaborate" className="section section-warning" aria-labelledby="ctaTitle">
      <div className="container cta-2">
        <div className="cta2-left reveal-left">
          <h2 id="ctaTitle" className="section-title">SME IPO activity is accelerating</h2>
          <p className="section-lede">
            Promoters prefer advisors who can hand-hold the entire journey. Partner with an execution-led
            team and convert faster—without execution risk.
          </p>
          <div className="cta2-actions">
            <a className="btn btn-primary btn-lg" href="#leadForm" onClick={e=>e.preventDefault()}>Partner With Us Now</a>
            <a className="btn btn-secondary btn-lg" href="#leadForm" onClick={e=>e.preventDefault()}>Request a Call</a>
          </div>
          <p className="mini-disclaimer">
            Secure submission. No data exposed publicly. We validate inputs and rate-limit requests.
          </p>
        </div>

        <div className="cta2-right reveal-left">
          <form id="leadForm" className={`lead-form ${isSubmitting ? 'is-submitting' : ''}`} noValidate onSubmit={handleSubmit}>
            <div className="form-head">
              <p className="form-title">Collaborate With Us</p>
              <p className="form-sub">Share your details. We’ll respond promptly.</p>
            </div>

            <div className="form-grid">
              <label className="field">
                <span>Name</span>
                <input name="name" autoComplete="name" required minLength="2" placeholder="Your full name" value={formData.name} onChange={handleChange} />
                <span className="field-err" aria-live="polite">{errors.name}</span>
              </label>
              <label className="field">
                <span>Firm Name</span>
                <input name="firm" autoComplete="organization" required minLength="2" placeholder="Your firm" value={formData.firm} onChange={handleChange} />
                <span className="field-err" aria-live="polite">{errors.firm}</span>
              </label>
              <label className="field">
                <span>Email</span>
                <input name="email" autoComplete="email" required type="email" placeholder="you@firm.com" value={formData.email} onChange={handleChange} />
                <span className="field-err" aria-live="polite">{errors.email}</span>
              </label>
              <label className="field">
                <span>Phone</span>
                <input name="phone" autoComplete="tel" required inputMode="tel" placeholder="+91 9xxxx xxxxx" value={formData.phone} onChange={handleChange} />
                <span className="field-err" aria-live="polite">{errors.phone}</span>
              </label>
              <label className="field field-full">
                <span>Partner Type</span>
                <select name="partnerType" required value={formData.partnerType} onChange={handleChange}>
                  <option value="" disabled>Select…</option>
                  <option value="ca">CA</option>
                  <option value="cs">CS</option>
                  <option value="consultant">Consultant</option>
                  <option value="advisor">Advisor</option>
                  <option value="other">Other</option>
                </select>
                <span className="field-err" aria-live="polite">{errors.partnerType}</span>
              </label>
              <label className="field field-full">
                <span>Message</span>
                <textarea
                  name="message"
                  required
                  minLength="20"
                  placeholder="Tell us about your client profile and what support you need."
                  value={formData.message} 
                  onChange={handleChange}
                ></textarea>
                <span className="field-err" aria-live="polite">{errors.message}</span>
              </label>

              {/* Honeypot */}
              <label className="hp" aria-hidden="true">
                <span>Website</span>
                <input name="website" tabIndex="-1" autoComplete="off" value={formData.website} onChange={handleChange} />
              </label>
            </div>

            <button className="btn btn-primary btn-lg form-submit" type="submit" disabled={isSubmitting}>
              <span className="btn-label">Submit securely</span>
              <span className="btn-spinner" aria-hidden="true"></span>
            </button>

            <div id="formStatus" className="form-status" role="status" aria-live="polite" data-kind={status.kind}>{status.text}</div>
            <p className="form-privacy">
              By submitting, you agree to be contacted about this inquiry. We do not sell your data.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
