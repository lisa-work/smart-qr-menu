import { Card } from "../ui";

interface FoodLayoutProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

function FoodsLayout({title, subtitle, children, footer}: FoodLayoutProps) {
  return (
    <div className="m-5">
        <div className="text-left mx-3 md:mx-5 my-5 md:my-10">
            <h1>{title}</h1>
            <p className="text-xs md:text-sm lg:text-base text-gray-700">{subtitle}</p>
        </div>
        <div>
            {children}
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