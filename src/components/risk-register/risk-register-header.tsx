
"use client"
import { trpc } from '@/app/_trpc/client'
import useLangStore from '@/store/langagueStore'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Separator } from '../ui/separator'
import { useStore } from '@/hooks/use-store'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'


const RiskRegisterHeaderItem = ({ title, value }: { title: string, value: string | number }) => {
  return <div className={cn('w-full p-4 flex flex-row justify-between', {
    "flex-row-reverse": useStore(useLangStore, state => state)?.rtl === true,
  })}>
    <h2 className='text-xs md:text-sm xl:text-base'>{title}</h2>
    <div>
      <Badge variant="outline" className='rounded-xl'>
        {
          value
        }
      </Badge>
    </div>
  </div>
}

const RiskRegisterHeader = () => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const { user } = useUser()

  const risks = trpc.risk.getAll.useQuery({
    userId: user?.id
  })

  const impactScore = risks?.data?.map(risk => risk.impact)
  const avgOverallScore = (impactScore && impactScore.length > 0) ? ((impactScore?.reduce((prev, curr) => (prev + curr)) ?? 0) / (impactScore?.length ?? 1)).toFixed(2) : 0
  const avgScore = (impactScore && impactScore.length > 0) ? ((impactScore?.reduce((prev, curr) => (prev + curr)) ?? 0) / (impactScore?.length ?? 1)).toFixed(2) : 0 // FIXME: get avg score from db
  const acceptedSolutuions = 3 // FIXME: get accepted solutions from db


  if (risks.isLoading)
    return (
      <div className="shadow animate-pulse  w-full flex flex-col rounded-lg border bg-navbar">
        <div className='flex flex-row'>
          <div className='p-4 w-full'>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
          </div>
          <Separator orientation='vertical' />
          <div className='p-4 w-full'>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
          </div>
        </div>
        <Separator />
        <div className='p-4'>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
        </div>
      </div>
    )

  return (
    <div className=" w-full flex flex-col rounded-lg border bg-navbar">
      <div className="flex flex-row">
        <RiskRegisterHeaderItem title={dict?.avgOverallRiskScore || "Avg. Overall Risk Score"} value={avgOverallScore} />
        <Separator orientation="vertical" />
        <RiskRegisterHeaderItem title={dict?.avgControlScore || "Avg. Control Score"} value={avgScore} />
      </div>
      <Separator />
      <RiskRegisterHeaderItem title={dict?.acceptedSolutions || "Accepted Solutions"} value={acceptedSolutuions} />
    </div>
  )
}

export default RiskRegisterHeader