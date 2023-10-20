import React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useStore } from '@/hooks/use-store'
import useLangStore from '@/store/langagueStore'



type LinkType = {
  title: string,
  key?: string,
  href: string
}

const links: LinkType[] = [
  {
    title: "intuitive",
    key: "intuitive",
    href: "#"
  }, {
    title: "frictionless",
    key: "frictionless",
    href: "#"
  }, {
    title: "enterprise",
    key: "enterprise",
    href: "#"
  }, {
    title: "outstanding",
    key: "outstanding",
    href: "#"
  }, {
    title: "revolutionary",
    key: "revolutionary",
    href: "#"
  }
]


type KnowledgeQuickLinksProps = {
  className?: string
}

const KnowledgeQuickLinks = ({ className }: KnowledgeQuickLinksProps) => {


  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <div className={cn('flex flex-row gap-3 justify-center flex-wrap', className)}>
      {
        links.map((link, index) => {
          return (
            <Link href={link.href} key={index}>
              <Badge className='bg-muted text-muted-foreground hover:bg-primary-foreground dark:hover:text-white dark:hover:bg-primary/50 font-normal hover:text-primary'>
                {
                  dict ? (dict[link.key as keyof typeof dict] as string || link.title) : link.title
                }
              </Badge>
            </Link>
          )
        })
      }
    </div>
  )
}

export default KnowledgeQuickLinks