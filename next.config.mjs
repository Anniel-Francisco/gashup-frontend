/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clubimagenes.com",
        port: "",
        pathname: "/ci/re/hola/hola_009.webp",
      },
    ],
  },
};

export default nextConfig;
