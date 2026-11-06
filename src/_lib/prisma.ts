import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "../_config/env";

const databaseUrl = env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error("La variable de entorno DATABASE_URL no está definida");
}

const adapter = new PrismaPg({
    connectionString: databaseUrl,
});

export const prisma = new PrismaClient({ adapter });