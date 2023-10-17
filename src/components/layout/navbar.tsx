"use client"

import { ThemeToggle } from "@/components/ui/theme-toggle"
import Hamburger from "@/components/layout/hamburger"
import { Button } from "../ui/button"
import { AlignLeft, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import useSidebarStore from "@/store/sidebarStore"
import { useStore } from "@/hooks/use-store"
import { UserNav } from "@/components/layout/user-nav"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { SIDEBAR_ITEMS } from "@/constants/sidebar.config"
import React from "react"
import Link from "next/link"
import LangSwitch from "@/components/lang-switch"
import useLangStore from "@/store/langagueStore"
import { Icons } from "../icons"
import { Separator } from "../ui/separator"
import { Dictionnary } from "@/types"
import AppLogo from "../app-logo"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { usePathname } from "next/navigation"


const SearchButton = () => {
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  return <Dialog>
    <DialogTrigger asChild>
      <div>
        <Button
          size="icon"
          variant="outline"
          className="text-muted-foreground bg-navbar-gray dark:bg-[#2b2d2f] dark:hover:bg-muted-foreground/10"
        >
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </DialogTrigger>
    <DialogContent className="p-0">
      <div className={cn("flex items-center px-3 border-b", {
        "flex-row-reverse mr-5": langStore?.rtl
      })}>
        <Search className={cn("w-4 h-4 text-muted-foreground ", {
          "hidden": langStore?.rtl
        })} />
        <Input
          type="search"
          placeholder={dict?.typeACommandOrSearch || "Type a command or search..."}
          className={cn("w-full h-12 border-0 ring-0 focus-visible:ring-0 focus-visible:outline-none", {
            "text-right": langStore?.rtl
          })}
        />
      </div>
      <div className={cn("flex flex-col gap-2 px-3 my-3 overflow-y-scroll max-h-80", {
        "pr-5": langStore?.rtl
      })}>
        <span className={cn("py-1 text-xs font-semibold text-muted-foreground", {
          "text-right": langStore?.rtl
        })}>
          {dict?.quickLinks}
        </span>
        {
          SIDEBAR_ITEMS.slice(1).map((item, index) => {
            if (item.children && item.children.length > 0) {
              return (
                <div key={index} className="w-full text-lg font-bold">
                  <div className="flex flex-col w-full gap-2">
                    <span className={cn("my-1 ml-1", {
                      "text-right": langStore?.rtl
                    })}>
                      {
                        dict ? (dict[item.key as keyof Dictionnary] as string) : item.title
                      }
                    </span>
                    {
                      item.children.map((child, i) => {
                        const ChildIcon = child.icon as React.ElementType
                        return (
                          <DialogClose asChild key={i} >
                            <Link href={child.path as string}>
                              <Button size="lg" variant="ghost" className={cn("flex-none w-full p-0 px-2", {
                                "flex-row-reverse": langStore?.rtl
                              })}>
                                <ChildIcon className={cn("w-6 h-6 mr-2 text-muted-foreground", {
                                  "ml-2 mr-0": langStore?.rtl
                                })} />
                                <span className={cn("w-full text-left", {
                                  "text-right": langStore?.rtl
                                })}>
                                  {
                                    dict ? (dict[child.key as keyof Dictionnary] as string) : child.title
                                  }
                                </span>
                              </Button>
                            </Link>
                          </DialogClose>
                        )
                      })
                    }
                    <Separator />
                  </div>
                </div>
              )
            }
            const Icon = item.icon as React.ElementType
            return (
              <DialogClose asChild key={index} >
                <Link href={item.path as string}>
                  <Button size="lg" variant="ghost" className={cn("flex-none w-full p-0 px-2", {
                    "flex-row-reverse": langStore?.rtl
                  })}>
                    <Icon className={cn("w-6 h-6 mr-2 text-muted-foreground", {
                      "ml-2 mr-0": langStore?.rtl
                    })} />
                    <span className={cn("w-full text-left", {
                      "text-right": langStore?.rtl
                    })}>{item.title}</span>
                  </Button>
                </Link>
              </DialogClose>
            )
          })
        }
      </div>
    </DialogContent>
  </Dialog>
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"


const Navbar = () => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center justify-center w-full h-16 gap-4 px-4 xl:px-8 py-1 flex-none bg-navbar border-b-[3px] border-b-primary-foreground dark:border-b-primary", {
      "flex-row-reverse": langStore?.rtl
    })}>
      <div className={cn("flex items-center justify-start gap-2 grow", {
        "flex-row-reverse": langStore?.rtl
      })}>
        <div className="xl:hidden">
          <Hamburger />
        </div>
        <AppLogo />
      </div>
      <div className="w-full justify-center hidden xl:flex">
        <NavigationMenu>
          <NavigationMenuList className={cn({
            "flex-row-reverse": langStore?.rtl
          })}>
            {
              SIDEBAR_ITEMS.map((item, index) => {
                if (item.children && item.children.length > 0)
                  return (
                    <NavigationMenuItem key={index} >
                      <NavigationMenuTrigger className={cn("bg-navbar text-muted-foreground hover:text-primary-foreground  hover:bg-primary data-[state=open]:text-primary-foreground data-[state=open]:bg-primary  dark:hover:text-primary-foreground dark:hover:bg-muted-foreground/10 dark:data-[state=open]:text-primary-foreground dark:data-[state=open]:bg-muted-foreground/10 ", {
                        "text-primary-foreground bg-primary hover:text-primary-foreground/80 hover:bg-primary/80 dark:text-primary-foreground dark:bg-muted-foreground/10 dark:hover:text-primary-foreground/80 dark:hover:bg-muted-foreground/10": item.children.some(child => { return child.path === pathname })
                      }, {
                        "flex-row-reverse ml-0 mr-1": langStore?.rtl
                      })}>
                        {
                          dict ? (dict[item.key as keyof Dictionnary] as string) : item.title
                        }
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {
                          (item.children && item.children.length > 0) ? (
                            <ul className="grid gap-3 p-4 w-[400px]  md:w-[500px]  lg:w-[600px] md:grid-cols-2">
                              {
                                item.children.map((child, i) => (
                                  <ListItem href={child.path as string} title={
                                    dict ? (dict[child.key as keyof Dictionnary] as string) : item.title
                                  } key={i}
                                    className={cn({
                                      "text-right": langStore?.rtl
                                    })}
                                  >
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil velit laudantium quo ipsum numquam quod incidunt amet fuga est necessitatibus quidem sed, iste odio unde suscipit! Autem labore voluptatem laboriosam?
                                  </ListItem>
                                ))
                              }
                            </ul>
                          ) : null
                        }
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )

                return <Link href={item.path as string} legacyBehavior passHref key={index}>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-navbar text-muted-foreground hover:text-primary-foreground  hover:bg-primary data-[state=open]:text-primary-foreground data-[state=open]:bg-primary   dark:hover:text-primary-foreground dark:hover:bg-muted-foreground/10 dark:data-[state=open]:text-primary-foreground dark:data-[state=open]:bg-muted-foreground/10 ", {
                    "text-primary-foreground bg-primary hover:text-primary-foreground/80 hover:bg-primary/80 dark:text-primary-foreground dark:bg-muted-foreground/10 dark:hover:text-primary-foreground/80 dark:hover:bg-muted-foreground/10": item.path === pathname
                  })}>
                    {
                      dict ? (dict[item.key as keyof Dictionnary] as string) : item.title
                    }
                  </NavigationMenuLink>
                </Link>


              })
            }
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className={cn("flex flex-row items-center gap-4", {
        "flex-row-reverse": langStore?.rtl
      })}>
        <div className="hidden sm:flex">
          <SearchButton />
        </div>
        <ThemeToggle />
        <LangSwitch />
        <UserNav />
      </div>
    </nav >
  )
}
export default Navbar