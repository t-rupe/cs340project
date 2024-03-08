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