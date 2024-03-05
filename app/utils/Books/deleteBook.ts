"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const deleteBook = async (book_id: number) => {
  const client = await db.connect();

  const { rowCount } = await client.sql`
    DELETE FROM books
    WHERE book_id = ${book_id};
  `;

  client.release();


  if (rowCount === 0) {
    throw new Error(`No book found with id ${book_id}`);
  }


  // This refreshes the data upon executing a deletion.
  revalidatePath('/books')

  return { message: `Book with id ${book_id} deleted successfully` };
};