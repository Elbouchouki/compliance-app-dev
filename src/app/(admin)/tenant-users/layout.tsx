
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
  return (
    <div
      className='bg-gradient-to-b to-navbar from-background'
      style={({
        "--tw-gradient-stops": 'var(--tw-gradient-from) 45%, currentcolor, var(--tw-gradient-to) 45%',
      } as any)}
    >
      {children}
    </div>
  )
}