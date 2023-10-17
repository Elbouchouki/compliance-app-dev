"use client"

import { Icons } from '@/components/icons'
import Footer from '@/components/layout/footer'
import PageWrapper from '@/components/page-wrapper'
import { Button } from '@/components/ui/button'
import { useStore } from '@/hooks/use-store'
import { cn } from '@/lib/utils'
import useLangStore from '@/store/langagueStore'
import { Dictionnary } from '@/types'
import Link from 'next/link'

type QuickAccessItem = {
  title: string
  href: string
  icon: React.ElementType,
  key?: string
}

const quickActionsItems: QuickAccessItem[] = [
  {
    title: "Create Tenant",
    href: "/tenants",
    icon: Icons.tenants,
    key: "createTenant"
  }, {
    title: "Gap Assessment",
    href: "/gap-assessment",
    icon: Icons.gapAssessment,
    key: "gapAssessment"
  }, {
    title: "Register Risk",
    href: "/risk-register",
    icon: Icons.riskRegister,
    key: "registerRisk"
  },
  // {
  //   title: "View Controls",
  //   href: "/controls",
  //   icon: Icons.controls,
  //   key: "viewControls"
  // }, 
  {
    title: "View Policies",
    href: "/policies",
    icon: Icons.policies,
    key: "viewPolicies"
  }
]

const quickAccessItems: QuickAccessItem[] = [
  {
    title: "Tenants",
    icon: Icons.tenants,
    href: "/tenants",
    key: "tenants"
  },
  {
    title: "Gap Assessment",
    href: "/gap-assessment",
    icon: Icons.gapAssessment,
    key: "gapAssessment"
  },
  // {
  //   title: "Risk Assessment",
  //   href: "/risk-assessment",
  //   icon: Icons.riskAssessment,
  //   key: "riskAssessment"
  // },
  {
    title: "Risk Management KPI",
    href: "/risk-management-kpi",
    icon: Icons.riskManagementKPI,
    key: "riskManagementKPI"
  },
  {
    title: "Risk Register",
    href: "/risk-register",
    icon: Icons.riskRegister,
    key: "riskRegister"
  },
  // {
  //   title: "Reports",
  //   href: "/reports",
  //   icon: Icons.reports,
  //   key: "reports"
  // },
  // {
  //   title: "Controls",
  //   icon: Icons.controls,
  //   href: "/controls",
  //   key: "controls"
  // },
  {
    title: "Policies",
    icon: Icons.policies,
    href: "/policies",
    key: "policies"
  },
  // {
  //   title: "Questionnaires",
  //   icon: Icons.questionnaires,
  //   href: "/questionnaires",
  //   key: "questionnaires"
  // },
  {
    title: "Users",
    icon: Icons.tenantUsers,
    href: "/tenant-users",
    key: "users"
  }, {
    title: "Frameworks",
    icon: Icons.frameworks,
    href: "/frameworks",
    key: "frameworks"
  }, {
    title: "Help",
    icon: Icons.help,
    href: "/help",
    key: "help"
  }, {
    title: "knowledge Base",
    href: "/knowledge-base",
    icon: Icons.knowledgeBase,
    key: "knowledgeBase"
  },
]

export default function Home() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <PageWrapper className='flex flex-col w-full h-full gap-6' >
      <div className="flex flex-col w-full gap-2 py-2 border-b sm:flex-row ">
        <div className={cn("flex flex-row grow items-center ", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.home className={cn("inline-block w-5 h-5 mr-2", {
            "ml-2 mr-0": langStore?.rtl
          })} />
          <h1 className={cn("text-xl font-semibold grow", {
            "text-right": langStore?.rtl
          })}>
            {
              dict ? (dict && dict as Dictionnary)["home"] : "Home"
            }
          </h1>
        </div>
      </div>
      <h2 className={cn('text-xl font-semibold', {
        "text-right": langStore?.rtl
      })}>
        {
          dict?.recentActions || "Recent Actions"
        }
      </h2>
      <div className={cn('flex flex-row flex-wrap gap-3 mb-4', {
        "flex-row-reverse": langStore?.rtl
      })}>
        {
          quickActionsItems.map((item, index) => (

            <Link key={index} href={item.href}>
              <Button variant="outline" size="sm" className={cn("flex h-8 border-dashed", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <item.icon className={cn("w-4 h-4 mr-2", {
                  "ml-2 mr-0": langStore?.rtl
                })} />
                <span>
                  {
                    dict === undefined ? item.title : (dict[item.key as keyof Dictionnary] as string)
                  }
                </span>
              </Button>
            </Link>
          ))
        }
      </div>
      <div className='flex flex-col h-full gap-5'>
        <h2 className={cn('text-xl font-semibold', {
          "text-right": langStore?.rtl
        })}>
          {
            dict?.quickAccess || "Quick Access"
          }
        </h2>
        <div className="grid content-start grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grow">
          {
            quickAccessItems.map((item, index) => (
              <Link key={index} href={item.href} className="w-full">
                <Button variant="ghost" size="lg" className={cn("flex justify-start w-full h-16 px-3 md:px-8", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  <item.icon className={cn("flex-none w-6 h-6 mr-2", {
                    "ml-2 mr-0": langStore?.rtl
                  })} />
                  <span className="whitespace-nowrap">
                    {
                      dict === undefined ? item.title : (dict[item.key as keyof Dictionnary] as string)
                    }
                  </span>
                </Button>
              </Link>
            ))
          }
        </div>
        <Footer className='mt-3' />
      </div>
    </PageWrapper>
  )
}
