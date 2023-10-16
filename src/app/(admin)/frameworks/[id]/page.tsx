"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/hooks/use-store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/components/layout/footer"
import BackButton from "@/components/back-button";
import { cn } from "@/lib/utils";
import useLangStore from "@/store/langagueStore";
import NoArabicAlert from "@/components/no-arabic-alert";
import PageWrapper from "@/components/page-wrapper";
import { trpc } from "@/app/_trpc/client";

export default function FrameworksDetails() {

  const params = useParams()
  const router = useRouter()

  const framework = trpc.framwork.get.useQuery({
    id: params.id as string
  })

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  useEffect(() => {
    if (!framework.isLoading && !framework.data) {
      router.push(`/frameworks`)
    }
  }, [framework.data, framework.isLoading, router])


  if (framework.isLoading || framework === null) {
    return <Skeleton className='w-screen h-screen' />
  } else {
    return (
      <PageWrapper className='flex flex-col w-full h-full gap-4 px-2 ' >
        <div className={cn("flex flex-row w-full gap-4 py-2 border-b ", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <BackButton />
          <h1 className={cn("font-semibold text-xm sm:text-lg md:text-xl grow flex flex-row items-center gap-2", {
            "text-right flex-row-reverse": langStore?.rtl
          })}>
            <span>
              {
                dict?.framework || "Framewrok"
              }
            </span>
            <span>{" - "}</span>
            <span>
              {framework?.data?.name}
            </span>
          </h1>
        </div>
        {
          langStore?.lang === "ar" ? <NoArabicAlert /> : null
        }
        <div className='flex flex-col w-full h-full gap-4 mt-5'>
          <h2 className="font-semibold text-md ">About {framework?.data?.name}</h2>
          <p className="text-sm text-justify text-muted-foreground indent-8 ">
            {framework?.data?.description}
          </p>
          <h2 className="font-semibold text-md ">Additional Informations</h2>
          <p className="flex flex-col gap-4 text-sm text-justify text-muted-foreground" dangerouslySetInnerHTML={{ __html: framework?.data?.additional_information || "" }} >
          </p>
          <Footer className='flex items-end mt-3 grow' />
        </div>
      </PageWrapper>
    )
  }

}