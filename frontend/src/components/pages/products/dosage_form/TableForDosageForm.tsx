import { Trash2, Pencil, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  getAllDosageForms,
  findDosageFormByID,
  DeleteDosageFormByAdmin,
  updateDosageFormByAdmin,
} from "@/services/DosageFormApiService";
import { DosageFormGlobalState } from "../../../../stores/product_state_store/DosageFormGlobalState";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { DialogForDosageForm } from "./DialogForDosageForm";

export default function TableForDosageForm() {
  const { dosageForm, dosageFormList, dosageFormIDForEdit } =
    DosageFormGlobalState();

  useEffect(() => {
    getAllDosageForms();
  }, []);

  return (
    <>
      {dosageFormList && dosageFormList.length > 0 ? (
        <Table>
          <TableCaption>Dosage Forms</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Dosage form</TableHead>
              <TableHead>Added on</TableHead>
              <TableHead>Actions </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dosageFormList.map((dosage) => (
              <TableRow key={dosage.dosageFormID}>
                {dosageForm !== null &&
                dosageFormIDForEdit === dosage.dosageFormID ? (
                  <TableCell>
                    <Input
                      className="block border border-solid border-[rgb(255,255,255,0.2)] rounded"
                      id="Dosage form"
                      type="text"
                      placeholder="Dosage form"
                      required
                      value={dosageForm}
                      onChange={(e) => {
                        console.log("dosageForm", e.target.value);
                        DosageFormGlobalState.setState({
                          dosageForm: e.target.value,
                        });
                      }}
                    />
                  </TableCell>
                ) : (
                  <TableCell>{dosage.dosageForm}</TableCell>
                )}

                <TableCell>
                  {new Date(dosage.updatedAt).toLocaleDateString()}
                </TableCell>
                {dosageFormIDForEdit === null &&
                  dosageFormIDForEdit !== dosage.dosageFormID &&
                  dosageForm === null && (
                    <>
                      <TableCell>
                        <Pencil
                          onClick={() => {
                            DosageFormGlobalState.setState({
                              dosageFormIDForEdit: dosage.dosageFormID,
                            });
                            findDosageFormByID(dosage.dosageFormID);
                          }}
                          size={22}
                          className="inline cursor-pointer mr-4"
                        />{" "}
                        <Trash2
                          onClick={() => {
                            DeleteDosageFormByAdmin(dosage.dosageFormID);
                          }}
                          size={28}
                          className="inline cursor-pointer text-red-700"
                        />
                      </TableCell>
                    </>
                  )}
                {dosageFormIDForEdit !== null &&
                  dosageFormIDForEdit === dosage.dosageFormID &&
                  dosageForm && (
                    <>
                      <TableCell>
                        <Check
                          onClick={() => {
                            updateDosageFormByAdmin(
                              dosage.dosageFormID,
                              dosageForm
                            );
                          }}
                          size={32}
                          className="inline cursor-pointer mr-3 font-bold text-green-700"
                        />{" "}
                        <X
                          onClick={() => {
                            DosageFormGlobalState.setState({
                              dosageFormIDForEdit: null,
                              dosageForm: null,
                            });
                          }}
                          size={32}
                          className="inline cursor-pointer text-red-700"
                        />{" "}
                      </TableCell>
                    </>
                  )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="block text-center text-3xl">No Dosage form found</div>
      )}
      <DialogForDosageForm />
    </>
  );
}
