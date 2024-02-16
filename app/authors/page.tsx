"use client";
import React from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertDialogDemo } from "@/components/AlertDestructive"; // Ensure this import path is correct
import AddDialog from "@/components/AddDialog";

const AuthorsPage = () => {
  const authors = [
    { author_id: "1", author_first_name: "Paulo", author_last_name: "Coelho" },
    { author_id: "2", author_first_name: "Neil", author_last_name: "Gaiman" },
    {
      author_id: "3",
      author_first_name: "Terry",
      author_last_name: "Pratchett",
    },
    { author_id: "4", author_first_name: "Harper", author_last_name: "Lee" },
    {
      author_id: "5",
      author_first_name: "F. Scott",
      author_last_name: "Fitzgerald",
    },
    { author_id: "6", author_first_name: "George", author_last_name: "Orwell" },
    { author_id: "7", author_first_name: "Jane", author_last_name: "Austen" },
  ];

  const authorFields = [
    {
      name: "author_first_name",
      label: "First Name",
      type: "text",
      defaultValue: "",
    },
    {
      name: "author_last_name",
      label: "Last Name",
      type: "text",
      defaultValue: "",
    },
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="border rounded-lg shadow-sm mb-8">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Authors</h2>
          <AddDialog fields={authorFields} />{" "}
          {/* Add New button for Books table */}
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
            {authors.map((author, index) => (
              <TableRow key={index}>
                <TableCell>{author.author_id}</TableCell>
                <TableCell>{author.author_first_name}</TableCell>
                <TableCell>{author.author_last_name}</TableCell>
                <TableCell className="flex justify-end">
                  <Button className="mr-2" variant="outline" size="sm">
                    Edit
                  </Button>
                  <AlertDialogDemo />{" "}
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
