import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

export interface ClientItem {
  _id: string;
  name: string;
  logo?: any;
  order?: number;
}

export default function Clients({
  clientsData,
}: {
  readonly clientsData: ClientItem[];
}) {
  return (
    <section id="clients">
      <div className="clients-label">
        <p
          className="section-label reveal"
          style={{ justifyContent: "center" }}
        >
          Trusted By
        </p>
      </div>
      <div className="clients-grid">
        {(clientsData || []).map((client, i) => (
          <div
            key={client._id || i}
            className={"client-logo reveal " + (i === 0 ? "" : `reveal-delay-${i % 4}`)}
            style={{ position: 'relative', width: 120, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {client.logo ? (
              <Image
                src={urlForImage(client.logo)?.url() || ""}
                alt={client.name}
                fill
                style={{ objectFit: "contain" }}
                sizes="120px"
              />
            ) : (
              client.name
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
