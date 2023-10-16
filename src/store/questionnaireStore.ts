import { QUESTIONNAIRES_MOCK } from "@/mock";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface QuestionnaireStore {
  questionnaires: any;
  addModalOpen: boolean;
  setAddModalOpen: (open: boolean) => void;
  editModalOpen: boolean;
  setEditModalOpen: (open: boolean) => void;
  viewModalOpen: boolean;
  setViewModalOpen: (open: boolean) => void;
  addQuestionnaire: (questionnaire: any) => void;
  removeQuestionnaire: (questionnaire: any) => void;
  updateQuestionnaire: (questionnaire: any) => void;
  questionnaire?: any;
  setQuestionnaire: (questionnaire?: any) => void;
}

const useQuestionnaireStore = create<QuestionnaireStore>()(
  devtools((set) => ({
    questionnaires: QUESTIONNAIRES_MOCK,
    addModalOpen: false,
    setAddModalOpen: (open: boolean) => set(() => ({ addModalOpen: open })),
    editModalOpen: false,
    setEditModalOpen: (open: boolean) => set(() => ({ editModalOpen: open })),
    viewModalOpen: false,
    setViewModalOpen: (open: boolean) => set(() => ({ viewModalOpen: open })),
    addQuestionnaire: (questionnaire: any) =>
      set((state) => ({
        questionnaires: [...state.questionnaires, questionnaire],
      })),
    removeQuestionnaire: (questionnaire: any) =>
      set((state) => ({
        questionnaires: state.questionnaires.filter(
          (t: any) => t.id !== questionnaire.id
        ),
      })),
    updateQuestionnaire: (questionnaire: any) =>
      set((state) => ({
        questionnaires: state.questionnaires.map((t: any) =>
          t.id === questionnaire.id ? questionnaire : t
        ),
      })),
    questionnaire: undefined,
    setQuestionnaire: (questionnaireData: object) =>
      set(() => ({ questionnaire: questionnaireData })),
  }))
);

export default useQuestionnaireStore;
