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
    headerSubtitle: "hidden",
  },
}

export default function Profile() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const { theme } = useTheme()

  return (
    <PageWrapper className='flex flex-col w-full h-full gap-4 ' >

      {/* <div className={cn("flex flex-col w-full gap-2 py-2 border-b sm:flex-row", {
        "sm:flex-row-reverse": langStore?.rtl,
      })}>
        <div className="flex flex-col grow">
          <h1 className={
            cn("text-xl font-semibold grow gap-2 flex flex-row items-center", {
              "flex-row-reverse": langStore?.rtl
            })
          }>
            <span>
              {
                dict?.profile || "Profile"
              }
            </span>
          </h1>
          <h3 className={cn("text-sm text-muted-foreground", {
            "text-right": langStore?.rtl
          })}>
            {
              dict?.thisIsHowOthersWillSeeYouOnTheSite || "This is how others will see you on the site"
            }
          </h3>
        </div>

      </div>

      <div className="h-full flex flex-col overflow-x-scroll pr-3">
        <div className={cn(" lg:max-w-2xl p-2", {
          "self-end": langStore?.rtl,
        })}> */}
      {/* <ProfileForm /> */}
      <div className="flex justify-center ">
        <UserProfile

          appearance={{
            ...appearance,
            baseTheme: theme === "dark" ? dark : appearance.baseTheme,
            variables: {
              ...appearance.variables,
              colorBackground: theme === "light" ? "#ffffff" : "#020817",
            },
          }}
        />
      </div>
      <Footer className='mt-3 grow items-end' />

      {/* </div>
        <Footer className='mt-3 grow items-end' />
      </div> */}
    </PageWrapper>
  )
}