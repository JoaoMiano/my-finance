'use client'

import { useAuth } from "@/context/authContext";
import { useEffect, useState } from "react";
import CardOverview from "./CardOverview";
import { BanknoteArrowDown, BanknoteArrowUp, CircleDollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const SectionOverview = () => {
  const { user } = useAuth()
  const token = user?.token

  const [values, setValues] = useState({
    totalReceitas: 0,
    totalDespesas: 0,
    saldo: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/overview", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });

        const data = await res.json();
        

        setValues({
          totalReceitas: data.overview.totalIncome,
          totalDespesas: data.overview.totalExpenses,
          saldo: data.overview.balance,
        });

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Skeleton className="h-32 w-full rounded-xl bg-gray-300" />
        <Skeleton className="h-32 w-full rounded-xl bg-gray-300" />
        <Skeleton className="h-32 w-full rounded-xl bg-gray-300" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <CardOverview color="green" icon={BanknoteArrowUp} title="Total Receitas" value={values.totalReceitas} />
      <CardOverview color="red" icon={BanknoteArrowDown} title="Total Despesas" value={values.totalDespesas} />
      <CardOverview color="blue" icon={CircleDollarSign} title="Saldo" value={values.saldo} />
    </div>
  )
}

export default SectionOverview;
