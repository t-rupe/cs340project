"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const editAuthor = async (authorId: number, formData: FormData) => {
  const client = await db.connect();

  console.log(formData);

  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");

  if (firstName === null || lastName === null) {
    throw new Error("Missing form data");
  }

  if (typeof firstName !== "string" || typeof lastName !== "string") {
    throw new Error("Invalid form data");
  }

  const { rows } = await client.sql`
  UPDATE Authors 
  SET first_name = ${firstName}, last_name = ${lastName} 
  WHERE author_id = ${authorId}
  RETURNING author_id, first_name, last_name;
`;
  client.release();

  revalidatePath("/authors");
  return rows[0];
};
