"use client"

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/hooks/use-store";
import { Info } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ObjectiveItem from "@/components/gap-assessment/details/objective-item";
import { Accordion } from "@/components/ui/accordion";
import Editor from "@/components/editor";
import useLangStore from "@/store/langagueStore";
import { cn } from "@/lib/utils";
import { ContentState, EditorState } from "draft-js";
import PageWrapper from "@/components/page-wrapper";
import { trpc } from "@/app/_trpc/client";
import { Icons } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";


export default function GapAssessmentDetails() {

  const params = useParams()
  const router = useRouter()
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const controlAssessmentScope = trpc.control.getControlsByAssessmentScopeAndId.useQuery({
    assessmentScopeId: params.scope as string,
    id: params.id as string
  })

  const mutation = trpc.assessment.updateAssessment.useMutation()

  const calculateMaturity = trpc.assessment.calculareMaturity.useMutation()
  const objectives = controlAssessmentScope?.data?.assessmentScope.ControlAssessmentScopeObjectives.filter((item) => item.controlId === controlAssessmentScope?.data?.control.id)

  const [openedCollapsible, setOpenedCollapsible] = useState<string>("")

  const [editorStateRemed, setEditorStateRemed] = useState<EditorState>(
    () => EditorState.createWithContent(ContentState.createFromText(controlAssessmentScope?.data?.remediationPlanText || "")),
  );
  const [editorStateNotes, setEditorStateNotes] = useState<EditorState>(
    () => EditorState.createWithContent(ContentState.createFromText(controlAssessmentScope?.data?.notesText || "")),
  );
  const [editorStatePolicies, setEditorStatePolicies] = useState<EditorState>(
    () => EditorState.createWithContent(ContentState.createFromText(controlAssessmentScope?.data?.policiesText || "")),
  );
  const [editorStateProc, setEditorStateProc] = useState<EditorState>(
    () => EditorState.createWithContent(ContentState.createFromText(controlAssessmentScope?.data?.proceduresText || "")),
  );
  const [editorStateStand, setEditorStateStand] = useState<EditorState>(
    () => EditorState.createWithContent(ContentState.createFromText(controlAssessmentScope?.data?.standardsText || "")),
  );

  let tab1Elements = [
    {
      label: dict?.informations || "Informations",
      value: "informations"
    }, {
      label: dict?.remediationPlan || "Remediation Plan",
      value: "remediation-plan"
    }, {
      label: dict?.notes || "Notes",
      value: "notes"
    }
  ]

  let tab2Elements = [
    {
      label: dict?.policies || "Policies",
      value: "policies"
    }, {
      label: dict?.standard || "Standards",
      value: "standard"
    }, {
      label: dict?.procedures || "Procedures",
      value: "procedures"
    }
  ]

  const checkChanged = () => {
    calculateMaturity.mutate({
      id: controlAssessmentScope?.data?.assessmentScopeId ?? "",
      controlId: controlAssessmentScope?.data?.control.id ?? ""
    }, {
      onSuccess: () => {
        controlAssessmentScope.refetch()
      }
    })
  }

  useEffect(() => {

    if (!controlAssessmentScope.isLoading && !controlAssessmentScope.data) {
      router.back()
    }
  }, [controlAssessmentScope.data, controlAssessmentScope.isLoading, router])


  if (controlAssessmentScope.isLoading || controlAssessmentScope.data === null) {
    return <Skeleton className='w-full h-full' />
  } else {
    return (
      <PageWrapper className='flex flex-col h-full max-w-full gap-4 grow' >




        <div className={cn("flex flex-row", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Link href={`/gap-assessment/${params.scope as string}`} >
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
              controlAssessmentScope?.isLoading ?
                <div className="flex flex-row items-center gap-2 shadow animate-pulse">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-14"></div>
                  /
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-14"></div>
                  /
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-14"></div>
                </div>
                :
                <>
                  <Link href="/gap-assessment" className="text-xs text-muted-foreground">
                    {
                      dict?.gapAssessmentScope
                    }
                  </Link>
                  <div className="text-muted-foreground">/</div>
                  <Link href={`/gap-assessment/${params.scope as string}`} className="text-xs text-muted-foreground">
                    {
                      controlAssessmentScope?.data?.assessmentScope.name
                    }
                  </Link>
                  <div className="text-muted-foreground">/</div>
                  <p className="text-xs text-primary-foreground dark:text-primary ">
                    {
                      controlAssessmentScope?.data?.control.name
                    }
                  </p>
                </>
            }
          </div>
        </div>

        <div className="flex-col w-full">
          <Card className="rounded-md bg-navbar">
            <CardHeader >
              <div className={cn("w-full flex flex-row gap-4 flex-wrap", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <div className={cn("flex flex-row items-center gap-2 text-xs font-semibold", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  <Icons.controls className="w-4 h-4" />
                  <span>
                    {controlAssessmentScope?.data?.control.id.substring(0, 8)}
                  </span>
                </div>
                <div className={cn("flex flex-row items-center gap-2 text-xs font-semibold", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  <Icons.calendar className="w-4 h-4 " />
                  <span className={cn("flex flex-row gap-1", {
                    "flex-row-reverse": langStore?.rtl
                  })}>
                    <span>
                      {
                        dict?.lastUpdate || "Last Update"
                      }
                    </span>
                    <span>
                      {
                        new Date((controlAssessmentScope?.data?.updated_at as Date | string | number) || "").toLocaleDateString()
                      }
                    </span>
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className={cn("w-full font-semibold text-justify", {
                "text-right": langStore?.rtl
              })}>
                {controlAssessmentScope?.data?.control.question}
              </div>
            </CardContent>
            <CardFooter>
              <div className={cn("flex flex-row w-full pt-2 border-t", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <div className={cn("flex flex-col gap-3 md:flex-row ", {
                  "md:flex-row-reverse": langStore?.rtl
                })}>
                  <div className={cn("flex flex-col sm:flex-row gap-1.5 text-sm items-start sm:items-center", {
                    "sm:flex-row-reverse items-end": langStore?.rtl
                  })}>
                    <span className="font-semibold">
                      {
                        dict?.maturityLevel || "Maturity Level"
                      }
                    </span>
                    <span className={cn("flex flex-row items-center gap-2", {
                      "flex-row-reverse": langStore?.rtl
                    })}>
                      {
                        controlAssessmentScope?.data?.maturity?.id !== "Unanswered" ?
                          <Badge className={cn("text-white", controlAssessmentScope?.data?.maturity?.color)}>
                            {controlAssessmentScope?.data?.maturity?.id}
                          </Badge>
                          : null
                      }
                      <span>{controlAssessmentScope?.data?.maturity?.label}</span>
                    </span>
                  </div>
                  <Separator className="hidden md:flex" orientation="vertical" />
                  <div className={cn("flex flex-col sm:flex-row gap-1.5 text-sm items-start sm:items-center", {
                    "sm:flex-row-reverse items-end": langStore?.rtl
                  })}>
                    <span className="font-semibold">
                      {
                        dict?.targetMaturityLevel || "Target Maturity Level"
                      }
                    </span>
                    <span className={cn("flex flex-row items-center gap-2", {
                      "flex-row-reverse": langStore?.rtl
                    })}>
                      {
                        controlAssessmentScope?.data?.targetMaturity?.id !== "Unanswered" ?
                          <Badge className={controlAssessmentScope?.data?.targetMaturity?.color}>
                            {controlAssessmentScope?.data?.targetMaturity?.id}
                          </Badge>
                          : null
                      }
                      <span>{controlAssessmentScope?.data?.targetMaturity?.label}</span>
                    </span>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col space-y-1.5 px-6">
            <div className={cn("flex flex-col gap-3 md:flex-row", {
              ' md:flex-row-reverse': langStore?.rtl,
            })}>
              <div className={cn("flex flex-col sm:flex-row gap-1.5 text-sm items-start sm:items-center ", {
                "items-end sm:flex-row-reverse": langStore?.rtl,
              })}>
                <span className="font-semibold">
                  {
                    dict?.functionGrouping || "Function Group"
                  }
                </span>
                <Badge className="rounded-sm">
                  {controlAssessmentScope?.data?.control?.group}
                </Badge>
              </div>
              <Separator className="hidden md:flex" orientation="vertical" />
              <div className={cn("flex flex-col sm:flex-row gap-1.5 text-sm items-start sm:items-center ", {
                "items-end sm:flex-row-reverse": langStore?.rtl,
              })}>
                <span className="font-semibold">
                  {
                    dict?.domain || "Domain"
                  }
                </span>
                <Badge variant="outline" className="rounded-sm">
                  {controlAssessmentScope?.data?.control?.category}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-1.5 px-6">
            <div className="flex flex-col gap-1.5 text-sm">
              <span className={cn("font-semibold", {
                "text-right": langStore?.rtl
              })}>
                {
                  dict?.controlDescription || "Control Description"
                }
              </span>
              <span className={cn("text-justify", {
                "text-right": langStore?.rtl
              })}>
                {controlAssessmentScope?.data?.control?.description}
              </span>
            </div>
          </div>
        </div>

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
        </div>
        <Card className="bg-navbar">
          <Tabs defaultValue="informations" className="w-full">
            <CardHeader>
              <div className={cn("flex flex-row", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <TabsList>
                  {
                    langStore?.rtl ?
                      tab1Elements.reverse().map((item, index) => (
                        <TabsTrigger key={index} value={item?.value}>{item?.label}</TabsTrigger>
                      ))
                      :
                      tab1Elements.map((item, index) => (
                        <TabsTrigger key={index} value={item?.value}>{item?.label}</TabsTrigger>
                      ))
                  }
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="informations">
                <div className={cn("text-sm text-justify whitespace-pre-line", {
                  "text-right": langStore?.rtl
                })}>
                  {
                    controlAssessmentScope?.data?.control.methods ? <div className="flex flex-col gap-4">
                      <span className="font-semibold">
                        {
                          dict?.methodsToComply || "Methods to comply"
                        }
                      </span>
                      <span>{controlAssessmentScope?.data?.control.methods}</span>
                    </div> : <span>
                      {
                        dict?.noInformationAvailableForThisControl || "No information available for this control"
                      }
                    </span>
                  }
                </div>
              </TabsContent>
              <TabsContent value="remediation-plan" className="flex flex-col gap-2">
                <Editor
                  editorState={editorStateRemed}
                  setEditorState={(value) => {
                    setEditorStateRemed(value)
                  }}
                />
                <Button
                  disabled={mutation.isLoading}
                  onClick={() => {
                    mutation.mutate({
                      id: controlAssessmentScope?.data?.assessmentScopeId ?? "",
                      controlId: controlAssessmentScope?.data?.control.id ?? "",
                      remediationPlanText: editorStateRemed.getCurrentContent().getPlainText()
                    }, {
                      onSuccess: () => {
                        controlAssessmentScope.refetch()
                      }
                    })

                  }} className="w-full flex flex-row gap-2">

                  <Icons.loader className={cn("animate-spin w-4 h-4", {
                    "hidden": !mutation.isLoading
                  })} />
                  <span>
                    {
                      dict?.save || "Save"
                    }
                  </span>
                </Button>
              </TabsContent>
              <TabsContent value="notes" className="flex flex-col gap-2">
                <Editor
                  editorState={editorStateNotes}
                  setEditorState={(value) => {
                    setEditorStateNotes(value)
                  }}
                />
                <Button
                  disabled={mutation.isLoading}
                  onClick={() => {
                    mutation.mutate({
                      id: controlAssessmentScope?.data?.assessmentScopeId ?? "",
                      controlId: controlAssessmentScope?.data?.control.id ?? "",
                      notesText: editorStateNotes.getCurrentContent().getPlainText()
                    }, {
                      onSuccess: () => {
                        controlAssessmentScope.refetch()
                      }
                    })

                  }} className="w-full flex flex-row gap-2">

                  <Icons.loader className={cn("animate-spin w-4 h-4", {
                    "hidden": !mutation.isLoading
                  })} />
                  <span>
                    {
                      dict?.save || "Save"
                    }
                  </span>
                </Button>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        <Card className="bg-navbar">
          <Tabs defaultValue="policies" className="w-full" >
            <CardHeader>
              <div className={cn("flex flex-row", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <TabsList>
                  {
                    langStore?.rtl ?
                      tab2Elements.reverse().map((item, index) => (
                        <TabsTrigger key={index} value={item.value}>{item.label}</TabsTrigger>
                      ))
                      :
                      tab2Elements.map((item, index) => (
                        <TabsTrigger key={index} value={item.value}>{item.label}</TabsTrigger>
                      ))
                  }
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="policies" className="flex flex-col gap-2">
                <Editor
                  editorState={editorStatePolicies}
                  setEditorState={(value) => {
                    setEditorStatePolicies(value)
                  }}
                />
                <Button
                  disabled={mutation.isLoading}

                  onClick={() => {
                    mutation.mutate({
                      id: controlAssessmentScope?.data?.assessmentScopeId ?? "",
                      controlId: controlAssessmentScope?.data?.control.id ?? "",
                      policiesText: editorStatePolicies.getCurrentContent().getPlainText()
                    }, {
                      onSuccess: () => {
                        controlAssessmentScope.refetch()
                      }
                    })

                  }} className="w-full flex flex-row gap-2">

                  <Icons.loader className={cn("animate-spin w-4 h-4", {
                    "hidden": !mutation.isLoading
                  })} />
                  <span>
                    {
                      dict?.save || "Save"
                    }
                  </span>
                </Button>
              </TabsContent>
              <TabsContent value="standard" className="flex flex-col gap-2">
                <Editor
                  editorState={editorStateStand}
                  setEditorState={(value) => {
                    setEditorStateStand(value)
                  }}
                />
                <Button
                  disabled={mutation.isLoading}

                  onClick={() => {
                    mutation.mutate({
                      id: controlAssessmentScope?.data?.assessmentScopeId ?? "",
                      controlId: controlAssessmentScope?.data?.control.id ?? "",
                      standardsText: editorStateStand.getCurrentContent().getPlainText()
                    }, {
                      onSuccess: () => {
                        controlAssessmentScope.refetch()
                      }
                    })

                  }} className="w-full flex flex-row gap-2">

                  <Icons.loader className={cn("animate-spin w-4 h-4", {
                    "hidden": !mutation.isLoading
                  })} />
                  <span>
                    {
                      dict?.save || "Save"
                    }
                  </span>
                </Button>
              </TabsContent>
              <TabsContent value="procedures" className="flex flex-col gap-2">
                <Editor
                  editorState={editorStateProc}
                  setEditorState={(value) => {
                    setEditorStateProc(value)
                  }}
                />
                <Button
                  disabled={mutation.isLoading}
                  onClick={() => {
                    mutation.mutate({
                      id: controlAssessmentScope?.data?.assessmentScopeId ?? "",
                      controlId: controlAssessmentScope?.data?.control.id ?? "",
                      proceduresText: editorStateProc.getCurrentContent().getPlainText()
                    }, {
                      onSuccess: () => {
                        controlAssessmentScope.refetch()
                      }
                    })

                  }} className="w-full flex flex-row gap-2">

                  <Icons.loader className={cn("animate-spin w-4 h-4", {
                    "hidden": !mutation.isLoading
                  })} />
                  <span>
                    {
                      dict?.save || "Save"
                    }
                  </span>
                </Button>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </PageWrapper >
    )
  }
}