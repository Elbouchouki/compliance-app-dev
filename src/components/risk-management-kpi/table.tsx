'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Risk } from "@/types"
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { cn } from "@/lib/utils";

export default function OperationalRiskTable(data: { limitedRisks: Risk[] }) {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const { limitedRisks } = data;

  const scoreHandler = (risk: Risk) => {
    if (risk.impact * risk.likelihood < 6) {
      return <TableCell className="text-[black] text-center dark:text-[green] bg-[green] dark:bg-transparent w-[70px] font-medium">{ dict?.low || "Low"}</TableCell>;
    } else if (risk.impact * risk.likelihood >= 6 && risk.impact * risk.likelihood < 25) {
      return <TableCell className="text-[black] text-center dark:text-[yellow] bg-[yellow] dark:bg-transparent w-[70px] font-medium">{ dict?.medium || "Medium"}</TableCell>;
    } else {
      return <TableCell className="text-[black] text-center dark:text-[red] bg-[red] dark:bg-transparent w-[70px] font-medium">{ dict?.high || "High"}</TableCell>;
    }
  };

  const dir = langStore?.lang === "ar" ? "rtl" : "ltr";

  return (
    <Table className="overflow-y-auto w-full">
      <TableHeader className="w-full">
        <TableRow className={cn("flex flex-row justify-between w-full", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <TableHead>{ dict?.riskDescription || "Risk Description"}</TableHead>
          <TableHead>{ dict?.score || "Score"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          {limitedRisks?.map(risk => (
            <TableRow key={risk.id} className={cn("flex flex-row justify-between", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <TableCell dir={dir} className="font-medium truncate w-[160px]">{risk.riskName}</TableCell>
              {scoreHandler(risk as Risk)}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}