import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props = {
  title: string
  icon: LucideIcon
  value: number
  color: "red" | "blue" | "green"
}

const colorMap = {
  red: {
    text: "text-red-600",
    bg: "bg-red-100"
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-100"
  },
  green: {
    text: "text-green-600",
    bg: "bg-green-100"
  }
}

const CardOverview = (data: Props) => {
  const Icon = data.icon
  const colors = colorMap[data.color]

  return (
    <Card className="p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {data.title}
        </CardTitle>

        {/* bolha do ícone */}
        <div className={`p-2 rounded-full ${colors.bg} ${colors.text}`}>
          <Icon className="w-5 h-5" />
        </div>
      </CardHeader>

      <CardContent>
        <p className={`text-2xl font-bold ${colors.text}`}>
          R$ {data.value}
        </p>
      </CardContent>
    </Card>
  )
}

export default CardOverview
