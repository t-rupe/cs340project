/**
 * This is the deleteAuthor server action. It deletes an author from the Authors table in the database.
 * The function receives an 'authorId' as input.
 * 
 * The function connects to the database and deletes the author with the given 'authorId'.
 * If no author with the given 'authorId' is found, it throws an error.
 * 
 * After deleting the author, it releases the connection back to the pool and returns a success message.
 * 
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/authors' path.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const deleteAuthor = async (authorId: number) => {
  const client = await db.connect();

  const { rowCount } = await client.sql`
    DELETE FROM authors
    WHERE author_id = ${authorId};
  `;

  client.release();


  if (rowCount === 0) {
    throw new Error(`No author found with id ${authorId}`);
  }


  // This refreshes the data upon executing a deletion.
  revalidatePath('/authors')

  return { message: `Author with id ${authorId} deleted successfully` };
};