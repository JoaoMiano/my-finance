import { validateToken } from "@/helppers/getUserIdForToken";
import { TransactionSchema } from "@/schemas/newTransitionSchema";
import { prismaService } from "@/services/prismaServices";


export const POST = async (req: Request) => {
    try {
        //validando se esta autenticado e pegando o userId
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        const userId = validateToken(token);

        //validando se o body esta vazio
        let body
        try {
            body = await req.json();
        } catch {
            return new Response(JSON.stringify({
                error: "Corpo da requisição está vazio ou inválido",
            }), { status: 400 });
        }

        //Vaidando se o body esta coerreto
        const result = TransactionSchema.safeParse(body);

        if (!result.success) {
            return new Response(JSON.stringify({
                error: "Dados inválidos",
                issues: result.error.format(),
            }), { status: 400 });
        }

        const { amount, type, description, category } = result.data; //dados validados

        //cria a nova transação
        const newTransaction = await prismaService.createTransaction({
            type,
            amount,
            category,
            date: new Date(result.data.date),
            description,
            userId,
        });

        return new Response(JSON.stringify(newTransaction), { status: 201 });


    } catch (error) {
        return new Response(JSON.stringify({
            error: "Erro de autenticação",
        }), { status: 401 });
    }
}