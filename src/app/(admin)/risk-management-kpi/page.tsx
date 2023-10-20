'use client'
import 'chart.js/auto';
import Footer from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import PageWrapper from "@/components/page-wrapper";
import { useUser } from "@clerk/nextjs";
import { trpc } from "@/app/_trpc/client";
import { RiskManagementNavItems } from "@/constants/navs.config";
import TabNav from "@/components/tab-nav";
import { Separator } from "@/components/ui/separator";
import { Bar, Doughnut } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { ControlPerformanceChart } from '@/components/risk-management-kpi/control-performance-chart';
import { OpenIssueChart } from '@/components/risk-management-kpi/open-issue-chart';
import RiskMap from '@/components/risk-management-kpi/risk-by-map';
import { RiskByTypeChart } from '@/components/risk-management-kpi/risk-by-type-chart';
import OperationalRiskTable from '@/components/risk-management-kpi/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Risk } from '@prisma/client';
import { Link } from 'lucide-react';
import { faker } from '@faker-js/faker';
import Image from 'next/image';


export default function RiskAssessment() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const { theme } = useTheme()
  const { user } = useUser()
  const riskData = trpc.risk.getLimited.useQuery({
    userId: user?.id as string
  })


  const colorDegree = (degree: number) => {
    if (degree <= 5) {
      return "bg-[#2f4858]"
    } else if (degree <= 10) {
      return "bg-[#156175]"
    } else if (degree <= 15) {
      return "bg-[#007b8a]"
    } else if (degree <= 20) {
      return "bg-[#009592]"
    } else {
      return "bg-[#00af8f]"
    }
  }

  const heatMapHeaders = ["Negligible", "Low", "Moderate", "Significant", "Catastrophic"]
  const heatMap: {
    [key: string]: number[]
  } = {
    "IMPROBABLE": [5, 10, 15, 20, 25],
    "REMOTE": [5, 10, 15, 20, 25],
    "OCCASIONAL": [5, 10, 15, 20, 25],
    "PROBABLE": [5, 10, 15, 20, 25],
    "FRECUENT": [5, 10, 15, 20, 25]
  }

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
          <div className={cn("py-2 px-4 text-sm font-semibold", {
            "text-right": langStore?.rtl
          })}>{dict?.openIssues || "Open Issues"}</div>
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
          <div className={cn("py-2 px-4 text-sm font-semibold", {
            "text-right": langStore?.rtl
          })}>{dict?.controlPerformance || "Control Performance"}</div>
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


      <div className="grid md:grid-cols-5 grid-rows-1 gap-4 ">
        <div className="md:col-span-3 col-span-5 rounded-lg border bg-navbar w-full flex flex-col">
          <div className={cn("py-2 px-4 text-sm font-semibold", {
            "text-right": langStore?.rtl
          })}>{dict?.riskByType || "Risk by Type"}</div>
          <Separator />
          <div className='pb-4 flex  justify-center items-center  h-full w-full px-4'>
            <div className='w-full h-full max-w-lg flex justify-center items-center'>
              <Bar options={{
                indexAxis: 'y' as const,
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                }
              }
              }
                data={{
                  labels: ['Unauthorized Activity', 'Disaster', 'Human Resource', 'Transactional'],
                  datasets: [
                    {
                      label: 'Type',
                      data: ['Unauthorized Activity', 'Disaster', 'Human Resource', 'Transactional'].map(() => faker.datatype.number({ min: 0, max: 25 })),
                      borderColor: "#125dcb",
                      backgroundColor: "#125dcb",
                      borderRadius: 5,
                    },
                  ],
                }} />
            </div>
          </div>

        </div>
        <div className="md:col-span-2 col-span-5 md:col-start-4 rounded-lg border bg-navbar w-full flex flex-col">
          <div className={cn("py-2 px-4 text-sm font-semibold", {
            "text-right": langStore?.rtl
          })}>{dict?.operationalRisk || "Operational Risk"}</div>
          <Separator />
          <div className='flex flex-col justify-center items-center w-full h-full gap-2 p-8'>
            <Image src="/HandClap.svg" alt="HandClap svg" width={200} height={200} />
            <div className='text-center text-lg font-semibold'>
              {
                dict?.operationalRiskIsEmpty || "Operational Risk is Empty"
              }
            </div>
            <div className='text-center text-xs text-muted-foreground px-10'>
              {
                dict?.operationalRiskIsEmptyDesc || "You Have no operational risks at the moment, Press on More Info to add more"
              }
            </div>

          </div>

        </div>
      </div>

      <div className="w-full  flex-col rounded-lg border bg-navbar hidden sm:flex ">
        <div className={cn("py-2 px-4 text-sm font-semibold", {
          "text-right": langStore?.rtl
        })}>{dict?.riskHeatMap || "Risk Heat Map"}</div>
        <Separator />
        <div className='p-10 flex flex-col gap-4 lg:px-28'>
          <div className='flex flex-row gap-4 justify-evenly'>
            <div className='text-sm text-muted-foreground w-full'>
            </div>
            {
              heatMapHeaders.map((header, index) => {
                return (
                  <div className='text-sm  text-muted-foreground dark:text-foreground w-full'>
                    {header}
                  </div>
                )
              })
            }
          </div>
          <div className='flex flex-col gap-4 justify-evenly'>

            {
              Object.keys(heatMap).map((key, index) => {
                return (
                  <div className='flex flex-row gap-4 justify-evenly h-14'>
                    <div className='text-sm text-muted-foreground dark:text-foreground  w-full h-full flex justify-center items-center'>
                      <p >
                        {
                          key.slice(0, 1) + key.slice(1).toLowerCase()
                        }
                      </p>
                    </div>
                    {
                      heatMap[key].map((value, index) => (
                        <div className={cn('text-sm text-white dark:text-foreground rounded-lg w-full h-full flex justify-center items-center', colorDegree(value))}>
                          <p >
                            {value}
                          </p>
                        </div>
                      ))
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <Footer className='mt-3 grow items-end' />
    </PageWrapper>
  )
}