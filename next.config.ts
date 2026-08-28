import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows local devices access to the onClick handler on the NavBar
  // This is required for the hamburger-style menu to work while on dev mode
  allowedDevOrigins: ["192.168.0.*:3000", "192.168.0.*", "0.0.0.0", "0.0.0.0:3000"],
};

export default nextConfig;
