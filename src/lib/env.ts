import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url()

  },
  client: {
    NEXT_PUBLIC_GITHUB_ID: z.string(), // Added client environment variable for GitHub ID
    NEXT_PUBLIC_GITHUB_SECRET: z.string() // Updated for client environment variable for GitHub secret
  },
  // Maybe you can use just `runtimeEnv` if there is a MAJ. 
  // Please follow the docs : https://env.t3.gg/docs/nextjs#create-your-schema
  experimental__runtimeEnv: {
    NEXT_PUBLIC_GITHUB_ID: process.env.NEXT_PUBLIC_GITHUB_ID, // Added for runtime environment
    NEXT_PUBLIC_GITHUB_SECRET: process.env.NEXT_PUBLIC_GITHUB_SECRET // Added for runtime environment
  },
});