import React from 'react';

export default function Services() {
  return (
    <section id="services" className="section section-white">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title reveal">Services</h2>
          <p className="section-lede reveal">
            A structured, end-to-end SME IPO execution stack, visualised as the journey your client
            experiences from first conversation to life as a listed company.
          </p>
        </div>

        <div className="services-flow">
          <div className="services-rail" aria-hidden="true"></div>

          <article className="service-row reveal-stagger">
            <div className="service-tag">
              <span className="service-index">01</span>
              <span className="service-label">Eligibility</span>
            </div>
            <div className="service-body">
              <h3>SME IPO Eligibility Assessment</h3>
              <p>Assess eligibility, listing readiness, and define a practical, time-bound gap-closure plan.</p>
              <ul className="service-points">
                <li>Regulation- and exchange-aligned basic checks</li>
                <li>Promoter objectives vs. listing feasibility</li>
                <li>Early visibility into constraints and mitigations</li>
              </ul>
            </div>
          </article>

          <article className="service-row reveal-stagger">
            <div className="service-tag">
              <span className="service-index">02</span>
              <span className="service-label">Readiness</span>
            </div>
            <div className="service-body">
              <h3>IPO Readiness & Financial Clean-Up</h3>
              <p>Strengthen reporting quality, hygiene, and documentation alignment before merchant banker deep-dive.</p>
              <ul className="service-points">
                <li>Historical financials review and normalisation</li>
                <li>Governance, controls, and disclosure clean-up</li>
                <li>Aligning narratives with financial reality</li>
              </ul>
            </div>
          </article>

          <article className="service-row reveal-stagger">
            <div className="service-tag">
              <span className="service-index">03</span>
              <span className="service-label">Coordination</span>
            </div>
            <div className="service-body">
              <h3>Coordination with Stakeholders</h3>
              <p>Merchant bankers, auditors, and legal advisors aligned under a single, governed execution rhythm.</p>
              <ul className="service-points">
                <li>Integrated work-plan across all intermediaries</li>
                <li>Single source of truth for status and dependencies</li>
                <li>Partner visibility on every critical decision</li>
              </ul>
            </div>
          </article>

          <article className="service-row reveal-stagger">
            <div className="service-tag">
              <span className="service-index">04</span>
              <span className="service-label">Execution</span>
            </div>
            <div className="service-body">
              <h3>End-to-End IPO Hand-Holding</h3>
              <p>Milestone-driven execution with transparent governance and promotor hand-holding.</p>
              <ul className="service-points">
                <li>Trackable milestones from mandate to listing</li>
                <li>Partner-in-the-loop communication for every phase</li>
                <li>Issue resolution and escalation paths defined upfront</li>
              </ul>
            </div>
          </article>

          <article className="service-row reveal-stagger">
            <div className="service-tag">
              <span className="service-index">05</span>
              <span className="service-label">Post-Listing</span>
            </div>
            <div className="service-body">
              <h3>Post-Listing Compliance Support</h3>
              <p>Ongoing support to sustain trust, retention, and structured cross-sell opportunities.</p>
              <ul className="service-points">
                <li>Calendarised compliance and disclosure guidance</li>
                <li>Support for board, audit, and investor communication</li>
                <li>Partner avenues for recurring advisory mandates</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
