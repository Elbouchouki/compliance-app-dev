'use client'

import { trpc } from "@/app/_trpc/client"
import { Icons } from "@/components/icons"
import Footer from "@/components/layout/footer"
import PageWrapper from "@/components/page-wrapper"
import EditRiskDialog from "@/components/risk-register/edit-risk-dialog"
import TabNav from "@/components/tab-nav"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { RiskManagementNavItems } from "@/constants/navs.config"
import { cn } from "@/lib/utils"
import { CATEGORY, RISK_STATUS } from "@/mock"
import useLangStore from "@/store/langagueStore"
import { riskStore } from "@/store/riskStore"
import { Risk } from "@/types"
import { useUser } from "@clerk/nextjs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
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
    <PageWrapper className='flex flex-col max-w-full h-full gap-5 grow'>
      <TabNav navItems={RiskManagementNavItems} />

      <div className={cn("flex flex-row", {
        "flex-row-reverse": langStore?.rtl
      })}>
        <Link href="/risk-register" >
          <Button variant="outline" size="sm" className={cn("flex flex-row gap-2 items-center border-[#2b2d2f] bg-navbar-gray dark:bg-[#2b2d2f] dark:hover:bg-muted-foreground/10", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <Icons.back className={cn("w-5 h-5", {
              "transform rotate-180": langStore?.rtl
            })} />
            <p>
              {dict?.back || "Back"}
            </p>
          </Button>
        </Link>
        <div className={cn("flex flex-row items-center gap-2 px-4", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Link href="/risk-register" className="text-xs text-muted-foreground">
            {
              dict?.riskRegister || "Risk Register"
            }
          </Link>
          <div className="text-muted-foreground">/</div>
          <p className="text-xs text-primary-foreground dark:text-primary ">
            {risk?.riskName}
          </p>
        </div>
      </div>

      <div className="">

      </div>

      <div className='w-full p-4 flex flex-col rounded-lg border bg-navbar gap-3'>
        <h2 className={cn('text-xs md:text-sm xl:text-base font-semibold', {
          'text-right': langStore?.rtl
        })}>
          {
            dict?.description || "Description"
          }
        </h2>
        <div className={cn("text-xs md:text-sm text-muted-foreground", {
          'text-right': langStore?.rtl
        })}>
          {risk?.description}
        </div>
      </div>

      <div className='w-full p-4 flex flex-col rounded-lg border bg-navbar gap-3'>
        <h2 className={cn('text-xs md:text-sm xl:text-base font-semibold', {
          'text-right': langStore?.rtl
        })}>
          {
            dict?.consequences || "Consequences"
          }
        </h2>
        <div className={cn("text-xs md:text-sm text-muted-foreground", {
          'text-right': langStore?.rtl
        })}>
          {risk?.consequences}
        </div>
      </div>

      <div className={cn('w-full p-4 flex flex-row justify-between rounded-lg border bg-navbar ', {
        "flex-row-reverse": langStore?.rtl
      })}>
        <h2 className={cn('text-xs md:text-sm xl:text-base font-semibold', {
          'text-right': langStore?.rtl
        })}>
          {
            dict?.riskLevel || "Risk Levels"
          }
        </h2>
        <div className={cn("text-xs md:text-sm text-muted-foreground flex flex-row gap-2", {
          "flex-row-reverse": langStore?.rtl

        })}>
          <Badge variant="outline" className={cn("rounded-xl font-normal flex flew-row gap-1  ", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <p>
              {
                dict?.impact || "Impact"
              }
            </p>
            <p>:</p>
            <p>{risk?.impact}</p>
          </Badge>
          <Badge variant="outline" className={cn("rounded-xl font-normal flex flew-row gap-1  ", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <p>
              {
                dict?.likelihood || "Probability"
              }
            </p>
            <p>:</p>
            <p>{risk?.likelihood}</p>
          </Badge>
          <Badge variant="outline" className={cn("rounded-xl font-normal flex flew-row gap-1  ", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <p>
              {
                dict?.priority || "Priority"
              }
            </p>
            <p>:</p>
            <p>{(risk?.impact ?? 0) * (risk?.likelihood ?? 0)}</p>
          </Badge>
        </div>
      </div>


      <div className='w-full p-4 flex flex-col rounded-lg border bg-navbar gap-3'>
        <h2 className={cn('text-xs md:text-sm xl:text-base font-semibold', {
          'text-right': langStore?.rtl
        })}>
          {dict?.affectedAsset || "Affected Asset"}
        </h2>
        <div className={cn("text-xs md:text-sm text-muted-foreground", {
          'text-right': langStore?.rtl
        })}>
          {risk?.affectedAsset}
        </div>
      </div>

      <div className=" w-full flex flex-col rounded-lg border bg-navbar">
        <div className="flex flex-row">

          <div className={cn('w-full p-4 flex flex-row justify-between', {
            "flex-row-reverse": langStore?.rtl
          })}>
            <h2 className='text-xs md:text-sm xl:text-base'>
              {
                dict?.category || "Category"
              }
            </h2>
            <div className={cn("text-xs md:text-sm text-muted-foreground", {
              'text-right': langStore?.rtl
            })}>
              <Badge variant="outline" className={cn("flex flex-row gap-2  px-3 rounded-xl", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <p>{category?.value}</p>
                {langStore.rtl ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                <p>{subCategory?.value}</p>
              </Badge>
            </div>
          </div>

          <Separator orientation="vertical" />

          <div className={cn('w-full p-4 flex flex-row justify-between', {
            "flex-row-reverse": langStore?.rtl
          })}>
            <h2 className='text-xs md:text-sm xl:text-base'>
              {
                dict?.riskStatus || "Risk Status"
              }
            </h2>
            <Badge variant="outline" className="rounded-xl">
              {riskStatus.value}
            </Badge>
          </div>

        </div>
        <Separator />
        <div className={cn('w-full p-4 flex flex-row justify-between', {
          "flex-row-reverse": langStore?.rtl
        })}>
          <h2 className='text-xs md:text-sm xl:text-base'>
            {
              dict?.updateDate || "Update Date"
            }
          </h2>
          <div className={cn("text-xs md:text-sm text-muted-foreground", {
            'text-right': langStore?.rtl
          })}>
            <Badge variant="outline" className={cn("flex flex-row gap-2 p-1 px-2 rounded-xl", {
              "flex-row-reverse": langStore?.rtl
            })}>
              {(new Date(risk?.dateRaised as string) as Date).toLocaleString()}
            </Badge>
          </div>
        </div>
        <Separator />
        <div className={cn('w-full p-4 flex flex-row justify-between', {
          "flex-row-reverse": langStore?.rtl
        })}>
          <h2 className='text-xs md:text-sm xl:text-base'>
            {
              dict?.inherentRiskScore || "Inherent Risk Score"
            }
          </h2>
          <div className={cn("text-xs md:text-sm text-muted-foreground", {
            'text-right': langStore?.rtl
          })}>
            <Badge className={cn("flex flex-row gap-2 p-1 px-2 rounded-xl", {
              "flex-row-reverse": langStore?.rtl
            })}>
              {(risk?.impact ?? 0) * (risk?.likelihood ?? 0)}
            </Badge>
          </div>
        </div>
      </div>
      <div className={cn("flex flex-row", {
        "justify-end": langStore?.rtl
      })}>
        <Button onClick={() => {
          store.setEditModalRisk(risk as Risk)
          store.setEditModalOpen(true)
        }}>
          {
            dict?.updateRisk || "Update Risk"
          }
        </Button>
        <EditRiskDialog refresh={() => {
          riskData.refetch()
        }} />
      </div>
      <Footer className='mt-3 grow items-end' />
    </PageWrapper>
  )
}