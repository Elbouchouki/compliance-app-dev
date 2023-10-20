"use client"

import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GET_MATURITY_LEVELS } from "@/mock";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { cn } from "@/lib/utils";


const MaturityLevels = () => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <div>
      <Card className="rounded-md bg-navbar">
        <CardContent className="items-center justify-start px-3 py-0">
          <Accordion defaultValue="item-1" type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b-0 ">
              <AccordionTrigger className={cn("font-semibold hover:no-underline text-muted-foreground ", {
                "text-right flex-row-reverse": langStore?.rtl
              })} >
                {dict?.maturityLevelsDescription}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4 m-2 sm:grid-cols-2">
                  {
                    GET_MATURITY_LEVELS(langStore?.lang).slice(1).map((item, index) => (
                      <div key={index} className={cn("flex flex-row items-start gap-2 text-xs", {
                        "flex-row-reverse ": langStore?.rtl
                      })}>
                        <Badge className={cn("text-white", item.color)}>
                          {item.id}
                        </Badge>
                        <span className="flex flex-col text-justify">
                          <span className={cn("font-semibold", {
                            "text-right": langStore?.rtl
                          })}>
                            {item?.label}
                          </span>
                          <span className={cn({
                            "text-right": langStore?.rtl
                          })}>
                            {item.description}
                          </span>
                        </span>
                      </div>
                    ))
                  }
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
export default MaturityLevels