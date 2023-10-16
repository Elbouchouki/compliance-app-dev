"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { z } from "zod"

import { registerSchema } from "@/lib/validations/auth"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { PasswordInput } from "@/components/password-input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Inputs = z.infer<typeof registerSchema>

export function SignUpForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  function onSubmit(data: Inputs) {
    setIsLoading(true)
    startTransition(async () => {
      setTimeout(() => {
        setIsLoading(false)
        toast.success("Check your email", {
          description: "We sent you a 6-digit verification code."
        })
        router.push(`${window.location.origin}/signup/verify-email`)
      }, 500)
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 gap-4">
                  <div className="flex flex-row gap-4">
                    <div className="w-full">
                      <RadioGroupItem value="Admin" id="Admin" className="peer sr-only" />
                      <Label
                        htmlFor="Admin"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Admin
                      </Label>
                    </div>
                    <div className="w-full">
                      <RadioGroupItem value="Auditor" id="Auditor" className="peer sr-only" />
                      <Label
                        htmlFor="Auditor"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Auditor
                      </Label>
                    </div>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="RiskManager"
                      id="RiskManager"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="RiskManager"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Risk Manager
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="ComplianceProfessional" id="ComplianceProfessional" className="peer sr-only" />
                    <Label
                      htmlFor="ComplianceProfessional"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Compliance Professional
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="elbouchoukigamer@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending || isLoading}>
          {(isPending || isLoading) && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  )
}
