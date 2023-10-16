import { User } from '@clerk/nextjs/server'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UserStore {
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
  editModalUser?: User
  setEditModalUser: (user?: User) => void
}

const useUserStore = create<UserStore>()(
  devtools(
    (set) => ({
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      editModalUser: undefined,
      setEditModalUser: (user?: User) => set(() => ({ editModalUser: user })),
    }),
  )
)

export default useUserStore;