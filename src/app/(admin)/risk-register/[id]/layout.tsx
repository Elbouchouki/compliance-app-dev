
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Risk Data",
  description: "Resk Data"
}

export default function RiskMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}