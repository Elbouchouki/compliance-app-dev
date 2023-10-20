"use client"

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import PageWrapper from "@/components/page-wrapper";
import { cn } from "@/lib/utils";
import useLangStore from "@/store/langagueStore";
import { useStore } from "@/hooks/use-store";
import AddAssessmentDialogButton from "@/components/risk-assessment/add-assessment-dialog";
import { DataTable } from "@/components/risk-assessment/table/data-table";
import { RiskManagementNavItems } from "@/constants/navs.config";
import TabNav from "@/components/tab-nav";


export default function RiskAssessment() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <PageWrapper className='flex flex-col h-full max-w-full gap-4 grow' >
      <TabNav navItems={RiskManagementNavItems} />
      <div className={cn("flex border-b py-2 flex-col sm:flex-row gap-2", {
        "sm:flex-row-reverse": langStore?.rtl
      })}>
        <h1 className={cn("text-xl font-semibold grow flex flex-row gap-2 items-center", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.riskAssessment className=" w-5 h-5 " />
          <span>
            {
              dict?.riskAssessmentScope
            }
          </span>
        </h1>
        <div className={cn("flex justify-end", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <AddAssessmentDialogButton />
        </div>
      </div>

      <div className="h-full flex flex-col overflow-x-scroll pr-3  p-1">
        <DataTable />
        <Footer className='mt-3 grow items-end' />
      </div>
    </PageWrapper>
  )
}