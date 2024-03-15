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
