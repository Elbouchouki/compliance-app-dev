import { POLICIES_MOCK } from '@/mock'
import { Policy } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface PolicyStore {
  policies: Policy[]
  addPolicy: (policy: Policy) => void
  removePolicy: (policy: Policy) => void
  updatePolicy: (policy: Policy) => void
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
  editModalPolicy?: Policy
  setEditModalPolicy: (policy?: Policy) => void
}

const usePolicyStore = create<PolicyStore>()(
  devtools(
    (set) => ({
      policies: POLICIES_MOCK,
      addPolicy: (policy: Policy) => set((state) => ({ policies: [...state.policies, policy] })),
      removePolicy: (policy: Policy) => set((state) => ({ policies: state.policies.filter(t => t.id !== policy.id) })),
      updatePolicy: (policy: Policy) => set((state) => ({ policies: state.policies.map(t => t.id === policy.id ? policy : t) })),
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      editModalPolicy: undefined,
      setEditModalPolicy: (policy?: Policy) => set(() => ({ editModalPolicy: policy })),
    }),
  )
)

export default usePolicyStore;