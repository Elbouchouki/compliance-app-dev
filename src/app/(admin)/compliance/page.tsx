"use client"

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import PageWrapper from "@/components/page-wrapper";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import StatusSummaryChart from "@/components/compliance/charts/status-summary-chart";
import TrendChart from "@/components/compliance/charts/trend-chart";
import TrainingCompletionProgress from "@/components/compliance/training-completion-progress";
import RemediationProgress from "@/components/compliance/remediation-progress";
import AuditFinding from "@/components/compliance/audit-finding";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { LocateFixed, Trophy } from "lucide-react";




const ChartWrapper = (
  {
    className,
    title,
    chart
  }: {
    title: string
    className?: string,
    chart: JSX.Element
  }
) => {


  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (

    // <div className='w-full p-4 flex flex-col rounded-lg border bg-navbar gap-3'>
    //   <h2 className={cn('text-xs md:text-sm xl:text-base font-semibold', {
    //     'text-right': langStore?.rtl
    //   })}>
    //     {
    //       title
    //     }
    //   </h2>
    //   <div className={cn("text-xs md:text-sm text-muted-foreground ", {
    //     'text-right': langStore?.rtl
    //   })}>
    //     {
    //       chart
    //     }
    //   </div>
    // </div>


    <Card className='w-full flex flex-col rounded-lg border bg-navbar gap-3'>
      <h2 className={cn('p-4  text-xs md:text-sm xl:text-base font-semibold', {
        'text-right': langStore?.rtl
      })}>
        {
          title
        }
      </h2>
      <CardContent className={cn("text-xs md:text-sm text-muted-foreground ", className, {
        'text-right': langStore?.rtl
      })}>
        {
          chart
        }
      </CardContent>
    </Card>
  )
}


const KPIItem = ({ icon, title, value, color, rtl }: {
  title: string,
  icon: React.ReactNode,
  value: number,
  color?: string,
  rtl?: boolean
}) => {
  return (
    <div className="w-full flex flex-col rounded-lg border bg-navbar p-4 gap-4">
      <div className={cn("rounded-full border-2 w-12 h-12 flex justify-center items-center ", {
        "self-end": rtl
      })}>
        {
          icon
        }
      </div>
      <div className="font-semibold  mb-auto">
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


export default function Compliances() {
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  return (
    <PageWrapper className='flex flex-col h-full max-w-full gap-4 grow' >


      <div className="flex flex-col gap-2">
        <h1 className={cn("text-base md:text-xl xl:text-2xl font-semibold", {
          "text-right": langStore?.rtl === true,
        })}>
          {
            dict?.complianceOverview || "Compliance Overview"
          }
        </h1>
        <div className={cn(" text-sm text-muted-foreground", {
          "text-right": langStore?.rtl === true,
        })}>
          Description will come here, and you can go up to one line.
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        <KPIItem
          title={dict?.complianceTrainingCompletion || "Compliance Training Completion"}
          icon={<Trophy className="w-5 h-5" />}
          value={66}
          color="bg-[#efa22f]"
          rtl={langStore?.rtl}
        />
        <KPIItem
          title={dict?.complianceRemediationProgress || "Compliance Remediation Progress"}
          icon={<LocateFixed className="w-5 h-5" />}
          value={34}
          color="bg-[#1c84f6]"
          rtl={langStore?.rtl}

        />
      </div >


      <div className="grid grid-cols-1 xl:xl:grid-cols-5 grid-rows-2  gap-4">
        <div className="xl:col-span-2">
          <div className="w-full h-full flex-col rounded-lg border bg-navbar flex  ">
            <div className={cn("py-2 px-4 text-sm font-semibold", {
              "text-right": langStore?.rtl
            })}>
              {dict?.complianceStatusSummary || "Compliance Status Summary"}
            </div>
            <Separator />
            <div className="p-4 w-full h-full">
              <StatusSummaryChart />
            </div>
          </div>
        </div>

        <div className="xl:col-span-3 xl:col-start-3">
          <div className="w-full h-full flex-col rounded-lg border bg-navbar flex  ">
            <div className={cn("py-2 px-4 text-sm font-semibold", {
              "text-right": langStore?.rtl
            })}>
              {dict?.complianceTrendChart || "Compliance Trend Chart"}
            </div>
            <Separator />
            <div className="p-4 w-full h-full flex justify-center items-center">
              <TrendChart />
            </div>
          </div>
        </div>

        <div className="xl:col-span-5 xl:row-start-2">
          <div className="w-full h-full flex-col rounded-lg border bg-navbar flex  ">
            <div className={cn("py-2 px-4 text-sm font-semibold", {
              "text-right": langStore?.rtl
            })}>
              {dict?.complianceAuditFinding || "Compliance Audit Finding"}
            </div>
            <Separator />
            <div className="p-4 w-full h-full">
              <AuditFinding />
            </div>
          </div>
        </div>


        {/* <div className="xl:col-span-5 xl:row-start-2">  <ChartWrapper
          className="flex flex-row items-center justify-center h-96"
          title={dict?.complianceTrendChart || "Compliance Trend Chart"}
          chart={<TrendChart />}
        /></div>


        <div className="xl:col-span-5 xl:row-start-2">   <ChartWrapper
          title={dict?.complianceAuditFinding || "Compliance Audit Finding"}
          chart={<AuditFinding />}
        /></div> */}
      </div>
      <Footer className='items-end mt-3 grow' />
    </PageWrapper>
  )
}