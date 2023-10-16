// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { useStore } from "@/hooks/use-store";
// import useLangStore from "@/store/langagueStore";
// import useQuestionnaireStore from "@/store/questionnaireStore";
// import QuestionnaireForm from "./form";
// import { cn } from "@/lib/utils";

// export function ViewQuestionnaire() {
//   const langStore = useStore(useLangStore, (state) => state);
//   const dict = langStore?.getDictionary();

//   const questionnaireStore = useStore(useQuestionnaireStore, (state) => state);
//   const questionnaire = questionnaireStore?.questionnaire ?? {};

//   return (
//     <Dialog
//       open={questionnaireStore?.viewModalOpen}
//       onOpenChange={questionnaireStore?.setViewModalOpen}
//     >
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle
//             className={cn({
//               "text-right mr-3": langStore?.rtl,
//             })}
//           >
//             {dict?.viewQuestionnaire || "View Questionnaire"}
//           </DialogTitle>
//         </DialogHeader>
//         <QuestionnaireForm questionnaire={questionnaire} formType="view" onSubmit={() => { }} />
//       </DialogContent>
//     </Dialog>
//   );
// }
