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