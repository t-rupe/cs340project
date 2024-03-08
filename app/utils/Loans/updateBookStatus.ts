"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for validating the input
const schema = z.object({
  book_id: z.number(),
});

export const updateBookStatus = async (book_id: number) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse({ book_id });
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  // Connects to the database
  const client = await db.connect();

  // Updates the book status in the database
  const { rows } = await client.sql`
  UPDATE Books 
  SET book_status = 'Checked-Out'
  WHERE book_id = ${book_id}
`;

  // Releases the connection back to the pool
  client.release();

  // Refreshes the cache for the books and loans pages
  revalidatePath("/books");
  revalidatePath("/loans");
  return rows[0];
};