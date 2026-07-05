import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: [
    "@prisma/client",
    "prisma-pglite",
    "@augment-vir/test",
    "@augment-vir/assert",
    "@augment-vir/common",
    "@electric-sql/pglite",
  ],
};

export default nextConfig;
