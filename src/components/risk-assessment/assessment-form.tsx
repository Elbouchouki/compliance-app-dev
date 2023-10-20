"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { RiskAssessmentScope, RiskForm, riskAssessmentScope, } from "@/types"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Icons } from "@/components/icons"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { Textarea } from "@/components/ui/textarea"
import { ar, enUS } from 'date-fns/locale';
import { GET_RISK_ASSESSMENTS_SCOPE_TYPES } from "@/mock"
import { trpc } from "@/app/_trpc/client"
import { useUser } from "@clerk/nextjs"


export const AssessmentFormBody = (
  { form }: {
    form: any
  }) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  return (
    <>
      <div >
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {
                  dict?.name || "Name"
                }
              </FormLabel>
              <FormControl>
                <Input
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={
                    dict?.name || "Name"
                  } {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {
                  dict?.type || "Type"
                }
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger
                    className={cn({
                      "flex-row-reverse": langStore?.rtl
                    })}
                  >
                    <SelectValue

                      placeholder={
                        dict?.selectType || "Select a type"
                      } />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      GET_RISK_ASSESSMENTS_SCOPE_TYPES(langStore?.lang).map((type, index) => (
                        <SelectItem key={index} value={type.value} className={cn({
                          "flex-row-reverse": langStore?.rtl
                        })}>
                          {type?.label}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="reportingFrom"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1 w-full ">
            <FormLabel className={cn({
              "text-right": langStore?.rtl
            })}>
              {
                dict?.period || "Period"
              }
            </FormLabel>
            <div className={cn("flex flex-row gap-2 items-center", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <p className="text-xs w-10">
                {
                  dict?.from || "From"
                }
              </p>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground", {
                        "flex-row-reverse": langStore?.rtl
                      }
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", {
                          locale: langStore?.lang === "ar" ? ar : enUS
                        })
                      ) : (
                        <span>
                          {
                            dict?.pickDate || "Pick a date"
                          }
                        </span>
                      )}
                      <Icons.calendar className={cn("ml-auto h-4 w-4 opacity-50", {
                        "ml-0 mr-auto": langStore?.rtl
                      })} />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={langStore?.lang === "ar" ? ar : enUS}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="reportingTo"
        render={({ field }) => (
          <FormItem className="flex flex-col gap-1 w-full ">
            <div className={cn("flex flex-row gap-2 items-center", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <p className="text-xs w-10">
                {
                  dict?.to || "To"
                }
              </p>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground", {
                        "flex-row-reverse": langStore?.rtl
                      }
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", {
                          locale: langStore?.lang === "ar" ? ar : enUS
                        })
                      ) : (
                        <span>
                          {
                            dict?.to || "To"
                          }
                        </span>
                      )}
                      <Icons.calendar className={cn("ml-auto h-4 w-4 opacity-50", {
                        "ml-0 mr-auto": langStore?.rtl
                      })} />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={langStore?.lang === "ar" ? ar : enUS}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {
                  dict?.description || "Description"
                }
              </FormLabel>
              <FormControl>
                <Textarea
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={
                    dict?.description || "Description"
                  } {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  )
}

type AssessmentFormProps = {
  onSubmit: () => void
  formType: "add" | "edit"
  assessmentScope?: RiskAssessmentScope
}

const AssessmentForm = ({ onSubmit, formType, assessmentScope }: AssessmentFormProps) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const mutation = trpc.riskAssessmentScope.addOrUpdate.useMutation()
  const { user } = useUser()
  const utils = trpc.useContext();
  const risks = trpc.riskAssessmentScope.getAll.useQuery({
    userId: user?.id
  }, {
    enabled: false
  })


  const FormSchema = z.object({
    id: z.string().optional(),
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
    risks: z.array(RiskForm).optional(),
    status: z.enum(["planned", "in-progress", "completed"], {
      required_error: dict?.FromSchemaValidation.status || "Status is required"
    }).optional(),
    type: z.enum(["entreprise-wide", "operational", "information-security", "financial", "compliance", "project", "hazard"], {
      required_error: dict?.FromSchemaValidation.type || "Type is required"
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: assessmentScope?.id,
      name: assessmentScope?.name || "",
      description: assessmentScope?.description || "",
      status: assessmentScope?.status || "planned",
      type: assessmentScope?.type,
      reportingFrom: new Date((assessmentScope?.reportingFrom || new Date())),
      reportingTo: new Date((assessmentScope?.reportingTo || new Date())),
    }
  })

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(
      {
        id: data?.id,
        name: data?.name,
        description: data?.description,
        status: data?.status,
        type: data?.type,
        reportingFrom: data?.reportingFrom.toISOString(),
        reportingTo: data?.reportingTo.toISOString(),
        userId: user?.id,
      },
      {
        onSuccess: () => {
          utils.riskAssessmentScope.getAll.refetch().then(() => {
            onSubmit()
          })
        }
      }
    )
  }

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col gap-3 h-full ">
        <AssessmentFormBody form={form} />
        <div className={cn("mt-auto grow flex gap-2 items-end", {
          "flex-row-reverse ": langStore?.rtl
        })}>
          <Button type="submit"
            disabled={mutation.isLoading || risks.isRefetching || risks.isLoading || risks.isFetching}
            className="flex flex-row gap-2 "
          >
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading && !risks.isLoading && !risks.isRefetching && !risks.isFetching
            })} />
            <span>
              {
                formType === "add" ?
                  dict?.addRiskScope || "Add Risk Assessment Scope"
                  : dict?.updateRiskScope || "Update Risk Assessment Scope"
              }
            </span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default AssessmentForm