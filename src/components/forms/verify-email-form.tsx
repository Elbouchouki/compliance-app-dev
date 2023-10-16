"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { verfifyEmailSchema } from "@/lib/validations/auth"
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
import useAuthStore from "@/store/authStore"
import { AuthenticatedUserMock } from "@/mock"

type Inputs = z.infer<typeof verfifyEmailSchema>

export function VerifyEmailForm() {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false)

  const authStore = useAuthStore()


  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(verfifyEmailSchema),
    defaultValues: {
      code: "",
    },
  })

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      setIsLoaded(true)
      setTimeout(() => {
        setIsLoaded(false)
        authStore.login(AuthenticatedUserMock)
        router.push(`${window.location.origin}`)
      }, 2000)
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="169420"
                  {...field}
                  onChange={(e) => {
                    e.target.value = e.target.value.trim()
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending || isLoaded}>
          {(isPending || isLoaded) && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Create account
          <span className="sr-only">Create account</span>
        </Button>
      </form>
    </Form>
  )
}
