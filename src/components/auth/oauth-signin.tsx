"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { useRouter } from "next/navigation"
import { useStore } from "@/hooks/use-store"
import useAuthStore from "@/store/authStore"
import { AuthenticatedUserMock } from "@/mock"


export function OAuthSignIn() {
  const router = useRouter()

  const authStore = useStore(useAuthStore, state => state)

  const [isLoading, setIsLoading] = React.useState<string | null>(null)

  const oauthProviders = [
    { name: "Google", icon: "google" },
    { name: "Github", icon: "github" },
  ] satisfies {
    name: string
    icon: keyof typeof Icons
  }[]

  async function oauthSignIn(provider: string) {
    setIsLoading(provider)
    setTimeout(() => {
      authStore?.login(AuthenticatedUserMock)
      toast.success("Sign in success")
      router.push(window.location.origin)
      setIsLoading(null)
    }, 500)
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
      {oauthProviders.map((provider) => {
        const Icon = Icons[provider.icon]
        return (
          <Button
            aria-label={`Sign in with ${provider.name}`}
            key={provider.name}
            variant="outline"
            className="w-full bg-background sm:w-auto"
            onClick={() => void oauthSignIn(provider.name)}
            disabled={isLoading !== null}
          >
            {isLoading === provider.name ? (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            {provider.name}
          </Button>
        )
      })}
    </div>
  )
}
