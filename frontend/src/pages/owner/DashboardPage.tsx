import { DashboardCard } from "@/components/ui";
import { useEffect, useState } from "react";
import dashboardService from "@/services/dashboard";
import type { DashboardResponse } from "@/types/dashboard";
import { toast } from "react-hot-toast";
import { TbCategory } from "react-icons/tb";
import { IoFastFoodOutline, IoWarningOutline } from "react-icons/io5";
import { useAuth } from "@/hooks/useAuth";
import { GeneralLayout } from "@/components";
import { FaRegStar } from "react-icons/fa";

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

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
            icon: <IoFastFoodOutline size={50} color="404c21" className="custom-tailwind-class" style={{ backgroundColor: "d0f4de", padding: "10px", borderRadius: "20%" }}/>,
        },
        {
            label: "Categories",
            count: dashboardData.cards.categories,
            icon: <TbCategory size={50} color="118ab2" className="custom-tailwind-class" style={{ backgroundColor: "a9def9", padding: "10px", borderRadius: "20%" }}/>,
        },
        {
            label: "Featured",
            count: dashboardData.cards.featured,
            icon: <FaRegStar size={50} color="e09f3e" className="custom-tailwind-class" style={{ backgroundColor: "fcf6bd", padding: "10px", borderRadius: "20%" }}/>,
        },
        {
            label: "Unavailable",
            count: dashboardData.cards.unavailable,
            icon: <IoWarningOutline size={50} color="9e2a2b" className="custom-tailwind-class" style={{ backgroundColor: "ffa5ab", padding: "10px", borderRadius: "20%" }}/>,
        },
    ];

    const title = `Welcome back, ${user?.name}`;

  return (
    <div>
        {/* Overview of the dashboard */}
        <GeneralLayout title={title} subtitle="Here's an overview of your menu">
            {cards.map((card) => (
                <DashboardCard count={card.count} label={card.label} icon={card.icon}/>
            ))}
        </GeneralLayout>

        {/* Analysis */}
        <div className="mx-5 mt-8">
            <h2 className="text-left m-5">Analysis</h2>
        </div>

        {/* Quick Availability */}
        <div className="mx-5 mt-8">
            <h2 className="text-left m-5">Quick Availability</h2>
        </div>
    </div>
  )
}

export default DashboardPage