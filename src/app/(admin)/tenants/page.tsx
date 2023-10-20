"use client"

import AddTenantDialogButton from "@/components/tenant/add-tenant-dialog";
import { DataTable } from "@/components/tenant/table/data-table";
import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { cn } from "@/lib/utils";
import PageWrapper from "@/components/page-wrapper";



export default function Tenants() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (


    <PageWrapper className='flex flex-col w-full h-full gap-4' >
      <div className={cn("flex flex-col w-full gap-2 py-2 sm:flex-row", {
        "sm:flex-row-reverse": langStore?.rtl,
      })}>
        <div className="flex flex-col grow">
          <h1 className={
            cn("text-xl font-semibold grow gap-2 flex flex-row items-center", {
              "flex-row-reverse": langStore?.rtl
            })
          }>
            {
              dict?.tenants
            }
          </h1>
          {/* <h3 className={cn("text-sm text-muted-foreground", {
          "text-right": langStore?.rtl
        })}>
          {
            dict?.evidenceCanBeAddedAndAssociatedWithControls || "Evidence can be added and associated with controls"
          }
        </h3> */}
        </div>
        <div className="flex justify-end">
          <AddTenantDialogButton />
        </div>
      </div>

      <div className="h-full flex flex-col overflow-x-scroll pr-3">
        <DataTable />
        <Footer className='mt-3 grow items-end' />
      </div>
    </PageWrapper>
  )
}