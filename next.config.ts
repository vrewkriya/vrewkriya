import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.prod.website-files.com' },
    ],
  },
  async headers() {
    return [
      {
        // Apply these headers to all pages across the entire site
        source: '/(.*)',
        headers: [
          // Prevents the site from being embedded inside invisible frames (Clickjacking protection)
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Forces the browser to strictly use HTTPS (Strict-Transport-Security)
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Stops the browser from guessing code types (MIME-sniffing protection)
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Controls exactly how much routing info is handed to other websites
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ];
  },
}

export default nextConfig
