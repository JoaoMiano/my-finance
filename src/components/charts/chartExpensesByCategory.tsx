"use client"

import { useEffect, useState } from "react"
import { PieChart, Pie } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"
import { toast } from "sonner"
import { useAuth } from "@/context/authContext"

type ExpenseResponse = {
    category: string
    amount: number
}

const chartConfig = {
    amount: { label: "Gastos por Categoria" },
    ALIMENTACAO: { label: "Alimentação", color: "var(--chart-1)" },
    SAUDE: { label: "Saúde", color: "var(--chart-2)" },
    TRANSPORTE: { label: "Transporte", color: "var(--chart-3)" },
    LAZER: { label: "Lazer", color: "var(--chart-4)" },
    EDUCACAO: { label: "Educação", color: "var(--chart-5)" },
    MORADIA: { label: "Moradia", color: "var(--chart-6)" },
    PESSOAL: { label: "Pessoal", color: "var(--chart-7)" },
    OUTROS: { label: "Outros", color: "var(--chart-8)" },
} satisfies ChartConfig

const ChartExpensesByCategory = () => {

    const { user } = useAuth()
    const token = user?.token
    const [data, setData] = useState<ExpenseResponse[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch("/api/expensesByCategory", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });
                const json = await res.json()
                const normalized: ExpenseResponse[] = json.expensesByCategory || []

                const withColors = normalized.map((item, i) => ({
                    ...item,
                    fill: `var(--chart-${i + 1})`,
                }))

                setData(withColors)
            } catch (error) {
                console.error("Erro ao carregar dados:", error)
                toast.error("Erro ao carregar dados. Tente novamente mais tarde.")
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    if (loading) return <p>Carregando gráfico...</p>

    return (
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />

                <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                />

                <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
        </ChartContainer>
    )
}

export default ChartExpensesByCategory
