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
import PageWrapper from "@/components/page-wrapper";
import Link from "next/link";
import TableSkeleton from "@/components/table-skeleton";


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


  return (
    <PageWrapper className='flex flex-col h-full max-w-full gap-4 grow' >
      <div className={cn("flex flex-row", {
        "flex-row-reverse": langStore?.rtl
      })}>
        <Link href="/gap-assessment" >
          <Button variant="outline" size="sm" className={cn("flex flex-row gap-2 items-center  bg-navbar-gray dark:bg-[#2b2d2f] dark:hover:bg-muted-foreground/10", {
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
            assessmentScope?.isLoading ?

              <div className="flex flex-row items-center gap-2 shadow animate-pulse">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-14"></div>
                /
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-14"></div>

              </div>
              :
              <>
                <Link href="/gap-assessment" className="text-xs text-muted-foreground">
                  {
                    dict?.gapAssessmentScope
                  }
                </Link>
                <div className="text-muted-foreground">/</div>
                <p className="text-xs text-primary-foreground dark:text-primary ">
                  {
                    assessmentScope?.data?.name
                  }
                </p>
              </>
          }
        </div>
      </div>
      <MaturityLevels />
      {
        assessmentScope.isLoading ?
          <TableSkeleton elements={7} />
          :

          <DataTable assessmentScopeId={assessmentScope?.data?.id || ""} />
      }
      <Footer className='items-end mt-3 grow' />
    </PageWrapper >
  )
}