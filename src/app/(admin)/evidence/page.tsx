"use client"

import AddEvidenceDialogButton from "@/components/evidence/add-evidence-dialog"
import { DataTable } from "@/components/evidence/table/data-table";
import { Icons } from "@/components/icons";
import Footer from "@/components/layout/footer";
import PageWrapper from "@/components/page-wrapper";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import useLangStore from "@/store/langagueStore";


export default function Evidence() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <PageWrapper className='flex flex-col w-full h-full gap-4' >
      <div className={cn("flex flex-col w-full gap-2 py-2 border-b sm:flex-row", {
        "sm:flex-row-reverse": langStore?.rtl,
      })}>
        <div className="flex flex-col grow">
          <h1 className={
            cn("text-xl font-semibold grow gap-2 flex flex-row items-center", {
              "flex-row-reverse": langStore?.rtl
            })
          }>
            <Icons.evidence className="w-4 h-4" />
            <span>
              {
                dict?.evidence || "Evidence"
              }
            </span>
          </h1>
          <h3 className={cn("text-sm text-muted-foreground", {
            "text-right": langStore?.rtl
          })}>
            {
              dict?.evidenceCanBeAddedAndAssociatedWithControls || "Evidence can be added and associated with controls"
            }
          </h3>
        </div>
        <div className="flex justify-end">
          <AddEvidenceDialogButton />
        </div>
      </div>
      <div className="flex flex-col h-full pr-3 overflow-x-scroll">
        <DataTable />
        <Footer className='items-end mt-3 grow' />
      </div>
    </PageWrapper>
  )
}