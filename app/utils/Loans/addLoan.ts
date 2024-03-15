/**
 * This is the addLoan server action. It adds a new loan to the Loans table in the database.
 * The function receives a 'loan' object as input.
 * 
 * The function validates the input using a Zod schema. If the input is invalid, it returns an error message.
 * 
 * The function connects to the database and checks if a loan with the same 'book_id' and 'member_id' already exists.
 * If such a loan exists, it returns an error message.
 * 
 * If no such loan exists, it inserts the new loan into the database.
 * It sets the 'loan_status', 'date_checked_out', 'date_due', 'date_returned', 'book_id', 'member_id', and 'changed_date' fields to the values provided in the 'loan' object.
 * 
 * After inserting the loan, it updates the 'book_status' in the Books table to 'Unavailable'.
 * It then releases the connection back to the pool and returns the inserted loan.
 * 
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/loans', '/bookaudits', and '/books' paths.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for validating the input
const schema = z.object({
  loan_id: z.number().optional(),
  loan_status: z.enum(["CheckedOut", "Returned"]).default("CheckedOut"),
  date_checked_out: z.date().default(new Date()),
  date_due: z.date().default(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)), // 2 weeks from now
  date_returned: z.date().nullable().default(null),
  book_id: z.number().min(1, { message: "Book is required" }),
  member_id: z.number().optional(),
  changed_date: z.date().default(new Date()),
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
    VALUES (${loan_status}, ${date_checked_out.toISOString()}, ${date_due.toISOString()}, ${
    date_returned?.toISOString() ?? null
  }, ${book_id}, ${member_id}, ${changed_date.toISOString()}) 
  `;

  // Update the book_status in the Books table
  await client.sql`
    UPDATE Books
    SET book_status = 'Unavailable'
    WHERE book_id = ${book_id};
  `;

  client.release();

  // Refreshes the cache for the  pages
  revalidatePath("/loans");
  revalidatePath("/bookaudits");
  revalidatePath("/books");
  return rows[0];
};
