import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

export interface SidebarStore {
  opened: boolean
  toggle: () => void
}


const useSidebarStore = create<SidebarStore>()(
  devtools(
    persist(
      (set) => ({
        opened: true,
        toggle: () => set((state) => ({ opened: !state.opened })),
      }),
      {
        name: 'sidebar',
      }
    )
  )
)

export default useSidebarStore;