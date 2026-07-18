import { Card } from "../ui";

interface FoodLayoutProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

function FoodsLayout({title, subtitle, children, footer}: FoodLayoutProps) {
  return (
    <div>
        <div className="flex flex-col items-center justify-center">
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
        </div>
        <div>
            <Card>
                {children}
            </Card>
        </div>
        {footer && (
            <div className="text-xs text-muted-foreground">
                {footer}
            </div>
        )}
    </div>
  )
}

export default FoodsLayout