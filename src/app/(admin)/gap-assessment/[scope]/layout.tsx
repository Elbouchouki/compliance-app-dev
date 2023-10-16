
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Assessment",
  description: "Assessment"
}

export default function AssessmentMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}