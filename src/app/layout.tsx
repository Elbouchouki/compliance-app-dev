import '@/styles/globals.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { APP_CONFIG } from '@/constants/app.config'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ClerkProvider } from '@clerk/nextjs'
import TRPCProvider from '@/app/_trpc/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: `%s - ${APP_CONFIG.appName}`,
    default: `${APP_CONFIG.appName} - Home`,
  },
  description: `${APP_CONFIG.appName} - Home`
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider>
      <html lang="en-US" suppressHydrationWarning >
        <body className={inter.className}>
          <TRPCProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <TooltipProvider>
                <main
                  className='w-screen h-screen'
                >
                  {children}
                </main>
              </TooltipProvider>
            </ThemeProvider>
          </TRPCProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider >
  )
}