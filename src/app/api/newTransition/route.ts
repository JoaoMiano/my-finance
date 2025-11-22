import { verifyJWT } from "@/libs/jwt";
import { TransactionSchema } from "@/schemas/newTransitionSchema";
import { prismaService } from "@/services/prismaServices";


export const POST = async (req: Request) => {
    try {
    //validando o metodo
    if (req.method !== "POST") {
        return new Response(JSON.stringify({
            error: "Método não permitido",
        }), { status: 405 });
    }

    //validando se esta autenticado
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return new Response(JSON.stringify({
            error: "Token de autenticação não fornecido",
        }), { status: 401 });
    }
    //decodificando o token
    const userId = verifyJWT(token);
    if (!userId) {
        return new Response(JSON.stringify({
            error: "Token de autenticação inválido",
        }), { status: 401 });
    }

    //validando se o body esta vazio
    if (!req.body) {
        return new Response(JSON.stringify({
            error: "Corpo da requisição está vazio",
        }), { status: 400 });
    }

    const body = await req.json();

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