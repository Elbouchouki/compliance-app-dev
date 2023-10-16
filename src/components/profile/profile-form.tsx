"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>



export function ProfileForm() {
  const langStore = useStore(useLangStore, state => state);
  const dict = langStore?.getDictionary();

  const defaultValues: Partial<ProfileFormValues> = {
    bio: dict?.bioDefault || "I'm a software engineer from Morocco. I love building things with React.",
  }

  const FormSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: dict?.FromSchemaValidation.usernameMin || "Username must be at least 2 characters.",
      })
      .max(30, {
        message: dict?.FromSchemaValidation.usernameMax || "Username must not be longer than 30 characters.",
      }),
    email: z
      .string({
        required_error: dict?.FromSchemaValidation.pleaseSelectAnEmailToDisplay || "Please select an email to display.",
      })
      .email(),
    bio: z.string().max(160).min(4),
  })


  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    toast.success(dict?.yourProfileHasBeenUpdatedSuccessfully || "Your profile has been updated successfully")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem
              className="flex flex-col w-full"
            >
              <FormLabel className={cn("flex flex-row items-center gap-2", {
                "flex-row-reverse": langStore?.rtl
              })}>
                {
                  dict?.username || "Username"
                }
              </FormLabel>
              <FormControl>
                <Input
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder="elbouchouki" {...field} />
              </FormControl>
              <FormDescription className={cn({
                "text-right": langStore?.rtl
              })}>
                {
                  dict?.usernameDescription || "This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days."
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className={cn({
                  "flex-row-reverse": langStore?.rtl
                })}>
                  <SelectTrigger>
                    <SelectValue placeholder={
                      dict?.selectVerifiedEmailToDisplay || "Select a verified email to display"
                    } />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">ahmed@mail.com</SelectItem>
                  <SelectItem value="m@google.com">elbouchouki@gmail.com</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem
              className="flex flex-col w-full"
            >
              <FormLabel className={cn("flex flex-row items-center gap-2", {
                "flex-row-reverse": langStore?.rtl
              })}>
                {
                  dict?.bio || "Bio"
                }
              </FormLabel>
              <FormControl>
                <Textarea

                  placeholder={
                    dict?.bioPlaceHolder || "Tell us a little bit about yourself"
                  }
                  className={cn("resize-none", {
                    "text-right": langStore?.rtl
                  })}
                  {...field}
                />
              </FormControl>
              <FormDescription
                className={cn({
                  "text-right": langStore?.rtl
                })}
              >
                {
                  dict?.bioDescription || "This is your public bio. You can write a little bit about yourself here."
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={cn("flex flex-row", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Button type="submit">
            {
              dict?.updateProfile || "Update Profile"
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}