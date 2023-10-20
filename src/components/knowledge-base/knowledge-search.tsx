
"use client"

import React from 'react'
import { Icons } from '@/components/icons'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useStore } from '@/hooks/use-store'
import useLangStore from '@/store/langagueStore'
import { cn } from '@/lib/utils'

const KnowledgeSearch = () => {


  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icons.search className="w-5 h-5 text-muted-foreground" />
      </div>
      <Input type="search" id="default-search" className="block w-full rounded-2xl p-4 pl-10 bg-navbar h-13" placeholder={dict?.search || "Search"} required />
      <Button className="absolute right-2.5 bottom-2.5" >
        {
          dict?.search || "Search"
        }
      </Button>
    </div>
  )
}

export default KnowledgeSearch