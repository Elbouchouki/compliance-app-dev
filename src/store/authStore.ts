import { AuthenticatedUserMock } from '@/mock'
import { User } from '@/types'
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface UserStore {
  user: User | null
  login: (user: User) => void
  logout: () => void
}


const useAuthStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: AuthenticatedUserMock,
        login: (user: User) => set({ user }),
        logout: () => set({ user: null }),
      }),
      {
        name: 'auth',
      }
    )
  )
)

export default useAuthStore;