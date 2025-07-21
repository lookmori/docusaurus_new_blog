import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import ProgressBar from '@/components/ui/ProgressBar'
import Toast from '@/components/ui/Toast'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import FloatingElements from '@/components/animations/FloatingElements'
// Music player components have been removed

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '我的博客',
  description: '基于Next.js和MDX的个人博客',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <ProgressBar />
            <FloatingElements />
            <div className="min-h-screen bg-white dark:bg-gray-900 relative">
              <Header />
              <main className="container mx-auto px-4 py-8 relative z-10">
                {children}
              </main>
            </div>
            {/* Music player components have been removed */}
            <Toast />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}