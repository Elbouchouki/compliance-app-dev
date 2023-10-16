"use client"
import HelpForm from "@/components/help/help-form";
import { Icons } from "@/components/icons";
import Footer from "@/components/layout/footer";
import PageWrapper from "@/components/page-wrapper";
import { APP_CONFIG } from "@/constants/app.config";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import useLangStore from "@/store/langagueStore";

export default function Help() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <PageWrapper className='flex flex-col h-full max-w-full gap-4 grow' >
      <div className="flex flex-row py-2 border-b">
        <h1 className={cn("flex flex-row items-center text-xl font-semibold grow gap-2", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.help className="w-6 h-6 " />
          <span>
            {
              dict?.help
            }
          </span>
        </h1>
      </div>
      <div className="flex flex-col items-center h-full gap-5 px-3 mt-10">
        <h3 className={cn("w-full text-sm md:max-w-lg text-muted-foreground ", {
          "text-right": langStore?.rtl
        })}>

          <span>
            {
              (dict?.helpHeaderMsg || "You can submit a issue on Github and/or submit your question/bug/issue below. You are on version 3.5.0 of") + ` ${APP_CONFIG.appName} `
            }
          </span>
        </h3>
        <div className="w-full md:max-w-lg">
          <HelpForm />
        </div>
        <div className={cn("w-full text-xs md:max-w-lg text-muted-foreground", {
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