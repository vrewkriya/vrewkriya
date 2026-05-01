export function getAutoReplyEmailTemplate(firstName: string, brand: string, service: string, message: string) {
  // Use the first up to 3 characters of the brand for the avatar
  const brandAvatar = brand ? brand.substring(0, 3).toUpperCase() : "V";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Vrewkriya â€“ We Got You</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background-color: #f0ebe4;
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
        }

        .email-wrapper {
          max-width: 600px;
          margin: 40px auto;
          background: #faf7f3;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
        }

        .header {
          background-color: #C96442;
          padding: 28px 40px;
          text-align: center;
        }

        .logo-row {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .logo-icon {
          width: 28px;
          height: 28px;
        }

        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 500;
          color: #fff;
          letter-spacing: 0.5px;
        }

        .hero {
          padding: 52px 48px 36px;
          text-align: center;
          border-bottom: 1px solid #ede8e1;
        }

        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: 32px;
          font-weight: 400;
          line-height: 1.3;
          color: #1a1a1a;
          margin-bottom: 14px;
        }

        .hero p {
          font-size: 15px;
          color: #6b6560;
          line-height: 1.7;
          max-width: 420px;
          margin: 0 auto;
        }

        .bubble-wrap {
          padding: 32px 48px;
          border-bottom: 1px solid #ede8e1;
        }

        .bubble-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #C96442;
          margin-bottom: 14px;
        }

        .bubble {
          background: #ede8e1;
          border-radius: 16px 16px 16px 4px;
          padding: 18px 22px;
          display: inline-block;
          max-width: 100%;
        }

        .bubble-inner {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #C96442;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 13px;
          color: white;
          font-weight: 600;
        }

        .bubble-text {
          font-size: 14px;
          color: #2c2825;
          line-height: 1.6;
          padding-top: 6px;
          white-space: pre-wrap;
        }

        .body-content {
          padding: 36px 48px;
        }

        .body-content p {
          font-size: 15px;
          color: #3d3830;
          line-height: 1.75;
          margin-bottom: 20px;
        }

        .highlight {
          color: #C96442;
          font-weight: 500;
        }

        .steps {
          background: #f5f0e8;
          border-radius: 12px;
          padding: 24px 28px;
          margin: 28px 0;
        }

        .steps-title {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: #C96442;
          margin-bottom: 16px;
        }

        .step-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 14px;
        }

        .step-item:last-child { margin-bottom: 0; }

        .step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #C96442;
          color: white;
          font-size: 11px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .step-text {
          font-size: 14px;
          color: #3d3830;
          line-height: 1.6;
        }

        .step-text strong {
          color: #1a1a1a;
          font-weight: 500;
        }

        .cta-wrap {
          text-align: center;
          padding: 8px 0 32px;
        }

        .cta-btn {
          display: inline-block;
          background: #C96442;
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.4px;
          padding: 14px 36px;
          border-radius: 100px;
        }

        .divider {
          height: 1px;
          background: #ede8e1;
          margin: 0 48px;
        }

        .footer {
          padding: 30px 48px;
          text-align: center;
        }

        .footer-tagline {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          color: #b0a89e;
          font-style: italic;
          margin-bottom: 16px;
        }

        .footer-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .footer-links a {
          font-size: 12px;
          color: #C96442;
          text-decoration: none;
          letter-spacing: 0.3px;
        }

        .footer-copy {
          font-size: 11px;
          color: #b0a89e;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">

        <!-- HEADER -->
        <div class="header">
          <div class="logo-row">
            <svg class="logo-icon" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2 L14.8 10.2 L22 8 L17 14 L22 20 L14.8 17.8 L14 26 L13.2 17.8 L6 20 L11 14 L6 8 L13.2 10.2 Z" fill="white"/>
            </svg>
            <span class="logo-text">Vrewkriya</span>
          </div>
        </div>

        <!-- HERO -->
        <div class="hero">
          <h1>Something great is<br/>about to begin.</h1>
          <p>Your inquiry has landed with us â€” and we're already thinking about what we can build together.</p>
        </div>

        <!-- CHAT BUBBLE -->
        <div class="bubble-wrap">
          <div class="bubble-label">Your Inquiry</div>
          <div class="bubble">
            <div class="bubble-inner">
              <div class="avatar">${brandAvatar}</div>
              <div class="bubble-text">
                ${message}
              </div>
            </div>
          </div>
        </div>

        <!-- BODY -->
        <div class="body-content">
          <p>
            We see you, <span class="highlight">${brand}</span>. And we love what we see.
          </p>
          <p>
            Your inquiry for <span class="highlight">${service}</span> has been received â€” and our team is already diving into your details. This is exactly the kind of challenge we live for.
          </p>

          <div class="steps">
            <div class="steps-title">What Happens Next</div>
            <div class="step-item">
              <div class="step-num">1</div>
              <div class="step-text"><strong>We review your brief</strong> â€” our creative leads go through every detail you've shared.</div>
            </div>
            <div class="step-item">
              <div class="step-num">2</div>
              <div class="step-text"><strong>We reach out</strong> â€” expect a message from us shortly to set up a real conversation, not a sales call.</div>
            </div>
            <div class="step-item">
              <div class="step-num">3</div>
              <div class="step-text"><strong>We create together</strong> â€” ideas flow, possibilities open, and the work begins to take shape.</div>
            </div>
          </div>

          <p>
            In the meantime, feel free to explore what we've been up to. We believe the work speaks for itself.
          </p>
        </div>

        <!-- CTA -->
        <div class="cta-wrap">
          <a href="https://vrewkriya.com" class="cta-btn">View Our Portfolio â†’</a>
        </div>

        <div class="divider"></div>

        <!-- FOOTER -->
        <div class="footer">
          <div class="footer-tagline">Where Brands Come Alive.</div>
          <div class="footer-links">
            <a href="#">Instagram</a>
            <a href="#">Behance</a>
            <a href="https://vrewkriya.com">Website</a>
            <a href="#">Contact</a>
          </div>
          <div class="footer-copy">
            Â© ${new Date().getFullYear()} Vrewkriya. All rights reserved.<br/>
            You're receiving this because you submitted an inquiry through our website.
          </div>
        </div>

      </div>
    </body>
    </html>
  `;
}