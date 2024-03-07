'use server';
import { db } from "@vercel/postgres";

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

  // This returns the rows as an array of book objects.
  return rows as BookAudit[];
};
