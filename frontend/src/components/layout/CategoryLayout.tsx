import { Card } from "../ui";

interface CategoryLayoutProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

function CategoryLayout({title, subtitle, children, footer}: CategoryLayoutProps) {
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

export default CategoryLayout