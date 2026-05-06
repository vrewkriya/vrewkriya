"use client";

import React, { useState, useEffect } from "react";

export default function AboutVisual({ launchEmbed }: { launchEmbed: any }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVideoOpen]);

  const hasThumbnail = !!launchEmbed?.thumbnailUrl;
  const includeEmbed = !!launchEmbed?.includeEmbed;
  const hasEmbed = !!launchEmbed?.embedCode;

  // We play video in a modal if includeEmbed is checked and we have an embed code.
  const canPlayVideo = includeEmbed && hasEmbed;
  
  // If no includeEmbed, but we have embedCode and no thumbnail, fall back to old background video behavior
  const showBackgroundVideo = !includeEmbed && hasEmbed && !hasThumbnail;

  return (
    <>
      <div 
        className="about-visual" 
        onClick={() => {
          if (canPlayVideo) setIsVideoOpen(true);
        }}
        style={{ cursor: canPlayVideo ? 'pointer' : 'default', position: 'relative' }}
      >
        <div className="about-img-bg">
          {hasThumbnail ? (
            <img 
              src={launchEmbed.thumbnailUrl} 
              alt="About Visual" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, opacity: 0.6 }} 
            />
          ) : showBackgroundVideo ? (
            <div 
              className="about-embed-container"
              style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, opacity: 0.6 }}
              dangerouslySetInnerHTML={{ __html: launchEmbed.embedCode }} 
            />
          ) : null}
        </div>

        {/* Diamond SVG - Hidden if we have an active background video without includeEmbed set, OR if we have a thumbnail */}
        {(!showBackgroundVideo && !hasThumbnail) && (
          <div className="about-gem-visual" style={{ pointerEvents: 'none', position: 'relative', zIndex: 2 }}>
            <svg aria-hidden="true" width="280" height="340" viewBox="0 0 280 340" fill="none">
              <defs>
                <linearGradient id="ag1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4a2c6e" />
                  <stop offset="100%" stopColor="#1a0e28" />
                </linearGradient>
                <radialGradient id="ag2" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#c9a96e" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <filter id="ag-glow">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <ellipse cx="140" cy="160" rx="110" ry="110" fill="none" stroke="#c9a96e" strokeWidth="0.5" strokeOpacity="0.2" filter="url(#ag-glow)" />
              <ellipse cx="140" cy="160" rx="90" ry="90" fill="none" stroke="#c9a96e" strokeWidth="0.3" strokeOpacity="0.1" />
              <polygon points="140,50 195,90 185,87 140,65 95,87 85,90" fill="url(#ag2)" stroke="#c9a96e" strokeWidth="0.7" />
              <polygon points="140,65 185,87 140,125 95,87" fill="url(#ag1)" stroke="#c9a96e" strokeWidth="0.6" opacity="0.9" />
              <polygon points="85,90 95,87 140,125 95,145" fill="#1a0e28" stroke="#c9a96e" strokeWidth="0.5" />
              <polygon points="195,90 185,87 140,125 185,145" fill="#2a1840" stroke="#c9a96e" strokeWidth="0.5" opacity="0.8" />
              <polygon points="95,145 140,125 185,145 140,195" fill="#120a20" stroke="#c9a96e" strokeWidth="0.5" />
              <polygon points="85,90 95,145 140,210" fill="#0e0818" stroke="#c9a96e" strokeWidth="0.4" opacity="0.7" />
              <polygon points="195,90 185,145 140,210" fill="#1a1030" stroke="#c9a96e" strokeWidth="0.4" opacity="0.6" />
              <line x1="140" y1="210" x2="140" y2="218" stroke="#c9a96e" strokeWidth="1" strokeOpacity="0.5" filter="url(#ag-glow)" />
              <g filter="url(#ag-glow)" opacity="0.8">
                <line x1="70" y1="76" x2="78" y2="76" stroke="#c9a96e" strokeWidth="0.8" />
                <line x1="74" y1="72" x2="74" y2="80" stroke="#c9a96e" strokeWidth="0.8" />
              </g>
              <circle cx="120" cy="72" r="2" fill="#c9a96e" opacity="0.6" filter="url(#ag-glow)" />
              <circle cx="172" cy="96" r="1.5" fill="#ffffff" opacity="0.5" />
              <text x="140" y="265" fontFamily="Cormorant Garamond, serif" fontSize="10" fontWeight="300" fill="#c9a96e" opacity="0.5" textAnchor="middle" letterSpacing="5">VREW KRIYA</text>
              <line x1="80" y1="270" x2="115" y2="270" stroke="#c9a96e" strokeWidth="0.4" strokeOpacity="0.3" />
              <line x1="165" y1="270" x2="200" y2="270" stroke="#c9a96e" strokeWidth="0.4" strokeOpacity="0.3" />
            </svg>
          </div>
        )}

        {/* Play Icon Overlay if playable */}
        {canPlayVideo && hasThumbnail && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, pointerEvents: 'none' }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="rgba(0,0,0,0.5)" stroke="#c9a96e" strokeWidth="1" />
              <path d="M42 32L26 42V22L42 32Z" fill="white" />
            </svg>
          </div>
        )}
      </div>

      {/* Video Modal — Website-theme framed */}
      {isVideoOpen && canPlayVideo && (
        <div
          onClick={() => setIsVideoOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 3, 12, 0.96)',
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backdropFilter: 'blur(6px)',
          }}
        >
          {/* Top label row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '18px',
              width: '100%',
              maxWidth: '900px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,169,110,0.2)' }} />
            <span style={{
              fontFamily: "'Cormorant Garamond', 'Georgia', serif",
              fontSize: '10px',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'rgba(201,169,110,0.55)',
              whiteSpace: 'nowrap',
            }}>
              VrewKriya &nbsp;◆&nbsp; Film
            </span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,169,110,0.2)' }} />
            <button
              onClick={() => setIsVideoOpen(false)}
              style={{
                background: 'none',
                border: '1px solid rgba(201,169,110,0.35)',
                color: 'rgba(201,169,110,0.7)',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                lineHeight: 1,
                cursor: 'pointer',
                flexShrink: 0,
                fontFamily: 'sans-serif',
                transition: 'all 0.2s',
              }}
              aria-label="Close video"
            >
              ✕
            </button>
          </div>

          {/* Framed video container */}
          <div
            className="about-embed-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              aspectRatio: '16/9',
              border: '1px solid rgba(201,169,110,0.25)',
              padding: '0',
              background: '#000',
            }}
          >
            {/* Corner brackets — top-left */}
            <span style={{ position:'absolute', top:-1, left:-1, width:20, height:20,
              borderTop:'1px solid #c9a96e', borderLeft:'1px solid #c9a96e', zIndex:2 }} />
            {/* Corner brackets — top-right */}
            <span style={{ position:'absolute', top:-1, right:-1, width:20, height:20,
              borderTop:'1px solid #c9a96e', borderRight:'1px solid #c9a96e', zIndex:2 }} />
            {/* Corner brackets — bottom-left */}
            <span style={{ position:'absolute', bottom:-1, left:-1, width:20, height:20,
              borderBottom:'1px solid #c9a96e', borderLeft:'1px solid #c9a96e', zIndex:2 }} />
            {/* Corner brackets — bottom-right */}
            <span style={{ position:'absolute', bottom:-1, right:-1, width:20, height:20,
              borderBottom:'1px solid #c9a96e', borderRight:'1px solid #c9a96e', zIndex:2 }} />

            <div
              style={{ width: '100%', height: '100%' }}
              dangerouslySetInnerHTML={{ __html: launchEmbed.embedCode }}
            />
          </div>

          {/* Bottom hint */}
          <p
            onClick={(e) => e.stopPropagation()}
            style={{
              marginTop: '16px',
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'rgba(201,169,110,0.3)',
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Click outside to close
          </p>
        </div>
      )}
    </>
  );
}
