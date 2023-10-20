'use client';
import 'chart.js/auto';

import Footer from "@/components/layout/footer";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { RiskRatingChart } from "@/components/risk-mamagement/risk-rating-chart";
import { ActionPlanChart } from "@/components/risk-mamagement/action-plan-chart";
import { RiskVulnerabilitiesChart } from "@/components/risk-mamagement/risk-vulnerabilities";
import { cn } from "@/lib/utils";
import PageWrapper from "@/components/page-wrapper";
import { useUser } from "@clerk/nextjs";
import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Risk } from "@/types";
import TabNav from "@/components/tab-nav";
import { RiskManagementNavItems } from "@/constants/navs.config";
import { Progress } from "@/components/ui/progress";
import { Kanban, KanbanSquare, LineChart, Shield, TrendingUp } from "lucide-react";
import { color } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Bar, Doughnut } from "react-chartjs-2";
import { faker } from '@faker-js/faker';
import { useTheme } from 'next-themes';
import RiskHeatMap from '@/components/risk-heat-map';
import { Badge } from '@/components/ui/badge';


const KPIItem = ({ icon, title, value, color }: {
  title: string,
  icon: React.ReactNode,
  value: number,
  color?: string
}) => {
  return (
    <div className="w-full flex flex-col rounded-lg border bg-navbar p-4 gap-4">
      <div className="rounded-full border-2 w-12 h-12 flex justify-center items-center">
        {
          icon
        }
      </div>
      <div className="font-semibold text-sm mb-auto">
        {title}
      </div>
      <Progress className={cn(color)} value={value} />
      <div className="justify-between flex flex-row text-muted-foreground" >
        <p className="text-sm ">
          {
            value.toFixed(0) + "%"
          }
        </p>
        <p className="text-sm">100%</p>
      </div>
    </div >
  )
}

type RiskKeyHelp = "High Risk" | "Medium Risk" | "Low Risk"

export default function RiskManagements() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const { user } = useUser()
  const riskData = trpc.risk.getAll.useQuery({
    userId: user?.id as string
  })

  const riskScore = riskData?.data?.map(r => r.impact * r.likelihood);
  const { theme } = useTheme()

  const riskThresholdPercentage = 84
  const riskThreshold = riskScore?.reduce((total, current) => total + current, 0) ?? 0;
  const riskAnalysisProgress = 86.7
  const responseProgressForRistkThreshold = ((riskData?.data?.filter(r => r.impact * r.likelihood === 25).length ?? 0) / (riskData?.data?.length ?? 1) * 100) || 0;
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', "October", "November", "December"];
  const element1_data = labels.map(() => faker.number.int({ min: 0, max: 100 }));
  const element2_data = labels.map(() => faker.number.int({ min: 0, max: 100 }));
  // (riskData?.data?.filter(r => r.impact * r.likelihood === 25).length ?? 0) / (riskData?.data?.length ?? 1) * 100;


  const colors = ["bg-[#1daf70]", "bg-[#126e46]", "bg-[#3adf97]", "bg-[#0a77ff]", "bg-[#125dcb]", "bg-[#0b3387]"]

  const breakdownLegends = ["High Risk", "Medium Risk", "Low Risk"]

  const riskRatingBreakdownColors = {
    "High Risk": '#1daf70',
    "Medium Risk": '#126e46',
    "Low Risk": '#3adf97',
  }
  const actionPlanBreakdownColors = {
    "High Risk": '#0a77ff',
    "Medium Risk": '#125dcb',
    "Low Risk": '#0b3387',
  }
  const riskRatingBreakdown = {
    "High Risk": 20,
    "Medium Risk": 50,
    "Low Risk": 30,
  }
  const actionPlanBreakdown = {
    "High Risk": 10,
    "Medium Risk": 20,
    "Low Risk": 70,
  }

  return (
    <PageWrapper className='flex flex-col max-w-full h-full gap-5 grow'>
      <TabNav navItems={RiskManagementNavItems} />
      <div className="flex flex-col gap-2">
        <h1 className={cn("text-base md:text-xl xl:text-2xl font-semibold", {
          "text-right": langStore?.rtl === true,
        })}>
          {dict?.riskManagementOverview || "Risk Management Overview"}
        </h1>
        <div className={cn(" text-sm text-muted-foreground", {
          "text-right": langStore?.rtl === true,
        })}>
          Description will come here, and you can go up to one line.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPIItem
          title={dict?.riskThresholdPercentage || "Risk Threshold Percentage"}
          icon={<KanbanSquare className="w-5 h-5" />}
          value={riskThresholdPercentage}
          color="bg-[#efa22f]"
        />
        <KPIItem
          title={dict?.riskThreshold || "Risk Threshold"}
          icon={<Shield className="w-5 h-5" />}
          value={riskThreshold}
          color="bg-[#1c84f6]"
        />
        <KPIItem
          title={dict?.riskAnalysisProgress || "Risk Analysis Progress"}
          icon={<LineChart className="w-5 h-5" />}
          value={riskAnalysisProgress}
          color="bg-[#f06a6a]"
        />
        <KPIItem
          title={dict?.responseProgressForRiskThreshold || "Response Progress For Risk Threshold"}
          icon={<TrendingUp className="w-5 h-5" />}
          value={responseProgressForRistkThreshold}
          color="bg-[#0982ee]"
        />
      </div >

      <div className="w-full  flex-col rounded-lg border bg-navbar flex ">
        <div className={cn("py-2 px-4 text-sm font-semibold", {
          "text-right": langStore?.rtl
        })}>
          Advanced graph
        </div>
        <Separator />
        <div className="p-4 ">
          <Bar
            className=' h-72'
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  rtl: langStore?.rtl,
                  position: 'top',
                  align: 'end',
                  labels: {
                    boxWidth: 10,
                    color: theme === 'dark' ? '#fff' : '#000',
                    padding: 10
                  }
                },
              }
            }}
            data={{
              labels,
              datasets: [
                {
                  label: 'Element 1',
                  data: element1_data,
                  backgroundColor: '#125dcb',
                  barThickness: 10,
                  borderRadius: 10,
                  borderColor: theme === 'dark' ? '#313438' : "#dcdcde",
                  borderWidth: 1
                },
                {
                  label: 'Element 2',
                  data: element2_data,
                  backgroundColor: '#4d9cff',
                  barThickness: 10,
                  borderRadius: 10,
                  borderColor: theme === 'dark' ? '#313438' : "#dcdcde",
                  borderWidth: 1
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">


        <div className="w-full  flex-col rounded-lg border bg-navbar flex ">
          <div className={cn("py-2 px-4 text-sm font-semibold", {
            "text-right": langStore?.rtl
          })}>
            Risk Rating Breakdown
          </div>
          <Separator />
          <div className="p-4 flex flex-col gap-2">
            <div className="p-8 flex justify-center items-center h-64">
              <Doughnut
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  }
                }}
                data={{
                  labels: breakdownLegends,
                  datasets: [
                    {
                      label: 'Issues',
                      data: Object.values(riskRatingBreakdown),
                      backgroundColor: Object.values(riskRatingBreakdownColors),
                      borderColor: [
                        theme === 'dark' ? '#313438' : "#dcdcde",
                      ],
                      borderWidth: 2,
                    },
                  ],
                }} />
            </div>
            {
              Object.keys(riskRatingBreakdown).map((key, index) => {
                return (
                  <>
                    <div className='flex flex-row justify-between items-center gap-2'>
                      <div className={cn('w-2 h-2 rounded-full', `bg-[${riskRatingBreakdownColors[key as RiskKeyHelp]}]`)}></div>
                      <div className='w-full text-sm'>
                        {
                          key.slice(0, 1) + key.slice(1).toLowerCase()
                        }
                      </div>
                      <Badge variant="outline" > {riskRatingBreakdown[key as RiskKeyHelp]}% </Badge>
                    </div>
                    <Separator className={cn({ "hidden": index === Object.values(riskRatingBreakdown).length - 1 })} />
                  </>
                )
              })
            }
          </div>
        </div>

        <div className="w-full  flex-col rounded-lg border bg-navbar flex ">
          <div className={cn("py-2 px-4 text-sm font-semibold", {
            "text-right": langStore?.rtl
          })}>
            Risk Rating Breakdown
          </div>
          <Separator />
          <div className="p-4 flex flex-col gap-2">
            <div className="p-8 flex justify-center items-center h-64">
              <Doughnut
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  }
                }}
                data={{
                  labels: breakdownLegends,
                  datasets: [
                    {
                      label: 'Issues',
                      data: Object.values(actionPlanBreakdown),
                      backgroundColor: Object.values(actionPlanBreakdownColors),
                      borderColor: [
                        theme === 'dark' ? '#313438' : "#dcdcde",
                      ],
                      borderWidth: 2,
                    },
                  ],
                }} />
            </div>
            {
              Object.keys(actionPlanBreakdown).map((key, index) => {
                return (
                  <>
                    <div className='flex flex-row justify-between items-center gap-2'>
                      <div className={cn('w-2 h-2 rounded-full', `bg-[${actionPlanBreakdownColors[key as RiskKeyHelp]}]`)}></div>
                      <div className='w-full text-sm'>
                        {
                          key.slice(0, 1) + key.slice(1).toLowerCase()
                        }
                      </div>
                      <Badge variant="outline" > {actionPlanBreakdown[key as RiskKeyHelp]}% </Badge>
                    </div>
                    <Separator className={cn({ "hidden": index === Object.values(actionPlanBreakdown).length - 1 })} />
                  </>
                )
              })
            }
          </div>
        </div>


      </div>

      <RiskHeatMap />


      {/* <div className="flex flex-col gap-5">
           <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
             <div className="flex flex-col justify-center items-center gap-4">
               <div className="rounded-full border-2 h-[160px] w-[160px] border-orange-400 text-orange-400 flex justify-center items-center text-4xl">
                 {38.4}%
               </div>
               <h3 className="text-l">{dict?.riskThresholdPercentage || "Risk Threshold Percentage"}</h3>
             </div>
             <div className="flex flex-col justify-center items-center gap-4">
               <div className="rounded-full border-2 h-[160px] w-[160px] border-blue-600 text-blue-600 flex justify-center items-center text-4xl">
                 {riskScore?.reduce((total, current) => total + current, 0)}
               </div>
               <h3 className="text-l">{dict?.riskThreshold || "Risk Threshold"}</h3>
             </div>
             <div className="flex flex-col justify-center items-center gap-4">
               <div className="rounded-full border-2 h-[160px] w-[160px] border-orange-400 text-orange-400 flex justify-center items-center text-4xl">
                 86.7%
               </div>
               <h3 className="text-l">{dict?.riskAnalysisProgress || "Risk Analysis Progress"}</h3>
             </div>
             <div className="flex flex-col justify-center items-center gap-4">
               <div className="rounded-full border-2 h-[160px] w-[160px] border-blue-600 text-blue-600 flex justify-center items-center text-4xl">
                 {riskData.data?.length ? ((riskData?.data?.filter(r => r.impact * r.likelihood === 25).length ?? 0) / (riskData?.data?.length ?? 1) * 100).toFixed(2) : dict?.noData || "NO Data"}%
               </div>
               <h3 className="text-l">{dict?.responseProgressForRiskThreshold || "Response Progress For Risk Threshold"}</h3>
             </div>
           </div>
           <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-1 grid-cols-1">
             <div className="flex flex-col justify-center items-center gap-4">
               <div className="w-full text-center border-2 border-blue-600 text-blue-600">
                 <h3 className="text-l">{dict?.riskRatingBreakdown || "Risk Rating Breakdown"}</h3>
               </div>
               <div>
                 <RiskRatingChart risks={riskData.data as Risk[]} />
               </div>
             </div>
             <div className="flex flex-col justify-center items-center gap-4">
               <div className="w-full text-center border-2 border-orange-400 text-orange-400">
                 <h3 className="text-l">{dict?.riskHeatMap || "Risk Heat Map"}</h3>
               </div>
               <div className="w-full h-full overflow-x-scroll">
                 <RiskHeatMap />
               </div>
             </div>
             <div className="flex flex-col justify-center items-center gap-4">
               <div className="w-full text-center border-2 border-blue-600 text-blue-600">
                 <h3 className="text-l">{dict?.actionPlanBreakdown || "Action Plan Breakdown"}</h3>
               </div>
               <div>
                 <ActionPlanChart />
               </div>
             </div>
           </div>
           <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
             <div className="flex md:col-span-2  md:col-start-2 flex-col gap-4">
               <h3 className="text-l">{dict?.riskVulnerabilities || "Resk Vulnerabilities"}</h3>
               <div>
                 <RiskVulnerabilitiesChart />
               </div>
             </div>
           </div>
         </div> */}
      <Footer />
    </PageWrapper >
  )
}