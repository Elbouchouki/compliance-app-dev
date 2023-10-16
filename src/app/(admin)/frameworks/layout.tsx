
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Framworks",
  description: "Framworks"
}

export default function FramworksMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}