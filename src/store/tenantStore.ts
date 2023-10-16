import { TENANTS_MOCK } from '@/mock'
import { Tenant } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface TenantStore {
  tenants: Tenant[]
  selectedTenant?: Tenant
  addTenant: (tenant: Tenant) => void
  removeTenant: (tenant: Tenant) => void
  updateTenant: (tenant: Tenant) => void
  handleTenantSelect: (id: string) => void
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
  editModalTenant?: Tenant
  setEditModalTenant: (tenant?: Tenant) => void
}

const useTenantStore = create<TenantStore>()(
  devtools(
    (set) => ({
      tenants: TENANTS_MOCK,
      selectedTenant: undefined,
      addTenant: (tenant: Tenant) => set((state) => ({ tenants: [...state.tenants, tenant] })),
      removeTenant: (tenant: Tenant) => set((state) => ({ tenants: state.tenants.filter(t => t.id !== tenant.id) })),
      updateTenant: (tenant: Tenant) => set((state) => ({ tenants: state.tenants.map(t => t.id === tenant.id ? tenant : t) })),
      handleTenantSelect: (id: string) => set((state) => ({ selectedTenant: state.tenants.find(t => t.id === id) })),
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      editModalTenant: undefined,
      setEditModalTenant: (tenant?: Tenant) => set(() => ({ editModalTenant: tenant })),
    }),
  )
)

export default useTenantStore;