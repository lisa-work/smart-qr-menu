import React from 'react'
import { Card } from '../ui'
import Logo from '../common/Logo'

// This component is used to wrap authentication pages, providing a consistent layout with a title and optional subtitle.
interface AuthLayoutProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
}

function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-2">
            <div className="flex flex-col items-center my-3">
                {/* Logo */}
                <Logo />
                {/* Title and Subtitle */}
                <div className="text-center mb-2">
                    <h1>{title}</h1>
                    {subtitle && <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>}
                </div>
            </div>

            {/* Authentication content (Login, Register, Forgot Password, etc.) */}
            <Card>
                { children }
            </Card>

            {/* Footer */}
            {footer && (
            <div className="text-xs md:text-sm my-2 text-muted-foreground">
                {footer}
            </div>
            )}
        </div>
    </div>
  )
}

export default AuthLayout