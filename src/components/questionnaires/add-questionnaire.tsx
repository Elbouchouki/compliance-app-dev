// "use client";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useFieldArray, useForm } from "react-hook-form";
// import * as z from "zod";
// import { cn } from "@/lib/utils";
// import { Icons } from "../icons";

// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { useStore } from "@/hooks/use-store";
// import useLangStore from "@/store/langagueStore";
// import { toast } from "sonner";
// import { useState } from "react";
// import useQuestionnaireStore from "@/store/questionnaireStore";
// import { Textarea } from "../ui/textarea";
// import { PlusCircle } from "lucide-react";

// export function AddQuestionnaire() {
//   const langStore = useStore(useLangStore, (state) => state);
//   const dict = langStore?.getDictionary();
//   const questionnaireStore = useStore(useQuestionnaireStore, (state) => state);

//   const formType = "add"; //edit
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
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       vendor: "",
//       questions: [{ value: "" }],
//       created_at: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
//       updated_at: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
//       id: Math.random().toString(36).substr(2, 9),
//     },
//   });
//   const { fields, append, remove } = useFieldArray({
//     name: "questions",
//     control: form.control,
//   });
//   function onSubmit(data: any) {
//     questionnaireStore?.addQuestionnaire({
//       name: data?.name,
//       description: data?.description,
//       vendor: data?.vendor,
//       questions: data?.questions,
//       created_at: data?.created_at,
//       updated_at: data?.updated_at,
//       id: data?.id,
//     });

//     toast.success("Questionnaire added successfully");
//     form.reset();
//     setOpen(false);
//   }
//   const [open, setOpen] = useState(false);
//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button
//           size="sm"
//           className={cn("flex flex-row gap-2", {
//             "flex-row-reverse": langStore?.rtl,
//           })}
//         >
//           <PlusCircle className="w-4 h-4" />
//           <span>{dict?.addQuestionnaire || "Add Questionnaire"}</span>
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle
//             className={cn({
//               "text-right mr-3": langStore?.rtl,
//             })}
//           >
//             {dict?.addQuestionnaire || "Add Questionnaire"}
//           </DialogTitle>
//         </DialogHeader>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="w-full flex flex-col gap-3"
//           >
//             <div>
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem className="w-full flex flex-col">
//                     <FormLabel
//                       className={cn({
//                         "text-right": langStore?.rtl,
//                       })}
//                     >
//                       {dict?.name || "Name"}
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         className={cn({
//                           "text-right": langStore?.rtl,
//                         })}
//                         placeholder={dict?.name || "Name"}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div>
//               <FormField
//                 control={form.control}
//                 name="vendor"
//                 render={({ field }) => (
//                   <FormItem className="w-full flex flex-col">
//                     <FormLabel
//                       className={cn({
//                         "text-right": langStore?.rtl,
//                       })}
//                     >
//                       {dict?.vendor || "Vendor"}
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         className={cn({
//                           "text-right": langStore?.rtl,
//                         })}
//                         placeholder={dict?.vendor || "Vendor"}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div>
//               <FormField
//                 control={form.control}
//                 name="description"
//                 render={({ field }) => (
//                   <FormItem className="w-full flex flex-col">
//                     <FormLabel
//                       className={cn({
//                         "text-right": langStore?.rtl,
//                       })}
//                     >
//                       {dict?.description || "Description"}
//                     </FormLabel>
//                     <FormControl>
//                       <Textarea
//                         className={cn({
//                           "text-right": langStore?.rtl,
//                         })}
//                         placeholder={dict?.description || "Description"}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div>
//               {fields.map((field, index) => (
//                 <FormField
//                   control={form.control}
//                   key={field.id}
//                   name={`questions.${index}.value`}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel
//                         className={cn(
//                           "w-100 flex	items-center ",
//                           index !== 0 && "sr-only",
//                           { "flex-row-reverse": langStore?.rtl }
//                         )}
//                       >
//                         {dict?.questions || "questions"}
//                         <Button
//                           type="button"
//                           size="sm"
//                           className={cn(
//                             "bg-green-500",
//                             langStore?.rtl ? "mr-2 " : "ml-2 "
//                           )}
//                           onClick={() => append({ value: "" })}
//                         >
//                           <Icons.add className="w-5 h-5" />
//                         </Button>
//                       </FormLabel>

//                       <div
//                         className={cn("flex items-center", {
//                           "flex-row-reverse": langStore?.rtl,
//                         })}
//                       >
//                         <FormControl>
//                           <Textarea
//                             {...field}
//                             className={cn({
//                               "text-right": langStore?.rtl,
//                             })}
//                           />
//                         </FormControl>
//                         <Button
//                           className={cn(
//                             "bg-red-500",
//                             langStore?.rtl ? "mr-3" : "ml-3"
//                           )}
//                           type="button"
//                           size="sm"
//                           disabled={index === 0}
//                           onClick={() => remove(index)}
//                         >
//                           <Icons.delete className="w-5 h-5" />
//                         </Button>
//                       </div>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               ))}
//             </div>
//             <div
//               className={cn("mt-3", {
//                 "flex flex-row-reverse": langStore?.rtl,
//               })}
//             >
//               <Button type="submit">
//                 {formType === "add"
//                   ? dict?.addQuestionnaire || "Add Questionnaire"
//                   : dict?.updateQuestionnaire || "Update Questionnaire"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
