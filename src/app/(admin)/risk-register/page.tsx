'use client'

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { DataTable } from "@/components/risk-register/table/data-table";
import AddRiskDialogButton from "@/components/risk-register/add-risk-dialog";
import PageWrapper from "@/components/page-wrapper";
import { trpc } from "@/app/_trpc/client";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";
import ExportToExcelButton from "@/components/risk-register/export-to-excel-btn";
import { Risk } from "@/types";
import TabNav from "@/components/tab-nav";
import { RiskManagementNavItems } from "@/constants/navs.config";


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
    <PageWrapper className='flex flex-col max-w-full h-full gap-4 grow'>

      <TabNav navItems={RiskManagementNavItems} />

      <div className="flex flex-row justify-end gap-2 items-end w-full">
        <AddRiskDialogButton />
        <ExportToExcelButton data={risks.data as Risk[]} />
      </div>

      <div className="h-full flex flex-col rounded-lg ">

        <DataTable />
      </div>
      <Footer className='mt-3 grow items-end' />
    </PageWrapper>
  )
}


// <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
// <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
//   "items-end": langStore?.rtl
// })}>
//   <h2>{dict?.avgOverallRiskScore || "Avg. Overall Risk Score"}</h2>
//   {
//     impactScore && impactScore.length > 0 &&
//     <p>{((impactScore?.reduce((prev, curr) => (prev + curr)) ?? 0) / (impactScore?.length ?? 1)).toFixed(2)}</p>
//   }
// </div>
// <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
//   "items-end": langStore?.rtl
// })}>
//   <h2>{dict?.avgControlScore || "Avg. Control Score"}</h2>
//   {/* <p>{((avgCtrlScore?.reduce((prev, curr) => (prev + curr)) ?? 0) / (avgCtrlScore?.length ?? 1)).toFixed(2)}</p> */}
// </div>
// <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
//   "items-end": langStore?.rtl
// })}>
//   <h2>{dict?.acceptedSolutions || "Accepted Solutions"}</h2>
//   <p>3</p>
// </div>
// </div>