export interface DashboardCardProps {
    icon?: React.ReactNode;
    count: number;
    label: string;
}

export interface DashboardResponse {
    cards: {
        foods: number;
        categories: number;
        featured: number;
        unavailable: number;
    };
}