
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Controls",
  description: "Controls"
}

export default function ControlsMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}