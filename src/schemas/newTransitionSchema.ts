import z from "zod";

export const TransactionTypeEnum = z.enum(["INCOME", "EXPENSE"]);

export const IncomeCategoryEnum = z.enum([
  "SALARIO",
  "INVESTIMENTOS",
  "BONUS",
  "FREELANCE",
  "OUTROS"
], {
  error: "Categoria de entrada inválida"
});

export const ExpenseCategoryEnum = z.enum([
  "ALIMENTACAO",
  "SAUDE",
  "TRANSPORTE",
  "LAZER",
  "EDUCACAO",
  "MORADIA",
  "PESSOAL",
  "OUTROS"
], {
  error: "Categoria de saida inválida"
});

export const TransactionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("INCOME"),
    amount: z.number().positive("O valor deve ser positivo"),
    category: IncomeCategoryEnum,
    date: z.string().refine((d) => !isNaN(Date.parse(d)), "Data inválida"),
    description: z.string().max(255).optional(),
  }),
  z.object({
    type: z.literal("EXPENSE"),
    amount: z.number().positive("O valor deve ser positivo"),
    category: ExpenseCategoryEnum,
    date: z.string().refine((d) => !isNaN(Date.parse(d)), "Data inválida"),
    description: z.string().max(255).optional(),
  }),
]);
export type TransactionType = z.infer<typeof TransactionSchema>;

export const IncomeCategoryLabels = {
  SALARIO: "Salário",
  INVESTIMENTOS: "Investimentos",
  BONUS: "Bônus",
  FREELANCE: "Freelance",
  OUTROS: "Outros"
};

export const ExpenseCategoryLabels = {
  ALIMENTACAO: "Alimentação",
  SAUDE: "Saúde",
  TRANSPORTE: "Transporte",
  LAZER: "Lazer",
  EDUCACAO: "Educação",
  MORADIA: "Moradia",
  PESSOAL: "Pessoal",
  OUTROS: "Outros"
};