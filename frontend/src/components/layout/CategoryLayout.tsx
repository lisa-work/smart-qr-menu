import type { LayoutProps } from '@/types/layout' 

function CategoryLayout({title, subtitle, footer, children} : LayoutProps) {
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

export default CategoryLayout