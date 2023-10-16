'use client'

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { DataTable } from "@/components/risk-register/table/data-table";
import { riskStore } from "@/store/riskStore";
import AddRiskDialogButton from "@/components/risk-register/add-risk-dialog";
import PageWrapper from "@/components/page-wrapper";
import { trpc } from "@/app/_trpc/client";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import ExportToExcelButton from "@/components/risk-register/export-to-excel-btn";
import { Risk } from "@/types";


export default function RiskRegister() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const { user } = useUser()
  const risks = trpc.risk.getAll.useQuery({
    userId: user?.id
  })
  
  const impactScore = risks?.data?.map(risk => risk.impact)
  if (risks.isLoading) {
    return <Skeleton className="w-full h-full grow" />
  }
  return (
    <PageWrapper className='flex flex-col w-full h-full gap-4 overflow-x-hidden px-4' >
      <div className={cn("w-full border-b py-2 gap-2 flex flex-col sm:flex-row", {
        "sm:flex-row-reverse": langStore?.rtl
      })}>
        <div className={cn("flex flex-row grow py-2 gap-2 items-center w-full", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.riskRegister className="inline-block w-5 h-5 mr-2" />
          <h1 className="text-xl font-semibold">
            {dict?.riskRegister || "Risk Register"}
          </h1>
        </div>
        <div className={cn("flex flex-row gap-3 justify-end", {
          "justify-end flex-row-reverse": langStore?.rtl
        })}>
          <AddRiskDialogButton />
          <ExportToExcelButton data={risks.data as Risk[]} />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
          <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
            "items-end": langStore?.rtl
          })}>
            <h2>{dict?.avgOverallRiskScore || "Avg. Overall Risk Score"}</h2>
            {
              impactScore && impactScore.length > 0 &&
              <p>{((impactScore?.reduce((prev, curr) => (prev + curr)) ?? 0) / (impactScore?.length ?? 1)).toFixed(2)}</p>
            }
          </div>
          <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
            "items-end": langStore?.rtl
          })}>
            <h2>{dict?.avgControlScore || "Avg. Control Score"}</h2>
            {/* <p>{((avgCtrlScore?.reduce((prev, curr) => (prev + curr)) ?? 0) / (avgCtrlScore?.length ?? 1)).toFixed(2)}</p> */}
          </div>
          <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
            "items-end": langStore?.rtl
          })}>
            <h2>{dict?.acceptedSolutions || "Accepted Solutions"}</h2>
            <p>3</p>
          </div>
        </div>
        <DataTable />
      </div>
      <Footer className='mt-3 grow items-end' />
    </PageWrapper>
  )
}