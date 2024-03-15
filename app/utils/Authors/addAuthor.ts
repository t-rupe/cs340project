/**
 * This is the addAuthor server action. It adds a new author to the Authors table in the database.
 * The function receives an object with a 'first_name' and a 'last_name' as input.
 *
 * The function validates the input using a Zod schema. If the input is invalid, it returns an error message.
 *
 * The function connects to the database and checks if an author with the same 'first_name' and 'last_name' already exists.
 * If such an author exists, it releases the connection and returns an error message.
 *
 * If no such author exists, it inserts a new author into the Authors table and returns the newly created author.
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

export const addAuthor = async (author: unknown) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(author);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  const client = await db.connect();

  // Destructures the input ** change this **
  const firstName = result.data.first_name;
  const lastName = result.data.last_name;

  const { rows: existingAuthors } = await client.sql`
  SELECT * FROM Authors WHERE first_name = ${firstName} AND last_name = ${lastName}
`;

  if (existingAuthors.length > 0) {
    client.release();

    return {
      error: {
        first_name:
          "An author with this first name and last name already exists",
        last_name:
          "An author with this first name and last name already exists",
      },
    };
  }

  // Inserts the author into the database
  const { rows } = await client.sql`
    INSERT INTO Authors (first_name, last_name) 
    VALUES (${firstName}, ${lastName}) 
  `;
  client.release();

  // Refreshes the cache for the authors page
  revalidatePath("/authors");
  return rows[0];
};
