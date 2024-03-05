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
import AddBook from "./AddBook";
import { deleteBook } from "@/app/utils/Books/deleteBook";
import { Edit } from "lucide-react";
import EditBookDialog from "./editBookDialog";

type Book = {
  book_id: number;
  title: string;
  isbn: string;
  book_category: string;
  book_type: string;
  book_status: string;
  changed_date: Date;
};

type BookPageProps = {
  data: Book[];
};
const BooksPage = ({ data }: BookPageProps) => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm mb-8">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Books</h2>
          {/* Below is the component for the AddBook Dialog */}
          <AddBook />
        </div>
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Book Status</TableHead>
              <TableHead>Date Changed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((book, index) => (
              <TableRow key={index}>
                <TableCell>{book.book_id}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.book_category}</TableCell>
                <TableCell>{book.book_type}</TableCell>
                <TableCell>{book.book_status}</TableCell>
                <TableCell>
                  {book.changed_date.toISOString().split("T")[0]}
                </TableCell>

                <TableCell className="flex justify-end">
                  {/* Below is the component for the Editbook Dialog */}
                  <EditBookDialog book={book} />
                  {/* Below is the component for the Delete Dialog, requires an id and the delete action*/}
                  <DeleteButton id={book.book_id} deleteFunction={deleteBook} type="Book"/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default BooksPage;
