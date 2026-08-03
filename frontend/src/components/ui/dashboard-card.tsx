import type { DashboardCardProps } from "@/types/dashboard"

function DashboardCard({icon, count, label} : DashboardCardProps) {
  return (
    <div className="flex flex-row items-center justify-start p-4 rounded-lg border-2 hover:shadow-md m-2">
        {icon}
      <div className="flex flex-col justify-start items-start mx-3">
            <h2 className="font-bold">{count}</h2>
            <p className="text-xs">{label}</p>
        </div>
    </div>
  )
}

export default DashboardCard