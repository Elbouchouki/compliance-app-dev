"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { KnowledgeBase } from "@/types";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { ChevronLeft } from "lucide-react";

const KnowledgeCard = ({ data }: {
  data: KnowledgeBase
}) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <Link
      href={`/knowledge-base/${data.id}`}
      className=" bg-navbar border rounded-xl shadow group ">
      <Image
        src={data.image}
        alt={`Picture of ${data.title}`}
        width={500}
        height={150}
        className="rounded-t-lg object-center w-full h-40 group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
      />
      <div className="p-5">
        <h5 className="mb-2  lg:text-lg font-medium tracking-tight ">
          {data.title}
        </h5>
        <p className="mb-3 font-light text-sm text-muted-foreground">
          {data.description}
        </p>
      </div>
    </Link>

    // <Card className="group">
    //   <CardHeader className="p-0 m-0">
    //     <div
    //       className="relative w-full max-w-sm mx-auto overflow-hidden bg-white shadow-lg rounded-tr-xl rounded-tl-xl  h-40"
    //     >
    //       <Link className="absolute inset-0 items-center justify-center hidden w-full transition-all duration-300 bg-transparent bg-green-300 group-hover:flex group-hover:bg-black/40"
    //         href={`/knowledge-base/${data.id}`}
    //       >
    //         <Button size="sm">
    //           {
    //             dict?.open || "Open"
    //           }
    //         </Button>
    //       </Link>
    //       <Image
    //         src={data.image}
    //         alt={`Picture of ${data.title}`}
    //         width={500}
    //         height={150}
    //         className="object-fill w-full h-40"
    //       />
    //     </div>
    //   </CardHeader>
    //   <CardContent className="flex flex-col w-full gap-2 px-4 pb-5 pt-4 bg-navbar">
    //     <Link href={`/knowledge-base/${data.id}`} className={cn("font-bold group-hover:underline", {
    //       "text-right": langStore?.rtl
    //     })}>
    //       {data.title}
    //     </Link>
    //     <p className={cn("text-muted-foreground text-xs", {
    //       "text-right": langStore?.rtl
    //     })}>
    //       {data.description}
    //     </p>
    //   </CardContent>
    // </Card>
  );
};

export default KnowledgeCard;
