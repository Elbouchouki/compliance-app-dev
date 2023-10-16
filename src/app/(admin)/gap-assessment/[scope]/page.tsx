"use client"

import { DataTable } from "@/components/gap-assessment/details/table/data-table";
import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import MaturityLevels from "@/components/gap-assessment/details/maturity-levels";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { trpc } from "@/app/_trpc/client";


export default function GapAssessments() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const params = useParams()
  const router = useRouter()
  const assessmentScope = trpc.assessment.getAssessment.useQuery({
    id: params.scope as string
  })

  useEffect(() => {
    if (!assessmentScope.isLoading && !assessmentScope.data) {
      router.push(`/gap-assessment`)
    }
  }, [assessmentScope.data, assessmentScope.isLoading, router])

  if (assessmentScope.isLoading || assessmentScope.data === null) {
    return <Skeleton className='w-full h-full' />
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
                dict?.gapAssessment
              }
            </span>
            <span>
              {"-"}
            </span>
            <span>
              {
                assessmentScope?.data?.name
              }
            </span>
          </div>
        </div>
        <div className="flex flex-col h-full gap-10 grow">
          <div>
            <MaturityLevels />
          </div>
          <div className="w-full h-full grow">
            <DataTable assessmentScopeId={assessmentScope?.data?.id || ""} />
          </div>
          <Footer className='items-end mt-3 grow' />
        </div>
      </div>
    )
  }
}