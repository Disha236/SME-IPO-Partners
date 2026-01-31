import React from 'react';

export default function Team() {
  return (
    <section id="team" className="section section-white">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title reveal">Team & leadership</h2>
          <p className="section-lede reveal">
            A specialized leadership group spanning IPO strategy, law, valuation, and audit.
          </p>
        </div>

        <div className="team-grid">
          <article className="team-card reveal-team">
            <div className="avatar" aria-hidden="true">AJ</div>
            <div>
              <h3>CS Ashish Jain</h3>
              <p className="role">IPO & Funding Strategist</p>
              <p className="bio">
                Strategy-led execution support focused on readiness, positioning, and end-to-end delivery.
              </p>
            </div>
          </article>

          <article className="team-card reveal-team">
            <div className="avatar" aria-hidden="true">NS</div>
            <div>
              <h3>CS Naresh Kumar Sharma</h3>
              <p className="role">Corporate & Capital Markets Law</p>
              <p className="bio">
                Corporate structuring and capital market legal guidance to reduce risk and increase speed.
              </p>
            </div>
          </article>

          <article className="team-card reveal-team">
            <div className="avatar" aria-hidden="true">V</div>
            <div>
              <h3>CA Vipul</h3>
              <p className="role">Valuation & Merchant Banking</p>
              <p className="bio">
                Valuation, documentation alignment, and merchant banking coordination for smooth execution.
              </p>
            </div>
          </article>

          <article className="team-card reveal-team">
            <div className="avatar" aria-hidden="true">DG</div>
            <div>
              <h3>CA Dhruv Goyal</h3>
              <p className="role">Audit, Tax & SME IPO Advisory</p>
              <p className="bio">
                Audit and tax advisory for SME IPO readiness, reporting quality, and compliance confidence.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
