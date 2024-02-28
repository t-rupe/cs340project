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
import { deleteAuthor } from "@/app/utils/Authors/deleteAuthor";
import { useToast } from "./ui/use-toast";

type AlertDialogDemoProps = {
  id: number;
};

export function AlertDialogDemo({ id }: AlertDialogDemoProps) {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const response = await deleteAuthor(id);
      toast({
        variant: "destructive",
        description: "Author deleted! 😢",
      });
      console.log(response.message);
    } catch (error) {
      console.error(error);
      toast({
        description: "Failed to delete the author 😞",
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
            This action cannot be undone. This will permanently delete record
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