"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { KnowledgeBase } from "@/types";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";

const KnowledgeCard = ({ data }: {
  data: KnowledgeBase
}) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (

    <Card className="group">
      <CardHeader className="p-0 m-0">
        <div
          className="relative w-full max-w-sm mx-auto overflow-hidden bg-white shadow-lg rounded-tr-xl rounded-tl-xl"
        >
          <Link className="absolute inset-0 items-center justify-center hidden w-full transition-all duration-300 bg-transparent bg-green-300 group-hover:flex group-hover:bg-black/40"
            href={`/knowledge-base/${data.id}`}
          >
            <Button size="sm">
              {
                dict?.open || "Open"
              }
            </Button>
          </Link>
          <Image
            src={data.image}
            alt={`Picture of ${data.title}`}
            width={500}
            height={100}
            className="object-cover w-full"
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col w-full gap-2 px-4 pb-5 pt-">
        <Link href={`/knowledge-base/${data.id}`} className={cn("font-bold group-hover:underline", {
          "text-right": langStore?.rtl
        })}>
          {data.title}
        </Link>
        <p className={cn("text-muted-foreground text-xs", {
          "text-right": langStore?.rtl
        })}>
          {data.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default KnowledgeCard;
