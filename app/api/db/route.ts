// app/api/db/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import db from "../../db";
import { rejects } from "assert";

export async function GET(req: NextRequest) {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SHOW TABLES", (error: any, results: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
    console.log(results);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: error },
      {
        status: 500,
      }
    );
  }
}
