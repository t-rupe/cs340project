/**
 * This is the deleteMember server action. It deletes a member from the Members table in the database.
 * The function receives a 'member_id' as input.
 * 
 * The function connects to the database and deletes the member with the given 'member_id' from the Members table.
 * If no member with the given 'member_id' is found, it throws an error.
 * 
 * It then releases the connection back to the pool and returns a success message.
 * 
 * The function also calls the 'revalidatePath' function from the Next.js cache to invalidate the cache for the '/members' path.
 * 
 * This server action is adapted from the Next.js documentation for server actions and mutations.
 * Source: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
 */
"use server";
import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export const deleteMember = async (member_id: number) => {
  const client = await db.connect();

  const { rowCount } = await client.sql`
    DELETE FROM Members
    WHERE member_id = ${member_id};
  `;

  client.release();


  if (rowCount === 0) {
    throw new Error(`No member found with id ${member_id}`);
  }


  // This refreshes the data upon executing a deletion.
  revalidatePath('/members')

  return { message: `Member with id ${member_id} deleted successfully` };
};