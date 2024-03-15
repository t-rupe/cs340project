/**
 * This is the getBookId server action. It fetches a book's ID by its title from the Books table in the database.
 * The function receives a 'title' as input.
 * 
 * The function connects to the database and fetches the 'book_id' of the book with the given 'title'.
 * If no book with the given 'title' is found, it returns null.
 * 
 * After fetching the 'book_id', it releases the connection back to the pool and returns the fetched 'book_id'.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
"use server";
import { db } from "@vercel/postgres";

export const getBookId = async (title: string) => {
  // Connects to the database
  const client = await db.connect();

  // Fetches the book_id from the database
  const { rows } = await client.sql`
    SELECT book_id 
    FROM Books 
    WHERE title = ${title}
  `;

  // Releases the connection back to the pool
  client.release();

  // Returns the book_id or null if no book was found
  return rows[0]?.book_id || null;
};