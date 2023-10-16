
import type { Metadata } from 'next'
import { Fragment } from 'react'

export const metadata: Metadata = {
  title: "Tenants",
  description: "Tenants"
}

export default function TenantsMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}