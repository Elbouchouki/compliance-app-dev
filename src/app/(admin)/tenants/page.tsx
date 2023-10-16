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

    <PageWrapper className='flex flex-col max-w-full h-full gap-4 grow' >
      <div className={cn("flex border-b py-2  flex-row", {
        "flex-row-reverse": langStore?.rtl
      })}>
        <h1 className={cn("text-xl font-semibold grow flex flex-row items-center gap-2", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.tenants className="inline-block w-5 h-5" />
          <span>
            {
              dict?.tenants
            }
          </span>
        </h1>
        <AddTenantDialogButton />
      </div>
      <div className="h-full flex flex-col overflow-x-scroll pr-3">
        <DataTable />
        <Footer className='mt-3 grow items-end' />
      </div>
    </PageWrapper>
  )
}