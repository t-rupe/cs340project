/**
 * AuthorsBooksPage Component
 * 
 * A page that displays a table of books associated with authors. Allows adding and editing of author-book associations.
 * 
 * Props:
 * - data: Array of author-book associations.
 * 
 * Uses the Table components to display the data, and the AddAuthorBooks and EditAuthorsBook components for adding and editing associations.
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
import AddAuthorBooks from "./AddAuthorBooks";
import EditAuthorsBook from "./EditAuthorsBooks";

type AuthorBook = {
  authorsbooks_id: number;
  author_id: number;
  book_id: number;
};

type AuthorsBooksPageProps = {
  data: AuthorBook[];
};

const AuthorsBooksPage = ({ data }: AuthorsBooksPageProps) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 max-w-4xl mx-auto">
      <div className="border rounded-lg shadow-sm mb-8">
        <div className="p-4 flex justify-between">
          <h2 className="text-lg font-semibold">Authors Books</h2>
          <AddAuthorBooks />
        </div>
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>AuthorsBooks ID</TableHead>
              <TableHead>Author ID</TableHead>
              <TableHead>Book ID</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((authorBook, index) => (
              <TableRow key={index}>
                <TableCell>{authorBook?.authorsbooks_id ?? "null"}</TableCell>
                <TableCell>{authorBook?.author_id ?? "Null"}</TableCell>
                <TableCell>{authorBook.book_id ?? "Null"}</TableCell>
                <TableCell>
                  <EditAuthorsBook
                    authorsBooksId={authorBook.authorsbooks_id}
                    initialAuthorId={authorBook.author_id}
                    initialBookId={authorBook.book_id}
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

export default AuthorsBooksPage;
