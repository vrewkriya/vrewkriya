export default function Clients() {
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
        <div className="client-logo reveal">Aurelia</div>
        <div className="client-logo reveal reveal-delay-1">Rasa Fine</div>
        <div className="client-logo reveal reveal-delay-2">Nīlam Co.</div>
        <div className="client-logo reveal reveal-delay-3">Heirloom</div>
        <div className="client-logo reveal reveal-delay-4">Maison Veth</div>
      </div>
    </section>
  );
}
