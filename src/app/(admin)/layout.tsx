"use client"
// import Sidebar from '@/components/layout/sidebar'
import Navbar from '@/components/layout/navbar'
import { useStore } from '@/hooks/use-store'
import useLangStore from '@/store/langagueStore'
import { cn } from '@/lib/utils'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const langStore = useStore(useLangStore, state => state)
  return (
    <div className={cn('flex flex-row w-screen h-screen', {
      "flex-row-reverse": langStore?.rtl
    })}
    >
      {/* <Sidebar /> */}
      <div className='flex flex-col w-full grow overflow-x-hidden '>
        <Navbar />
        <div className='px-1 my-2 py-2 md:py-6 overflow-y-scroll mx-3 md:mx-10 xl:mx-28 grow no-scrollbar'>
          {children}
        </div>
      </div>
    </div >
  )
}