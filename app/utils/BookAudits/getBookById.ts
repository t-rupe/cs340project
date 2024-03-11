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

  revalidatePath(`/bookaudits/${id}`)
  // Returns the book_id or null if no book was found
  return rows[0] as BookAudit || null;
};