// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import {
//   getAllDeletedDosageForms,
//   undoDeletedDosageForms,
// } from "@/services/DosageFormApiService";
// import { DosageFormGlobalState } from "@/stores/product_state_store/ProductConstantsGlobalState";

// import { useEffect } from "react";

// export default function DeletedDosageForms() {
//   const { deletedDosageFormList } = DosageFormGlobalState();

//   useEffect(() => {
//     getAllDeletedDosageForms();
//   }, []);

//   return (
//     <>
//       {deletedDosageFormList && deletedDosageFormList.length > 0 ? (
//         <>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Dosage form</TableHead>
//                 <TableHead>Date modified</TableHead>
//                 <TableHead>Actions </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {deletedDosageFormList.map((deletedDosageForm) => (
//                 <TableRow key={deletedDosageForm.dosageFormID}>
//                   <TableCell>{deletedDosageForm.dosageForm}</TableCell>
//                   <TableCell>
//                     {new Date(deletedDosageForm.updatedAt).toLocaleDateString()}
//                   </TableCell>
//                   <TableCell
//                     onClick={() => {
//                       undoDeletedDosageForms(deletedDosageForm.dosageFormID);
//                     }}
//                     className="text-red-700 cursor-pointer "
//                   >
//                     <span className="inline text-lg font-semibold">
//                       Undo Delete
//                     </span>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </>
//       ) : (
//         <div className="block text-center text-3xl">
//           No Deleted dosage forms found
//         </div>
//       )}
//     </>
//   );
// }
