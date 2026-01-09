import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.dirname(path.join("src", "styles"))],
  },
};

export default nextConfig;
