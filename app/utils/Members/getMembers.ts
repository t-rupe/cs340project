"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

// This is the type interface we have to use to define the shape of the data we are fetching from the database. Essentially this says, the each record has these fields.
export interface Member {
  member_id: number;
  member_first_name: string;
  member_last_name: string;
  phone_1: string;
  phone_2: string;
  street_1: string;
  street_2: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  created_date: Date;
  changed_date: Date;
}

export const getMembers = async (): Promise<Member[]> => {
  // This is the connection to the database. It is a pool of connections that we can use to query the database.
  const client = await db.connect();
  // This is the query we are running to get the members from the database.
  const { rows } =
    await client.sql`SELECT member_id, member_first_name, member_last_name, phone_1, phone_2, street_1, street_2, city, state, country, zip_code, created_date, changed_date FROM Members ORDER BY member_id ASC`;

  // This releases the connection back to the pool so that other requests can use it.
  client.release();

  revalidatePath("/members")
  // This returns the rows as an array of member objects.
  return rows as Member[];
};