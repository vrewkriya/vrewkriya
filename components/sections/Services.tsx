export default function Services() {
  return (
    <section id="services">
      <div className="services-header">
        <div>
          <p className="section-label reveal">What We Do</p>
          <h2 className="section-title services-title reveal reveal-delay-1">
            Crafting Visual
            <br />
            <em>Legacies</em>
          </h2>
        </div>
        <div>
          <p className="services-intro reveal reveal-delay-2">
            Every jewel has a story. We give it a stage — through meticulously
            crafted imagery, campaigns, and digital experiences that command
            attention in a crowded world.
          </p>
          <a href="#contact" className="btn-ghost reveal reveal-delay-3">
            Start a Project
          </a>
        </div>
      </div>

      <div className="services-grid">
        <div className="service-card reveal">
          <p className="service-num">01</p>
          <div className="service-icon"></div>
          <h3 className="service-name">
            Luxury Shoot
            <br />
            Production
          </h3>
          <p className="service-desc">
            Studio and on-location jewelry photography with precision lighting,
            set design, and art direction. Built for editorial, e-commerce, and
            campaign use.
          </p>
        </div>
        <div className="service-card reveal reveal-delay-1">
          <p className="service-num">02</p>
          <div className="service-icon"></div>
          <h3 className="service-name">
            Campaign
            <br />
            Strategy
          </h3>
          <p className="service-desc">
            End-to-end campaign concepting, creative direction, and execution.
            From moodboard to final asset delivery — every detail considered.
          </p>
        </div>
        <div className="service-card reveal reveal-delay-2">
          <p className="service-num">03</p>
          <div className="service-icon"></div>
          <h3 className="service-name">
            Digital Brand
            <br />
            Presence
          </h3>
          <p className="service-desc">
            Website design, social identity, and content strategy for jewelry
            brands entering or elevating their digital space.
          </p>
        </div>
      </div>
    </section>
  );
}
