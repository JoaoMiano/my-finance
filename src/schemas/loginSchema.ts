import z from "zod";

export const loginSchema = z.object({
    email: z.string().email("Endereço de email inválido"),
    password: z.string().min(8, "Senha muito curta, mínimo 8 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;