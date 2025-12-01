export type TransactionType = {
        type: "INCOME" | "EXPENSE",
        amount: number,
        category: string,
        date: string, 
        description?: string,
        userId: string,
}