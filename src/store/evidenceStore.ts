import { EVIDENCE_MOCK } from '@/mock'
import { Evidence } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface EvidenceStore {
  evidences: Evidence[]
  addEvidence: (evidence: Evidence) => void
  removeEvidence: (evidence: Evidence) => void
  updateEvidence: (evidence: Evidence) => void
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
  editModalEvidence?: Evidence
  setEditModalEvidence: (evidence?: Evidence) => void
}

const useEvidenceStore = create<EvidenceStore>()(
  devtools(
    (set) => ({
      evidences: EVIDENCE_MOCK,
      addEvidence: (evidence: Evidence) => set((state) => ({ evidences: [...state.evidences, evidence] })),
      removeEvidence: (evidence: Evidence) => set((state) => ({ evidences: state.evidences.filter(t => t.id !== evidence.id) })),
      updateEvidence: (evidence: Evidence) => set((state) => ({ evidences: state.evidences.map(t => t.id === evidence.id ? evidence : t) })),
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      editModalEvidence: undefined,
      setEditModalEvidence: (evidence?: Evidence) => set(() => ({ editModalEvidence: evidence })),
    }),
  )
)

export default useEvidenceStore;