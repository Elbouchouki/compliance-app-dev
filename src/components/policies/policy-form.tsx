
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Policy } from "@/types"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"
import { trpc } from "@/app/_trpc/client"
import { Icons } from "../icons"
import { useUser } from "@clerk/nextjs"

type PolicyFormProps = {
  onSubmit: () => void
  formType: "add" | "edit"
  policy?: Policy
  showOptionnals?: boolean
}

const PolicyForm = ({ onSubmit, formType, policy, showOptionnals = true }: PolicyFormProps) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const mutation = trpc.policy.addOrUpdate.useMutation()
  const utils = trpc.useContext();
  const { user } = useUser()


  const FormSchema = z.object({
    reference: z.optional(z.string()),
    name: z.string().min(4, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 4 characters.",
    }),
    content: z.optional(z.string()),
    description: z.optional(z.string()),
    id: z.optional(z.string())
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reference: policy?.reference,
      name: policy?.name,
      description: policy?.description,
      id: policy?.id
    }
  })

  const onSubmitForm = (data: z.infer<typeof FormSchema>) => {
    mutation.mutate(
      {
        name: data.name,
        reference: data.reference,
        content: data.content,
        description: data.description,
        id: data.id ?? undefined,
        userId: user?.id
      },
      {
        onSuccess: () => {
          utils.policy.getAll.refetch().then(() => {
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
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.reference || "Reference"
                  }
                  {showOptionnals === true ? <Badge variant="outline" className="ml-2 text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge> : null}
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    placeholder="ref-123" {...field} />
                </FormControl>
                <FormDescription className={cn({
                  "text-right": langStore?.rtl
                })}>
                  {
                    dict?.thisIsTheReferenceForThePolicy || "This is the reference for the policy."
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
            name="description"
            render={({ field }) => (
              <FormItem
                className="w-full flex flex-col"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.description || "Description"
                  }
                  {showOptionnals === true ? <Badge variant="outline" className="ml-2 text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge> : null}
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    placeholder={
                      dict?.description || "description"
                    } {...field} />
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
            <span>{
              formType === "add" ?
                dict?.addPolicy || "Add Policy"
                : dict?.updatePolicy || "Update Policy"
            }
            </span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default PolicyForm