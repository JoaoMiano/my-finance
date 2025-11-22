import { validateToken } from "@/helppers/getUserIdForToken";
import { prismaService } from "@/services/prismaServices";

export const GET = async (req: Request) => {
    try {

        //validando se esta autenticado e pegando o userId
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        const userId = validateToken(token);

        //buscando os gastos por categoria
        const expensesByCategory = await prismaService.getExpensesByCategory(userId as string);
        return new Response(JSON.stringify({
            expensesByCategory,
        }), { status: 200 });

    } catch (error: any) {
        console.error("Erro ao buscar o gastos:", error);

        if (error.message === "TOKEN_NOT_PROVIDED") {
            return new Response(JSON.stringify({
                error: "Token de autenticação não fornecido"
            }), { status: 401 });
        }

        if (error.message === "TOKEN_INVALID") {
            return new Response(JSON.stringify({
                error: "Token de autenticação inválido"
            }), { status: 401 });
        }

        return new Response(JSON.stringify({
            error: "Erro interno do servidor",
        }), { status: 500 });
    }
}

