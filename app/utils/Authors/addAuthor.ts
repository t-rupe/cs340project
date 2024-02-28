"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  first_name: z.string().min(1, { message: "First name is required" }),
  last_name: z.string().min(1, { message: "Last name is required" }),
});

export const addAuthor = async (author: unknown) => {
  const result = schema.safeParse(author);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  const client = await db.connect();

  const firstName = result.data.first_name;
  const lastName = result.data.last_name;

  const { rows } = await client.sql`
    INSERT INTO Authors (first_name, last_name) 
    VALUES (${firstName}, ${lastName}) 
    RETURNING author_id, first_name, last_name;
  `;
  client.release();

  revalidatePath("/authors");
  return rows[0];
};