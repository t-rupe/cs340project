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