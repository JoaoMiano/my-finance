import { registerSchema } from "@/schemas/registerSchema";
import { prismaService } from "@/services/prismaServices";

export const POST = async (req: Request) => {

    //validando o metodo
    if (req.method !== "POST") {
        return new Response(JSON.stringify({
            error: "Método não permitido",
        }), { status: 405 });
    }

    //validando se o body esta vazio
    if (!req.body) {
        return new Response(JSON.stringify({
            error: "Corpo da requisição está vazio",
        }), { status: 400 });
    }

    const body = await req.json();

    //Vaidando se o body esta coerreto
    const result = registerSchema.safeParse(body);

    if (!result.success) {
        return new Response(JSON.stringify({
            error: "Dados inválidos",
            issues: result.error.format(),
        }), { status: 400 });
    }

    const { name, email, password } = result.data; //dados validados

    //validando se o usuario ja esta cadastrado
    const userExists = await prismaService.checkUserRegistered(email)
    if (userExists) {
        return new Response(JSON.stringify({
            error: "Usuário já cadastrado",
        }), { status: 400 });
    }

    //criando usuario
    const user = await prismaService.createUser(name, email, password);
    return new Response(JSON.stringify({
        message: "Usuário criado com sucesso",
        user:{ id: user.id, name: user.name, email: user.email }
    }), { status: 201 });


}
