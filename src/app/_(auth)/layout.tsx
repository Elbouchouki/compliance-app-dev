import AppLogo from "@/components/app-logo"
import { APP_CONFIG } from "@/constants/app.config"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  return (
    <div className="flex flex-col w-screen h-screen ">
      <div className="flex m-5">
        <AppLogo />
      </div>
      <div className="container flex justify-center grow">
        {children}
      </div>
      <div className="flex justify-center m-5">
        {APP_CONFIG.appName} © {new Date().getFullYear()}
      </div>
    </div>
  )
}