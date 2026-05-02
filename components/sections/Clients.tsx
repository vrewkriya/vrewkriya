import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

export interface ClientItem {
  _id: string;
  name: string;
  logo?: unknown;
  subtitle?: string;
  order?: number;
}

const fallbackClients: ClientItem[] = [
  { _id: "navrathan-and-sons", name: "Navrathan & Sons", subtitle: "Exceptional & Exclusive" },
  { _id: "pakwan-bangalore", name: "Pakwan", subtitle: "Heritage Jewellery" },
  { _id: "sovan-jewellers", name: "Sovan Jewellers", subtitle: "Crafted with Tradition" },
];

export default async function Clients() {
  let cmsClients: ClientItem[] = [];
  try {
    cmsClients = (await client.fetch(`*[_type == "client"] | order(order asc){_id, name, logo, subtitle, order}`)) as ClientItem[];
  } catch (e) {
    cmsClients = fallbackClients;
  }

  const displayClients = cmsClients && cmsClients.length > 0 ? cmsClients : fallbackClients;

  return (
    <section id="clients">
      <div className="tb-header">
        <div className="tb-line"></div>
        <div className="tb-diamond"></div>
        <p className="tb-title">Trusted By</p>
        <div className="tb-diamond"></div>
        <div className="tb-line right"></div>
      </div>

      <div className="tb-grid">
        {displayClients.map((c) => (
          <div key={c._id} className="tb-logo-card-only">
            {c.logo ? (
              <div className="tb-logo-image-large">
                <Image
                  src={(urlForImage((c.logo as unknown) as any)?.url() as string) || ""}
                  alt={c.name}
                  width={180}
                  height={180}
                  quality={90}
                  loading="eager"
                  priority
                  style={{ objectFit: "contain" }}
                />
              </div>
            ) : (
              <div className="tb-logo-card-only--initials">
                <div className="tb-logo-icon-initial">{c.name.charAt(0).toUpperCase()}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="tb-bottom-accent">
        <div className="tb-dot"></div>
        <div className="tb-dot"></div>
        <span className="tb-count">{displayClients.length}+ Trusted Partners</span>
        <div className="tb-dot"></div>
        <div className="tb-dot"></div>
      </div>
    </section>
  );
}
