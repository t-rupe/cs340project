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

// This is the type interface we have to use to define the shape of the data we are fetching from the database. Essentially this says, the each record has these fields.
export interface Author {
  author_id: number;
  first_name: string;
  last_name: string;
}

export const getAuthors = async (): Promise<Author[]> => {
  // This is the connection to the database. It is a pool of connections that we can use to query the database.
  const client = await db.connect();
  // This is the query we are running to get the authors from the database.
  const { rows } =
    await client.sql`SELECT author_id, first_name, last_name FROM Authors ORDER BY author_id ASC`;

  // This releases the connection back to the pool so that other requests can use it.
  client.release();

  // This returns the rows as an array of Author objects.
  return rows as Author[];
};
