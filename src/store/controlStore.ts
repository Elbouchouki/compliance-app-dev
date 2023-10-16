import { CONTROLE_MOCK } from '@/mock'
import { Control } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface ControlStore {
  controls: Control[]
  addControl: (control: Control) => void
  removeControl: (control: Control) => void
  updateControl: (control: Control) => void
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
  editModalControl?: Control
  setEditModalControl: (control?: Control) => void
  getControls: (ids: string[]) => Control[]
}

const useControlStore = create<ControlStore>()(
  devtools(
    (set) => ({
      controls: CONTROLE_MOCK,
      addControl: (control: Control) => set((state) => ({ controls: [...state.controls, control] })),
      removeControl: (control: Control) => set((state) => ({ controls: state.controls.filter(t => t.id !== control.id) })),
      updateControl: (control: Control) => set((state) => ({ controls: state.controls.map(t => t.id === control.id ? control : t) })),
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      editModalControl: undefined,
      setEditModalControl: (control?: Control) => set(() => ({ editModalControl: control })),
      getControls: (ids: string[]) => {
        return ids.map(id => {
          const res = CONTROLE_MOCK.filter(f => f.id === id)
          return res.length > 0 ? res[0] : undefined
        }).filter(f => f !== undefined) as Control[]
      }
    }),
  )
)

export default useControlStore;