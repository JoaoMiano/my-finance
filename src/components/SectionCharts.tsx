import ChartExpensesByCategory from "./charts/chartExpensesByCategory"
import ChartOverview from "./charts/chartOverview"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const SectionCharts = () => {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Gastos por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartExpensesByCategory />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Receitas vs Despesas</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartOverview />
                </CardContent>
            </Card>
            <Card className="col-span-2">
                <CardHeader>
                    <CardTitle>Gastos por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartExpensesByCategory />
                </CardContent>
            </Card>
        </section>
    )
}

export default SectionCharts