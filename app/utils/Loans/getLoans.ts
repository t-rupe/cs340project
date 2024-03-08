'use server';
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

  // This returns the rows as an array of loan objects.
  revalidatePath("/loans")
  return rows as Loan[];
};
