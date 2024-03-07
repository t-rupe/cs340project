"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const deleteLoan = async (loan_id: number) => {
  const client = await db.connect();

  const { rowCount } = await client.sql`
    DELETE FROM loans
    WHERE loan_id = ${loan_id};
  `;

  client.release();


  if (rowCount === 0) {
    throw new Error(`No loan found with id ${loan_id}`);
  }


  // This refreshes the data upon executing a deletion.
  revalidatePath('/loans')

  return { message: `Loan with id ${loan_id} deleted successfully` };
};