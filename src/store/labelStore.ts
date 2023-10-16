import { LABELS_MOCK } from '@/mock'
import { Label } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface LabelStore {
  labels: Label[]
  addLabel: (label: Label) => void
  removeLabel: (label: Label) => void
  updateLabel: (label: Label) => void
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
  editModalLabel?: Label
  setEditModalLabel: (label?: Label) => void
}

const useLabelStore = create<LabelStore>()(
  devtools(
    (set) => ({
      labels: LABELS_MOCK,
      addLabel: (label: Label) => set((state) => ({ labels: [...state.labels, label] })),
      removeLabel: (label: Label) => set((state) => ({ labels: state.labels.filter(t => t.id !== label.id) })),
      updateLabel: (label: Label) => set((state) => ({ labels: state.labels.map(t => t.id === label.id ? label : t) })),
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      editModalLabel: undefined,
      setEditModalLabel: (label?: Label) => set(() => ({ editModalLabel: label })),
    }),
  )
)

export default useLabelStore;