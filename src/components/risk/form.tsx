'use client'

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"
import { Risk, RiskForm, tagSchema } from "@/types"
import { cn } from "@/lib/utils"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiskRegisterFormBody } from "@/components/risk-register/risk-form"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { riskStore } from "@/store/riskStore"
import { toast } from "sonner"
import { trpc } from "@/app/_trpc/client"
import { useUser } from "@clerk/nextjs"

export const UpdateRiskForm = ({ risk, className }: { risk?: Risk, className?: string }) => {

  const riskStoreTools = useStore(riskStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

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
    owner: z.string().min(2, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 2 characters.",
    }),
    tagId: z.optional(z.string()),
  })

  const mutation = trpc.risk.addOrUpdate.useMutation()
  const { user } = useUser()
  const utils = trpc.useContext();

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
          utils.risk.getAll.refetch().then(() => {
            riskStoreTools?.setEditModalOpen(false)
            toast.success("Risk updated successfully")
          })
        }
      }
    )
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      riskName: risk?.riskName,
      description: risk?.description,
      consequences: risk?.consequences,
      affectedAsset: risk?.affectedAsset,
      riskStatus: risk?.riskStatusId,
      dateRaised: new Date(risk?.dateRaised as string) ?? undefined,
      impact: risk?.impact,
      likelihood: risk?.likelihood,
      category: risk?.categoryId,
      subcategory: risk?.subCategoryId,
      owner: risk?.owner,
      id: risk?.id || Math.random().toString(),
      tagId: risk?.tagId || "",
    }
  })



  return (
    <Dialog open={riskStoreTools?.editModalOpen} onOpenChange={riskStoreTools?.setEditModalOpen}>
      <DialogTrigger asChild>
        <Button className="w-[260px]">{ dict?.updateRisk || "Update Risk"}</Button>
      </DialogTrigger>
      <DialogContent className="w-screen">
        <DialogHeader>
          {langStore?.lang === "en" ? <DialogTitle>Update {risk?.riskName}</DialogTitle> : 
            <DialogTitle>{risk?.riskName} {dict?.update}</DialogTitle>}
        </DialogHeader>
        <div className={cn("w-full", className)} >
          <Form {...form}>
            <form className="w-full h-[480px] overflow-y-auto p-4" onSubmit={form.handleSubmit(handleSubmit)}>
              <RiskRegisterFormBody form={form} risk={risk} />
              <div className={cn("w-full flex mt-2 flex-row-reverse gap-2 justify-end", {
                "flex-row": langStore?.rtl
              })}>
                <Button type="button" variant="ghost" onClick={() => {
                  form.reset()
                  riskStoreTools?.setEditModalOpen(false)
                  riskStoreTools?.setEditModalRisk(undefined)
                }}>
                  {
                    dict?.cancel || "Cancel"
                  }
                </Button>
                <Button type="submit" variant="outline">
                  {
                    "Update Risk"
                  }
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}