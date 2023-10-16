
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Tags",
  description: "Tags"
}

export default function TagsMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}