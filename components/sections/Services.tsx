import Link from "next/link";

const servicesData = [
  {
    num: "01",
    name: "Luxury Shoot\nProduction",
    desc: "Studio and on-location jewelry photography with precision lighting, set design, and art direction. Built for editorial, e-commerce, and campaign use.",
    delayClass: ""
  },
  {
    num: "02",
    name: "Campaign\nStrategy",
    desc: "End-to-end campaign concepting, creative direction, and execution. From moodboard to final asset delivery — every detail considered.",
    delayClass: "reveal-delay-1"
  },
  {
    num: "03",
    name: "Digital Brand\nPresence",
    desc: "Website design, social identity, and content strategy for jewelry brands entering or elevating their digital space.",
    delayClass: "reveal-delay-2"
  }
];

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
          <Link href="#contact" className="btn-ghost reveal reveal-delay-3">
            Start a Project
          </Link>
        </div>
      </div>

      <div className="services-grid">
        {servicesData.map((service) => (
          <div key={service.num} className={`service-card reveal ${service.delayClass}`}>
            <p className="service-num">{service.num}</p>
            <div className="service-icon"></div>
            <h3 className="service-name">
              {service.name.split("\n").map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h3>
            <p className="service-desc">{service.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
