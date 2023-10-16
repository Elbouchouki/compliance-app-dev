import { type Metadata } from "next"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OAuthSignIn } from "@/components/auth/oauth-signin"
import { SignUpForm } from "@/components/forms/signup-form"
import { Shell } from "@/components/shells/shell"


export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for an account"
}

export default async function SignUpPage() {


  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SignUpForm />
        </CardContent>
        <CardFooter>
          <div className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              aria-label="Sign Up"
              href="/signin"
              className="text-primary underline-offset-4 transition-colors hover:underline"
            >
              Sign In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </Shell>
  )
}
