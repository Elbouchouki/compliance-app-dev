
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"
import { GET_COMPLIANCE_AUDIT_FINDING, GET_SEVERITY_LEVEL } from "@/mock"
import useLangStore from "@/store/langagueStore"

type LevelsColors = {
  critical: string,
  high: string,
  meduim: string,
  low: string,
}

const AuditFinding = ({ className }: { className?: string }) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  const levels = GET_SEVERITY_LEVEL(langStore?.lang)


  const colors: LevelsColors = {
    critical: "text-red-500",
    high: "text-orange-500",
    meduim: "text-yellow-500",
    low: "text-green-500"
  }

  const headers = [
    "Audit",
    "Severity Level"
  ]
  return (
    <div className={cn("w-full h-full flex flex-row justify-center items-center", className)}>
      <Table>
        <TableHeader>
          <TableRow >
            {
              langStore?.rtl ?
                headers.reverse().map((header, index) => (<TableHead className="text-right" key={index}>{header}</TableHead>))
                :
                headers.map((header, index) => (<TableHead key={index}>{header}</TableHead>))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            GET_COMPLIANCE_AUDIT_FINDING(langStore?.lang).map((audit, index) => {
              const lvl = levels[Math.floor(Math.random() * levels.length)]


              if (langStore?.rtl) {
                return (
                  <TableRow key={index} >
                    <TableCell
                      className={
                        cn("text-right", colors[
                          lvl?.value as keyof LevelsColors
                        ])
                      }
                    >
                      {
                        lvl?.label
                      }
                    </TableCell>
                    <TableCell className="font-medium text-right" >
                      {audit}
                    </TableCell>
                  </TableRow>
                )
              }

              return (
                <TableRow key={index} >
                  <TableCell className="font-medium">
                    {audit}
                  </TableCell>
                  <TableCell
                    className={
                      cn(colors[
                        lvl?.value as keyof LevelsColors
                      ])
                    }
                  >
                    {
                      lvl?.label
                    }
                  </TableCell>
                </TableRow>
              )
            }
            )
          }
        </TableBody>
      </Table>
    </div>
  )
}
export default AuditFinding