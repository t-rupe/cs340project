"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for validating the input
const schema = z.object({
  id: z.number().optional(),
  first_name: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(255, { message: "First name is too long" }),
  last_name: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(255, { message: "Last name is too long" }),    

});

export const addAuthor = async (author: unknown) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(author);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  const client = await db.connect();

  // Destructures the input ** change this **
  const firstName = result.data.first_name;
  const lastName = result.data.last_name;
 

  const { rows: existingAuthors } = await client.sql`
  SELECT * FROM Authors WHERE first_name = ${firstName} AND last_name = ${lastName}
`;

  if (existingAuthors.length > 0) {
    client.release();

    return {
      error: {
        first_name:
          "An author with this first name and last name already exists",
        last_name:
          "An author with this first name and last name already exists",
      },
    };
  }

  // Inserts the author into the database
  const { rows } = await client.sql`
    INSERT INTO Authors (first_name, last_name) 
    VALUES (${firstName}, ${lastName}) 
  `;
  client.release();

  // Refreshes the cache for the authors page
  revalidatePath("/authors");
  return rows[0];
};
