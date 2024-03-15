/**
 * This is the getBooks server action. It fetches all books from the Books table in the database.
 * The function does not receive any input.
 * 
 * The function connects to the database and fetches all books from the Books table.
 * It then releases the connection back to the pool and returns the fetched books.
 * 
 * The returned books are of type 'Book', which is defined in this file.
 * A 'Book' has a 'book_id', 'title', 'isbn', 'book_category', 'book_type', 'book_status', and 'changed_date'.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
'use server';
import { db } from "@vercel/postgres";

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

export const getBooks = async (): Promise<Book[]> => {
  // This is the connection to the database. It is a pool of connections that we can use to query the database.
  const client = await db.connect();
  // This is the query we are running to get the books from the database.
  const { rows } =
    await client.sql`SELECT book_id, title, book_category, isbn, book_type, book_status, changed_date FROM Books ORDER BY book_id ASC`;

  // This releases the connection back to the pool so that other requests can use it.
  client.release();

  // This returns the rows as an array of book objects.
  return rows as Book[];
};
