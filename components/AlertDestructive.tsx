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
};

export function DeleteButton({ id, deleteFunction }: DeleteButtonProps) {
  const { toast } = useToast();

  const handleDelete = async () => {
    if (id === undefined) {
      toast({
        description: "Error: id undefined 😞",
      });
      return;
    }
  
    try {
      const response = await deleteFunction(id); // Use the deleteFunction prop here
      toast({
        variant: "destructive",
        description: `Item id ${id} deleted! 😱`,
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
          <AlertDialogAction onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}