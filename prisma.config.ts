// Con prisma.config.ts presente, Prisma deja de cargar .env solo: lo hacemos aca.
// En Vercel las variables ya vienen en el entorno y esto es un no-op.
import "dotenv/config";
import path from "node:path";
import { defineConfig } from "prisma/config";

// Reemplaza la clave `prisma` de package.json, deprecada desde Prisma 6.
export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
    seed: "tsx prisma/seed.ts",
  },
});
