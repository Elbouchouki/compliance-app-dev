"use client"

import { Icons } from "@/components/icons";
import Footer from "@/components/layout/footer";
import PageWrapper from "@/components/page-wrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { FQA_MOCK } from "@/mock";
import useLangStore from "@/store/langagueStore";

export default function FQA() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <PageWrapper className='flex flex-col h-full max-w-full gap-4 grow' >
      <div className="flex flex-row py-2 border-b">
        <h1 className={cn("text-xl font-semibold grow flex flex-row gap-2 items-center", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.fqa className="w-4 h-4" />
          <span>
            {
              dict?.frequentlyAskedAuestions || "Frequently Asked Questions"
            }
          </span>
        </h1>
      </div>
      <div className="h-full px-3 ">
        <Accordion type="single" collapsible className="w-full">
          {
            FQA_MOCK.map((item, index) => (
              <AccordionItem key={index} value={item.id}>
                <AccordionTrigger className={cn({
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className={cn({
                  "text-right": langStore?.rtl
                })}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))
          }
        </Accordion>
      </div>
      <Footer className='items-end mt-3 grow' />
    </PageWrapper>
  )
}