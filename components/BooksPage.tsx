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

export default function BooksPage() {
  const [addingNewBook, setAddingNewBook] = useState(false);
  const [newBookData, setNewBookData] = useState({
    title: "",
    authors: "",
    category: "",
    isbn: "",
    type: "",
    status: "",
  });

  const authorBookRelations = [
    { bookId: "1", bookTitle: "The Alchemist", authorName: "Paulo Coelho" },
    { bookId: "2", bookTitle: "Les Misérables", authorName: "Victor Hugo" },
    { bookId: "2", bookTitle: "Les Misérables", authorName: "Jean Valjean" }, 
    {
      bookId: "3",
      bookTitle: "To Kill a Mockingbird",
      authorName: "Harper Lee",
    },
    {
      bookId: "4",
      bookTitle: "The Great Gatsby",
      authorName: "F. Scott Fitzgerald",
    },
    { bookId: "5", bookTitle: "1984", authorName: "George Orwell" },
    {
      bookId: "6",
      bookTitle: "Pride and Prejudice",
      authorName: "Jane Austen",
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
      return; // Prevent the save operation if any field is empty
    }

    setAddingNewBook(false);
    setNewBookData({
      title: "",
      authors: "",
      category: "",
      isbn: "",
      type: "",
      status: "",
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
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="text-center text-black font-semibold text-lg py-2"
                colSpan={8}
              >
                Books Table
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Authors</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">1</TableCell>
              <TableCell className="font-semibold">The Alchemist</TableCell>
              <TableCell>Paulo Coelho</TableCell>
              <TableCell>Adventure</TableCell>
              <TableCell>978-0062315007</TableCell>
              <TableCell>ePub</TableCell>
              <TableCell>Available</TableCell>
              <TableCell className="flex justify-end">
                <Button className="mr-2" size="sm">
                  Edit
                </Button>
                <Button size="sm">Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">2</TableCell>
              <TableCell className="font-semibold">Les Misérables</TableCell>
              <TableCell>Victor Hugo, Jean Valjean, Javert</TableCell>
              <TableCell>Historical Fiction</TableCell>
              <TableCell>978-0486280486</TableCell>
              <TableCell>PDF</TableCell>
              <TableCell>Checked-Out</TableCell>
              <TableCell className="flex justify-end">
                <Button className="mr-2" size="sm">
                  Edit
                </Button>
                <Button size="sm">Delete</Button>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-semibold">3</TableCell>
              <TableCell className="font-semibold">
                To Kill a Mockingbird
              </TableCell>
              <TableCell>Harper Lee</TableCell>
              <TableCell>Fiction</TableCell>
              <TableCell>978-0061120084</TableCell>
              <TableCell>eText</TableCell>
              <TableCell>Available</TableCell>

              <TableCell className="flex justify-end">
                <Button className="mr-2" size="sm">
                  Edit
                </Button>
                <Button size="sm">Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">4</TableCell>
              <TableCell className="font-semibold">The Great Gatsby</TableCell>
              <TableCell>F. Scott Fitzgerald</TableCell>
              <TableCell>Classic</TableCell>
              <TableCell>978-0743273565</TableCell>
              <TableCell>eBook</TableCell>
              <TableCell>Checked-Out</TableCell>
              <TableCell className="flex justify-end">
                <Button className="mr-2" size="sm">
                  Edit
                </Button>
                <Button size="sm">Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">5</TableCell>
              <TableCell className="font-semibold">1984</TableCell>
              <TableCell>George Orwell</TableCell>
              <TableCell>Dystopian</TableCell>
              <TableCell>978-0451524935</TableCell>
              <TableCell>ePub</TableCell>
              <TableCell>Available</TableCell>

              <TableCell className="flex justify-end">
                <Button className="mr-2" size="sm">
                  Edit
                </Button>
                <Button size="sm">Delete</Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">6</TableCell>
              <TableCell className="font-semibold">
                Pride and Prejudice
              </TableCell>
              <TableCell>Jane Austen</TableCell>
              <TableCell>Classic</TableCell>
              <TableCell>978-0486280486</TableCell>
              <TableCell>eBook</TableCell>
              <TableCell>Checked-Out</TableCell>
              <TableCell className="flex justify-end">
                <Button className="mr-2" size="sm">
                  Edit
                </Button>
                <Button size="sm">Delete</Button>
              </TableCell>
            </TableRow>
            {addingNewBook && (
              <TableRow className="bg-gray-100">
                <TableCell className="font-semibold">AI</TableCell>
                <TableCell>
                  <input
                    className={
                      isValidInput(newBookData.title)
                        ? `border border-black rounded-md`
                        : `border border-red-500 rounded-md`
                    }
                    type="text"
                    name="title"
                    value={newBookData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="authors"
                    className={
                      isValidInput(newBookData.authors)
                        ? `border border-black rounded-md`
                        : `border border-red-500 rounded-md`
                    }
                    onChange={handleChange}
                    placeholder="Authors"
                    required
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="category"
                    className={
                      isValidInput(newBookData.category)
                        ? `border border-black rounded-md`
                        : `border border-red-500 rounded-md`
                    }
                    onChange={handleChange}
                    placeholder="Category"
                    required
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="isbn"
                    className={
                      isValidInput(newBookData.isbn)
                        ? `border border-black rounded-md`
                        : `border border-red-500 rounded-md`
                    }
                    onChange={handleChange}
                    placeholder="ISBN"
                    required
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="type"
                    className={
                      isValidInput(newBookData.type)
                        ? `border border-black rounded-md`
                        : `border border-red-500 rounded-md`
                    }
                    onChange={handleChange}
                    placeholder="Type"
                    required
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="text"
                    name="status"
                    className={
                      isValidInput(newBookData.status)
                        ? `border border-black rounded-md`
                        : `border border-red-500 rounded-md`
                    }
                    onChange={handleChange}
                    placeholder="Status"
                    required
                  />
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <Button size="sm" onClick={handleSaveNewBook}>
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell className="text-center" colSpan={8}>
                <Button className="mt-4" size="sm" onClick={handleAddNewBook}>
                  Add New Book
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="text-center text-black font-semibold text-lg py-2"
                colSpan={4}
              >
                AuthorsBooks Relationship
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Book ID</TableHead>
              <TableHead>Book Title</TableHead>
              <TableHead>Author Name</TableHead>
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
                <TableCell className="flex justify-end"></TableCell>
                <TableCell className="flex justify-end">
                  <Button className="mr-2" size="sm">
                    Edit
                  </Button>
                  <Button size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

