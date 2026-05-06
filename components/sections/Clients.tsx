import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";

export interface ClientItem {
  _id: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logo?: any;
  subtitle?: string;
  order?: number;
  width?: number;
  height?: number;
}

export default async function Clients() {
  let cmsClients: ClientItem[] = [];

  try {
    const data: ClientItem[] = await client.fetch(`*[_type == "client"] | order(order asc){_id, name, logo, subtitle, order, width, height}`);
    cmsClients = data || [];
  } catch (e) {
    console.error("Failed to fetch clients from Sanity", e);
  }

  const displayClients = cmsClients.filter(c => c.logo);

  if (displayClients.length === 0) {
    return null;
  }

  return (
    <section id="clients">
      <div className="clients-header">
        <p className="section-label reveal justify-center">Trusted By</p>
      </div>

      <div className="clients-grid">
        {displayClients.map((c) => {
          const imgWidth = c.width || 180;
          const imgHeight = c.height || 180;
          const imageUrl = urlForImage(c.logo)?.url();

          if (!imageUrl) return null;

          return (
            <div key={c._id} className="client-logo-card" style={{ width: imgWidth, height: imgHeight, position: 'relative' }}>
              <Image
                src={imageUrl}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 100vw, 200px"
                quality={90}
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
