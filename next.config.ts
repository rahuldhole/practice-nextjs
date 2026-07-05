import type { NextConfig } from "next";
import { withWorkflow } from "workflow/next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: [
    "@prisma/client",
    "prisma-pglite",
    "@electric-sql/pglite",
    "@neondatabase/serverless",
    "@prisma/adapter-neon",
    "@augment-vir/test",
    "@augment-vir/assert",
    "@augment-vir/common",
  ],
};

export default withWorkflow(nextConfig);
