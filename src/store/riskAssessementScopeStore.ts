import { Risk, RiskAssessmentScope } from '@/types'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface RiskAssessmentScopeStore {
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
  editModalRiskAssessmentScope?: RiskAssessmentScope
  setEditModalRiskAssessmentScope: (riskRiskAssessmentScope?: RiskAssessmentScope) => void,
}

const useRiskAssessmentScopeStore = create<RiskAssessmentScopeStore>()(
  devtools(
    (set, get) => ({editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      editModalRiskAssessmentScope: undefined,
      setEditModalRiskAssessmentScope: (riskRiskAssessmentScope?: RiskAssessmentScope) => set(() => ({ editModalRiskAssessmentScope: riskRiskAssessmentScope })),
    }),
  )
)

export default useRiskAssessmentScopeStore;