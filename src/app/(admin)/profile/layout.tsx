
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile"
}

export default function ProfileMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}