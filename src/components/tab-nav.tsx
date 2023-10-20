"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { TabNavItem } from '@/types'
import { useStore } from '@/hooks/use-store'
import useLangStore from '@/store/langagueStore'

type TabNavProps = {
  navItems: TabNavItem[]
}

const TabNav = ({ navItems }: TabNavProps) => {
  const pathname = usePathname()
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <div className={cn('w-full border-b flex flex-row gap-6', {
      "flex-row-reverse": langStore?.rtl === true,
    })}>
      {

        (navItems).map((item, index) => (
          <Link href={item.path} key={index} className={cn(' text-xs sm:text-sm border-b-1 py-3 hover:border-primary-foreground/30 hover:dark:border-primary/30 hover:border-b-2 text-muted-foreground', {
            "border-primary-foreground dark:border-primary border-b-2 text-foreground": item.path == ('/' + pathname.split('/')[1]),
          })}>
            {
              dict ? (dict[item.key as keyof typeof dict] as string || item.name) : item.name
            }
          </Link>
        ))
      }
    </div>
  )
}

export default TabNav