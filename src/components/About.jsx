import React from 'react';

export default function About() {
  return (
    <section id="about" className="section section-white">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title reveal">About Us</h2>
          <p className="section-lede reveal">
            We are an SME IPO hand-holding and execution-focused collaboration firm built for partners—CAs,
            CSs, consultants, and advisors—who want IPO delivery confidence without building an in-house
            execution desk.
          </p>
        </div>

        <div className="about-grid">
          <article className="about-card reveal">
            <h3>SME IPO hand-holding expertise</h3>
            <p>
              From eligibility to readiness to listing coordination, we drive execution with structure,
              timelines, and stakeholder alignment.
            </p>
          </article>
          <article className="about-card reveal">
            <h3>Partner-to-Partner collaboration model</h3>
            <p>
              You retain client ownership; we complement your strengths with specialist execution and a
              governance-first approach.
            </p>
          </article>
          <article className="about-card reveal">
            <h3>Credibility that converts</h3>
            <p>
              A premium capital-markets posture that helps your SME clients commit faster—because the “how”
              is clear.
            </p>
          </article>
        </div>

        <div className="timeline reveal" aria-label="Partnership timeline">
          <div className="timeline-item">
            <div className="timeline-dot" aria-hidden="true"></div>
            <div>
              <p className="timeline-title">Partner alignment</p>
              <p className="timeline-desc">Define scope, responsibilities, and commercials.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" aria-hidden="true"></div>
            <div>
              <p className="timeline-title">Readiness framework</p>
              <p className="timeline-desc">Financial clean-up + documentation workstreams.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-dot" aria-hidden="true"></div>
            <div>
              <p className="timeline-title">Execution & closure</p>
              <p className="timeline-desc">Coordination through listing and post-IPO advisory.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
