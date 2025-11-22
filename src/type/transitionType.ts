export type TransactionType = {
        type: "INCOME" | "EXPENSE",
        amount: number,
        category: string,
        date: Date, 
        description?: string,
        userId: string,
}