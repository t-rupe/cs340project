/**
 * This is the getBookAudits server action. It fetches all book audits from the BookAudits table in the database.
 * The function does not receive any input.
 * 
 * The function connects to the database and fetches all book audits from the BookAudits table.
 * It then releases the connection back to the pool and returns the fetched book audits.
 * 
 * The returned book audits are of type 'BookAudit', which is defined in this file.
 * A 'BookAudit' has a 'book_audit_id', a 'book_id', a 'book_status', and a 'changed_date'.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

// This is the type interface we have to use to define the shape of the data we are fetching from the database. Essentially this says, the each record has these fields.
export interface BookAudit {
  book_audit_id: number;
  book_id: number;
  book_status: string;
  changed_date: Date;
}

export const getBookAudits = async (): Promise<BookAudit[]> => {
  // This is the connection to the database. It is a pool of connections that we can use to query the database.
  const client = await db.connect();
  // This is the query we are running to get the books from the database.
  const { rows } =
    await client.sql`SELECT book_audit_id, book_id, book_status, changed_date FROM BookAudits ORDER BY book_audit_id, book_id, changed_date ASC`;

  // This releases the connection back to the pool so that other requests can use it.
  client.release();

  revalidatePath("/bookaudits");
  // This returns the rows as an array of book objects.
  return rows as BookAudit[];
};
