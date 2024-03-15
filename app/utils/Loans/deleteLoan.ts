/**
 * This is the deleteLoan server action. It deletes a loan from the Loans table in the database.
 * The function receives a 'loan_id' as input.
 *
 * The function connects to the database and first fetches the 'book_id' associated with the given 'loan_id'.
 * If no loan with the given 'loan_id' is found, it throws an error.
 *
 * Then, it deletes the loan with the given 'loan_id' from the Loans table.
 *
 * After deleting the loan, it updates the 'book_status' in the Books table and the BookAudits table to 'Available'.
 *
 * It then releases the connection back to the pool and returns a success message.
 *
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/loans', '/bookaudits', and '/books' paths.
 *
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
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

  // And update the book_status in the Books table and BookAudits table
  await client.sql`
    UPDATE books
    SET book_status = 'Available'
    WHERE book_id = ${book_id};
  `;

  await client.sql`
    Update BookAudits
    SET book_status = 'Available'
    WHERE book_id = ${book_id}  
  `;

  client.release();

  if (rowCount === 0) {
    throw new Error(`No loan found with id ${loan_id}`);
  }

  // This refreshes the respective pages upon executing a deletion.
  revalidatePath("/loans");
  revalidatePath("/books");
  revalidatePath("/bookaudits");

  return { message: `Loan with id ${loan_id} deleted successfully` };
};
