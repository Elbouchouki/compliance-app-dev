import { AssessmentScope } from '@prisma/client'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AssessmentScopeStore {
  editModalOpen: boolean
  setEditModalOpen: (open: boolean) => void
  editModalAssessmentScope?: AssessmentScope
  setEditModalAssessmentScope: (assessmentScope?: AssessmentScope) => void
}

const useAssessmentScopeStore = create<AssessmentScopeStore>()(
  devtools(
    (set, get) => ({
      editModalOpen: false,
      setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
      editModalAssessmentScope: undefined,
      setEditModalAssessmentScope: (assessmentScope?: AssessmentScope) => set(() => ({ editModalAssessmentScope: assessmentScope })),
      // getAssessmentByScope: (scope: string) => get().assessmentScopes.find(t => t.id === scope),
      // getControlsByScope: (scope: string) => {
      //   const assessment = get().getAssessmentByScope(scope)
      //   return assessment?.controls || []
      // },
      // getControlByScopeAndId: (scope: string, id: string) => {
      //   const controls = get().getControlsByScope(scope)
      //   const res = controls.filter(control => control.id === id)
      //   return res.length >= 0 ? res[0] : undefined
      // },
      // updateControlByScopeAndId: (scope: string, id: string, control: Control) => {
      //   const objectives = control.Assessments?.map(a => a.choices) || []
      //   const NotAnswered = objectives.filter(o => o === undefined).length || 0
      //   if (objectives && NotAnswered === 0) {
      //     const objectivesTotal = control.Assessments?.length || 0
      //     let maturityLevel: MaturityLevel | undefined = undefined
      //     const notMet = objectives.filter(o => o === "Not Met").length || 0
      //     const met = objectives.filter(o => o === "Met").length || 0
      //     const notApplicable = objectives.filter(o => o === "Not Applicable").length || 0
      //     const compensatingControl = objectives.filter(o => o === "Compensating Control").length || 0

      //     let flag = true
      //     let L = 1;
      //     if (flag && notMet !== 0) {
      //       maturityLevel = MATURITY_LEVELS_MOCK[L + 0]
      //       flag = false
      //     }
      //     if (notApplicable > 0 && notApplicable < objectivesTotal) {
      //       maturityLevel = MATURITY_LEVELS_MOCK[L + 2]
      //       flag = false
      //     }
      //     if (flag && notApplicable === objectivesTotal) {
      //       maturityLevel = MATURITY_LEVELS_MOCK[L + 1]
      //       flag = false
      //     }
      //     if (flag && met === objectivesTotal) {
      //       maturityLevel = MATURITY_LEVELS_MOCK[L + 3]
      //       flag = false
      //     }
      //     if (flag && compensatingControl > 0 && compensatingControl < objectivesTotal && notMet === 0 && notApplicable === 0) {
      //       maturityLevel = MATURITY_LEVELS_MOCK[L + 4]
      //       flag = false
      //     }
      //     if (flag && compensatingControl === objectivesTotal) {
      //       maturityLevel = MATURITY_LEVELS_MOCK[L + 5]
      //       flag = false
      //     }
      //     control.maturity = maturityLevel
      //   }
      //   const assessmentScope = get().getAssessmentByScope(scope)
      //   if (!assessmentScope) return
      //   const controls = assessmentScope.controls || []
      //   const newControls = controls.map(c => c.id === id ? control : c)
      //   assessmentScope.controls = newControls
      //   const newAssessmentScope: AssessmentScope[] = get().assessmentScopes.map(a => a.id === scope ? assessmentScope : a)
      //   set(() => ({ assessmentScopes: newAssessmentScope }))
      // }
    }),
  )
)

export default useAssessmentScopeStore;