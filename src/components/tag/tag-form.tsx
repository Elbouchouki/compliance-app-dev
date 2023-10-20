'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Tag } from "@/types"
import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import { trpc } from "@/app/_trpc/client"
import { useUser } from "@clerk/nextjs"
import { Icons } from "../icons"

type TagFormProps = {
  onSubmit: () => void
  formType: "add" | "edit"
  tag?: Tag
}

const TagForm = ({ onSubmit, formType, tag }: TagFormProps) => {
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const mutation = trpc.tag.addOrUpdate.useMutation()
  const { user } = useUser()
  const utils = trpc.useContext();

  const tags = trpc.tag.getAll.useQuery({
    userId: user?.id || ""
  }, {
    enabled: false
  })

  const FormSchema = z.object({
    name: z.string().min(4, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 4 characters.",
    }),
    id: z.optional(z.string()),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: tag?.name,
      id: tag?.id
    }
  })

  const onSubmitForm = (data: z.infer<typeof FormSchema>) => {
    mutation.mutate(
      {
        name: data.name,
        userId: user?.id,
        id: data.id ?? undefined
      },
      {
        onSuccess: () => {
          utils.tag.getAll.refetch().then(() => {
            onSubmit()
          })
        }
      }
    )
  }

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="w-full h-full flex flex-col gap-3 ">
        <div>
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
                  <Input className={cn({
                    "text-right": langStore?.rtl
                  })} placeholder={
                    dict?.name || "Name"
                  } {...field} />
                </FormControl>
                <FormDescription className={cn({
                  "text-right": langStore?.rtl
                })}>
                  {
                    dict?.thisIsTheNameOfTheTag || "This is the name of the tag"
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={cn("mt-auto grow flex gap-2 items-end", {
          "flex flex-row-reverse": langStore?.rtl
        })}>
          <Button type="submit"
            disabled={mutation.isLoading || tags.isLoading || tags.isRefetching || tags.isFetching}
            className="flex flex-row gap-2"
          >
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading && !tags.isLoading && !tags.isRefetching && !tags.isFetching
            })} />
            <span>
              {
                formType === "add" ?
                  dict?.addTag || "Add Tag"
                  : dict?.updateTag || "Update Tag"
              }
            </span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default TagForm