
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Compliance",
  description: "Compliance"
}

export default function ComplianceMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}