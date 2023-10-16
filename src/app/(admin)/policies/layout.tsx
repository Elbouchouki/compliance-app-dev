
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Tenants",
  description: "Tenants"
}

export default function MetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{ children }</>)
}