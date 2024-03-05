"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for validating the input
const schema = z.object({
  book_id: z.number().optional(),
  title: z
    .string()
    .trim()
    .min(1, { message: "Title is required" })
    .max(255, { message: "Title is too long" }),
  isbn: z
    .string()
    .trim()
    .min(1, { message: "ISBN is required" })
    .max(255, { message: "ISBN is too long" }),
  book_category: z
    .string()
    .trim()
    .min(1, { message: "Book category is required" })
    .max(255, { message: "Book category is too long" }),
  book_type: z
    .string()
    .trim()
    .min(1, { message: "Book type is required" })
    .max(255, { message: "Book type is too long" }),
  book_status: z.string().optional(),
  changed_date: z.date(),
});

export const addBook = async (book: unknown) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(book);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  const client = await db.connect();
  

  // Destructures the input
  const title = result.data.title;
  const isbn = result.data.isbn;
  const book_category = result.data.book_category;
  const book_type = result.data.book_type;
  const book_status = result.data.book_status;
  const changed_date = result.data.changed_date;

  // Check if the book already exists
  const { rows: existingBooks } = await client.sql`
    SELECT * FROM Books WHERE title = ${title} AND isbn = ${isbn}
  `;

  if (existingBooks.length > 0) {
    client.release();

    return {
      error: {
        title: "A book with this title and ISBN already exists",
        isbn: "A book with this title and ISBN already exists",
      },
    };
  }

  // Inserts the book into the database
  const { rows } = await client.sql`
    INSERT INTO Books (title, isbn, book_category, book_type, book_status, changed_date) 
    VALUES (${title}, ${isbn}, ${book_category}, ${book_type}, ${book_status}, ${changed_date.toISOString()}) 
  `;
  client.release();

  // Refreshes the cache for the /books page
  revalidatePath("/books");
  return rows[0];
};
