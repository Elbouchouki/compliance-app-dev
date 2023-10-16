
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Risk Management",
  description: "Risk Management"
}

export default function RiskManagementMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}