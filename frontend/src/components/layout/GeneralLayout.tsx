interface GeneralLayoutProps {
    title: string;
    subtitle?: string;
    footer?: string;
    children: React.ReactNode;
}

function DashboardLayout({ title, subtitle, footer, children }: GeneralLayoutProps) {
  return (
    <div className="m-5">
        <div className="text-left mx-3 md:mx-5 my-5 md:my-10">
            <h1>{title}</h1>
            <p className="text-xs md:text-sm lg:text-base text-gray-700">{subtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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

export default DashboardLayout