
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Risk Assessment",
  description: "Risk Assessment"
}

export default function RiskAssessmentMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}