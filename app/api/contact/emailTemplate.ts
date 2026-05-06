export function getAutoReplyEmailTemplate(firstName: string, brand: string, service: string, message: string, phone?: string) {
  const brandAvatar = brand ? brand.substring(0, 2).toUpperCase() : "VK";
  const year = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>VrewKriya — We Received Your Inquiry</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background-color: #080610;
          font-family: 'DM Sans', sans-serif;
          color: #e8e2d9;
          -webkit-font-smoothing: antialiased;
        }

        .email-wrapper {
          max-width: 620px;
          margin: 40px auto;
          background: #0e0a1a;
          border: 1px solid rgba(201, 169, 110, 0.2);
          overflow: hidden;
        }

        /* ── HEADER ── */
        .header {
          padding: 36px 48px 28px;
          text-align: center;
          border-bottom: 1px solid rgba(201, 169, 110, 0.15);
          position: relative;
        }

        .header-line-top {
          display: block;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent);
          margin-bottom: 28px;
        }

        .logo-row {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }

        /* Geometric diamond logo in SVG */
        .logo-icon {
          width: 30px;
          height: 36px;
        }

        .logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 400;
          color: #c9a96e;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .header-sub {
          font-size: 10px;
          font-weight: 300;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: rgba(201, 169, 110, 0.5);
          margin-top: 4px;
        }

        /* ── HERO ── */
        .hero {
          padding: 52px 56px 40px;
          text-align: center;
          position: relative;
        }

        .hero-ornament {
          display: block;
          text-align: center;
          margin-bottom: 22px;
        }

        .hero h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          font-weight: 300;
          line-height: 1.25;
          color: #e8e2d9;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }

        .hero h1 em {
          font-style: italic;
          color: #c9a96e;
        }

        .hero p {
          font-size: 14px;
          font-weight: 300;
          color: rgba(232, 226, 217, 0.6);
          line-height: 1.8;
          max-width: 380px;
          margin: 0 auto;
          letter-spacing: 0.2px;
        }

        /* ── SEPARATOR ── */
        .sep {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 48px;
          margin: 4px 0;
        }
        .sep-line {
          flex: 1;
          height: 1px;
          background: rgba(201, 169, 110, 0.15);
        }
        .sep-diamond {
          font-size: 8px;
          color: rgba(201, 169, 110, 0.5);
        }

        /* ── BUBBLE / INQUIRY BOX ── */
        .inquiry-wrap {
          padding: 36px 48px;
          border-top: 1px solid rgba(201, 169, 110, 0.1);
          border-bottom: 1px solid rgba(201, 169, 110, 0.1);
        }

        .section-label {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(201, 169, 110, 0.6);
          margin-bottom: 18px;
        }

        .inquiry-box {
          border: 1px solid rgba(201, 169, 110, 0.2);
          padding: 22px 26px;
          position: relative;
        }

        /* corner ornaments */
        .inquiry-box::before {
          content: '';
          position: absolute;
          top: -1px; left: -1px;
          width: 12px; height: 12px;
          border-top: 1px solid #c9a96e;
          border-left: 1px solid #c9a96e;
        }
        .inquiry-box::after {
          content: '';
          position: absolute;
          bottom: -1px; right: -1px;
          width: 12px; height: 12px;
          border-bottom: 1px solid #c9a96e;
          border-right: 1px solid #c9a96e;
        }

        .inquiry-inner {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .avatar {
          width: 38px;
          height: 38px;
          border: 1px solid rgba(201, 169, 110, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          color: #c9a96e;
          font-weight: 500;
          letter-spacing: 1px;
          background: rgba(201, 169, 110, 0.05);
        }

        .inquiry-text {
          font-size: 14px;
          font-weight: 300;
          color: rgba(232, 226, 217, 0.8);
          line-height: 1.75;
          padding-top: 8px;
          white-space: pre-wrap;
        }

        /* ── BODY CONTENT ── */
        .body-content {
          padding: 40px 48px;
        }

        .body-content p {
          font-size: 14px;
          font-weight: 300;
          color: rgba(232, 226, 217, 0.7);
          line-height: 1.85;
          margin-bottom: 20px;
          letter-spacing: 0.2px;
        }

        .highlight {
          color: #c9a96e;
          font-weight: 400;
        }

        /* ── WHAT HAPPENS NEXT BOX ── */
        .steps-wrap {
          border: 1px solid rgba(201, 169, 110, 0.15);
          padding: 28px 30px;
          margin: 28px 0;
          position: relative;
        }

        .steps-wrap::before {
          content: '';
          position: absolute;
          top: -1px; left: -1px;
          width: 16px; height: 16px;
          border-top: 1px solid rgba(201, 169, 110, 0.5);
          border-left: 1px solid rgba(201, 169, 110, 0.5);
        }
        .steps-wrap::after {
          content: '';
          position: absolute;
          bottom: -1px; right: -1px;
          width: 16px; height: 16px;
          border-bottom: 1px solid rgba(201, 169, 110, 0.5);
          border-right: 1px solid rgba(201, 169, 110, 0.5);
        }

        .steps-title {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(201, 169, 110, 0.6);
          margin-bottom: 22px;
        }

        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 18px;
        }

        .step-item:last-child { margin-bottom: 0; }

        .step-num {
          width: 22px;
          height: 22px;
          border: 1px solid rgba(201, 169, 110, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-family: 'Cormorant Garamond', serif;
          font-size: 12px;
          color: #c9a96e;
          margin-top: 1px;
          background: rgba(201, 169, 110, 0.05);
        }

        .step-text {
          font-size: 13px;
          font-weight: 300;
          color: rgba(232, 226, 217, 0.7);
          line-height: 1.7;
        }

        .step-text strong {
          color: #e8e2d9;
          font-weight: 400;
        }

        /* ── PHONE NOTE ── */
        .phone-note {
          font-size: 13px;
          font-weight: 300;
          color: rgba(232, 226, 217, 0.55);
          border-left: 1px solid rgba(201, 169, 110, 0.3);
          padding-left: 14px;
          margin-top: -4px;
          margin-bottom: 20px;
        }

        /* ── CTA ── */
        .cta-wrap {
          text-align: center;
          padding: 12px 0 44px;
        }

        .cta-btn {
          display: inline-block;
          background: transparent;
          color: #c9a96e;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 14px 40px;
          border: 1px solid rgba(201, 169, 110, 0.5);
          position: relative;
        }

        /* ── FOOTER ── */
        .footer {
          padding: 28px 48px 36px;
          text-align: center;
          border-top: 1px solid rgba(201, 169, 110, 0.1);
        }

        .footer-line {
          display: block;
          width: 60px;
          height: 1px;
          background: rgba(201, 169, 110, 0.3);
          margin: 0 auto 20px;
        }

        .footer-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px;
          font-weight: 300;
          color: rgba(201, 169, 110, 0.5);
          font-style: italic;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .footer-links {
          margin-bottom: 20px;
        }

        .footer-links a {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(201, 169, 110, 0.5);
          text-decoration: none;
          margin: 0 12px;
        }

        .footer-copy {
          font-size: 11px;
          font-weight: 300;
          color: rgba(232, 226, 217, 0.25);
          line-height: 1.7;
          letter-spacing: 0.3px;
        }

        .footer-bottom-line {
          display: block;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent);
          margin-top: 28px;
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">

        <!-- HEADER -->
        <div class="header">
          <span class="header-line-top"></span>
          <div class="logo-row">
            <!-- Geometric gem SVG matching website -->
            <svg class="logo-icon" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="15,2 24,8 21,7 15,4 9,7 6,8" fill="rgba(201,169,110,0.2)" stroke="#c9a96e" stroke-width="0.6"/>
              <polygon points="15,4 21,7 15,13 9,7" fill="rgba(74,44,110,0.6)" stroke="#c9a96e" stroke-width="0.5"/>
              <polygon points="6,8 9,7 15,13 9,15" fill="#1a0e28" stroke="#c9a96e" stroke-width="0.4"/>
              <polygon points="24,8 21,7 15,13 21,15" fill="#2a1840" stroke="#c9a96e" stroke-width="0.4"/>
              <polygon points="9,15 15,13 21,15 15,22" fill="#120a20" stroke="#c9a96e" stroke-width="0.4"/>
              <polygon points="6,8 9,15 15,23" fill="#0e0818" stroke="#c9a96e" stroke-width="0.3"/>
              <polygon points="24,8 21,15 15,23" fill="#1a1030" stroke="#c9a96e" stroke-width="0.3"/>
              <line x1="15" y1="23" x2="15" y2="25" stroke="#c9a96e" stroke-width="0.8" stroke-opacity="0.5"/>
            </svg>
            <span class="logo-text">VrewKriya</span>
          </div>
          <div class="header-sub">Jewellery &bull; Brand &bull; Story</div>
        </div>

        <!-- HERO -->
        <div class="hero">
          <span class="hero-ornament">
            <svg width="120" height="12" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="6" x2="50" y2="6" stroke="rgba(201,169,110,0.25)" stroke-width="0.5"/>
              <rect x="54" y="3" width="6" height="6" transform="rotate(45 57 6)" fill="none" stroke="rgba(201,169,110,0.5)" stroke-width="0.6"/>
              <line x1="70" y1="6" x2="120" y2="6" stroke="rgba(201,169,110,0.25)" stroke-width="0.5"/>
            </svg>
          </span>
          <h1>Something great is<br/><em>about to begin.</em></h1>
          <p>Your inquiry has landed with us and we're already thinking about what we can build together.</p>
        </div>

        <!-- SEPARATOR -->
        <div class="sep">
          <div class="sep-line"></div>
          <div class="sep-diamond">◆</div>
          <div class="sep-line"></div>
        </div>

        <!-- INQUIRY BOX -->
        <div class="inquiry-wrap">
          <div class="section-label">Your Inquiry</div>
          <div class="inquiry-box">
            <div class="inquiry-inner">
              <div class="avatar">${brandAvatar}</div>
              <div class="inquiry-text">${message}</div>
            </div>
          </div>
        </div>

        <!-- BODY -->
        <div class="body-content">
          <p>
            We see you, <span class="highlight">${brand}</span>. And we love what we see.
          </p>
          ${phone ? `<p class="phone-note">We'll reach you at <span class="highlight">${phone}</span> if we need to connect quickly.</p>` : ""}
          <p>
            Your inquiry for <span class="highlight">${service}</span> has been received. Our creative leads are already diving into your details — this is exactly the kind of challenge we live for.
          </p>

          <div class="steps-wrap">
            <div class="steps-title">What Happens Next</div>
            <div class="step-item">
              <div class="step-num">I</div>
              <div class="step-text"><strong>We review your brief</strong> — our creative leads go through every detail you've shared.</div>
            </div>
            <div class="step-item">
              <div class="step-num">II</div>
              <div class="step-text"><strong>We reach out</strong> — expect a message from us shortly to set up a real conversation, not a sales call.</div>
            </div>
            <div class="step-item">
              <div class="step-num">III</div>
              <div class="step-text"><strong>We create together</strong> — ideas flow, possibilities open, and the work begins to take shape.</div>
            </div>
          </div>

          <p>
            In the meantime, feel free to explore what we've been crafting. We believe the work speaks for itself.
          </p>
        </div>

        <!-- CTA -->
        <div class="cta-wrap">
          <a href="https://vrewkriya.com" class="cta-btn">View Our Portfolio</a>
        </div>

        <!-- FOOTER -->
        <div class="footer">
          <span class="footer-line"></span>
          <div class="footer-tagline">Where Brands Come Alive.</div>
          <div class="footer-links">
            <a href="#">Instagram</a>
            <a href="#">Behance</a>
            <a href="https://vrewkriya.com">Website</a>
          </div>
          <div class="footer-copy">
            &copy; ${year} VrewKriya. All rights reserved.<br/>
            You're receiving this because you submitted an inquiry through our website.
          </div>
          <span class="footer-bottom-line"></span>
        </div>

      </div>
    </body>
    </html>
  `;
}