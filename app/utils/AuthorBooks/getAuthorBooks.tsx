/**
 * This is the getAuthorBooks server action. It fetches all records from the AuthorsBooks table in the database.
 * The function does not receive any input.
 * 
 * The function connects to the database and fetches all records from the AuthorsBooks table.
 * It then releases the connection back to the pool and returns the fetched records.
 * 
 * The returned records are of type 'AuthorBook', which is defined in this file.
 * An 'AuthorBook' has an 'authorsbooks_id', an 'author_id', and a 'book_id'.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
"use server";
import { db } from "@vercel/postgres";

export type AuthorBook = {
  authorsbooks_id: number;
  author_id: number;
  book_id: number;
};

export const getAuthorBooks = async () => {
  // Connects to the database
  const client = await db.connect();

  // Fetches all records from the AuthorsBooks table
  const { rows } = await client.sql`
    SELECT * 
    FROM AuthorsBooks
  `;

  // Releases the connection back to the pool
  client.release();

  // Returns the fetched records
  return rows as AuthorBook[];
};
