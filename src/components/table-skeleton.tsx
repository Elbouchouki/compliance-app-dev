import { cn } from '@/lib/utils'
import React from 'react'

type TableSkeletonProps = {
  className?: string
  elements?: number
}

const TableSkeleton = ({ className, elements = 6 }: TableSkeletonProps) => {
  return (
    <div className={cn("h-full w-full flex border bg-navbar rounded-lg", className)}>
      <div role="status" className="grow flex  flex-col gap-8 rounded shadow animate-pulse dark:divide-gray-700 p-6 dark:border-gray-700">
        {
          Array(elements).fill(0).map((_, index) => (
            <div className="flex items-center justify-between gap-6" key={index}>
              <div className="flex grow flex-col gap-4">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
          ))
        }
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default TableSkeleton