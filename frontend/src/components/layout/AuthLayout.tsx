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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <main className="w-full max-w-md">
            <div className="flex flex-col items-center">
                {/* Logo */}
                <Logo />
                {/* Title and Subtitle */}
                <h1 className="text-2xl font-bold">{title}</h1>
                {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
            </div>

            {/* Authentication content (Login, Register, Forgot Password, etc.) */}
            <Card>
                { children }
            </Card>

            {/* Footer */}
            {footer && (
            <div className="text-xs text-muted-foreground">
                {footer}
            </div>
            )}
        </main>
    </div>
  )
}

export default AuthLayout