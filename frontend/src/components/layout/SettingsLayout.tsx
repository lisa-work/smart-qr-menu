import { Card } from "../ui";

interface SettingsLayoutProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

function SettingsLayout({title, subtitle, children, footer}: SettingsLayoutProps) {
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

export default SettingsLayout