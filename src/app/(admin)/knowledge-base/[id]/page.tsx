"use client"

import BackButton from "@/components/back-button";
import { Icons } from "@/components/icons";
import Footer from "@/components/layout/footer";
import PageWrapper from "@/components/page-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { GET_KNOWLEDGE_BASE } from "@/mock";
import useLangStore from "@/store/langagueStore";
import { KnowledgeBase } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function KnowledgeDetails() {

  const params = useParams()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeBase | null>(null)


  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  useEffect(() => {
    const knowledgeBaseFound = GET_KNOWLEDGE_BASE(langStore?.lang).find(knbase => knbase.id === params.id)
    setKnowledgeBase(knowledgeBaseFound || null)
    if (knowledgeBaseFound) {
      setLoading(false)
    }
    if (!loading && !knowledgeBaseFound) {
      router.back()
    }
  }, [langStore?.lang, loading, params.id, router])


  if (loading || knowledgeBase === null) {
    return <Skeleton className='w-screen h-screen' />
  } else {
    return (
      <PageWrapper className='flex flex-col w-full h-full gap-4 px-2'>
        <div className={cn("flex flex-row w-full gap-4 py-2 border-b ", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <BackButton />
          <div className="flex flex-row items-center gap-2">
            <Icons.newspaper className="w-5 h-5" />
            <h3 className="font-semibold ">
              {
                knowledgeBase?.title
              }
            </h3>
          </div>
        </div>
        <div className={cn("flex flex-row items-center gap-2", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.calendar className="inline-block w-4 h-4 " />
          <span className="text-xs font-semibold text-muted-foreground">
            {
              dict?.lastUpdate || "Last Update"
            }
          </span>
          <span className="text-xs text-muted-foreground">
            {
              knowledgeBase?.lastUpdate.toLocaleDateString()
            }
          </span>
        </div>

        <div className="px-4 py-3 space-y-4 rounded-lg dark:border bg-card">
          {knowledgeBase.data.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <h2 className={cn("font-semibold", {
                "text-right": langStore?.rtl
              })}>{item.title}</h2>
              <p className={cn("text-sm text-justify text-muted-forground", {
                "text-right": langStore?.rtl
              })}>
                {item.content}
              </p>
            </div>
          ))}
        </div>
        <Footer />
      </PageWrapper>
    )
  }
}
