"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for validating the input
const schema = z.object({
  author_id: z.number(),
  book_id: z.number(),
});

export const addAuthorBook = async (authorBook: { author_id: number; book_id: number; }) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(authorBook);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  // Connects to the database
  const client = await db.connect();

    // Checks if a record with the same author_id and book_id already exists
    const { rows: existingRecords } = await client.sql`
    SELECT * FROM AuthorsBooks WHERE author_id = ${authorBook.author_id} AND book_id = ${authorBook.book_id}
  `;

  if (existingRecords.length > 0) {
    // If a record already exists, releases the connection and returns an error message
    client.release();
    return {
      error: "A record with the same author_id and book_id already exists.",
    };
  }


  // Inserts a new record into the AuthorsBooks table
  const { rows } = await client.sql`
    INSERT INTO AuthorsBooks (author_id, book_id) 
    VALUES (${authorBook.author_id}, ${authorBook.book_id})
    RETURNING *
  `;

  // Releases the connection back to the pool
  client.release();

  revalidatePath("/authors-books")

  // Returns the newly created record
  return rows[0];
};