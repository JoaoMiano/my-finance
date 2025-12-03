import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// 1. Crie a Pool e o Adaptador do driver
// Nota: Isso só precisa ser criado uma vez, independentemente de ser DEV ou PROD.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

declare global {
  var prisma: PrismaClient | undefined;
}

// 2. Cria ou usa a instância global, aplicando o adaptador
const prismaClient =
  global.prisma ??
  new PrismaClient({
    // Aplicamos o adaptador ao construtor
    adapter,
    log: ["query", "error", "warn"],
  });

// 3. Configura a instância global em desenvolvimento
// Isso previne que o Next.js crie novas instâncias do Prisma Client a cada 'hot reload'.
if (process.env.NODE_ENV !== "production") global.prisma = prismaClient;

// 4. Exporta a instância única
export const prisma = prismaClient;