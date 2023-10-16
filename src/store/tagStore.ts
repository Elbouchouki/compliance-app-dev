import { TAG_MOCK } from '@/mock'
import { Tag } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface TagStore {
  tags: Tag[]
  addTag: (tag: Tag) => void
  removeTag: (tag: Tag) => void
  updateTag: (tag: Tag) => void
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
  editModalTag?: Tag
  setEditModalTag: (tag?: Tag) => void
}

const useTagStore = create<TagStore>()(
  devtools(
    (set) => ({
      tags: TAG_MOCK,
      addTag: (tag: Tag) => set((state) => ({ tags: [...state.tags, tag] })),
      removeTag: (tag: Tag) => set((state) => ({ tags: state.tags.filter(t => t.id !== tag.id) })),
      updateTag: (tag: Tag) => set((state) => ({ tags: state.tags.map(t => t.id === tag.id ? tag : t) })),
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      editModalTag: undefined,
      setEditModalTag: (tag?: Tag) => set(() => ({ editModalTag: tag })),
    }),
  )
)

export default useTagStore;