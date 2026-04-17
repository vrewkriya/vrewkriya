export interface TestimonialItem {
  _id: string;
  quote: string;
  name: string;
  brand?: string;
  order?: number;
}

export default function Testimonials({
  testimonialsData,
}: {
  readonly testimonialsData: readonly TestimonialItem[];
}) {
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
          {testimonialsData.map((testi, i) => {
            const authorPrefix = testi.name ? testi.name.charAt(0).toUpperCase() : "";
            const delayClass = i === 0 ? "" : `reveal-delay-${i}`;
            const avClass = `av${(i % 3) + 1}`;
            return (
              <div key={testi._id} className={`testi-card reveal ${delayClass}`}>
                <p className="testi-text">&quot;{testi.quote}&quot;</p>
                <div className="testi-author">
                  <div className={`testi-avatar ${avClass}`}>{authorPrefix}</div>
                  <div>
                    <div className="testi-name">{testi.name}</div>
                    <div className="testi-brand">{testi.brand}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
