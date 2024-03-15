/**
 * This is the getMembers server action. It fetches all members from the Members table in the database.
 * The function does not receive any input.
 *
 * The function connects to the database and fetches all members from the Members table.
 * It then releases the connection back to the pool and returns the fetched members.
 *
 * The returned members are of type 'Member', which is defined in this file.
 * A 'Member' has a 'member_id', 'member_first_name', 'member_last_name', 'phone_1', 'phone_2', 'street_1', 'street_2', 'city', 'state', 'country', 'zip_code', 'created_date', and 'changed_date'.
 *
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/members' path.
 *
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
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

  // refresh the data cache on /members
  revalidatePath("/members");
  // This returns the rows as an array of member objects.
  return rows as Member[];
};
