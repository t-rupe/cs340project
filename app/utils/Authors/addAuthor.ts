"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from 'next/cache'



export const addAuthor = async (formData: FormData) => {
  const client = await db.connect();

  console.log(formData)

  const firstName = formData.get("first_name");
  const lastName = formData.get("last_name");

  if (typeof firstName !== 'string' || typeof lastName !== 'string') {
    console.log(typeof firstName, typeof lastName)
    throw new Error('Invalid form data');
  }

  const { rows } = await client.sql`
    INSERT INTO Authors (first_name, last_name) 
    VALUES (${firstName}, ${lastName}) 
    RETURNING author_id, first_name, last_name;
  `;
  client.release();

  revalidatePath('/authors')
  return rows[0];


};