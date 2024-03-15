/**
 * This is the AuthorsPage component. It displays a list of authors in a table.
 * The component uses the 'deleteAuthor' server action to delete an author.
 * 
 * The component uses several components from the ShadCN UI library, including Table, TableRow, TableHeader, TableCell, TableBody, and DeleteButton.
 * The ShadCN UI library provides a set of reusable components for building user interfaces.
 * Source: https://ui.shadcn.com/
 * 
 * The component receives a 'data' prop, which is an array of authors to be displayed.
 * 
 * The component uses the 'AddAuthor' and 'EditAuthorDialog' components to provide functionality for adding and editing authors.
 * 
 * The component uses the 'deleteAuthor' function to delete an author. The 'deleteAuthor' function is passed to the 'DeleteButton' component as a prop.
 */
"use client";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { DeleteButton } from "@/components/AlertDestructive";
import AddAuthor from "./AddAuthor";
import EditAuthorDialog from "./editAuthorDialog";
import { deleteAuthor } from "@/app/utils/Authors/deleteAuthor";

type Author = {
  author_id: number;
  first_name: string;
  last_name: string;
};

type AuthorsPageProps = {
  data: Author[];
};
const AuthorsPage = ({ data }: AuthorsPageProps) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm mb-8">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Authors</h2>
          {/* Below is the component for the AddAuthor Dialog */}
          <AddAuthor />
        </div>
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((author, index) => (
              <TableRow key={index}>
                <TableCell>{author.author_id}</TableCell>
                <TableCell>{author.first_name}</TableCell>
                <TableCell>{author.last_name}</TableCell>

                <TableCell className="flex justify-end">
                  {/* Below is the component for the EditAuthor Dialog */}
                  <EditAuthorDialog author={author} />
                  {/* Below is the component for the Delete Dialog (only works for authors currently) */}
                  <DeleteButton
                    deleteFunction={deleteAuthor}
                    id={author.author_id}
                    type="Author"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default AuthorsPage;
