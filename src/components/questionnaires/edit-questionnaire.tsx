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
// import { toast } from "sonner";
// import { DialogDescription } from "@radix-ui/react-dialog";
// import { cn } from "@/lib/utils";

// export function EditQuestionnaire() {
//   const langStore = useStore(useLangStore, (state) => state);
//   const dict = langStore?.getDictionary();
//   const FormSchema = z.object({
//     name: z.string().min(4, {
//       message:
//         dict?.FromSchemaValidation.name ||
//         "Name must be at least 4 characters.",
//     }),
//     description: z.string().min(1, {
//       message:
//         dict?.FromSchemaValidation.thisFieldCantBeEmpty ||
//         "This field can't be empty.",
//     }),
//     vendor: z.string().min(1, {
//       message:
//         dict?.FromSchemaValidation.thisFieldCantBeEmpty ||
//         "This field can't be empty.",
//     }),
//     questions: z.array(
//       z.object({
//         value: z.string().min(1, {
//           message:
//             dict?.FromSchemaValidation.thisFieldCantBeEmpty ||
//             "This field can't be empty.",
//         }),
//       })
//     ),
//     created_at: z.optional(z.date()),
//     updated_at: z.optional(z.date()),
//     id: z.string(),
//   });
//   const questionnaireStore = useStore(useQuestionnaireStore, (state) => state);
//   const questionnaire = questionnaireStore?.questionnaire;

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       name: questionnaire?.name,
//       description: questionnaire?.description,
//       vendor: questionnaire?.vendor,
//       questions: questionnaire?.questions,
//       created_at: questionnaire?.created_at,
//       updated_at: questionnaire?.updated_at,
//       id: questionnaire?.id,
//     },
//   });

//   function onSubmit(data: any) {
//     questionnaireStore?.updateQuestionnaire({
//       name: data?.name,
//       description: data?.description,
//       vendor: data?.vendor,
//       questions: data?.questions,
//       created_at: data?.created_at,
//       updated_at: data?.updated_at,
//       id: data?.id,
//     });
//     toast.success(
//       dict?.questionnaireUpdateSuccessfully ||
//         "Questionnaire updated successfully"
//     );
//     form.reset();
//     questionnaireStore?.setEditModalOpen(false);
//   }

//   return (
//     <Dialog
//       open={questionnaireStore?.editModalOpen}
//       onOpenChange={questionnaireStore?.setEditModalOpen}
//     >
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle
//             className={cn({
//               "text-right mr-3": langStore?.rtl,
//             })}
//           >
//             {dict?.updateQuestionnaire || "Update Questionnaire"}{" "}
//           </DialogTitle>
//         </DialogHeader>
//         <QuestionnaireForm
//           questionnaire={questionnaireStore?.questionnaire}
//           onSubmit={onSubmit}
//           formType="edit"
//         />
//       </DialogContent>
//     </Dialog>
//   );
// }
