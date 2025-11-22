import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Nome muito curto, mínimo 3 caracteres"),
    email: z.string().email("Endereço de email inválido"),
    password: z.string().min(8, "Senha muito curta, mínimo 8 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;