import { prisma } from "@/libs/prisma"
import bcrypt from "bcryptjs";


export const prismaService = {
    //verifica se o usuario ja esta cadastrado
    async checkUserRegistered(email: string) {
        return await prisma.user.findFirst({
            where: { email }
        })
    },

    //cria um novo usuario
    async createUser(name: string, email: string, password: string) {
        const hashPassword = await bcrypt.hash(password, 10)

        return prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
            }
        })
    },

    //autentica o usuario
    async authenticateUser(email: string, password: string) {
        const user = await prisma.user.findFirst({
            where: { email }
        });

        if (!user) {
            return null;
        }   

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        } 
        
        return user;
    },

    //cria uma nova transação
    async createTransaction(data: {
        type: "INCOME" | "EXPENSE",
        amount: number,
        category: string,
        date: Date, 
        description?: string,
        userId: string,
    }) {
        return await prisma.transaction.create({
            data: {
                type: data.type,
                amount: data.amount,
                category: data.category,
                date: data.date,
                description: data.description,
                userId: data.userId,
            }
        })
    }
}