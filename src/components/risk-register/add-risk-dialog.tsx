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
import { RiskRegisterFormBody } from "@/components/risk-register/risk-form"
import useLangStore from "@/store/langagueStore";
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { RiskForm } from "@/types";
import { riskStore } from "@/store/riskStore";
import { trpc } from "@/app/_trpc/client";
import { useUser } from "@clerk/nextjs";
import { Icons } from "../icons";


const AddRiskSheetButton = ({
  className
}: {
  className?: string
}) => {

  const [open, setOpen] = useState(false);
  const riskStoreTools = useStore(riskStore, state => state)
  const risk = riskStoreTools?.editModalRisk;
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const mutation = trpc.risk.add.useMutation()
  const { user } = useUser()
  const utils = trpc.useContext();
  const risks = trpc.risk.getAll.useQuery({
    userId: user?.id
  }, {
    enabled: false
  })

  const form = useForm<z.infer<typeof RiskForm>>({
    resolver: zodResolver(RiskForm),
    defaultValues: {
      riskName: "",
      description: "",
      consequences: "",
      affectedAsset: "",
      riskStatus: "",
      impact: 1,
      likelihood: 1,
      category: undefined,
      subcategory: undefined,
      owner: "",
      dateRaised: new Date()
    }
  })

  function onSubmit(data: z.infer<typeof RiskForm>) {
    mutation.mutate(
      {
        riskName: data?.riskName,
        consequences: data?.consequences,
        description: data?.description,
        category: data?.category,
        subcategory: data?.subcategory,
        riskStatus: data?.riskStatus,
        affectedAsset: data?.affectedAsset,
        impact: data?.impact,
        likelihood: data?.likelihood,
        owner: data?.owner,
        tagId: data.tagId,
        userId: user?.id,
      },
      {
        onSuccess: () => {
          utils.risk.getAll.refetch().then(() => {
            setOpen(false)
            form.reset()
            toast.success(dict?.riskAddedSuccessfully || "Risk added successfully")
          })
        }
      }
    )
  }


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className={cn("flex flex-row items-center gap-2 flex-none", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <PlusCircle className="w-4 h-4" />
          <span>{dict?.addRisk || "Add Risk"}</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader className="pb-5">
          <SheetTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {dict?.addRisk || "Add Risk"}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className=" w-full h-full pb-16" onSubmit={form.handleSubmit(onSubmit)} >
            <div className=" w-full h-full overflow-y-auto py-3">
              <RiskRegisterFormBody form={form} risk={risk} />
            </div>
            <div className={cn("w-full flex flex-row-reverse gap-2 justify-end", {
              "flex-row": langStore?.rtl
            })}>
              <Button type="button" variant="ghost"
                disabled={mutation.isLoading || risks.isFetching || risks.isLoading || risks.isRefetching}
                onClick={() => {
                  form.reset()
                  setOpen(false)
                }}>
                {
                  dict?.cancel || "Cancel"
                }
              </Button>
              <Button type="submit" variant="outline"
                disabled={mutation.isLoading || risks.isFetching || risks.isLoading || risks.isRefetching}
                className="flex flex-row gap-2"
              >
                <Icons.loader className={cn("animate-spin w-4 h-4", {
                  hidden: !mutation.isLoading && !risks.isFetching && !risks.isLoading && !risks.isRefetching
                })}
                />
                <span>
                  {
                    dict?.createRisk || "Create"
                  }
                </span>
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
export default AddRiskSheetButton