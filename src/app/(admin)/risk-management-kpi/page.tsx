'use client'

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import OperationalRiskTable from "@/components/risk-management-kpi/table";
import { ControlPerformanceChart } from "@/components/risk-management-kpi/control-performance-chart";
import { OpenIssueChart } from "@/components/risk-management-kpi/open-issue-chart";
import RiskMap from "@/components/risk-management-kpi/risk-by-map";
import { RiskByTypeChart } from "@/components/risk-management-kpi/risk-by-type-chart";
import Link from "next/link";
import PageWrapper from "@/components/page-wrapper";
import { useUser } from "@clerk/nextjs";
import { trpc } from "@/app/_trpc/client";
import { Risk } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";


export default function RiskAssessment() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const { user } = useUser()
  const riskData = trpc.risk.getLimited.useQuery({
    userId: user?.id as string
  })

  return (
    <PageWrapper className='flex flex-col max-w-full h-full gap-4 grow' >
      <div className="w-full border-b py-2 gap-2 flex flex-col sm:flex-row ">
        <div className={cn("flex flex-row grow py-2 gap-2 items-center w-full", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.riskManagementKPI className="inline-block w-5 h-5 mr-2" />
          <h1 className="text-xl font-semibold">
            { dict?.riskManagementKPI || "Risk Management KPI"}
          </h1>
        </div>
      </div>
      <div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4">
          {!riskData.isLoading && <div className={cn("flex flex-col items-center gap-2 justify-center", {
            "order-last": langStore?.rtl
          })}>
            <h3 className="text-l">{ dict?.operationalRisk || "Operational Risk"}</h3>
            <div>
              <OperationalRiskTable limitedRisks={riskData.data as Risk[]} />
            </div>
            <Link className="text-sky-600  underline" href="/risk-register">{ dict?.clickHere || "Click here for more info..."}</Link>
          </div>}
          {riskData.isLoading && <Skeleton className={cn({"order-last": langStore?.rtl})} />}
          <div className={cn("flex flex-col items-center gap-2 justify-center")}>
            <h3 className="text-l">{ dict?.controlPerformance || "Control Performance"}</h3>
            <div>
              <ControlPerformanceChart />
            </div>
          </div>
          <div className={cn("flex flex-col items-center gap-2 justify-center", {
            "order-first": langStore?.rtl
          })}>
            <h3 className="text-l">{ dict?.openIssues || "Open Issues"}</h3>
            <div>
              <OpenIssueChart />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col items-center gap-2 justify-center">
            <h3 className="text-l">{ dict?.riskByType || "Risk by Type"}</h3>
            <div className="w-full h-full">
              <RiskByTypeChart />
            </div>
          </div>
          <div className={cn("flex flex-col items-center gap-2 justify-center", {
            "order-first": langStore?.rtl
          })}>
            <h3 className="text-l">{ dict?.riskByMap || "Risk by Map"}</h3>
            <div className="w-full h-full overflow-x-scroll">
              <RiskMap />
            </div>
          </div>
        </div>
      </div>
      <Footer className='mt-3 grow items-end' />
    </PageWrapper>
  )
}