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
    .max(255, { message: "Please enter two characters for state" }),
  country: z
    .string()
    .trim()
    .min(1, { message: "Country is required" })
    .max(255, { message: "Please enter two characters for country" }),
  zip_code: z
    .string()
    .trim()
    .min(1, { message: "Zip code is required" })
    .max(255, { message: "Zip code is too long" }),
  created_date: z.date(),
  changed_date: z.date(),
});

export const addMember = async (member: unknown) => {
  // Validates the input and returns early if the input is invalid
  const result = schema.safeParse(member);
  if (!result.success) {
    const message = result.error.flatten().fieldErrors;

    return {
      error: message,
    };
  }

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

  // Check if the member already exists
  const { rows: existingMembers } = await client.sql`
    SELECT * FROM Members WHERE member_first_name = ${member_first_name} AND member_last_name = ${member_last_name}
  `;

  if (existingMembers.length > 0) {
    client.release();

    return {
      error: {
        member_first_name: "A member with this first name and last name already exists",
        member_last_name: "A member with this first name and last name already exists",
      },
    };
  }

  // Inserts the member into the database
  const { rows } = await client.sql`
    INSERT INTO Members (member_first_name,  member_last_name, phone_1, phone_2, street_1, street_2, city,  state, country, zip_code, created_date, changed_date) 
    VALUES (${member_first_name}, ${member_last_name}, ${phone_1}, ${phone_2}, ${street_1}, ${street_2}, ${city}, ${state}, ${country}, ${zip_code}, ${created_date.toISOString()}, ${changed_date.toISOString()}) 
  `;
  client.release();

  // Refreshes the cache for the /members page
  revalidatePath("/members");
  return rows[0];
};
