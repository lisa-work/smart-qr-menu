import { DashboardCard } from "@/components/ui";
import { useEffect, useState } from "react";
import dashboardService from "@/services/dashboard";
import type { DashboardResponse } from "@/types/dashboard";
import { toast } from "react-hot-toast";
import { CiStar, CiWarning } from "react-icons/ci";
import { TbCategory } from "react-icons/tb";
import { IoFastFoodOutline } from "react-icons/io5";

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);

            try {
                const data = await dashboardService.getDashboardData();
                setDashboardData(data);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                toast.error("Failed to fetch dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!dashboardData) {
        return <div>No data available</div>;
    }

    const cards = [
        {
            label: "Foods",
            count: dashboardData.cards.foods,
            icon: <IoFastFoodOutline />,
        },
        {
            label: "Categories",
            count: dashboardData.cards.categories,
            icon: <TbCategory />,
        },
        {
            label: "Featured",
            count: dashboardData.cards.featured,
            icon: <CiStar />,
        },
        {
            label: "Unavailable",
            count: dashboardData.cards.unavailable,
            icon: <CiWarning />,
        },
    ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
            <DashboardCard count={card.count} label={card.label} />
        ))}
    </div>
  )
}

export default DashboardPage