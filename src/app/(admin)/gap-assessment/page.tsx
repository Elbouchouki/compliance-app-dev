"use client"

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/gap-assessment/table/data-table";
import AddAssessmentDialogButton from "@/components/gap-assessment/add-assessment-dialog";
import PageWrapper from "@/components/page-wrapper";


export default function GapAssessments() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <PageWrapper className='flex flex-col h-full max-w-full gap-4 grow' >


      <div className={cn("flex py-2 flex-col sm:flex-row gap-2", {
        "sm:flex-row-reverse": langStore?.rtl
      })}>
        <h1 className={cn("text-xl font-semibold grow flex flex-row gap-2 items-center", {
          "flex-row-reverse": langStore?.rtl
        })}>
          {
            dict?.gapAssessmentScope
          }
        </h1>
        <div className={cn("flex justify-end", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <AddAssessmentDialogButton />
        </div>
      </div>

      {/* 

      <div className={cn("flex border-b py-2 flex-col sm:flex-row gap-2", {
        "sm:flex-row-reverse": langStore?.rtl
      })}>
        <h1 className={cn("text-xl font-semibold grow flex flex-row gap-2 items-center", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.gapAssessment className=" w-5 h-5 " />
          <span>
            {
              dict?.gapAssessmentScope
            }
          </span>
        </h1>
        <div className={cn("flex justify-end", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <AddAssessmentDialogButton />
        </div>
      </div> */}

      <div className="h-full flex flex-col">
        <DataTable />
        <Footer className='mt-3 grow items-end' />
      </div>
    </PageWrapper>
  )
}