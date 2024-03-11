"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for validating the input
const schema = z.object({
  loan_id: z.number().optional(),
  loan_status: z
    .string()
    .trim()
    .min(1, { message: "Loan status is required" })
    .max(255, { message: "Loan status is too long" }),
  date_checked_out: z.date(),
  date_due: z.date(),
  date_returned: z.date().nullable(),
  book_id: z.number(),
  member_id: z.number().nullable(),
  changed_date: z.date(),
});
export const editLoan = async (loan_id: number, loan: unknown) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(loan);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  // Connects to the database
  const client = await db.connect();

  // Destructures the
  const loan_status = result.data.loan_status;
  const date_checked_out = result.data.date_checked_out;
  const date_due = result.data.date_due;
  const date_returned = result.data.date_returned;
  const book_id = result.data.book_id;
  const member_id = result.data.member_id;
  const changed_date = result.data.changed_date;

  // Updates the loan in the database
  const { rows } = await client.sql`
    UPDATE Loans 
    SET loan_status = ${loan_status}, date_checked_out = ${date_checked_out.toISOString()}, date_due = ${date_due.toISOString()}, date_returned = ${
    date_returned ? date_returned.toISOString() : null
  }, book_id = ${book_id}, member_id = ${member_id}, changed_date = ${changed_date.toISOString()} 
    WHERE loan_id = ${loan_id}
  `;

  // Update the book_status in the Books table based on the loan_status
  if (loan_status === "Returned") {
    await client.sql`
      UPDATE Books
      SET book_status = 'Available'
      WHERE book_id = ${book_id};
    `;
    await client.sql`
      Update BookAudits
      SET book_status = 'Available'
      WHERE book_id = ${book_id}
    `;
  } else if (loan_status === "Checked-Out" || loan_status === "Overdue") {
    await client.sql`
      UPDATE Books
      SET book_status = 'Unavailable'
      WHERE book_id = ${book_id};
    `;
    await client.sql`
      Update BookAudits
      SET book_status = 'Unavailable'
      WHERE book_id = ${book_id}
    `;
  }

  // Releases the connection back to the pool
  client.release();

  // Refreshes the cache for the loans page
  revalidatePath("/loans");
  revalidatePath("/books");
  revalidatePath("/bookaudits");
  return rows[0];
};
