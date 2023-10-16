"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useStore } from "zustand"
import useTenantStore from "@/store/tenantStore"

const TenantSelect = ({
  displayLabel
}: {
  displayLabel?: boolean
}) => {

  const tenantStore = useStore(useTenantStore, state => state)

  return (
    <div className="grid w-full items-center gap-1.5">
      {displayLabel === true ? <Label htmlFor="email">Tenant</Label> : null}
      <Select
        disabled={tenantStore.tenants.length === 0}
        value={tenantStore?.selectedTenant?.id}
        onValueChange={tenantStore?.handleTenantSelect}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              tenantStore.tenants.length === 0 ? 'No tenants available' : 'Select a tenant'
            } />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {
              tenantStore.tenants.map((tenant, index) => (
                <SelectItem key={index} value={tenant.id}>{tenant.name}</SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
export default TenantSelect