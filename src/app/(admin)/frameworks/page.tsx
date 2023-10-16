"use client"

import { DataTable } from "@/components/framworks/table/data-table";
import { Icons } from "@/components/icons";
import Footer from "@/components/layout/footer";
import PageWrapper from "@/components/page-wrapper";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import useLangStore from "@/store/langagueStore";

export default function Framworks() {
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  return (
    <PageWrapper className='flex flex-col w-full h-full gap-4' >
      <div className="flex flex-row w-full py-2 border-b">
        <h1 className={
          cn("text-xl font-semibold grow gap-2 flex flex-row items-center", {
            "flex-row-reverse": langStore?.rtl
          })
        }>
          <Icons.frameworks className="w-5 h-5" />
          <span>
            {
              dict?.frameworks || "Framworks"
            }
          </span>
        </h1>
      </div>
      <div className="flex flex-col h-full pr-3 overflow-x-scroll">
        <DataTable />
        <Footer className='items-end mt-3 grow' />
      </div>
    </PageWrapper>
  )
}