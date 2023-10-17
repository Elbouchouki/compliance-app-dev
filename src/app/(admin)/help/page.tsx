"use client"
import HelpForm from "@/components/help/help-form";
import { Icons } from "@/components/icons";
import Footer from "@/components/layout/footer";
import PageWrapper from "@/components/page-wrapper";
import TabNav from "@/components/tab-nav";
import { APP_CONFIG } from "@/constants/app.config";
import { HelpNavItems } from "@/constants/navs.config";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import useLangStore from "@/store/langagueStore";
import Image from "next/image";

// const FemaleVector = () => {
//   return

// }


export default function Help() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <PageWrapper className='flex flex-col h-full max-w-full gap-4 grow items-center' >
      <TabNav navItems={HelpNavItems} />

      <div className="flex flex-col w-full">
        <h1 className={cn("text-xl items-center gap-2 font-semibold  flex flex-row", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <span>
            {
              dict?.help || 'Help'
            }
          </span>
        </h1>
        <p className={cn("text-sm text-muted-foreground", {
          "text-right": langStore?.rtl
        })}>
          {
            (dict?.helpHeaderMsg || "You can submit a issue on Github and/or submit your question/bug/issue below. You are on version 3.5.0 of") + ` ${APP_CONFIG.appName} `
          }
        </p>
      </div>
      <div className="flex flex-col items-center h-full gap-5 px-3 mt-10 md:max-w-2xl">
        {/* <div className="h-28 w-28"> */}
        <Image src="/FemaleVector.svg" alt="Picture of the author" width={500} height={500} />
        {/* </div> */}
        <div className="w-full ">
          <HelpForm />
        </div>
        <div className={cn("w-full text-xs ", {
          "text-right": langStore?.rtl
        })}>
          {
            dict?.helpFooterMsg || "Check out FQA page, maybe you will find your answer there. If not, please submit your question/bug/issue above."
          }
        </div>
      </div>
      <Footer className='items-end mt-3 grow' />
    </PageWrapper>
  )
}