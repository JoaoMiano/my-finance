import { prisma } from "@/libs/prisma"
import bcrypt from "bcryptjs";


export const prismaService = {
    async checkUserRegistered(email: string) {
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
    }
}