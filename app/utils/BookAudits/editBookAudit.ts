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
export const editBookAudit = async (book_audit_id: number, bookaudit: unknown) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(bookaudit);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  // Connects to the database
  const client = await db.connect();

  // Destructures the input
  const book_id = result.data.book_id;
  const book_status = result.data.book_status;
  const changed_date = result.data.changed_date;

  // Updates the book in the database
  const { rows } = await client.sql`
  UPDATE BookAudits 
  SET book_id = ${book_id}, book_status = ${book_status}, changed_date = ${changed_date.toISOString()} 
  WHERE book_id = ${book_audit_id}
`;
  // Releases the connection back to the pool
  client.release();

  // Refreshes the cache for the home page
  revalidatePath("/bookaudits");
  return rows[0];
};
