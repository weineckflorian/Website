import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    /** Hero uses `quality` 60 / 72; Next 16 defaults to [75] only and logs otherwise. */
    qualities: [60, 72, 75],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
