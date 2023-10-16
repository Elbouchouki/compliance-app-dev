import { Construction } from "lucide-react"

const NotImplemented = () => {
  return (
    <div className="w-full h-full flex  justify-center items-center">
      <div className="w-full flex flex-col gap-2 max-w-lg items-center group">
        <Construction className="w-16 h-16 text-muted-foreground  transition-all group-hover:scale-110" />
        <h1 className="text-2xl font-semibold">
          This page is under construction !
        </h1>
        <h2 className="text-sm font-semibold text-muted-foreground text-center">
          Unfortunately this page is not implemented yet, please check back later or contact us if you need help
        </h2>
      </div>
    </div>
  )
}
export default NotImplemented