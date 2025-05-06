import { Checkbox } from "@/components/ui/checkbox"

interface DustBalanceItemProps {
  dust: {
    id: number
    token: string
    amount: string
    value: number
    network: string
    selected: boolean
  }
  onToggle: (id: number) => void
}

export default function DustBalanceItem({ dust, onToggle }: DustBalanceItemProps) {
  const getTokenColor = (token: string) => {
    switch (token) {
      case "ETH":
        return "bg-blue-600"
      case "USDT":
        return "bg-green-600"
      case "LINK":
        return "bg-blue-500"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full ${getTokenColor(dust.token)} flex items-center justify-center text-sm font-bold`}
        >
          {dust.token.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-base">
            {dust.amount} {dust.token}
          </div>
          <div className="text-sm text-gray-400">{dust.network}</div>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="text-right">
          <div className="font-medium text-base">${dust.value.toFixed(2)}</div>
        </div>
        <Checkbox checked={dust.selected} onCheckedChange={() => onToggle(dust.id)} className="h-5 w-5" />
      </div>
    </div>
  )
}
