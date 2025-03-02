import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createNewDosageForm } from "@/services/DosageFormApiService";
import { DosageFormGlobalState } from "@/stores/product_state_store/DosageFormGlobalState";

export function DialogForDosageForm() {
  const { loading, newDosageForm } = DosageFormGlobalState();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add new dosage form</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Dosage Form
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input
            value={newDosageForm ?? ""}
            onChange={(e) => {
              DosageFormGlobalState.setState({
                newDosageForm: e.target.value,
              });
            }}
            className="rounded"
            placeholder="Write dosage form here ..."
          />
        </div>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button
              onClick={() => {
                if (newDosageForm) {
                  createNewDosageForm(newDosageForm);
                }
              }}
              className="bg-[#00C8FF] hover:bg-[#0099ff] text-black font-semibold text-md mt-5 rounded"
              type="button"
            >
              {loading ? "Please wait" : "Submit"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
