"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const deleteBookAudit = async (book_id: number) => {
  const client = await db.connect();

  const { rowCount } = await client.sql`
    DELETE FROM Bookaudits
    WHERE book_id = ${book_id};
  `;

  client.release();

  if (rowCount === 0) {
    throw new Error(`No book audit ID found with id ${book_id}`);
  }

  // This refreshes the data upon executing a deletion.
  revalidatePath("/bookaudits");
  revalidatePath("/books");

  return { message: `Book audit ID with id ${book_id} deleted successfully` };
};
