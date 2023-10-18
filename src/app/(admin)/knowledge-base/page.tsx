"use client"

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import KnowledgeCard from "../../../components/knowledge-base/knowledge-card";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { GET_KNOWLEDGE_BASE } from "@/mock";
import { cn } from "@/lib/utils";
import PageWrapper from "@/components/page-wrapper";
import TabNav from "@/components/tab-nav";
import { HelpNavItems } from "@/constants/navs.config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import KnowledgeSearch from "@/components/knowledge-base/knowledge-search";
import KnowledgeQuickLinks from "@/components/knowledge-base/knowledge-quick-links";



export default function KnowledgeBases() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const KNOWLEDGE_ITEMS = langStore?.rtl ? GET_KNOWLEDGE_BASE(langStore?.lang).reverse() : GET_KNOWLEDGE_BASE(langStore?.lang)

  return (
    <PageWrapper className="flex flex-col h-full max-w-full gap-4 grow">
      <TabNav navItems={HelpNavItems} />
      <div className="flex flex-col justify-center items-center py-3  gap-8">
        <h1 className="text-xl md:text-2xl font-semibold lg:text-3xl">
          We've got you covered!
        </h1>
        <div className="max-w-xl w-full flex flex-col gap-5">
          <KnowledgeSearch />
          <KnowledgeQuickLinks className="" />
        </div>
      </div>
      <div className="container p-4 mx-auto flex flex-col gap-6 py-10">
        <div className="grid grid-cols-1 gap-6  md:grid-cols-2 lg:grid-cols-4">
          {KNOWLEDGE_ITEMS.slice(0, 4).map((data, index) => {
            return <KnowledgeCard key={index} data={data} />;
          })}
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {KNOWLEDGE_ITEMS.slice(4).map((data, index) => {
            return <KnowledgeCard key={index} data={data} />;
          })}
        </div>
      </div>
      <Footer className="items-end mt-3 grow" />
    </PageWrapper>
  );
}
