import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const privatePaths = ["/dashboard/:path*", "/auth/:path*", "/cart", "/checkout", "/post-job/:path*", "/post-material/:path*", "/enterprise/:path*", "/become-expert/congratulations", "/marketplace/materials/saved"];
    return privatePaths.map((source) => ({ source, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",

        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",

        hostname: "res.cloudinaryy.com",
      },
    ],
  },
};

export default nextConfig;
