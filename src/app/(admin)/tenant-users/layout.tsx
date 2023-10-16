
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Tenant Users",
  description: "Tenant Users"
}

export default function TenantUsersMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}