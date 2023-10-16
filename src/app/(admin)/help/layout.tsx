
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Help",
  description: "Help"
}

export default function HelpMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}