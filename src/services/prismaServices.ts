import { getMonthsRangeOfYear, monythRange } from "@/helppers/monthRange";
import { prisma } from "@/libs/prisma"
import { TransactionType } from "@/type/transitionType";
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
    async createTransaction(data: TransactionType) {
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
    },

    //busca o overview do usuario
    async getOverview(userId: string) {

        //range do mes atual
        const { startOfMonth, endOfMonth } = monythRange()

        const transactions = await prisma.transaction.findMany({
            where: {
                userId,
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                }
            }
        });

        // Converte Decimal para number 
        const values = transactions.map(t => ({
            ...t,
            amount: Number(t.amount)
        }));

        // Total de entradas
        const totalIncome = values
            .filter(t => t.type === "INCOME")
            .reduce((acc, curr) => acc + curr.amount, 0);

        // Total de despesas
        const totalExpenses = values
            .filter(t => t.type === "EXPENSE")
            .reduce((acc, curr) => acc + curr.amount, 0);
        // Saldo
        const balance = totalIncome - totalExpenses;

        return {
            totalIncome,
            totalExpenses,
            balance
        };
    },

    //gasto por categoria
    async getExpensesByCategory(userId: string) {
        //range do mes atual
        const { startOfMonth, endOfMonth } = monythRange()
        const expenses = await prisma.transaction.findMany({
            where: {
                userId,
                type: "EXPENSE",
                date: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                }
            }
        });

        //agrupar por categoria
        const expensesByCategory: { [key: string]: number } = {};

        expenses.forEach((expense) => {
            const category = expense.category;
            const amount = Number(expense.amount);
            if (expensesByCategory[category]) {
                expensesByCategory[category] += amount;
            }
            else {
                expensesByCategory[category] = amount;
            }
        });
        // Transformar em array para o gráfico
        const result = Object.entries(expensesByCategory).map(([category, amount]) => ({
            category,
            amount,
        }));

        return result;
    },

    //buscando o resumo anual
    async getSumaryYear(userId: string) {
        const months = getMonthsRangeOfYear();

        const results = [];

        for (const m of months) {
            const transactions = await prisma.transaction.findMany({
                where: {
                    userId,
                    date: {
                        gte: m.start,
                        lte: m.end
                    }
                }
            });

            const values = transactions.map(t => ({
                ...t,
                amount: Number(t.amount)
            }));

            const totalIncome = values
                .filter(t => t.type === "INCOME")
                .reduce((acc, curr) => acc + curr.amount, 0);

            const totalExpenses = values
                .filter(t => t.type === "EXPENSE")
                .reduce((acc, curr) => acc + curr.amount, 0);

            const balance = totalIncome - totalExpenses;

            results.push({
                month: m.month,
                totalIncome,
                totalExpenses,
                balance
            });
        }

        return results;
    },

    //buscando o historico de transações
    async getHistory(userId: string) {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });
        return transactions.map(t => ({
            ...t,
            amount: Number(t.amount)
        }));
    }
}
