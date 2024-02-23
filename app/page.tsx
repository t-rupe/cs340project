"use client";
import React, { useState } from "react";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { AlertDialogDemo } from "@/components/AlertDestructive";
import DialogDemo from "@/components/EditDialog";
import AddDialog from "@/components/AddDialog";

interface Book {
  id: number;
  title: string;
  category: string;
  isbn: string;
  type: string;
  [key: string]: number | string;
}

interface AuthorBookRelation {
  bookId: string;
  bookTitle: string;
  authorName: string;
  [key: string]: string;
}
export default function BooksPage() {
  const bookFields = [
    { name: "title", label: "Title", defaultValue: "", type: "text" },
    { name: "category", label: "Category", defaultValue: "", type: "text" },
    { name: "isbn", label: "ISBN", defaultValue: "", type: "text" },
    { name: "type", label: "Type", defaultValue: "", type: "text" },
  ];

  const [addingNewBook, setAddingNewBook] = useState(false);
  const [newBookData, setNewBookData] = useState({
    title: "",
    category: "",
    isbn: "",
    type: "",
  });

  const books: Book[] = [
    {
      id: 1,
      title: "The Alchemist",
      category: "Adventure",
      isbn: "978-0062315007",
      type: "ePub",
    },
    {
      id: 2,
      title: "Good Omens",
      category: "Fantasy, Comedy",
      isbn: "978-0060853983",
      type: "PDF",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      category: "Classic",
      isbn: "978-0061120084",
      type: "ePub",
    },
    {
      id: 4,
      title: "The Great Gatsby",
      category: "Classic",
      isbn: "978-0743273565",
      type: "eBook",
    },
    {
      id: 5,
      title: "1984",
      category: "Dystopian",
      isbn: "978-0451524935",
      type: "ePub",
    },
    {
      id: 6,
      title: "Pride and Prejudice",
      category: "Classic",
      isbn: "978-0486280486",
      type: "eBook",
    },
  ];

  const authorBookRelations: AuthorBookRelation[] = [
    {
      bookId: "1",
      bookTitle: "The Alchemist",
      authorName: "Paulo Coelho",
      authorId: "1",
    },
    {
      bookId: "2",
      bookTitle: "Good Omens",
      authorName: "Neil Gaiman",
      authorId: "2",
    },
    {
      bookId: "2",
      bookTitle: "Good Omens",
      authorName: "Terry Pratchett",
      authorId: "3",
    },
    {
      bookId: "3",
      bookTitle: "To Kill a Mockingbird",
      authorName: "Harper Lee",
      authorId: "4",
    },
    {
      bookId: "4",
      bookTitle: "The Great Gatsby",
      authorName: "F. Scott Fitzgerald",
      authorId: "5",
    },
    {
      bookId: "5",
      bookTitle: "1984",
      authorName: "George Orwell",
      authorId: "6",
    },
    {
      bookId: "6",
      bookTitle: "Pride and Prejudice",
      authorName: "Jane Austen",
      authorId: "7",
    },
  ];

  const authorsBooksFields = [
    {
      name: "book_id",
      label: "Book ID",
      defaultValue: "",
      type: "number",
      isBookId: true,
    },
    {
      name: "author_id",
      label: "Author ID",
      defaultValue: "",
      type: "number",
      isAuthorId: true,
    },
  ];

  const isValidInput = (value: any) => value.trim() !== "";

  const handleAddNewBook = () => {
    setAddingNewBook(true);
  };

  const handleSaveNewBook = () => {
    const allFieldsFilled = Object.values(newBookData).every(
      (value) => value.trim() !== ""
    );

    if (!allFieldsFilled) {
      alert("Please fill out all fields before saving.");
      return;
    }

    setAddingNewBook(false);
    setNewBookData({
      title: "",
      category: "",
      isbn: "",
      type: "",
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewBookData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-gray-50">
      <div className="border rounded-lg shadow-sm mb-8 ">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Books Table</h2>
          <AddDialog fields={bookFields} />{" "}
        </div>

        <Table className="bg-white">
          <TableHeader>
            <TableRow></TableRow>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell className="font-semibold">{book.id}</TableCell>
                <TableCell className="font-semibold">{book.title}</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>{book.type}</TableCell>
                <TableCell className="flex justify-end">
                  <DialogDemo
                    fields={bookFields.map((field) => ({
                      ...field,
                      defaultValue:
                        book[field.name]?.toString() || field.defaultValue,
                    }))}
                  />
                  <AlertDialogDemo />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="border rounded-lg shadow-sm mb-8">
        <div className="p-4 flex justify-between items-center ">
          <h2 className="text-lg font-semibold">AuthorsBooks</h2>
          <AddDialog fields={authorsBooksFields} />{" "}
        </div>
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>Book ID</TableHead>
              <TableHead>Book Title</TableHead>
              <TableHead>Author Name</TableHead>
              <TableHead>Author ID</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Dynamically render rows based on authorBookRelations state */}
            {authorBookRelations.map((relation, index) => (
              <TableRow key={index}>
                <TableCell>{relation.bookId}</TableCell>
                <TableCell>{relation.bookTitle}</TableCell>
                <TableCell>{relation.authorName}</TableCell>
                <TableCell>{relation.authorId}</TableCell>
                <TableCell className="flex justify-end"></TableCell>
                <TableCell className="flex justify-end">
                  <DialogDemo
                    fields={authorsBooksFields.map((field) => {
                      let defaultValue = "";
                      if (field.name === "book_id") {
                        defaultValue = relation.bookId;
                      } else if (field.name === "author_name") {
                        defaultValue = relation.authorName;
                      }
                      return {
                        ...field,
                        defaultValue: defaultValue,
                      };
                    })}
                  />

                  <AlertDialogDemo />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
