// "use client";
// import Footer from "@/components/layout/footer";
// import { Icons } from "@/components/icons";
// import PageWrapper from "@/components/page-wrapper";
// import { DataTable } from "@/components/questionnaires/table/data-table";
// import { useStore } from "@/hooks/use-store";
// import useLangStore from "@/store/langagueStore";
// import { cn } from "@/lib/utils";
// import { AddQuestionnaire } from "@/components/questionnaires/add-questionnaire";

// export default function Questionnaires() {
//   const langStore = useStore(useLangStore, (state) => state);
//   const dict = langStore?.getDictionary();
//   return (
//     <PageWrapper className="flex flex-col max-w-full h-full gap-4 grow">
//       <div
//         className={cn("flex border-b py-2 flex-col sm:flex-row gap-2", {
//           "sm:flex-row-reverse": langStore?.rtl,
//         })}
//       >
//         <h1
//           className={cn(
//             "text-xl font-semibold grow flex flex-row gap-2 items-center",
//             {
//               "flex-row-reverse": langStore?.rtl,
//             }
//           )}
//         >
//           <Icons.questionnaires className="w-5 h-5" />
//           <span>{dict?.questionnaires}</span>
//         </h1>
//         <div
//           className={cn("flex justify-end", {
//             "flex-row-reverse": langStore?.rtl,
//           })}
//         >
//           <AddQuestionnaire />
//         </div>
//       </div>
//       {/* <GRCQuestionnaire /> */}
//       <div className="h-full flex flex-col overflow-x-scroll pr-3  p-1">
//         <DataTable />
//         <Footer className="mt-3 grow items-end" />
//       </div>
//     </PageWrapper>
//   );
// }
