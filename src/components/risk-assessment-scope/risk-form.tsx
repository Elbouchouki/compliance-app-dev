"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Category, Risk, RiskForm } from "@/types"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { CATEGORY, RISK_STATUS } from "@/mock"
import useTagStore from "@/store/tagStore"
import { useUser } from "@clerk/nextjs"
import { trpc } from "@/app/_trpc/client"
import { Icons } from "../icons"

type RiskFormProps = {
  onSubmit: () => void
  formType: "add" | "edit"
  risk?: Risk
}

export const RiskRegisterFormBody = (
  { form, risk }: {
    form: any, risk: Risk | undefined
  }) => {

  const langStore = useStore(useLangStore, state => state)
  const tagStore = useStore(useTagStore, state => state)
  const dict = langStore?.getDictionary()

  const [likelihood, setLikelihood] = useState<number>(risk?.likelihood ?? 1)
  const [impact, setImpact] = useState<number>(risk?.impact ?? 1)
  const [riskScore, setRiskScore] = useState<number>(impact * likelihood)

  const cat = CATEGORY(langStore?.lang)

  const [category, setCategory] = useState<Category | null>(
    cat.filter(c => c.id === form.formState.defaultValues.category)[0]
    ?? null
  )

  const { user } = useUser()
  const tags = trpc.tag.getAll.useQuery({
    userId: user?.id
  })

  return (
    <div className="flex flex-col w-full gap-4 overflow-y-auto px-4">
      <div>
        <FormField
          control={form.control}
          name="searchMasterRiskList"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-row gap-2 justify-end items-center"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {"Search Master Risk List?"}
              </FormLabel>
              <FormControl className="mt-0">
                <Switch
                  className="mt-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="riskName"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {dict?.riskName || "Risk Name"}
              </FormLabel>
              <FormControl>
                <Input
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={"Enter Risk Name..."} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
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
                {dict?.description || "Description"}
              </FormLabel>
              <FormControl>
                <Textarea
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={
                    dict?.description || "Enter A Description..."
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
          name="consequences"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {dict?.consequences || "Consequences"}
              </FormLabel>
              <FormControl>
                <Textarea
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={
                    dict?.description || "Enter A Consequences..."
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
          name="owner"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {dict?.owner || "Risk Owner"}
              </FormLabel>
              <FormControl>
                <Input
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={"Enter Risk Owner's Name..."} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="affectedAsset"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {dict?.affectedAsset || "Affected Asset"}
              </FormLabel>
              <FormControl>
                <Input
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={"Enter affected by risk..."} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="category"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {dict?.category || "Categoty"}
              </FormLabel>
              <Select onValueChange={(id) => {
                setCategory(cat.filter(c => c.id === id)[0])
                return field.onChange(id)
              }} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {cat.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.value}</SelectItem>
                  )) || null}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {category && <div>
        <FormField
          control={form.control}
          name="subcategory"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {dict?.subcategory || "Subcategoty"}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className={`${category ? "block" : "hidden"}`}>
                  {category?.subCategory?.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>{c.value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>}
      <div>
        <FormField
          control={form.control}
          name="riskStatus"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {dict?.riskStatus || "Risk Status"}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {RISK_STATUS(langStore?.lang).map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tagId"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col mt-4"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {dict?.tag || "Tag"}
              </FormLabel>
              <Select
                disabled={!tags || tags.data?.length === 0}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        !tags || tags?.data?.length === 0 ?
                          dict?.noTagsAvailable || 'No Tags available' // to be changed to tags
                          : dict?.selectTag || 'Select a Tag' // to be changed to tag
                      } />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {
                      tags.data?.map((tag, index) => (
                        <SelectItem
                          className={cn({
                            "justify-end": langStore?.rtl
                          })}
                          key={index} value={tag.id}>
                          {tag.name}
                        </SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <div className="grid grid-col gap-4 col-span-5">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="impact"
              render={({ field, fieldState }) => (
                <FormItem
                  className="w-full flex flex-col"
                >
                  <FormLabel className={cn({
                    "text-right": langStore?.rtl
                  })}>
                    {dict?.impact || "Impact"}
                  </FormLabel>
                  <FormControl>
                    <Slider onValueChange={(val) => {
                      setImpact(val[0])
                      setRiskScore(val[0] * likelihood)
                      field.onChange(val[0])
                    }} defaultValue={[field.value]} min={1} max={5} step={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-row justify-between ietms-center text-[10px]">
              <span>{dict?.rare || "Rare"}</span>
              <span>{dict?.unlikely || "Unlikely"}</span>
              <span>{dict?.reasonablyPossible || "Reasonably Possible"}</span>
              <span>{dict?.likely || "Likely"}</span>
              <span>{dict?.almostCertain || "Almost Certain"}</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="likelihood"
              render={({ field, fieldState }) => (
                <FormItem
                  className="w-full flex flex-col"
                >
                  <FormLabel className={cn({
                    "text-right": langStore?.rtl
                  })}>
                    {dict?.likelihood || "Likelihood"}
                  </FormLabel>
                  <FormControl>
                    <Slider onValueChange={(val) => {
                      setLikelihood(val[0])
                      setRiskScore(val[0] * impact)
                      field.onChange(val[0])
                    }} defaultValue={[field.value]} min={1} max={5} step={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-row justify-between ietms-center text-[10px]">
              <span>{dict?.rare || "Rare"}</span>
              <span>{dict?.unlikely || "Unlikely"}</span>
              <span>{dict?.reasonablyPossible || "Reasonably Possible"}</span>
              <span>{dict?.likely || "Likely"}</span>
              <span>{dict?.almostCertain || "Almost Certain"}</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-[14px]">{dict?.inherentRiskScore || "Inherent Risk Score"}</h3>
          <span>{riskScore}</span>
        </div>
      </div>
    </div>
  )
}

const AssessmentForm = ({ onSubmit, formType, risk }: RiskFormProps) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const mutation = trpc.risk.addOrUpdate.useMutation()
  const { user } = useUser()
  const utils = trpc.useContext();

  const FormSchema = z.object({
    id: z.optional(z.string()),
    riskName: z.string().min(4, {
      message: "Risk Name must be at least 4 characters.",
    }),
    description: z.string().min(4, {
      message: "description must be at least 4 characters.",
    }),
    consequences: z.string().min(4, {
      message: "Consequences must be at least 4 characters."
    }),
    dateRaised: z.optional(z.date()),
    affectedAsset: z.string().min(4, {
      message: "Affect Asset must be at least 4 characters."
    }),
    category: z.string(),
    subcategory: z.string(),
    riskStatus: z.string(),
    impact: z.coerce.number(),
    likelihood: z.coerce.number(),
    riskAssessmentScopeId: z.optional(z.string()),
    owner: z.string().min(2, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 2 characters.",
    }),
    tagId: z.optional(z.string()),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      riskName: risk?.riskName,
      description: risk?.description,
      consequences: risk?.consequences,
      affectedAsset: risk?.affectedAsset,
      riskStatus: risk?.riskStatusId,
      impact: risk?.impact,
      likelihood: risk?.likelihood,
      category: risk?.categoryId,
      subcategory: risk?.subCategoryId,
      riskAssessmentScopeId: risk?.riskAssessmentScopeId,
      owner: risk?.owner,
      id: risk?.id || Math.random().toString(),
      tagId: risk?.tagId || "",
    }
  })

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(
      {
        id: data?.id as string ?? "",
        riskName: data?.riskName ?? "",
        description: data?.description ?? "",
        consequences: data?.consequences ?? "",
        affectedAsset: data?.affectedAsset || "",
        category: data?.category ?? undefined,
        subcategory: data?.subcategory ?? undefined,
        riskStatus: data?.riskStatus ?? "",
        impact: data?.impact ?? 1,
        likelihood: data?.likelihood ?? 1,
        owner: data?.owner ?? "",
        tagId: data?.tagId,
        userId: user?.id,
      },
      {
        onSuccess: () => {
          utils.risk.getByUserId.refetch().then(() => {
            onSubmit()
          })
        }
      }
    )
  }

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col gap-3">
        <RiskRegisterFormBody form={form} risk={risk} />
        <div className="mt-3">
          <Button type="submit"
            disabled={mutation.isLoading}
            className="flex flex-row gap-2"
          >
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading
            })}
            />

            <span>
              {
                formType === "add" ?
                  "Add Risk"
                  : "Update Risk"
              }
            </span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default AssessmentForm