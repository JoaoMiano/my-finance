import { prisma } from "@/libs/prisma"
import bcrypt from "bcryptjs";


export const prismaService = {
    async checkUesrRegistered(email: string) {
        return await prisma.user.findFirst({
            where: { email }
        })
    },
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
}