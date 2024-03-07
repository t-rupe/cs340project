"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for validating the input
const schema = z.object({
    member_id: z.number().optional(),
    member_first_name: z
      .string()
      .trim()
      .min(1, { message: "First name is required" })
      .max(255, { message: "First name is too long" }),
    member_last_name: z
      .string()
      .trim()
      .min(1, { message: "Last name is required" })
      .max(255, { message: "Last name is too long" }),
    phone_1: z
      .string()
      .trim()
      .min(1, { message: "Phone 1 is required" })
      .max(255, { message: "Phone 1 is too long" }),
    phone_2: z.string().optional(),
    street_1: z
      .string()
      .trim()
      .min(1, { message: "Street 1 is required" })
      .max(255, { message: "Street 1 is too long" }),
    street_2: z.string().optional(),
    city: z
      .string()
      .trim()
      .min(1, { message: "City is required" })
      .max(255, { message: "City is too long" }),
    state: z
      .string()
      .trim()
      .min(1, { message: "State is required" })
      .max(255, { message: "State is too long" }),
    country: z
      .string()
      .trim()
      .min(1, { message: "Country is required" })
      .max(255, { message: "Country is too long" }),
    zip_code: z
      .string()
      .trim()
      .min(1, { message: "Zip code is required" })
      .max(255, { message: "Zip code is too long" }),
    created_date: z.date(),
    changed_date: z.date(),
  });

export const editMember = async (member_id: number, member: unknown) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(member);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

  // Connects to the database
  const client = await db.connect();

  // Destructures the input
  const member_first_name = result.data.member_first_name; 
  const member_last_name = result.data.member_last_name;
  const phone_1 = result.data.phone_1;
  const phone_2 = result.data.phone_2;
  const street_1 = result.data.street_1; 
  const street_2 = result.data.street_2; 
  const city = result.data.city; 
  const state = result.data.state; 
  const country = result.data.country; 
  const zip_code = result.data.zip_code; 
  const created_date = result.data.created_date; 
  const changed_date = result.data.changed_date; 

  // Updates the member in the database
  const { rows } = await client.sql`
  UPDATE Members 
  SET member_first_name = ${member_first_name}, member_last_name = ${member_last_name}, phone_1 = ${phone_1}, phone_2 = ${phone_2}, street_1 = ${street_1}, street_2 = ${street_2}, city = ${city}, state = ${state}, country = ${country}, zip_code = ${zip_code}, changed_date = ${changed_date.toISOString()} 
  WHERE member_id = ${member_id}
`;



  // Releases the connection back to the pool
  client.release();

  // Refreshes the cache for the home page
  revalidatePath("/members");
  return rows[0];
};
