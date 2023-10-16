"use client"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { GET_MATURITY_LEVELS } from "@/mock";
import { useStore } from '@/hooks/use-store';
import useLangStore from '@/store/langagueStore';
import { groupByKey } from '@/lib/utils';
import { backgroundColor, borderColor } from './colors.const';
import { trpc } from '@/app/_trpc/client';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusSummaryChart = ({
  className
}: {
  className?: string
}) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const labels = GET_MATURITY_LEVELS(langStore?.lang).map(m => m?.label)
  const keys = GET_MATURITY_LEVELS(langStore?.lang).map(m => m?.value)

  const { user } = useUser()
  const assessmentScopes = trpc.assessment.getAllAssessments.useQuery({
    userId: user?.id
  })
  const controls = assessmentScopes?.data?.flatMap(scope => scope?.ControlAssessmentScope) || []
  const unGroupedList = controls?.flatMap(control => control?.maturity || []) || []

  const groups = groupByKey(unGroupedList, "value")

  const total = unGroupedList.length

  const values = keys.map(key => {
    const val = (groups[key]?.length / total) * 100 || 0
    return val.toFixed(2)
  })

  if (assessmentScopes?.isLoading) {
    return <Skeleton className="w-full h-full" />
  }
  return (
    <Pie className={className}
      options={{
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'right' as const,
          },
        },
      }}
      data={{
        labels,
        datasets: [
          {
            label: dict?.percentageOfControls || 'percentage of controls',
            data: values,
            backgroundColor,
            borderColor,
            borderWidth: 1,
          },
        ],
      }}
    />
  )
}
export default StatusSummaryChart