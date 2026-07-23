import type { DashboardCardProps } from "@/types/dashboard"

function DashboardCard({icon, count, label} : DashboardCardProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-lg shadow-md">
        {icon}
        <div className="flex flex-row items-center justify-center">
            <h2>{count}</h2>
            <p>{label}</p>
        </div>
    </div>
  )
}

export default DashboardCard