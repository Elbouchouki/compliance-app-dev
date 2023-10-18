import React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'



type LinkType = {
  title: string,
  href: string
}

const links: LinkType[] = [
  {
    title: "intuitive",
    href: "#"
  }, {
    title: "frictionless",
    href: "#"
  }, {
    title: "enterprise",
    href: "#"
  }, {
    title: "outstanding",
    href: "#"
  }, {
    title: "revolutionary",
    href: "#"
  }
]


type KnowledgeQuickLinksProps = {
  className?: string
}

const KnowledgeQuickLinks = ({ className }: KnowledgeQuickLinksProps) => {
  return (
    <div className={cn('flex flex-row gap-3 justify-center flex-wrap', className)}>
      {
        links.map((link, index) => {
          return (
            <Link href={link.href} key={index}>
              <Badge className='bg-muted text-muted-foreground hover:bg-primary-foreground dark:hover:text-white dark:hover:bg-primary/50 font-normal hover:text-primary'>
                {link.title}
              </Badge>
            </Link>
          )
        })
      }
    </div>
  )
}

export default KnowledgeQuickLinks