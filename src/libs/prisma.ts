import { PrismaClient } from "@prisma/client";

declare global {
  // Evita recriar instâncias no ambiente de desenvolvimento
  var prisma: PrismaClient | undefined;
}

// Usa instância global em dev e cria uma nova em produção
export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
