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
      <HoverCardContent >
        {
          `${element?.value}% ${dict?.ofThe || "of the"} ${element?.label} ${element?.completed ?
            dict?.haveCompletedTheTrainingPrograms || "have completed the training programs"
            : dict?.leftToCompleteTheTrainingPrograms || "left to complete the training programs"
          }
            `
        }
      </HoverCardContent>
    </HoverCard>
  );
}

const TrainingCompletionProgress = ({ className }: {
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
            value: 65,
            color: backgroundColor[3],
            showPercentage: true,
            fontSize: 12,
            textColor: "white",
            isBold: true,
            label: dict?.employees || "employees",
            completed: true
          },
          {
            value: 35,
            color: backgroundColor[2],
            showPercentage: true,
            textColor: "white",
            fontSize: 12,
            isBold: true,
            label: dict?.employees || "employees",
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
export default TrainingCompletionProgress