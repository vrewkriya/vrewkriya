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
          <div className="testi-card reveal">
            <p className="testi-text">
              &quot;Vrew Kriya didn&apos;t just shoot our collection — they
              understood what it meant. The images we received were beyond
              anything we imagined. Our campaign sold out in 48 hours.&quot;
            </p>
            <div className="testi-author">
              <div className="testi-avatar av1">P</div>
              <div>
                <div className="testi-name">Priya Mehta</div>
                <div className="testi-brand">Founder, Aurelia Jewels</div>
              </div>
            </div>
          </div>
          <div className="testi-card reveal reveal-delay-1">
            <p className="testi-text">
              &quot;The restraint in their work is what sets them apart. Nothing
              over-designed, nothing wasted. Pure, distilled elegance that
              speaks directly to our clientele.&quot;
            </p>
            <div className="testi-author">
              <div className="testi-avatar av2">A</div>
              <div>
                <div className="testi-name">Aryan Shah</div>
                <div className="testi-brand">Creative Dir., Rasa Fine</div>
              </div>
            </div>
          </div>
          <div className="testi-card reveal reveal-delay-2">
            <p className="testi-text">
              &quot;Working with Vrew Kriya felt like collaborating with artists
              who happened to understand business. Our digital presence
              transformed entirely in one engagement.&quot;
            </p>
            <div className="testi-author">
              <div className="testi-avatar av3">S</div>
              <div>
                <div className="testi-name">Sana Qureshi</div>
                <div className="testi-brand">CEO, Nīlam Co.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
