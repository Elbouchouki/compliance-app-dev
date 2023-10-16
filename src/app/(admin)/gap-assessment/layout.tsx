
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Assessment Scope",
  description: "Assessment Scope"
}

export default function AssessmentScopeMetadataLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (<>{children}</>)
}