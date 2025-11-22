import { createJWT } from "@/libs/jwt";
import { loginSchema } from "@/schemas/loginSchema";
import { prismaService } from "@/services/prismaServices";

export const POST = async (req: Request) => {

    //validando se o body esta vazio
    let body
    try {
        body = await req.json();
    } catch {
        return new Response(JSON.stringify({
            error: "Corpo da requisição está vazio ou inválido",
        }), { status: 400 });
    }

    //Vaidando se o body esta correto
    const result = loginSchema.safeParse(body);

        if (!result.success) {
        return new Response(JSON.stringify({
            error: "Dados inválidos",
            issues: result.error.format(),
        }), { status: 400 });
    }

    const { email, password } = result.data; //dados validados

    //validando se o usuario existe
    const user = await prismaService.authenticateUser(email, password);
    if (!user) {
        return new Response(JSON.stringify({
            error: "Email ou senha inválidos",
        }), { status: 401 });
    }

    //gerando token JWT
    const token = createJWT(user.id)

    return new Response(JSON.stringify({
        message: "Usuário autenticado com sucesso",
        user:{ id: user.id, name: user.name, email: user.email, token }
    }), { status: 200 });
}