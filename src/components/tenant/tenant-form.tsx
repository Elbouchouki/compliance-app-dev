"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Tenant } from "@/types"
import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { trpc } from "@/app/_trpc/client"
import { Icons } from "../icons"


type TenantFormProps = {
  onSubmit: () => void
  formType: "add" | "edit"
  tenant?: Tenant
}

const TenantForm = ({ onSubmit, formType, tenant }: TenantFormProps) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  const { user } = useUser()
  const mutation = trpc.tenant.addOrUpdate.useMutation()
  const utils = trpc.useContext()

  const FormSchema = z.object({
    reference: z.optional(z.string()),
    name: z.string().min(4, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 4 characters.",
    }),
    contact_email: z.string().email({
      message: dict?.FromSchemaValidation.invalidEmailAddress || "Invalid email address.",
    }),
    id: z.optional(z.string()),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reference: tenant?.reference,
      name: tenant?.name,
      contact_email: tenant?.contact_email,
      id: tenant?.id
    }
  })

  const onSubmitForm = (data: z.infer<typeof FormSchema>) => {
    mutation.mutate(
      {
        name: data.name,
        reference: data.reference,
        contact_email: data.contact_email,
        userId: user?.id,
        id: data.id ?? undefined
      },
      {
        onSuccess: () => {
          utils.tenant.getAll.refetch().then(() => {
            onSubmit()
          })
        }
      }
    )
  }

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="w-full flex flex-col gap-3">
        <div>
          <FormField
            control={form.control}
            name="reference"
            render={({ field, fieldState }) => (
              <FormItem
                className="w-full flex flex-col"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "flex-row-reverse": langStore?.rtl
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
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    placeholder="ref-123" {...field} />
                </FormControl>
                <FormDescription
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                >
                  {
                    dict?.thisIsTheReferenceForTheTenant || "This is the reference for the tenant."
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
                    placeholder="ahmed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="contact_email"
            render={({ field }) => (
              <FormItem
                className="w-full flex flex-col"
              >
                <FormLabel className={cn({
                  "text-right": langStore?.rtl
                })}>
                  {
                    dict?.contactEmail || "Contact Email"
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    placeholder="ahmed@mail.com" {...field} />
                </FormControl>
                <FormMessage />
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
            <span>
              {
                formType === "add" ?
                  dict?.addTenant || "Add Tenant"
                  : dict?.updateTenant || "Update Tenant"
              }
            </span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default TenantForm