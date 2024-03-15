"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for validating the input
const schema = z.object({
  authorsbooks_id: z.number(),
  author_id: z.number().nullable(),
  book_id: z.number().nullable(),
});

export const editAuthorsBook = async (
  authorsBooksId: number,
  authorId: number | null,
  bookId: number | null
) => {
  // Validates the input and returns early if the input is invalid
  const newAuthorsBook = {
    authorsbooks_id: authorsBooksId,
    author_id: authorId,
    book_id: bookId,
  };

  const result = schema.safeParse(newAuthorsBook);

  if (!result.success) {
    const message = result.error.flatten().fieldErrors;
    return { error: message };
  }

  // Connects to the database
  const client = await db.connect();

  try {
    // Updates the author-book relationship in the database

    console.log("Updating AuthorsBook with ID:", authorsBooksId);
    console.log("New Author ID:", authorId);
    console.log("New Book ID:", bookId);

    const updateResult = await client.sql`
      UPDATE authorsbooks
      SET author_id = ${authorId},
          book_id = ${bookId}
      WHERE authorsbooks_id = ${authorsBooksId}
    `;
    console.log("Update Result:", updateResult);

    // Retrieves the updated AuthorsBook object
    const { rows } = await client.sql`
      SELECT *
      FROM authorsbooks
      WHERE authorsbooks_id = ${authorsBooksId}
    `;

    console.log("Updated AuthorsBook:", rows);

    // Refreshes the cache for the authorsbooks page
    revalidatePath("/authors-books");

    return rows[0];
  } catch (error) {
    console.error("Error updating AuthorsBook:", error);
    return { error: "An error occurred while updating the AuthorsBook." };
  } finally {
    // Releases the connection back to the pool
    client.release();
  }
};
