/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'dms-api.ntm.eu',
      pathname: '**',
    },
    {
      protocol: 'https',
      hostname: 'cdn.ntm.se', // tillåter bilder från cdn.ntm.se
      pathname: '**', // tillåter alla vägar på domänen
    },
    {
      protocol: 'https',
      hostname: 'ekuriren.se', 
      pathname: '**', 
    },
  ]
  }
};

export default nextConfig;
