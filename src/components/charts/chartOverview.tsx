"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useAuth } from "@/context/authContext"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const description = "A bar chart"

type DataResponse = {
  label: string
  value: number
  fill?: string
}

// Configuração de cores e labels
const chartConfig = {
  Income: {
    label: "Entrada",
    color: "var(--chart-1)",
  },
  Expenses: {
    label: "Saída",
    color: "var(--chart-2)",
  },
  Balance: {
    label: "Saldo",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

const ChartOverview = () => {
  const { user } = useAuth()
  const token = user?.token
  const [data, setData] = useState<DataResponse[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/overview", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        const json = await res.json()

        // Normaliza os dados da API para o formato do gráfico
        const normalized: DataResponse[] = [
          { label: "Income", value: json.overview.totalIncome },
          { label: "Expenses", value: json.overview.totalExpenses },
          { label: "Balance", value: json.overview.balance },
        ].map((item) => ({
          ...item,
          fill: chartConfig[item.label].color, // adiciona a cor do chartConfig
        }))

        setData(normalized)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        toast.error("Erro ao carregar dados. Tente novamente mais tarde.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [token])

  if (loading) {
    return (
      <div className="w-full h-[300px] flex flex-col gap-4 items-center justify-center">
        <div className="rounded-full bg-muted animate-pulse w-32 h-32" />
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        </div>
      </div>
    )
  }

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        data={data}
        barCategoryGap={30}
        margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          tickFormatter={(value) => chartConfig[value].label} // mostra label traduzida
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="value" radius={4} fill={({ label }) => chartConfig[label].color} />
      </BarChart>
    </ChartContainer>
  )
}

export default ChartOverview
