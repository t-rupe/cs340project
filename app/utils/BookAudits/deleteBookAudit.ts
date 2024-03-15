/**
 * This is the deleteBookAudit server action. It deletes a book audit from the BookAudits table in the database.
 * The function receives a 'book_id' as input.
 * 
 * The function connects to the database and deletes the book audit with the given 'book_id'.
 * If no book audit with the given 'book_id' is found, it throws an error.
 * 
 * After deleting the book audit, it releases the connection back to the pool and returns a success message.
 * 
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/bookaudits' and '/books' paths.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 * 
 */

"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const deleteBookAudit = async (book_id: number) => {
  const client = await db.connect();

  const { rowCount } = await client.sql`
    DELETE FROM Bookaudits
    WHERE book_id = ${book_id};
  `;

  client.release();

  if (rowCount === 0) {
    throw new Error(`No book audit ID found with id ${book_id}`);
  }

  // This refreshes the data upon executing a deletion.
  revalidatePath("/bookaudits");
  revalidatePath("/books");

  return { message: `Book audit ID with id ${book_id} deleted successfully` };
};
