
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Evidence",
  description: "Evidence"
}

export default function EvidenceMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}