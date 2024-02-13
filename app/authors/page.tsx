import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function AuthorsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="text-center text-black font-semibold text-lg py-2"
                colSpan={4}
              >
                Authors Table
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">A001</TableCell>
              <TableCell>Harper</TableCell>
              <TableCell>Lee</TableCell>
              <TableCell className="flex justify-end">
                <Button className="mr-2" size="sm">
                  Edit
                </Button>
                <Button size="sm">Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">A002</TableCell>
              <TableCell>George</TableCell>
              <TableCell>Orwell</TableCell>
              <TableCell className="flex justify-end">
                <Button className="mr-2" size="sm">
                  Edit
                </Button>
                <Button size="sm">Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center" colSpan={4}>
                <Button className="mt-4" size="sm">
                  Add New Author
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
