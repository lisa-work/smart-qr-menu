interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {children}
    </div>
  )
}

export default DashboardLayout