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

  // const risks = risksData.data;

  useEffect(() => {
    if (!scope.isLoading && !scope.data) {
      router.push(`/risk-assessment`)
    }
  }, [router, scope.data, scope.isLoading])

  if (scope.isLoading || scope.data === null) {
    return <Skeleton className='w-screen h-screen' />
  } else {
    return (
      <div className='flex flex-col h-full max-w-full gap-4 grow' >
        <div className={cn("w-full flex flex-row gap-4 ", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Button variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className={cn("flex flex-row items-center gap-2", {
              "flex-row-reverse": langStore?.rtl
            })}
          >
            <ArrowLeft className={cn("w-4 h-4", {
              "transform rotate-180": langStore?.rtl
            })} />
            <span>
              {
                dict?.backToAllScopes || "Back to all scopes"
              }
            </span>
          </Button>
        </div>
        <div className={cn("flex flex-row items-center w-full gap-2 py-2 border-b ", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.gapAssessment className={cn("inline-block w-5 h-5 mr-2 ", {
            "ml-2 mr-0": langStore?.rtl
          })} />

          <div className={cn("text-xl font-semibold grow flex flex-row gap-1 ", {
            "text-right flex-row-reverse": langStore?.rtl
          })}>
            <span>
              {
                dict?.riskAssessment
              }
            </span>
            <span>
              {"-"}
            </span>
            <span>
              {
                scope?.data?.name
              }
            </span>
          </div>
          <AddRiskDialogButton scopeId={params.scope as string} />
          <ExportToExcelButton data={risksData.data as Risk[]} />
        </div>
        <div className="flex flex-col h-full gap-10 grow">
          <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
            "items-end": langStore?.rtl
          })}>
            <h2 className="text-[20px]">{dict?.description || "Description"}</h2>
            <p>{scope?.data?.description}</p>
          </div>
          <div className={cn("grid md:grid-cols-2 grid-cols-1 gap-3 border-[1px] p-2", {
            "items-end": langStore?.rtl
          })}>
            <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
              "items-end": langStore?.rtl
            })}>
              <div className={cn("flex flex-row gap-2 p-2", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <h2>{dict?.type || "Type"}</h2>
                {langStore?.rtl ? <ChevronLeft /> : <ChevronRight />}
                <p>{scope?.data?.type}</p>
              </div>
            </div>
            <div className={cn("flex flex-row items-center gap-2 p-4 border-[1px]", {
              "flex-row-reverse md:order-first": langStore?.rtl
            })}>
              <h2>{dict?.status || "Status"}</h2>
              {langStore?.rtl ? <ChevronLeft /> : <ChevronRight />}
              <p>{scope?.data?.status}</p>
            </div>
          </div>
          <div className={cn("grid md:grid-cols-2 grid-cols-1 gap-3 border-[1px] p-2", {
            "items-end": langStore?.rtl
          })}>
            <div className={cn("flex flex-row items-center gap-2 p-4 border-[1px]", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <h2>{dict?.reportingFrom || "Reporting From"}</h2>
              {langStore?.rtl ? <ChevronLeft /> : <ChevronRight />}
              <p>{(new Date(scope?.data?.reportingFrom as string)).toLocaleString()}</p>
            </div>
            <div className={cn("flex flex-row items-center gap-2 p-4 border-[1px]", {
              "flex-row-reverse md:order-first": langStore?.rtl
            })}>
              <h2>{dict?.reportingTo || "Reporting To"}</h2>
              {langStore?.rtl ? <ChevronLeft /> : <ChevronRight />}
              <p>{(new Date(scope?.data?.reportingTo as string)).toLocaleString()}</p>
            </div>
          </div>
          <div>
            <DataTable scopeId={params.scope as string} />
          </div>
          <Footer className='items-end mt-3 grow' />
        </div>
      </div>
    )
  }
}