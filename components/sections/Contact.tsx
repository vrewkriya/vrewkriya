export default function Contact() {
  return (
    <section id="contact">
      <div className="contact-left">
        <p className="section-label reveal">Get In Touch</p>
        <h2 className="section-title contact-title reveal reveal-delay-1">
          Ready to
          <br />
          <em>Shine?</em>
        </h2>
        <p className="contact-text reveal reveal-delay-2">
          Every great campaign begins with a conversation. Tell us about your
          brand and what you&apos;re building. We&apos;ll tell you how we can
          make it unforgettable.
        </p>
        <div className="contact-details reveal reveal-delay-3">
          <div className="contact-detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">hello@vrewkriya.com</span>
          </div>
          <div className="contact-detail-item">
            <span className="detail-label">Studio</span>
            <span className="detail-value">Mumbai, Maharashtra — India</span>
          </div>
          <div className="contact-detail-item">
            <span className="detail-label">Hours</span>
            <span className="detail-value">Mon – Fri, 10am – 7pm IST</span>
          </div>
        </div>
      </div>

      <div className="contact-right">
        <div className="form-row">
          <div className="form-field reveal">
            <label htmlFor="first-name">First Name</label>
            <input id="first-name" type="text" placeholder="Aria" />
          </div>
          <div className="form-field reveal reveal-delay-1">
            <label htmlFor="brand-company">Brand / Company</label>
            <input id="brand-company" type="text" placeholder="House of Gems" />
          </div>
        </div>
        <div className="form-field reveal reveal-delay-1">
          <label htmlFor="email-address">Email Address</label>
          <input
            id="email-address"
            type="email"
            placeholder="hello@yourbrand.com"
          />
        </div>
        <div className="form-field reveal reveal-delay-2">
          <label htmlFor="service-interested">Service Interested In</label>
          <select id="service-interested" defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            <option>Luxury Shoot Production</option>
            <option>Campaign Strategy</option>
            <option>Digital Brand Presence</option>
            <option>Full Partnership</option>
          </select>
        </div>
        <div className="form-field reveal reveal-delay-3">
          <label htmlFor="brand-info">Tell Us About Your Brand</label>
          <textarea
            id="brand-info"
            placeholder="Share your vision, your collection, your goals…"
          ></textarea>
        </div>
        <button className="form-submit reveal reveal-delay-4">
          Book a Consultation
        </button>
      </div>
    </section>
  );
}
