/**
 * This is the DeleteButton component. It's a button that triggers an alert dialog for deleting a record.
 * The alert dialog warns the user that the action is irreversible and asks for confirmation before proceeding.
 *
 * The component receives an 'id', 'deleteFunction', and 'type' as props.
 * The 'id' is the identifier of the record to be deleted.
 * The 'deleteFunction' is a function that performs the deletion when called with the 'id'.
 * The 'type' is a string that describes the type of the record (e.g., 'Member', 'Author', 'Book', 'Loan').
 *
 * When the 'Continue' button in the alert dialog is clicked, the 'handleDelete' function is called.
 * This function calls the 'deleteFunction' with the 'id' and shows a toast notification with the result.
 *
 * The component uses the following libraries/components:
 * - The AlertDialog, Button, and useToast components from the ShadCN UI library
 */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

type DeleteButtonProps = {
  id?: number | undefined;
  deleteFunction: (id: number) => Promise<any>;
  type?: "Member" | "Author" | "Book" | "Loan";
};

export function DeleteButton({ id, deleteFunction, type }: DeleteButtonProps) {
  const { toast } = useToast();

  const handleDelete = async () => {
    if (id === undefined) {
      toast({
        description: "Error: id undefined 😞",
      });
      return;
    }

    try {
      const response = await deleteFunction(id);
      toast({
        variant: "destructive",
        description: `${type} id ${id} deleted! 😱`,
      });
      console.log(response.message);
    } catch (error) {
      console.error(error);
      toast({
        description: "Failed to delete the item 😞",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete a record
            from the system and cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
