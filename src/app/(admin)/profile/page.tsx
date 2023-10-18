"use client"

import Footer from "@/components/layout/footer"
import PageWrapper from "@/components/page-wrapper"
import { ProfileForm } from "@/components/profile/profile-form"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import useLangStore from "@/store/langagueStore"
import { UserProfile } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { type Theme } from "@clerk/types"
import { dark } from "@clerk/themes"

const appearance: Theme = {
  baseTheme: undefined,
  variables: {
    borderRadius: "0.25rem",
  },
  elements: {
    card: "shadow-none",
    navbar: "hidden",
    navbarMobileMenuButton: "hidden",
    headerTitle: "hidden",
  },
}

export default function Profile() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const { theme } = useTheme()

  return (
    <PageWrapper className='flex flex-col w-full h-full gap-4 ' >
      <div className="flex justify-center items-start ">
        <UserProfile
          appearance={{
            ...appearance,
            baseTheme: theme === "dark" ? dark : appearance.baseTheme,
            variables: {
              ...appearance.variables,
              colorBackground: theme === "light" ? "#ffffff" : "#111111",
              colorPrimary: "#20C77F",
              colorText: theme === "light" ? "#000000" : "#ffffff",
            },
          }}
        />
      </div>
      <Footer className='py-3 grow items-end' />
    </PageWrapper>
  )
}