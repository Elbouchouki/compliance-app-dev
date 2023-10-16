"use client"

import MultiProgress, { IMultiProgressProps, ProgressComponentProps, ProgressElement } from 'react-multi-progress'
import { backgroundColor } from '@/components/compliance/charts/colors.const';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import useLangStore from '@/store/langagueStore';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';

type ExtraData = {
  isBold: boolean
  label: string
  completed: boolean
};

function CustomComponent({
  children,
  element,
  ...rest
}: ProgressComponentProps<ExtraData>) {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <div {...rest} className='font-semibold' >
          {children}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className={cn("flex flex-row gap-2", {
        "flex-row-reverse": langStore?.rtl
      })}>
        <span>
          {`${element.value}%`}
        </span>
        <span>
          {
            element?.label
          }
        </span>
      </HoverCardContent>
    </HoverCard>
  );
}
const RemediationProgress = ({ className }: {
  className?: string
}) => {
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <div
      className={className}
    >
      <MultiProgress
        transitionTime={1.2}
        elements={[
          {
            value: 22,
            color: backgroundColor[4],
            showPercentage: true,
            fontSize: 12,
            textColor: "white",
            isBold: true,
            label: dict?.open || "open",
            completed: true
          },
          {
            value: 10,
            color: backgroundColor[5],
            showPercentage: true,
            textColor: "white",
            fontSize: 12,
            isBold: true,
            label: dict?.inprogress || "In Progress",
            completed: false
          },
          {
            value: 68,
            color: backgroundColor[6],
            showPercentage: true,
            textColor: "white",
            fontSize: 12,
            isBold: true,
            label: dict?.resolved || "Resolved",
            completed: false
          },
        ]}
        height={20}
        backgroundColor="gray"
        border="1px solid gray"
        component={CustomComponent}
      />
    </div>
  )
}
export default RemediationProgress