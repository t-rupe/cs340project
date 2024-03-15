/**
 * This is the getBookById server action. It fetches a book audit by its 'book_id' from the BookAudits table in the database.
 * The function receives a 'book_id' as input.
 * 
 * The function connects to the database and fetches the book audit with the given 'book_id'.
 * If no book audit with the given 'book_id' is found, it returns null.
 * 
 * After fetching the book audit, it releases the connection back to the pool and returns the fetched book audit.
 * 
 * The returned book audit is of type 'BookAudit', which is defined in this file.
 * A 'BookAudit' has a 'book_audit_id', a 'book_id', a 'book_status', and a 'changed_date'.
 * 
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/bookaudits/{id}' and '/books' paths.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

type BookAudit = {
  book_audit_id: number;
  book_id: number;
  book_status: string;
  changed_date: Date;
};

export const getBookById = async (id: number) => {
  // Connects to the database
  const client = await db.connect();

  // Fetches the book_id from the database
  const { rows } = await client.sql`
    SELECT book_audit_id, book_id, book_status, changed_date
    FROM BookAudits 
    WHERE book_id = ${id}
  `;

  // Releases the connection back to the pool
  client.release();

  revalidatePath(`/bookaudits/${id}`);
  revalidatePath("/books");
  // Returns the book_id or null if no book was found
  return (rows[0] as BookAudit) || null;
};
