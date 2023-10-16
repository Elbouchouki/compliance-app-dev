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

    <Card className="p-0 m-0">
      <CardHeader>
        <CardTitle className={cn({
          "text-right": langStore?.rtl
        })}>
          {
            title
          }
        </CardTitle>
      </CardHeader>
      <CardContent className={className}>
        {
          chart
        }
      </CardContent>
      {/* <CardFooter className="text-sm text-muted-foreground">
        
      </CardFooter> */}
    </Card>
  )
}



export default function Compliances() {
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  return (
    <PageWrapper className='flex flex-col h-full max-w-full gap-4 grow' >

      <div className="flex flex-col w-full gap-2 py-2 border-b sm:flex-row ">
        <div className="flex flex-col grow">
          <h1 className={
            cn("text-xl font-semibold grow gap-2 flex flex-row items-center", {
              "flex-row-reverse": langStore?.rtl
            })
          }>
            <Icons.overview className="w-4 h-4" />
            <span>
              {
                dict?.complianceOverview || "Compliance Overview"
              }
            </span>
          </h1>
        </div>
      </div>




      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="grow">
          <ChartWrapper
            title={dict?.complianceTrainingCompletion || "Compliance Training Completion"}
            chart={<TrainingCompletionProgress />}
          />
        </div>
        <div className="grow">
          <ChartWrapper
            title={dict?.complianceRemediationProgress || "Compliance Remediation Progress"}
            chart={<RemediationProgress />}
          />
        </div>
      </div>


      <div className="grid grid-cols-1 xl:xl:grid-cols-5 grid-rows-2  gap-4">
        <div className="xl:col-span-2">
          <ChartWrapper
            className="flex flex-row items-center justify-center h-96 "
            title={dict?.complianceStatusSummary || "Compliance Status Summary"}
            chart={<StatusSummaryChart />}
          />
        </div>
        <div className="xl:col-span-3 xl:col-start-3">    <ChartWrapper
          className="flex flex-row items-center justify-center h-96"
          title={dict?.complianceTrendChart || "Compliance Trend Chart"}
          chart={<TrendChart />}
        /></div>
        <div className="xl:col-span-5 xl:row-start-2">   <ChartWrapper
          title={dict?.complianceAuditFinding || "Compliance Audit Finding"}
          chart={<AuditFinding />}
        /></div>
      </div>






      {/* <div className="grid grid-cols-2 grid-rows-4 gap-4 ">
        <div className="row-span-2">
          <ChartWrapper
            className="flex flex-row items-center justify-center h-96 "
            title={dict?.complianceStatusSummary || "Compliance Status Summary"}
            chart={<StatusSummaryChart />}
          />
        </div>
        <div >
          <ChartWrapper
            title={dict?.complianceRemediationProgress || "Compliance Remediation Progress"}
            chart={<RemediationProgress />}
          />
        </div>
        <div className="col-start-2">
          <ChartWrapper
            title={dict?.complianceTrainingCompletion || "Compliance Training Completion"}
            chart={<TrainingCompletionProgress />}
          />
        </div>
        <div className="col-span-2 row-start-3">
          <ChartWrapper
            className="flex flex-row items-center justify-center h-96"
            title={dict?.complianceTrendChart || "Compliance Trend Chart"}
            chart={<TrendChart />}
          />
        </div>
        <div className="col-span-2 row-start-4">
          <ChartWrapper
            title={dict?.complianceAuditFinding || "Compliance Audit Finding"}
            chart={<AuditFinding />}
          />

        </div>
      </div> */}



      {/* <div className="grid grid-cols-1 gap-4 ">

 
        <ChartWrapper
          className="flex flex-row items-center justify-center h-96"
          title={dict?.complianceStatusSummary || "Compliance Status Summary"}
          chart={<StatusSummaryChart />}
        /> 
        <ChartWrapper
          className="flex flex-row items-center justify-center h-96"
          title={dict?.complianceTrendChart || "Compliance Trend Chart"}
          chart={<TrendChart />}
        />

        <ChartWrapper
          title={dict?.complianceTrainingCompletion || "Compliance Training Completion"}
          chart={<TrainingCompletionProgress />}
        />
        <ChartWrapper
          title={dict?.complianceRemediationProgress || "Compliance Remediation Progress"}
          chart={<RemediationProgress />}
        />

        <ChartWrapper
          title={dict?.complianceAuditFinding || "Compliance Audit Finding"}
          chart={<AuditFinding />}
        />



      </div> */}
      <Footer className='items-end mt-3 grow' />
    </PageWrapper>
  )
}