
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import { trpc } from "@/app/_trpc/client"
import { useUser } from "@clerk/nextjs"
import { Icons } from "../icons"

const HelpForm = () => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const mutation = trpc.mail.send.useMutation()
  const { user } = useUser()
  const FormSchema = z.object({
    content: z.string().nonempty({
      message: dict?.FromSchemaValidation.thisFieldCantBeEmpty || "This field can't be empty.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const handleSubmit = (data: z.infer<typeof FormSchema>) => {
    const content = "we have received your message and we will get back to you as soon as possible."
    mutation.mutate({
      content: content,
      email: user?.emailAddresses[0].emailAddress ?? "",
      subject: "Help Request"
    }, {
      onSuccess: () => {
        toast.success(dict?.yourMessageHasBeenSentSuccessfully || "Your message has been sent successfully", {
          description: dict?.weWillGetBackToYouAsSoonAsPossible || "We will get back to you as soon as possible"
        })
        form.setValue("content", "")
      }
    })
  }


  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col w-full gap-3 bg-navbar rounded-lg border px-4 py-6">
        {/* <div>
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.email || "Email"
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    placeholder="e.g elbouchouki@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
        <div className="font-semibold">
          {
            dict?.howCanweHelp || "How can we help you ?"
          }
        </div>
        <div>

          <FormField
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2 text-xs", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.description || "Description"
                  }
                </FormLabel>
                <FormControl>
                  <Textarea
                    className={cn("border bg-[#2b2d2f] p-3", {
                      "text-right": langStore?.rtl
                    })}
                    rows={5}
                    placeholder={
                      dict?.helpExample || "e.g I have a problem with my account"
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
            <span>
              {
                dict?.sendMessage || "Send"
              }
            </span>
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading
            })} />
            <Icons.send className={cn("w-4 h-4", {
              hidden: mutation.isLoading
            })} />
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default HelpForm