import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "Who can partner with us?",
      a: "CAs, CSs, consultants, advisors, and firms supporting SME promoters who want a reliable IPO execution partner."
    },
    {
      q: "Is there any regulatory risk?",
      a: "We operate with compliance-first execution and clear governance boundaries. Final engagement structure should be reviewed for fit and disclosures."
    },
    {
      q: "How does revenue sharing work?",
      a: "Commercials are aligned to scope and partner contribution. The partner retains client ownership; the execution team participates in revenue for delivery."
    },
    {
       q: "What post-IPO support is provided?",
       a: "Post-listing compliance support and advisory to help ensure continuity, retention, and cross-selling opportunities."
    }
  ];

  return (
    <section id="faqs" className="section section-white">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title reveal">Frequently Asked Questions</h2>
          <p className="section-lede reveal">Quick answers for professional advisors evaluating partnership.</p>
        </div>

        <div className="faq" data-accordion>
          {faqs.map((item, i) => (
            <div className="faq-item reveal" key={i}>
              <button 
                className="faq-q" 
                type="button" 
                aria-expanded={openIndex === i}
                onClick={() => toggle(i)}
              >
                {item.q}
                <span className="faq-icon" aria-hidden="true"></span>
              </button>
              <div className="faq-a" hidden={openIndex !== i}>
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
