/**
 * This is the getAvailableBooks server action. It fetches all available books from the Books table in the database.
 * The function does not receive any input.
 * 
 * The function connects to the database and fetches all books from the Books table where the 'book_status' is 'Available'.
 * It then releases the connection back to the pool and returns the fetched books.
 * 
 * The returned books are of type 'Book', which is defined in this file.
 * A 'Book' has a 'book_id', 'title', 'isbn', 'book_category', 'book_type', 'book_status', and 'changed_date'.
 * 
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/books' and '/loans' paths.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

// This is the type interface we have to use to define the shape of the data we are fetching from the database. Essentially this says, the each record has these fields.
export interface Book {
  book_id: number;
  title: string;
  isbn: string;
  book_category: string;
  book_type: string;
  book_status: string;
  changed_date: Date;
}

export const getAvailableBooks = async (): Promise<Book[]> => {
  // This is the connection to the database. It is a pool of connections that we can use to query the database.
  const client = await db.connect();
  // This is the query we are running to get the books from the database.
  const { rows } =
    await client.sql`SELECT book_id, title FROM Books WHERE book_status = 'Available' ORDER BY book_id ASC `;

  // This releases the connection back to the pool so that other requests can use it.
  client.release();

  // This returns the rows as an array of book objects.

  revalidatePath("/books");
  revalidatePath("/loans")
  return rows as Book[];
};
