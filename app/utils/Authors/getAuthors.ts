'use server';
import { db } from "@vercel/postgres";

// This is the type interface we have to use to define the shape of the data we are fetching from the database. Essentially this says, the each record has these fields.


export interface Author {
  author_id: number;
  first_name: string;
  last_name: string;
}


export const getAuthors = async (): Promise<Author[]> => {


  // This is the connection to the database. It is a pool of connections that we can use to query the database.
  const client = await db.connect();
  // This is the query we are running to get the authors from the database.
  const { rows } =
    await client.sql`SELECT author_id, first_name, last_name FROM Authors ORDER BY author_id ASC`;

  // This releases the connection back to the pool so that other requests can use it.
  client.release();

  // This returns the rows as an array of Author objects.
  return rows as Author[];
};


