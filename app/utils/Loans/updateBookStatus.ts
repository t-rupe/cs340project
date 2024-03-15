/**
 * This is the updateBookStatus server action. It updates the 'book_status' of a book in the Books table in the database.
 * The function receives a 'book_id' as input.
 * 
 * The function validates the input using a Zod schema. If the input is invalid, it returns an error message.
 * 
 * The function connects to the database and updates the 'book_status' of the book with the given 'book_id' to 'Checked-Out'.
 * It then releases the connection back to the pool and returns the updated book.
 * 
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/books' and '/loans' paths.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 * 
 * Source: updateBookStatus.ts
 */
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