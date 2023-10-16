'use client'

import { trpc } from "@/app/_trpc/client"
import Footer from "@/components/layout/footer"
import PageWrapper from "@/components/page-wrapper"
import { UpdateRiskForm } from "@/components/risk/form"
import { Badge } from "@/components/ui/badge"
import { DialogHeader } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { CATEGORY, RISK_STATUS } from "@/mock"
import useLangStore from "@/store/langagueStore"
import { riskStore } from "@/store/riskStore"
import { Risk } from "@/types"
import { useUser } from "@clerk/nextjs"
import { ChevronLeft, ChevronRight, ShieldQuestion } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useStore } from "zustand"

export default function RiskDataPage() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const params = useParams()
  const router = useRouter()

  const store = useStore(riskStore, state => state);

  const id = params.id
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false)

  const { user } = useUser()
  const riskData = trpc.risk.get.useQuery({
    id: id as string
  })

  const risk = riskData.data;

  useEffect(() => {
    if (!riskData.isLoading) {
      setLoading(false)
    }
    if (!riskData.isLoading && !risk) {
      router.push(`/risk-register`)
    }
  }, [loading, store, risk, id, router, riskData.isLoading])

  const category = CATEGORY(langStore.lang).filter(c => c.id === risk?.categoryId)[0]

  const subCategory = category?.subCategory?.filter(c => c.id === risk?.subCategoryId)[0]

  const riskStatus = RISK_STATUS(langStore?.lang).filter(s => s.id === risk?.riskStatusId)[0]

  if (loading || risk === null) {
    return <Skeleton className='w-screen h-screen' />
  } else return (
    <PageWrapper className="flex grow flex-col w-full h-full gap-4">
      <div className={cn('flex grow flex-col w-full h-full gap-4')}>
        <div className="w-full border-b py-2 gap-2 flex flex-col sm:flex-row">
          <div className={cn("flex flex-col sm:flex-row grow py-2 gap-3 items-start sm:items-center sm:justify-between justify-start w-full", {
            "items-end": langStore?.rtl
          })}>
            <div className={cn("flex flex-row items-center gap-3", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <ShieldQuestion className="inline-block w-5 h-5 mr-2" />
              <h1 className="text-xl font-semibold">
                {risk?.riskName}
              </h1>
            </div>
            <div className={cn("flex flex-row items-center gap-3", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <h1>{risk?.owner}</h1>
              {(risk?.impact ?? 0) * (risk?.likelihood ?? 0)}
              <p className="text-[12px]">{(new Date(risk?.dateRaised as string) as Date).toUTCString()}</p>
            </div>
          </div>
        </div>
        <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
          "items-end": langStore?.rtl
        })}>
          <h2 className="text-[20px]">{ dict?.description || "Description"}</h2>
          <p>{risk?.description}</p>
        </div>
        <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
          "items-end": langStore?.rtl
        })}>
          <h2 className="text-[20px]">{ dict?.consequences || "Consequences"}</h2>
          <p>{risk?.consequences}</p>
        </div>
        <div className={cn("flex flex-col border-[1px] p-2", {
          "items-end": langStore?.rtl
        })}>
          <h2 className="text-[20px]">{ dict?.riskLevel || "Risk Levels"}</h2>
          <div className={cn("flex flex-row flex-wrap gap-5 mt-5", {
            "flex-row-reverse": langStore?.rtl
          })}>
            {langStore?.lang === 'en' ?
              <>
                <Badge>Impact: {risk?.impact}</Badge>
                <Badge>Probability: {risk?.likelihood}</Badge>
                <Badge>Priority: {(risk?.impact ?? 0) * (risk?.likelihood ?? 0)}</Badge>
              </> :
              <>
                <Badge>{risk?.impact} :{dict?.impact}</Badge>
                <Badge>{risk?.likelihood} :{dict?.likelihood}</Badge>
                <Badge>{(risk?.impact ?? 0) * (risk?.likelihood ?? 0)} :{dict?.priority}</Badge>
              </>
            }
          </div>
        </div>
        <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
          "items-end": langStore?.rtl
        })}>
          <h2 className="text-[20px]">{ dict?.affectedAsset || "Affected Asset"}</h2>
          <p>{risk?.affectedAsset}</p>
        </div>
        <div className={cn("grid md:grid-cols-2 grid-cols-1 gap-3 border-[1px] p-2", {
          "items-end": langStore?.rtl
        })}>
          <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
            "items-end": langStore?.rtl
          })}>
            <h2 className="text-[20px]">{ dict?.category || "Category"}</h2>
            <div className={cn("flex flex-row gap-2 p-2", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <p>{category?.value}</p>
              {langStore.rtl ? <ChevronLeft /> : <ChevronRight />}
              <p>{subCategory?.value}</p>
            </div>
          </div>
          <div className={cn("flex flex-col h-full gap-3 border-[1px] p-2", {
            "items-end md:order-first": langStore?.rtl
          })}>
            <h2 className="text-[20px]">{ dict?.riskStatus || "Risk Status"}</h2>
            <p>{riskStatus.value}</p>
          </div>
        </div>
        <div className={cn("flex", {
          "justify-end": langStore?.rtl
        })}>
          <UpdateRiskForm risk={risk as Risk} />
        </div>
        <Footer className='mt-3 grow items-end' />
      </div>
    </PageWrapper>
  )
}