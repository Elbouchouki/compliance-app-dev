"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { TabNavItem } from '@/types'



const NavItems: TabNavItem[] = [
  {
    name: "Knowledge Base",
    path: "/knowledge-base"
  }, {
    name: "Help",
    path: "/help"
  }, {
    name: "FAQ’s",
    path: "/fqa"
  }
]


const TabNav = () => {
  const pathname = usePathname()
  return (
    <div className='w-full border-b flex flex-row gap-6'>
      {
        NavItems.map((item, index) => (
          <Link href={item.path} key={index} className={cn('border-b-1 py-3 hover:border-primary-foreground/30 hover:dark:border-primary/30 hover:border-b-2 text-muted-foreground', {
            "border-primary-foreground dark:border-primary border-b-2 text-foreground": pathname === item.path,
          })}>
            {item.name}
          </Link>
        ))
      }
    </div>
  )
}

export default TabNav