
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Labels",
  description: "Labels"
}

export default function LabelsMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}