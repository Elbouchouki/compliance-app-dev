"use client"

import { useStore } from "@/hooks/use-store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/components/layout/footer"
import { cn } from "@/lib/utils";
import useLangStore from "@/store/langagueStore";
import PageWrapper from "@/components/page-wrapper";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import TableSkeleton from "@/components/table-skeleton";
export default function FrameworksDetails() {

  const params = useParams()
  const router = useRouter()

  const framework = trpc.framwork.get.useQuery({
    id: params.id as string
  })

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const controls = trpc.control.getByFrameworkId.useQuery({
    frameworkId: params.id as string
  })


  useEffect(() => {
    if (!framework.isLoading && !framework.data) {
      router.push(`/frameworks`)
    }
  }, [framework.data, framework.isLoading, router])


  console.log(controls.data)



  return (
    <PageWrapper className='flex flex-col h-full max-w-full gap-4 grow' >



      <div className={cn("flex flex-row", {
        "flex-row-reverse": langStore?.rtl
      })}>
        <Link href="/frameworks" >
          <Button variant="outline" size="sm" className={cn("flex flex-row gap-2 items-center  bg-navbar-gray dark:bg-[#2b2d2f] dark:hover:bg-muted-foreground/10", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <Icons.back className={cn("w-5 h-5", {
              "transform rotate-180": langStore?.rtl
            })} />
            <p>
              {dict?.back || "Back"}
            </p>
          </Button>
        </Link>
        {/* // TODO : loading */}
        <div className={cn("flex flex-row items-center gap-2 px-4", {
          "flex-row-reverse": langStore?.rtl
        })}>
          {
            framework?.isLoading ?
              <div className="flex flex-row items-center gap-2 shadow animate-pulse">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-14"></div>
                /
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-14"></div>
              </div>
              :
              <>
                <Link href="/frameworks" className="text-xs text-muted-foreground">
                  {
                    dict?.frameworks
                  }
                </Link>
                <div className="text-muted-foreground">/</div>
                <p className="text-xs text-primary-foreground dark:text-primary ">
                  {
                    framework?.data?.name
                  }
                </p>
              </>
          }
        </div>
      </div>
      {/* {
        langStore?.lang === "ar" ? <NoArabicAlert /> : null
      } */}
      {
        framework?.isLoading ?
          <>
            <div className="shadow animate-pulse  w-full flex flex-col rounded-lg border bg-navbar ">
              <div className='flex flex-row'>
                <div className='p-4 w-full'>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                </div>
              </div>
            </div>
            <div className="shadow animate-pulse  w-full flex flex-col rounded-lg border bg-navbar">
              <div className='flex flex-row'>
                <div className='p-4 w-full'>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
                </div>
              </div>
            </div>
          </>
          :
          <>
            <div className='w-full p-4 flex flex-col rounded-lg border bg-navbar gap-3'>
              <h2 className={cn('text-xs md:text-sm xl:text-base font-semibold', {
                'text-right': langStore?.rtl
              })}>
                About {framework?.data?.name}
              </h2>
              <div className={cn("text-xs md:text-sm text-muted-foreground", {
                'text-right': langStore?.rtl
              })}>
                {framework?.data?.description}
              </div>
            </div>
            <div className='w-full p-4 flex flex-col rounded-lg border bg-navbar gap-3'>
              <h2 className={cn('text-xs md:text-sm xl:text-base font-semibold', {
                'text-right': langStore?.rtl
              })}>
                Additional Informations
              </h2>
              <div className={cn("text-xs md:text-sm text-muted-foreground", {
                'text-right': langStore?.rtl
              })}>
                <p className="flex flex-col gap-4 text-sm text-justify text-muted-foreground" dangerouslySetInnerHTML={{ __html: framework?.data?.additional_information || "" }} >
                </p>
              </div>
            </div>
          </>
      }


      {
        controls?.isLoading ?

          <TableSkeleton elements={10} />
          :

          <div className='w-full p-4 flex flex-col rounded-lg border bg-navbar gap-3'>
            <h2 className={cn('text-xs md:text-sm xl:text-base font-semibold', {
              'text-right': langStore?.rtl
            })}>
              Domains & objectives
            </h2>
            <div className={cn("text-xs md:text-sm text-muted-foreground", {
              'text-right': langStore?.rtl
            })}>
              <Accordion type="single" collapsible className="w-full">
                {
                  controls?.data?.map((control, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>

                      <AccordionTrigger className="text-primary-foreground dark:text-primary">
                        {
                          control.name
                        }
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2">
                          {
                            control.assessments.map((assessment, index) => (
                              <div className="flex flex-row justify-between gap-3" key={index}>
                                <span className="w-28">{assessment.assessmentObjective.id}</span>
                                <span className="w-full">
                                  {
                                    assessment.assessmentObjective.objective.slice(0, 1).toUpperCase() + assessment.assessmentObjective.objective.slice(1)
                                  }
                                </span>
                              </div>
                            ))
                          }
                        </div>
                      </AccordionContent>

                    </AccordionItem>
                  ))
                }
              </Accordion>
            </div>
          </div>
      }



      {/* 
<div className="mx-5">
          <Card className="bg-navbar">
            <CardHeader>
              <CardTitle className={cn("text-sm", {
                "text-right": langStore?.rtl
              })}>
                {
                  dict?.assessmentObjectives || "Assessment Objectives"
                }
              </CardTitle>
              <CardDescription className={cn("flex flex-row gap-2", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <Info className="w-4 h-4 " />
                <div className={cn("text-justify", {
                  "text-right": langStore?.rtl
                })}
                  dangerouslySetInnerHTML={{ __html: dict?.assessmentObjectivesDescription || "" }}
                ></div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion value={openedCollapsible} type="single" collapsible className="flex flex-col w-full gap-2">
                {
                  objectives?.map((objective, index) => {
                    const item_index = `item-${index}`
                    return <ObjectiveItem checkChanged={checkChanged} key={index} objective={objective} item_index={item_index} openedCollapsible={openedCollapsible} setOpenedCollapsible={setOpenedCollapsible} />
                  })
                }
              </Accordion>
            </CardContent>
          </Card>
        </div> */}




      <Footer className='flex items-end mt-3 grow' />
    </PageWrapper>
  )
}