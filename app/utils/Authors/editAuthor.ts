/**
 * This is the editAuthor server action. It updates an author in the Authors table in the database.
 * The function receives an 'authorId' and an 'author' object as input.
 *
 * The function validates the input using a Zod schema. If the input is invalid, it returns an error message.
 *
 * The function connects to the database and updates the author with the given 'authorId'.
 * It sets the 'first_name' and 'last_name' fields to the values provided in the 'author' object.
 *
 * After updating the author, it retrieves the updated author from the database and returns it.
 *
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/authors' path.
 *
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for validating the input
const schema = z.object({
  id: z.number().optional(),
  first_name: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(255, { message: "First name is too long" }),
  last_name: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(255, { message: "Last name is too long" }),
});

export const editAuthor = async (authorId: number, author: unknown) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(author);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  // Connects to the database
  const client = await db.connect();

  // Destructures the input

  const firstName = result.data.first_name;
  const lastName = result.data.last_name;

  // Updates the author in the database
  const { rows } = await client.sql`
  UPDATE Authors 
  SET first_name = ${firstName}, last_name = ${lastName} 
  WHERE author_id = ${authorId}
`;

  // Releases the connection back to the pool
  client.release();

  // Refreshes the cache for the authors page
  revalidatePath("/authors");
  return rows[0];
};
