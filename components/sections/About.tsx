import Link from "next/link";
import { client } from "@/sanity/lib/client";
import AboutVisual from "./AboutVisual";

export default async function About() {
  const launchEmbed = await client.fetch(
    `*[_type == "launchEmbedding" && isActive == true] | order(_updatedAt desc)[0]{
      ...,
      "thumbnailUrl": thumbnail.asset->url
    }`
  ).catch(e => {
    console.error('Sanity fetch failed for launchEmbedding', e.message);
    return null;
  });

  return (
    <section id="about">
      <AboutVisual launchEmbed={launchEmbed} />

      <div className="about-content">
        <p className="section-label reveal">The Studio</p>
        <h2 className="section-title about-title reveal reveal-delay-1">
          We Tell Stories
          <br />
          in <em>Light & Shadow</em>
        </h2>
        <p className="about-text reveal reveal-delay-2">
          VrewKriya was born from a singular conviction  that jewellery is not
          just adornment, it is memory, lineage, and identity. Brands that carry
          this weight deserve a visual partner who understands it.
        </p>
        <p className="about-text reveal reveal-delay-3">
          We are a boutique studio working at the intersection of craft and
          commerce. Our approach blends the restraint of old-world luxury
          aesthetics with the precision of modern digital storytelling.
        </p>
        <Link href="#contact" className="btn-ghost reveal reveal-delay-3">
          Work With Us
        </Link>

        <div className="about-stats">
          <div className="reveal reveal-delay-1">
            <div className="stat-num">48+</div>
            <div className="stat-label">Brands Served</div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="stat-num">6</div>
            <div className="stat-label">Years of Craft</div>
          </div>
          <div className="reveal reveal-delay-3">
            <div className="stat-num">∞</div>
            <div className="stat-label">Stories Left to Tell</div>
          </div>
        </div>
      </div>
    </section>
  );
}
