/**
 * This is the editBookAudit server action. It updates a book audit in the BookAudits table in the database.
 * The function receives a 'book_audit_id' and a 'bookaudit' object as input.
 * 
 * The function validates the input using a Zod schema. If the input is invalid, it returns an error message.
 * 
 * The function connects to the database and updates the book audit with the given 'book_audit_id'.
 * It sets the 'book_id', 'book_status', and 'changed_date' fields to the values provided in the 'bookaudit' object.
 * 
 * After updating the book audit, it retrieves the updated book audit from the database and returns it.
 * 
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/bookaudits' path.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
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

  // Refreshes the cache for the bookaudit page
  revalidatePath("/bookaudits");
  return rows[0];
};
