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
import { Separator } from "@/components/ui/separator";
import RiskRegisterHeader from "@/components/risk-register/risk-register-header";


export default function RiskRegister() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const { user } = useUser()

  const risks = trpc.risk.getAll.useQuery({
    userId: user?.id
  })

  return (
    <PageWrapper className='flex flex-col max-w-full h-full gap-5 grow'>
      <TabNav navItems={RiskManagementNavItems} />
      <div className="flex flex-row justify-end gap-2 items-end w-full">
        <AddRiskDialogButton />
        <ExportToExcelButton data={risks.data as Risk[]} />
      </div>
      <RiskRegisterHeader />
      <div className="h-full flex flex-col rounded-lg ">
        <DataTable />
      </div>
      <Footer className='mt-3 grow items-end' />
    </PageWrapper>
  )
}