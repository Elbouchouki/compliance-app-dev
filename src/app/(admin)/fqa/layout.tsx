
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "Frequently asked questions"
}

export default function FQAMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}