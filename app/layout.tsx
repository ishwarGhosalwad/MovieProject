import './globals.css'
import React from 'react'

export const metadata = {
  title: 'Next Movie Explorer',
  description: 'A small movie explorer using TMDB and Next.js App Router',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container">
            <h1 className="site-title">Next Movie Explorer</h1>
          </div>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  )
}