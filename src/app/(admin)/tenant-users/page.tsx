"use client"

import AddTenantDialogButton from "@/components/tenant-users/add-tenant-users-dialog";
import { DataTable } from "@/components/tenant-users/table/data-table";
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
    <PageWrapper className='flex flex-col max-w-full h-full gap-4 grow'>
      <div className="flex flex-col gap-4 grow ">
        <div className="flex flex-col items-center py-5">
          <h1 className="text-3xl font-semibold">Our Beloved Members</h1>
          <h4 className="text-muted-foreground text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper vestibulum ac urna pharetra ligula</h4>
        </div>
        <div className={cn("flex justify-end", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <AddTenantDialogButton />
        </div>
      </div>
      <div className="h-full flex flex-col">
        <DataTable />
        <Footer className='mt-3 grow items-end' />
      </div>
    </PageWrapper>
  )
}