"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for validating the input
const schema = z.object({
  book_id: z.number(),
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
  book_status: z.string(),
  changed_date: z.date(),
});
export const editBook = async (book_id: number, book: unknown) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(book);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  // Connects to the database
  const client = await db.connect();

  // Destructures the input

  const title = result.data.title;
  const isbn = result.data.isbn;
  const book_category = result.data.book_category;
  const book_type = result.data.book_type;
  const book_status = result.data.book_status;
  const changed_date = result.data.changed_date;

  // Updates the book in the database
  const { rows } = await client.sql`
  UPDATE Books 
  SET title = ${title}, isbn = ${isbn}, book_category = ${book_category}, book_type = ${book_type}, book_status = ${book_status}, changed_date = ${changed_date.toISOString()} 
  WHERE book_id = ${book_id}
`;
  // Releases the connection back to the pool
  client.release();

  // Refreshes the cache for the home page
  revalidatePath("/");
  return rows[0];
};
