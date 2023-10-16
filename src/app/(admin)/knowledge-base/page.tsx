"use client"

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import KnowledgeCard from "../../../components/knowledge-base/knowledge-card";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { GET_KNOWLEDGE_BASE } from "@/mock";
import { cn } from "@/lib/utils";
import PageWrapper from "@/components/page-wrapper";



export default function KnowledgeBases() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const KNOWLEDGE_ITEMS = langStore?.rtl ? GET_KNOWLEDGE_BASE(langStore?.lang).reverse() : GET_KNOWLEDGE_BASE(langStore?.lang)

  return (
    <PageWrapper className="flex flex-col h-full max-w-full gap-4 grow">
      <div className="flex flex-col w-full gap-2 py-2 border-b sm:flex-row ">
        <div className="flex flex-col grow">
          <h1 className={
            cn("text-xl font-semibold grow flex flex-row items-center gap-2", {
              "flex-row-reverse": langStore?.rtl
            })
          }>
            <Icons.knowledgeBase className="w-5 h-5" />
            <span>
              {
                dict?.knowledgeBase || "Knowledge Base"
              }
            </span>
          </h1>
        </div>
      </div>
      <div className="container p-4 mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {KNOWLEDGE_ITEMS.map((data, index) => {
            return <KnowledgeCard key={index} data={data} />;
          })}
        </div>
      </div>
      <Footer className="items-end mt-3 grow" />
    </PageWrapper>
  );
}
