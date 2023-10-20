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
import { RiskManagementNavItems } from "@/constants/navs.config";
import TabNav from "@/components/tab-nav";
import { Separator } from "@/components/ui/separator";
import { Doughnut } from "react-chartjs-2";
import { useTheme } from "next-themes";


const options = {
  responsive: true,
  animation: {
    animateScale: true,
    animateRotate: true
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 10,
        padding: 12
      }
    },
  }
}

export default function RiskAssessment() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const { theme } = useTheme()
  const { user } = useUser()
  const riskData = trpc.risk.getLimited.useQuery({
    userId: user?.id as string
  })

  return (
    <PageWrapper className='flex flex-col max-w-full h-full gap-5 grow'>
      <TabNav navItems={RiskManagementNavItems} />
      <div className="flex flex-col gap-2">
        <h1 className={cn("text-base md:text-xl xl:text-2xl font-semibold", {
          "text-right": langStore?.rtl === true,
        })}>
          {dict?.riskManagementKPI || "Risk Management KPI"}
        </h1>
        <div className={cn(" text-sm text-muted-foreground", {
          "text-right": langStore?.rtl === true,
        })}>
          Description will come here, and you can go up to one line.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="w-full flex flex-col rounded-lg border bg-navbar">
          <div className="py-2 px-4 text-sm">{dict?.openIssues || "Open Issues"}</div>
          <Separator />
          <div className="p-8 flex justify-center items-center h-64">
            <Doughnut
              options={{
                responsive: true,
                animation: {
                  animateScale: true,
                  animateRotate: true
                },
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: theme === 'dark' ? '#fff' : '#000',
                      boxWidth: 10,
                      padding: 12
                    }
                  },
                }
              }}
              data={{
                labels: ['Impact high', 'Impact medium', 'Impact low', 'Overdue'],
                datasets: [
                  {
                    label: 'Issues',
                    data: [20, 18, 22, 10],
                    backgroundColor: [
                      '#b780ff',
                      '#8b33ff',
                      '#4d00b3',
                      '#6e00ff',
                    ],
                    borderColor: [
                      theme === 'dark' ? '#313438' : "#dcdcde",
                    ],
                    borderWidth: 2,
                  },
                ],
              }} />
          </div>
        </div>

        <div className="w-full flex flex-col rounded-lg border bg-navbar">
          <div className="py-2 px-4 text-sm">{dict?.controlPerformance || "Control Performance"}</div>
          <Separator />
          <div className="p-8 flex justify-center items-center h-64">
            <Doughnut
              options={{
                responsive: true,
                animation: {
                  animateScale: true,
                  animateRotate: true
                },
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      boxWidth: 10,
                      color: theme === 'dark' ? '#fff' : '#000',
                      padding: 10
                    }
                  },
                }
              }}
              data={{
                labels: ['Effect high', 'Effective', 'Effect medium', 'Effect low', 'Open', 'Overdue'],
                datasets: [
                  {
                    label: 'Controls',
                    data: [20, 18, 5, 22, 10, 25],
                    backgroundColor: [
                      '#865013',
                      '#59360d',
                      '#2d1b06',
                      '#9c5e16',
                      '#e69e4c',
                      '#b36b19',
                    ],
                    borderColor: [
                      theme === 'dark' ? '#313438' : "#dcdcde",
                    ],
                    borderWidth: 2,
                  },
                ],
              }} />
          </div>
        </div>

      </div>

      {/* <div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4">
          {!riskData.isLoading && <div className={cn("flex flex-col items-center gap-2 justify-center", {
            "order-last": langStore?.rtl
          })}>
            <h3 className="text-l">{dict?.operationalRisk || "Operational Risk"}</h3>
            <div>
              <OperationalRiskTable limitedRisks={riskData.data as Risk[]} />
            </div>
            <Link className="text-sky-600  underline" href="/risk-register">{dict?.clickHere || "Click here for more info..."}</Link>
          </div>}
          {riskData.isLoading && <Skeleton className={cn({ "order-last": langStore?.rtl })} />}
          <div className={cn("flex flex-col items-center gap-2 justify-center")}>
            <h3 className="text-l">{dict?.controlPerformance || "Control Performance"}</h3>
            <div>
              <ControlPerformanceChart />
            </div>
          </div>
          <div className={cn("flex flex-col items-center gap-2 justify-center", {
            "order-first": langStore?.rtl
          })}>
            <h3 className="text-l">{dict?.openIssues || "Open Issues"}</h3>
            <div>
              <OpenIssueChart />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col items-center gap-2 justify-center">
            <h3 className="text-l">{dict?.riskByType || "Risk by Type"}</h3>
            <div className="w-full h-full">
              <RiskByTypeChart />
            </div>
          </div>
          <div className={cn("flex flex-col items-center gap-2 justify-center", {
            "order-first": langStore?.rtl
          })}>
            <h3 className="text-l">{dict?.riskByMap || "Risk by Map"}</h3>
            <div className="w-full h-full overflow-x-scroll">
              <RiskMap />
            </div>
          </div>
        </div>
      </div> */}
      <Footer className='mt-3 grow items-end' />
    </PageWrapper>
  )
}