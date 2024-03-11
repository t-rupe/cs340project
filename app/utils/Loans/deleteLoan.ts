"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const deleteLoan = async (loan_id: number) => {
  const client = await db.connect();

  // First, get the book_id associated with the loan
  const { rows } = await client.sql`
    SELECT book_id FROM loans
    WHERE loan_id = ${loan_id};
  `;

  if (rows.length === 0) {
    throw new Error(`No loan found with id ${loan_id}`);
  }

  const book_id = rows[0].book_id;

  // Then, delete the loan
  const { rowCount } = await client.sql`
    DELETE FROM loans
    WHERE loan_id = ${loan_id};
  `;

  // And update the book_status in the Books table
  await client.sql`
    UPDATE books
    SET book_status = 'Available'
    WHERE book_id = ${book_id};
  `;

  client.release();

  if (rowCount === 0) {
    throw new Error(`No loan found with id ${loan_id}`);
  }

  // This refreshes the data upon executing a deletion.
  revalidatePath('/loans')
  revalidatePath('/books')
  revalidatePath('/bookaudits')

  return { message: `Loan with id ${loan_id} deleted successfully` };
};