
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Knowledge Base",
  description: "Knowledge Base"
}

export default function KnowledgeBaseMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}