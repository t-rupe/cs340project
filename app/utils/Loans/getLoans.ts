/**
 * This is the getLoans server action. It fetches all loans from the Loans table in the database.
 * The function does not receive any input.
 * 
 * The function connects to the database and fetches all loans from the Loans table.
 * It then releases the connection back to the pool and returns the fetched loans.
 * 
 * The returned loans are of type 'Loan', which is defined in this file.
 * A 'Loan' has a 'loan_id', 'loan_status', 'date_checked_out', 'date_due', 'date_returned', 'book_id', 'member_id', and 'changed_date'.
 * 
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/loans' path.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

// This is the type interface we have to use to define the shape of the data we are fetching from the database. Essentially this says, the each record has these fields.
export interface Loan {
  loan_id: number;
  loan_status: string;
  date_checked_out: Date;
  date_due: Date;
  date_returned: Date;
  book_id: number;
  member_id: number;
  changed_date: Date;
}

export const getLoans = async (): Promise<Loan[]> => {
  // This is the connection to the database. It is a pool of connections that we can use to query the database.
  const client = await db.connect();
  // This is the query we are running to get the loans from the database.
  const { rows } =
    await client.sql`SELECT loan_id, loan_status, date_checked_out, date_due, date_returned, book_id, member_id, changed_date FROM Loans ORDER BY loan_id ASC`;

  // This releases the connection back to the pool so that other requests can use it.
  client.release();

  // refresh the cache for the loans page
  revalidatePath("/loans");
  // This returns the rows as an array of loan objects.

  return rows as Loan[];
};
