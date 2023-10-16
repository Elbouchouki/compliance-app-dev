"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Evidence } from "@/types"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"
import { trpc } from "@/app/_trpc/client"
import { useUser } from "@clerk/nextjs"
import { Icons } from "../icons"


type EvidenceFormProps = {
  onSubmit: () => void
  formType: "add" | "edit"
  evidence?: Evidence
}

const EvidenceForm = ({ onSubmit, formType, evidence }: EvidenceFormProps) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const mutation = trpc.evidence.addOrUpdate.useMutation()
  const utils = trpc.useContext();


  const FormSchema = z.object({
    reference: z.optional(z.string()),
    name: z.string().min(4, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 4 characters.",
    }),
    content: z.optional(z.string()),
    description: z.optional(z.string()),
    id: z.optional(z.string()),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reference: evidence?.reference,
      name: evidence?.name,
      content: evidence?.content,
      description: evidence?.description,
      id: evidence?.id
    }
  })

  const onSubmitForm = (data: z.infer<typeof FormSchema>) => {
    mutation.mutate(
      {
        name: data.name,
        reference: data.reference,
        content: data.content,
        description: data.description,
        id: data.id ?? undefined
      },
      {
        onSuccess: () => {
          utils.evidence.getAll.refetch().then(() => {
            onSubmit()
          })
        }
      }
    )
  }

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="flex flex-col w-full gap-3">
        <div>
          <FormField
            control={form.control}
            name="reference"
            render={({ field, fieldState }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  <span>
                    {
                      dict?.reference || "Reference"
                    }
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Input className={cn({
                    "text-right": langStore?.rtl
                  })} placeholder="ref-123" {...field} />
                </FormControl>
                <FormDescription
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                >
                  {
                    dict?.thisIsTheReferenceForTheEvidence || "This is the reference for the evidence."
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn({
                  "text-right": langStore?.rtl
                })}>
                  {
                    dict?.name || "Name"
                  }
                </FormLabel>
                <FormControl>
                  <Input className={cn({
                    "text-right": langStore?.rtl
                  })} placeholder="ahmed" {...field} />
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
            render={({ field }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  <span>
                    {
                      dict?.description || "Description"
                    }
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Input className={cn({
                    "text-right": langStore?.rtl
                  })} placeholder="description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  <span>
                    {
                      dict?.content || "Content"
                    }
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Textarea

                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    placeholder="content..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name="content"
            render={({ field }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  <span>
                    {
                      dict?.attachement || "Attachement"
                    }
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Input className={cn({
                    "text-right": langStore?.rtl
                  })} id="picture" type="file" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className={cn("mt-3", {
          "flex flex-row-reverse": langStore?.rtl
        })}>
          <Button type="submit"
            disabled={mutation.isLoading}
            className="flex flex-row gap-2"
          >
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading
            })} />
            <span>{
              formType === "add" ? "Add Evidence" : "Update Evidence"
            }
            </span>
          </Button>
        </div>


      </form>
    </Form>
  )
}
export default EvidenceForm