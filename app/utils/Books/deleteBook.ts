/**
 * This is the deleteBook server action. It deletes a book from the Books table in the database.
 * The function receives a 'book_id' as input.
 *
 * The function connects to the database and deletes the book with the given 'book_id'.
 * If no book with the given 'book_id' is found, it throws an error.
 *
 * After deleting the book, it releases the connection back to the pool and returns a success message.
 *
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/books' path.
 *
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const deleteBook = async (book_id: number) => {
  const client = await db.connect();

  const { rowCount } = await client.sql`
    DELETE FROM books
    WHERE book_id = ${book_id};
  `;

  client.release();

  if (rowCount === 0) {
    throw new Error(`No book found with id ${book_id}`);
  }

  // This refreshes the data upon executing a deletion.
  revalidatePath("/books");

  return { message: `Book with id ${book_id} deleted successfully` };
};
