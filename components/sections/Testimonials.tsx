const testimonialsData = [
  {
    quote: "Vrew Kriya didn't just shoot our collection — they understood what it meant. The images we received were beyond anything we imagined. Our campaign sold out in 48 hours.",
    authorPrefix: "P",
    name: "Priya Mehta",
    brand: "Founder, Aurelia Jewels",
    delayClass: "",
    avClass: "av1"
  },
  {
    quote: "The restraint in their work is what sets them apart. Nothing over-designed, nothing wasted. Pure, distilled elegance that speaks directly to our clientele.",
    authorPrefix: "A",
    name: "Aryan Shah",
    brand: "Creative Dir., Rasa Fine",
    delayClass: "reveal-delay-1",
    avClass: "av2"
  },
  {
    quote: "Working with Vrew Kriya felt like collaborating with artists who happened to understand business. Our digital presence transformed entirely in one engagement.",
    authorPrefix: "S",
    name: "Sana Qureshi",
    brand: "CEO, Nīlam Co.",
    delayClass: "reveal-delay-2",
    avClass: "av3"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials">
      <div className="testimonials-inner">
        <div className="testimonials-header">
          <div>
            <p className="section-label reveal">Client Words</p>
            <h2 className="section-title testimonials-title reveal reveal-delay-1">
              What Brands
              <br />
              Say About Us
            </h2>
          </div>
        </div>

        <div className="testi-grid">
          {testimonialsData.map((testi) => (
            <div key={testi.name} className={`testi-card reveal ${testi.delayClass}`}>
              <p className="testi-text">&quot;{testi.quote}&quot;</p>
              <div className="testi-author">
                <div className={`testi-avatar ${testi.avClass}`}>{testi.authorPrefix}</div>
                <div>
                  <div className="testi-name">{testi.name}</div>
                  <div className="testi-brand">{testi.brand}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
