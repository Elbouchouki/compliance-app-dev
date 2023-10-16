import { FRAMWORK_MOCK } from '@/mock'
import { Control, Framework } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface FrameworkStore {
  frameworks: Framework[]
  addFramework: (framework: Framework) => void
  removeFramework: (framework: Framework) => void
  updateFramework: (framework: Framework) => void
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
  editModalFramework?: Framework
  setEditModalFramework: (framework?: Framework) => void
  getFrameworksById(ids: string[]): Framework[]
  getFrameworksControls(ids: string[]): Control[]
}

const useFrameworkStore = create<FrameworkStore>()(
  devtools(
    (set, get) => ({
      frameworks: FRAMWORK_MOCK,
      addFramework: (framework: Framework) => set((state) => ({ frameworks: [...state.frameworks, framework] })),
      removeFramework: (framework: Framework) => set((state) => ({ frameworks: state.frameworks.filter(t => t.id !== framework.id) })),
      updateFramework: (framework: Framework) => set((state) => ({ frameworks: state.frameworks.map(t => t.id === framework.id ? framework : t) })),
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      editModalFramework: undefined,
      setEditModalFramework: (framework?: Framework) => set(() => ({ editModalFramework: framework })),
      getFrameworksById: (ids: string[]) => {
        return ids.map(id => {
          const res = FRAMWORK_MOCK.filter(f => f.id === id)
          return res.length > 0 ? res[0] : undefined
        }).filter(f => f !== undefined) as Framework[]
      },
      getFrameworksControls: (ids: string[]) => {
        const frameworks = get().getFrameworksById(ids) as Framework[]
        if (!frameworks) return []
        return frameworks.map(f => f.controls).flat() as Control[]
      }
    }),
  )
)

export default useFrameworkStore;