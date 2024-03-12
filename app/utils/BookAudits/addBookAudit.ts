"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for validating the input
const schema = z.object({
  book_audit_id: z.number().optional(),
  book_id: z.number(), 
  book_status: z
    .string()
    .trim()
    .min(1, { message: "Book status is required" })
    .max(255, { message: "Book status is too long" }),
  changed_date: z.date(),
});

export const addBookAudit = async (bookaudit: unknown) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(bookaudit);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  const client = await db.connect();
  

  // Destructures the input
  const book_id = result.data.book_id;
  const book_status = result.data.book_status;
  const changed_date = result.data.changed_date;

  // Check if the record already exists
  const { rows: existingBookAudits } = await client.sql`
    SELECT * FROM BookAudits WHERE book_id = ${book_id} AND book_status = ${book_status} AND changed_date = ${changed_date.toISOString()}
  `;

  if (existingBookAudits.length > 0) {
    client.release();

    return {
      error: {
        book_id: "A book audit with this book ID, book status, and ISBN already exists",
        book_status: "A book audit with this book ID, book status, and ISBN already exists",
        changed_date: "A book audit with this book ID, book status, and ISBN already exists",
      },
    };
  }

  // Inserts the book into the database
  const { rows } = await client.sql`
    INSERT INTO BookAudits (book_id, book_status, changed_date) 
    VALUES (${book_id}, ${book_status}, ${changed_date.toISOString()}) 
  `;
  client.release();

  // Refreshes the cache for the /bookaudits page
  revalidatePath("/bookaudits");
  revalidatePath("/books");
  return rows[0];
};
