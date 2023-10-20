"use client"

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Risk, RiskAssessmentScope } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import useRiskAssessmentScopeStore from "@/store/riskAssessementScopeStore";
import { DataTable } from "@/components/risk-assessment-scope/table/data-table";
import AddRiskDialogButton from "@/components/risk-assessment-scope/add-risk-dialog";
import { riskStore } from "@/store/riskStore";
import { useUser } from "@clerk/nextjs";
import { trpc } from "@/app/_trpc/client";
import ExportToExcelButton from "@/components/risk-assessment-scope/export-to-excel-btn";
import PageWrapper from "@/components/page-wrapper";
import TabNav from "@/components/tab-nav";
import Link from "next/link";
import { RiskManagementNavItems } from "@/constants/navs.config";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function RiskAssessmentDetails() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const params = useParams()
  const router = useRouter()

  const { user } = useUser()


  const scope = trpc.riskAssessmentScope.get.useQuery({
    id: params.scope as string
  })

  const risksData = trpc.risk.getByUserId.useQuery({
    riskScopeId: params.scope as string,
    userId: user?.id as string
  })


  console.log("scope", scope.data)
  console.log("risksData", risksData.data)

  useEffect(() => {
    if (!scope?.isLoading && !scope?.data) {
      router.push(`/risk-assessment`)
    }
  }, [router, scope?.data, scope?.isLoading])


  return (

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
        {/* // TODO : loading */}
        <div className={cn("flex flex-row items-center gap-2 px-4", {
          "flex-row-reverse": langStore?.rtl
        })}>
          {
            scope?.isLoading ?

              <div className="flex flex-row items-center gap-2 shadow animate-pulse">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-14"></div>
                /
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-14"></div>

              </div>
              :
              <>
                <Link href="/risk-assessment" className="text-xs text-muted-foreground">
                  {
                    dict?.riskAssessment
                  }
                </Link>
                <div className="text-muted-foreground">/</div>
                <p className="text-xs text-primary-foreground dark:text-primary ">
                  {
                    scope?.data?.name
                  }
                </p>
              </>
          }
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <AddRiskDialogButton scopeId={params.scope as string} />
      </div>

      {
        scope?.isLoading ?

          <>
            <div className="shadow animate-pulse  w-full flex flex-col rounded-lg border bg-navbar">
              <div className='flex flex-row'>
                <div className='p-4 w-full'>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                </div>
                <Separator orientation='vertical' />
                <div className='p-4 w-full'>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                </div>
              </div>
              <Separator />
              <div className='flex flex-row'>
                <div className='p-4 w-full'>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                </div>
                <Separator orientation='vertical' />
                <div className='p-4 w-full'>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                </div>
              </div>
            </div>
            <div className="shadow animate-pulse  w-full flex flex-col rounded-lg border bg-navbar">
              <div className='flex flex-row'>
                <div className='p-4 w-full'>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                </div>
                <Separator orientation='vertical' />
                <div className='p-4 w-full'>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                </div>
              </div>
            </div>
          </>
          :
          <>
            <div className=" w-full flex flex-col rounded-lg border bg-navbar">
              <div className="flex flex-row">
                <div className={cn('w-full p-4 flex flex-row justify-between', {
                  "flex-row-reverse": langStore?.rtl
                })}>

                  <h2 className='text-xs md:text-sm xl:text-base'>
                    {
                      dict?.type || "Type"
                    }
                  </h2>
                  <div className={cn("text-xs md:text-sm text-muted-foreground", {
                    'text-right': langStore?.rtl
                  })}>
                    <Badge variant="outline" className={cn("flex flex-row gap-2  px-3 rounded-xl", {
                      "flex-row-reverse": langStore?.rtl
                    })}>
                      {
                        scope?.data?.type
                      }
                    </Badge>
                  </div>
                </div>
                <Separator orientation="vertical" />
                <div className={cn('w-full p-4 flex flex-row justify-between', {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  <h2 className='text-xs md:text-sm xl:text-base'>
                    {
                      dict?.status || "Status"
                    }
                  </h2>
                  <Badge variant="outline" className="rounded-xl">
                    {
                      scope?.data?.status
                    }
                  </Badge>
                </div>
              </div>
              <Separator />
              <div className="flex flex-row">
                <div className={cn('w-full p-4 flex flex-row justify-between', {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  <h2 className='text-xs md:text-sm xl:text-base'>
                    {
                      dict?.reportingFrom || "Reporting From"
                    }
                  </h2>
                  <div className={cn("text-xs md:text-sm text-muted-foreground", {
                    'text-right': langStore?.rtl
                  })}>
                    <Badge variant="outline" className={cn("flex flex-row gap-2  px-3 rounded-xl", {
                      "flex-row-reverse": langStore?.rtl
                    })}>
                      {
                        new Date(scope?.data?.reportingFrom as string).toLocaleDateString()
                      }
                    </Badge>
                  </div>
                </div>
                <Separator orientation="vertical" />
                <div className={cn('w-full p-4 flex flex-row justify-between', {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  <h2 className='text-xs md:text-sm xl:text-base'>
                    {
                      dict?.reportingTo || "Reporting To"
                    }
                  </h2>
                  <Badge variant="outline" className="rounded-xl">
                    {
                      new Date(scope?.data?.reportingTo as string).toLocaleDateString()
                    }
                  </Badge>
                </div>
              </div>
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
                {
                  scope?.data?.description
                }
              </div>
            </div>
          </>
      }

      <div className="h-full flex flex-col overflow-x-scroll ">
        <DataTable scopeId={params.scope as string} />
        <Footer className='mt-3 grow items-end' />
      </div>

    </PageWrapper>
  )
}