"use client"


import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import { AssessmentFormBody } from "@/components/gap-assessment/assessment-form"
import useAssessmentScopeStore from "@/store/assessmentScopeStore";
import useLangStore from "@/store/langagueStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "../ui/checkbox";
import { trpc } from "@/app/_trpc/client";
import { Icons } from "../icons";
import { useUser } from "@clerk/nextjs";

const AddAssessmentSheetButton = ({
  className
}: {
  className?: string
}) => {

  const [open, setOpen] = useState(false);
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const [stepper, setStepper] = useState<"details" | "frameworks" | "controls" | "review">("details")
  const frameworks = trpc.framwork.getAll.useQuery()
  const mutation = trpc.assessment.addOrUpdateAssessment.useMutation()
  const afterMutation = trpc.assessment.createControlsObjective.useMutation()
  const utils = trpc.useContext();
  const { user } = useUser()
  const tabs = [
    {
      name: "details",
      label: dict?.details || "Details"
    }, {
      name: "frameworks",
      label: dict?.frameworks || "Frameworks"
    }, {
      name: "controls",
      label: dict?.controls || "Controls"
    }, {
      name: "review",
      label: dict?.review || "Review"
    }
  ]

  const FormSchema = z.object({
    name: z.string().min(4, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 4 characters.",
    }),
    description: z.string().min(4, {
      message: dict?.FromSchemaValidation.description || "Description must be at least 4 characters.",
    }),
    reportingFrom: z.date({
      required_error: dict?.FromSchemaValidation.reportingFrom || "Reporting from is required"
    }),
    reportingTo: z.date({
      required_error: dict?.FromSchemaValidation.reportingTo || "Reporting to is required"
    }),
    status: z.enum(["planned", "in-progress", "completed"], {
      required_error: dict?.FromSchemaValidation.status || "Status is required"
    }).optional(),
    type: z.enum(["internal", "external", "both"], {
      required_error: dict?.FromSchemaValidation.type || "Type is required"
    }),
    framworks: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: dict?.FromSchemaValidation.framework || "You have to select at least one framework.",
    }),
    controls: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: dict?.FromSchemaValidation.controls || "You have to select at least control.",
    })
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      framworks: [],
      controls: []
    }
  })


  const controls = trpc.control.getAllByFrameworkId.useQuery({
    frameworkIds: form.getValues("framworks") as string[]
  }, {
    onSuccess: (controls) => {
      if (controls) {
        form.setValue("controls", [...(controls?.map((control) => control.id) || [])])
        setStepper("controls")
      }
    },
    enabled: false
  })

  const assessments = trpc.assessment.getAllAssessments.useQuery({
    userId: user?.id || ""
  }, {
    enabled: false
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    mutation.mutate({
      name: data?.name,
      description: data?.description,
      status: data?.status ?? "planned",
      type: data?.type,
      reportingFrom: data?.reportingFrom.toISOString(),
      reportingTo: data?.reportingTo.toISOString(),
      controls: data?.controls ?? [],
      userId: user?.id,
    }, {
      onSuccess: (res) => {
        afterMutation.mutate({
          assessmentScopeId: res.id,
          controls: data?.controls ?? [],
        }, {
          onSuccess: () => {
            utils.assessment.getAllAssessments.refetch().then(() => {
              setOpen(false)
              setStepper("details")
              toast.success(dict?.assessmentAddedSuccessfully || "Assessment scope added successfully")
              form.reset()
            })
          }
        })
      }
    })
  }

  return (

    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className={cn("flex flex-row gap-2", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <PlusCircle className="w-4 h-4" />
          <span>
            {
              dict?.addAssessment || "Add assessment scope"
            }
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader className="mb-4">
          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addAssessment || "Add assessment scope"
            }
          </SheetTitle>
        </SheetHeader>

        <div className={cn("w-full h-full pb-10 ", className)}>

          <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full h-full">
              <Tabs value={stepper} className="w-full h-full">
                <TabsList className="w-full flex flex-row justify-around">
                  {
                    langStore?.rtl ?
                      tabs.reverse().map((tab, index) => (
                        <TabsTrigger key={index} className="cursor-default" value={tab.name} >{tab?.label}</TabsTrigger>

                      ))
                      :
                      tabs.map((tab, index) => (
                        <TabsTrigger key={index} className="cursor-default" value={tab.name} >{tab?.label}</TabsTrigger>

                      ))
                  }
                </TabsList>
                <div className=" py-3"></div>
                <TabsContent value="details" className={cn("w-full h-full flex flex-col gap-3", {
                  'h-0': stepper !== 'details'
                })}>
                  <AssessmentFormBody form={form} />
                  <div className={cn("mt-auto pb-20 w-full flex flex-row-reverse gap-2 justify-end", {
                    "flex-row": langStore?.rtl
                  })}>
                    <Button type="button" variant="ghost" onClick={() => {
                      form.reset()
                      setOpen(false)
                    }}>
                      {
                        dict?.cancel || "Cancel"
                      }
                    </Button>
                    <Button type="button" variant="outline" onClick={async () => {
                      await form.trigger()
                      if (
                        !form.getFieldState("name")?.invalid &&
                        !form.getFieldState("description")?.invalid &&
                        !form.getFieldState("type")?.invalid &&
                        !form.getFieldState("reportingFrom")?.invalid &&
                        !form.getFieldState("reportingTo")?.invalid
                      ) {
                        form.clearErrors()
                        setStepper("frameworks")
                      }
                    }}>
                      {
                        dict?.next || "Next"
                      }
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="frameworks" className={cn("w-full h-full flex flex-col gap-3", {
                  'h-0': stepper !== "frameworks"
                })}>
                  <div className="flex flex-col max-h-full overflow-y-scroll px-4">
                    <FormField
                      control={form.control}
                      name="framworks"
                      render={({ field, fieldState }) => (
                        <FormItem
                          className="w-full flex flex-col"
                        >
                          <FormLabel className={cn({
                            "text-right": langStore?.rtl
                          })}>
                            {
                              dict?.frameworks || "Frameworks"
                            }
                          </FormLabel>
                          <FormMessage />
                          {
                            frameworks?.data?.map((framework, index) => (
                              <FormField
                                key={framework.id}
                                control={form.control}
                                name="framworks"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={framework.id}
                                      className="flex flex-row items-center space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(framework.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, framework.id])
                                              : field.onChange(
                                                field?.value?.filter(
                                                  (value) => value !== framework.id
                                                )
                                              )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {framework.name}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))
                          }
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className={cn("mt-auto pb-20 w-full flex flex-row-reverse gap-2 justify-end", {
                    "flex-row": langStore?.rtl
                  })}>
                    <Button type="button" variant="outline" onClick={() => {
                      setStepper("details")
                    }}>
                      {
                        dict?.previous || "Previous"
                      }
                    </Button>
                    <Button
                      className="flex flex-row gap-2"
                      disabled={controls.isFetching}
                      type="button" variant="outline" onClick={async () => {
                        await form.trigger("framworks")
                        if (
                          !form.getFieldState("framworks")?.invalid
                        ) {
                          form.clearErrors()
                          controls.refetch()
                        }
                      }}>
                      <Icons.loader className={cn("animate-spin w-4 h-4", {
                        hidden: !controls.isFetching
                      })} />
                      <span>
                        {
                          dict?.next || "Next"
                        }
                      </span>
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="controls" className={cn("w-full h-full flex flex-col gap-3", {
                  'h-0': stepper !== "controls"
                })}>
                  <div className="flex flex-col max-h-full overflow-y-scroll px-4">
                    <FormField
                      control={form.control}
                      name="controls"
                      render={({ field, fieldState }) => (
                        <FormItem
                          className="w-full flex flex-col"
                        >
                          <FormLabel className={cn({
                            "text-right": langStore?.rtl
                          })}>
                            {
                              dict?.controls || "Controls"
                            }
                          </FormLabel>
                          <FormMessage />
                          {
                            controls?.data?.map((control, index) => (
                              <FormField
                                key={control.id}
                                control={form.control}
                                name="controls"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={control.id}
                                      className="flex flex-row items-center space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(control.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, control.id])
                                              : field.onChange(
                                                field?.value?.filter(
                                                  (value) => value !== control.id
                                                )
                                              )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {control.name}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))
                          }
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className={cn("mt-auto pb-20 w-full flex flex-row-reverse gap-2 justify-end", {
                    "flex-row": langStore?.rtl
                  })}>
                    <Button type="button" variant="outline" onClick={() => setStepper("frameworks")}>
                      {
                        dict?.previous || "Previous"
                      }
                    </Button>
                    <Button type="button" variant="outline" onClick={async () => {
                      await form.trigger("controls")
                      if (
                        !form.getFieldState("controls")?.invalid
                      ) {
                        form.clearErrors()
                        setStepper("review")
                      }
                    }}>
                      {
                        dict?.next || "Next"
                      }
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="review" className={cn("w-full h-full flex flex-col gap-3", {
                  'h-0': stepper !== "review"
                })}>
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full  flex flex-row gap-2">
                      <div className="w-full  flex flex-col gap-1">
                        <div className="text-base font-semibold">
                          {
                            dict?.name || "Name"
                          }
                        </div>
                        <div className="text-sm">{form.getValues("name")}</div>
                      </div>
                      <div className="w-full  flex flex-col gap-1">
                        <div className="text-base font-semibold">
                          {
                            dict?.type || "Type"
                          }
                        </div>
                        <div className="text-sm">{form.getValues("type")}</div>
                      </div>
                    </div>
                    <div className="w-full  flex flex-row gap-2">
                      <div className="w-full  flex flex-col gap-1">
                        <div className="text-base font-semibold">
                          {
                            dict?.from || "From"
                          }
                        </div>
                        <div className="text-sm">{(form.getValues("reportingFrom") as Date | undefined)?.toLocaleDateString()}</div>
                      </div>
                      <div className="w-full  flex flex-col gap-1">
                        <div className="text-base font-semibold">
                          {
                            dict?.to || "To"
                          }
                        </div>
                        <div className="text-sm">{(form.getValues("reportingTo") as Date | undefined)?.toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="w-full  flex flex-col gap-1">
                      <div className="text-base font-semibold">
                        {
                          dict?.description || "Description"
                        }
                      </div>
                      <div className="text-sm">{form.getValues("description")}</div>
                    </div>
                    <div className="w-full  flex flex-col gap-1">
                      <div className="text-base font-semibold">
                        {
                          dict?.controls || "Controls"
                        }
                      </div>
                      <div className="text-sm flex flex-row gap-1">
                        <span>{(form.getValues("controls") as string[]).length}</span>
                        <span>
                          {
                            dict?.controlsToBeAssessed || "Controls to be assessed"
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={cn("mt-auto pb-24 w-full flex flex-row-reverse gap-2 justify-end", {
                    "flex-row": langStore?.rtl
                  })}>
                    <Button type="button" variant="outline"
                      disabled={mutation.isLoading || afterMutation.isLoading || assessments.isLoading || assessments.isFetching || assessments.isRefetching}
                      onClick={() => setStepper("controls")}>
                      {
                        dict?.previous || "Previous"
                      }
                    </Button>
                    <Button type="submit"
                      disabled={mutation.isLoading || afterMutation.isLoading || assessments.isLoading || assessments.isFetching || assessments.isRefetching}
                      className="flex flex-row gap-2"
                    >

                      <Icons.loader className={cn("animate-spin w-4 h-4", {
                        hidden: !mutation.isLoading && !afterMutation.isLoading && !assessments.isLoading && !assessments.isFetching && !assessments.isRefetching
                      })}
                      />

                      <span>
                        {
                          dict?.addAssessment || "Add assessment scope"
                        }
                      </span>
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
export default AddAssessmentSheetButton