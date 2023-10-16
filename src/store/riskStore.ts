import { Risk } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface RiskStore {
  editModalRisk: Risk | undefined
  editModalOpen: boolean
  setEditModalRisk: (risk?: Risk) => void
  setEditModalOpen: (open: boolean) => void
}

export const riskStore = create<RiskStore>()(
  devtools(
    (set, get) => ({
      editModalRisk: undefined,
      setEditModalRisk: (risk?: Risk) => set(() => ({ editModalRisk: risk })),
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
    })
  )
)