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
  date_returned: z.date(),
  book_id: z.number(),
  member_id: z.number(),
  changed_date: z.date(),
});

export const addLoan = async (loan: unknown) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(loan);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  const client = await db.connect();
  

  // Destructures the 
  const loan_status = result.data.loan_status;
  const date_checked_out = result.data.date_checked_out;
  const date_due = result.data.date_due;
  const date_returned = result.data.date_returned;
  const book_id = result.data.book_id;
  const member_id = result.data.member_id;
  const changed_date = result.data.changed_date;

  // Check if the loan already exists
  const { rows: existingLoans } = await client.sql`
    SELECT * FROM Loans WHERE book_id = ${book_id} AND member_id = ${member_id}
  `;

  if (existingLoans.length > 0) {
    client.release();

    return {
      error: {
        book_id: "A loan with this member ID and book ID already exists",
        member_id: "A loan with this member ID and book ID already exists",
      },
    };
  }

  // Inserts the loan into the database
  const { rows } = await client.sql`
    INSERT INTO Loans (loan_status, date_checked_out, date_due, date_returned, book_id, member_id, changed_date) 
    VALUES (${loan_status}, ${date_checked_out.toISOString()}, ${date_due.toISOString()}, ${date_returned.toISOString()}, ${book_id}, ${member_id}, ${changed_date.toISOString()}) 
  `;
  client.release();

  // Refreshes the cache for the /loans page
  revalidatePath("/loans");
  return rows[0];
};
