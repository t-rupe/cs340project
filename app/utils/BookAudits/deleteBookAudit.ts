"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const deleteAuditBook = async (book_audit_id: number) => {
  const client = await db.connect();

  const { rowCount } = await client.sql`
    DELETE FROM BooksAudits
    WHERE book_audit_id = ${book_audit_id};
  `;

  client.release();


  if (rowCount === 0) {
    throw new Error(`No book audit ID found with id ${book_audit_id}`);
  }


  // This refreshes the data upon executing a deletion.
  revalidatePath('/bookaudits')

  return { message: `Book audit ID with id ${book_audit_id} deleted successfully` };
};