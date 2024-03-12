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

type AuthorBook = {
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
              <TableHead>Author ID</TableHead>
              <TableHead>Book ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((authorBook, index) => (
              <TableRow key={index}>
                <TableCell>{authorBook.author_id}</TableCell>
                <TableCell>{authorBook.book_id}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
};

export default AuthorsBooksPage;
