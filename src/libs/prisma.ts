import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client/edge";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL!;

// cria o pool a partir da connection string
const pool = new Pool({
  connectionString,
});

// passa o pool para o adapter
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
