
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Risk Register",
  description: "Risk Register"
}

export default function RiskRegisterMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}