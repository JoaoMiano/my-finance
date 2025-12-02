"use client"

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { euaToBr } from "@/helppers/convertDateEuaForBR";

const TableHistory = () => {

    type HistoryResponse = {
        id: string,
        amount: number,
        date: string,
        type: "INCOME" | "EXPENSE",
        category: string,
        description: string,
        userId: string
    }

    const { user } = useAuth()
    const token = user?.token
    const [data, setData] = useState<HistoryResponse[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                const res = await fetch("/api/history", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                });


                const json = await res.json()

                setData(json.history)

            } catch (error) {
                console.error("Erro ao carregar dados:", error)
                toast.error("Erro ao carregar dados. Tente novamente mais tarde.")
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Histórico de Transações</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="border-r" >Data</TableHead>
                            <TableHead className="border-r">Tipo</TableHead>
                            <TableHead className="border-r">Categoria</TableHead>
                            <TableHead className="border-r">Descrição</TableHead>
                            <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-28 lg:h-40 text-center text-muted-foreground"
                                >
                                    Nenhuma transação encontrada.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item) => {
                                //validando se e despesa ou receita para estilizar
                                const isExpense = item.type === "EXPENSE";

                                //estilos personalizados 
                                const formattedValue = isExpense
                                    ? `- R$ ${item.amount.toFixed(2)}`
                                    : `R$ ${item.amount.toFixed(2)}`;

                                const valueClass = isExpense ? "text-red-500" : "text-emerald-500";
                                const badgeClass = isExpense ? "bg-red-500" : "bg-emerald-500";

                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>{euaToBr(item.date)}</TableCell>

                                        <TableCell>
                                            <span
                                                className={`text-white px-2 py-1 rounded-md text-xs font-medium ${badgeClass}`}
                                            >
                                                {isExpense ? "Despesa" : "Receita"}
                                            </span>
                                        </TableCell>

                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.description || "-"}</TableCell>

                                        <TableCell className={`text-right font-semibold ${valueClass}`}>
                                            {formattedValue}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>

                </Table>
            </CardContent>
        </Card>

    )
}

export default TableHistory