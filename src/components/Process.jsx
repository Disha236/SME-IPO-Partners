import React from 'react';

export default function Process() {
  return (
    <section id="process" className="section section-navy">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title reveal">How We Work</h2>
          <p className="section-lede reveal">
            A partner-friendly workflow built for speed, quality, and predictable delivery.
          </p>
        </div>

        <div className="process-timeline" aria-label="Process steps">
          <div className="process-timeline-line" aria-hidden="true"></div>

          <div className="process-timeline-steps">
            <article className="process-timeline-item step-left reveal-stagger">
              <div className="step-dot" aria-hidden="true"></div>
              <div className="step-card">
                <div className="step-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/></svg>
                </div>
                <div className="step-body">
                  <p className="step-kicker">Step 01</p>
                  <h3>Partner Onboarding</h3>
                  <p className="step-desc">Define how we work together before we speak to clients. Scope, responsibilities, and escalation mapped; commercials and revenue-share principles aligned; communication cadence and governance agreed.</p>
                </div>
              </div>
            </article>

            <article className="process-timeline-item step-right reveal-stagger">
              <div className="step-dot" aria-hidden="true"></div>
              <div className="step-card">
                <div className="step-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </div>
                <div className="step-body">
                  <p className="step-kicker">Step 02</p>
                  <h3>Client Identification</h3>
                  <p className="step-desc">Filter and prioritise SME clients most suited for IPO conversations. Eligibility and appetite indicators aligned with you; joint narrative and positioning for each client type; next-step map for outreach and education.</p>
                </div>
              </div>
            </article>

            <article className="process-timeline-item step-left reveal-stagger">
              <div className="step-dot" aria-hidden="true"></div>
              <div className="step-card">
                <div className="step-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 9V3"/><path d="M18 15v-3"/><path d="M18 21v-3"/><path d="M12 9V3"/><path d="M12 15v-3"/><path d="M12 21v-3"/><path d="M6 9V3"/><path d="M6 15v-3"/><path d="M6 21v-3"/></svg>
                </div>
                <div className="step-body">
                  <p className="step-kicker">Step 03</p>
                  <h3>IPO Readiness Framework</h3>
                  <p className="step-desc">Convert intent into concrete workstreams and realistic timelines. Financial, legal, and governance workstreams defined; milestone plan visible to both you and the client; early risk identification and mitigation strategies.</p>
                </div>
              </div>
            </article>

            <article className="process-timeline-item step-right reveal-stagger">
              <div className="step-dot" aria-hidden="true"></div>
              <div className="step-card">
                <div className="step-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div className="step-body">
                  <p className="step-kicker">Step 04</p>
                  <h3>Execution & Coordination</h3>
                  <p className="step-desc">Merchant bankers, auditors, and legal teams run in sync. Single integrated plan for all intermediaries; structured updates to you and your client; issue tracking and resolution across stakeholders.</p>
                </div>
              </div>
            </article>

            <article className="process-timeline-item step-left reveal-stagger">
              <div className="step-dot" aria-hidden="true"></div>
              <div className="step-card">
                <div className="step-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/></svg>
                </div>
                <div className="step-body">
                  <p className="step-kicker">Step 05</p>
                  <h3>Listing & Post-IPO Advisory</h3>
                  <p className="step-desc">Close the loop with listing support and long-term retention. Support through listing events and disclosures; post-IPO compliance and board engagement rhythm; joint roadmap for ongoing advisory and cross-sell.</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
