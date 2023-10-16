import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertTriangleIcon } from "lucide-react";


const NoArabicAlert = ({
  title,
  description
}: {
  title?: string,
  description?: string
}) => {
  return (
    <Alert variant="destructive">
      <AlertTriangleIcon className="w-4 h-4" />
      <AlertTitle>
        {
          title || "Heads up!"
        }
      </AlertTitle>
      <AlertDescription>
        {
          description || "This page doesn't support arabic yet. It will be very soon."
        }
      </AlertDescription>
    </Alert>
  )
}
export default NoArabicAlert