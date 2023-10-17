
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { ROLES } from "@/mock"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"
import { User } from "@clerk/nextjs/server"
import { trpc } from "@/app/_trpc/client"
import { useUser } from "@clerk/nextjs"
import { Icons } from "../icons"
import { toast } from "sonner"


type UserFormProps = {
  onSubmit: () => void
  close: () => void
  formType: "add" | "edit"
  user?: User
}

const UserForm = ({ onSubmit, formType, user, close }: UserFormProps) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const currentUser = useUser()
  const tenants = trpc.tenant.getAll.useQuery({
    userId: currentUser.user?.id
  })
  const addMutation = trpc.user.add.useMutation()
  const checkBeforeAdd = trpc.user.checkBeforeAdd.useMutation()
  const mutation = trpc.user.update.useMutation()

  const utils = trpc.useContext();
  const FormSchema = z.object({
    tenant: z.string().optional(),
    firstName: z.string().min(4, {
      message: dict?.FromSchemaValidation.firstName || "First Name must be at least 4 characters.",
    }),
    lastName: z.string().min(4, {
      message: dict?.FromSchemaValidation.lastName || "Last Name must be at least 4 characters.",
    }),
    email: z.string().email({
      message: dict?.FromSchemaValidation.invalidEmailAddress || "Invalid email address.",
    }),
    role: z.string().optional(),
    active: z.boolean().optional(),
    id: z.string().optional()
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: user?.emailAddresses[0].emailAddress,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      tenant: user?.publicMetadata.tenant as string,
      active: user?.publicMetadata.active as boolean,
      role: user?.publicMetadata.role as string,
      id: user?.id
    }
  })
  const users = trpc.user.getAll.useQuery(undefined, {
    enabled: false
  })


  const onSubmitForm = async (data: z.infer<typeof FormSchema>) => {

    checkBeforeAdd.mutate

    if (formType === "add") {
      checkBeforeAdd.mutate({ email: data.email }, {
        onSuccess: (d) => {
          if (d === 0) {
            addMutation.mutate(
              {
                firstName: data.firstName || "",
                lastName: data.lastName || "",
                email: data.email,
                tenant: data.tenant,
                role: data.role,
                active: data.active,
              },
              {
                onSuccess: () => {
                  utils.user.getAll.invalidate()
                  utils.user.getAll.refetch().then(() => {
                    onSubmit()
                  })
                }
              }
            )
          } else {
            close()
            toast.error(
              dict?.userAlreadyExist || "User already exist"
            )
          }
        }
      });
      return
    }

    mutation.mutate(
      {
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email,
        tenant: data.tenant,
        role: data.role,
        active: data.active,
        id: data.id
      },
      {
        onSuccess: () => {
          utils.user.getAll.refetch().then(() => {
            onSubmit()
          })
        }
      }
    )
  }



  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className="w-full h-full flex flex-col gap-3" >
        <div className="flex flex-row gap-3">
          <div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem
                  className="w-full flex flex-col"
                >
                  <FormLabel className={cn("flex flex-row items-center gap-2", {
                    "flex-row-reverse": langStore?.rtl
                  })}>
                    {
                      dict?.firstName || "First Name"
                    }
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "text-right": langStore?.rtl
                      })} placeholder="e.g elbouchouki" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormItem
                  className="w-full flex flex-col"
                >
                  <FormLabel className={cn("flex flex-row items-center gap-2", {
                    "flex-row-reverse": langStore?.rtl
                  })}>
                    {
                      dict?.lastName || "Last Name"
                    }
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "text-right": langStore?.rtl
                      })} placeholder="e.g ahmed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {formType === "add" && <div >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem
                className="w-full flex flex-col"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.email || "Email"
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl
                    })} placeholder="e.g ahmed@mail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>}

        <div>
          <FormField
            control={form.control}
            name="tenant"
            disabled={tenants.isLoading || tenants?.data?.length === 0}
            render={({ field }) => (
              <FormItem
                className="w-full flex flex-col"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.tenant || "Tenant"
                  }
                </FormLabel>
                <FormControl>
                  <Select
                    disabled={!tenants || tenants?.data?.length === 0}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className={cn("w-full", {
                      "flex-row-reverse": langStore?.rtl
                    })}>
                      <SelectValue
                        placeholder={
                          !tenants || tenants?.data?.length === 0 ?
                            dict?.noTenantsAvailable || 'No tenants available'
                            : dict?.selectTenant || 'Select a tenant'
                        } />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          tenants.data?.map((tenant, index) => (
                            <SelectItem
                              className={cn({
                                "justify-end": langStore?.rtl
                              })}
                              key={index} value={tenant.id}>
                              {tenant.name}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem
                className="w-full flex flex-col"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.role || "Role"
                  }
                  <Badge variant="outline" className="ml-2 text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className={cn("w-full", {
                      "flex-row-reverse": langStore?.rtl
                    })}>
                      <SelectValue placeholder={
                        dict?.selectRole || "Select a role"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        ROLES.map((role, index) => (
                          <SelectItem
                            className={cn({
                              "justify-end": langStore?.rtl
                            })} key={index} value={role.value}>{role?.label}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {formType === "edit" && <div >
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className={cn("flex flex-row items-start space-y-0 rounded-md pt-2 pb-4 gap-2 ", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="gap-1 leading-none">
                  <FormLabel className={cn("flex flex-row items-center gap-2", {
                    "flex-row-reverse": langStore?.rtl
                  })}>
                    {
                      dict?.enabled || "Enabled"
                    }
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>}
        <div className={cn("mt-auto grow flex gap-2 items-end", {
          "flex-row-reverse ": langStore?.rtl
        })}>
          <Button type="submit"
            disabled={mutation.isLoading || addMutation.isLoading || checkBeforeAdd.isLoading || users.isRefetching || users.isLoading || users.isFetching}
            onClick={() => { console.log(form.getValues()) }}
            className="flex flex-row gap-2 "
          >
            <Icons.loader className={cn("animate-spin w-4 h-4", {
              hidden: !mutation.isLoading && !addMutation.isLoading && !checkBeforeAdd.isLoading && !users.isLoading && !users.isRefetching && !users.isFetching
            })} />
            <span>
              {
                formType === "add" ?
                  dict?.addTenant || "Add Tenant"
                  : dict?.updateTenant || "Update Tenant"
              }
            </span>
          </Button>
          <Button
            disabled={mutation.isLoading || addMutation.isLoading || checkBeforeAdd.isLoading || users.isRefetching || users.isLoading || users.isFetching}
            type="reset" variant="ghost" onClick={() => close()} className="flex flex-row gap-2 hover:bg-destructive">
            <span>
              {
                dict?.cancel || "Cancel"
              }
            </span>
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default UserForm