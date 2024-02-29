import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {

    const result = 
    // Create Authors table
    await sql`CREATE TABLE IF NOT EXISTS Authors (
      author_id SERIAL PRIMARY KEY,
      author_first_name VARCHAR(255) NOT NULL,
      author_last_name VARCHAR(255) NOT NULL
    );`;

    // Create Books table
    await sql`CREATE TABLE IF NOT EXISTS Books (
      book_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      isbn VARCHAR(255) NOT NULL,
      book_category VARCHAR(255) NOT NULL,
      book_type VARCHAR(255) NOT NULL,
      book_status VARCHAR(255) NOT NULL,
      changed_date TIMESTAMP NOT NULL
    );`;

    // Create Members table
    await sql`CREATE TABLE IF NOT EXISTS Members (
      member_id SERIAL PRIMARY KEY,
      member_first_name VARCHAR(255) NOT NULL,
      member_last_name VARCHAR(255) NOT NULL,
      phone_1 VARCHAR(255) NOT NULL,
      phone_2 VARCHAR(255),
      street_1 VARCHAR(255) NOT NULL,
      street_2 VARCHAR(255),
      city VARCHAR(255) NOT NULL,
      state CHAR(2) NOT NULL,
      country CHAR(2) NOT NULL,
      zip_code VARCHAR(255) NOT NULL,
      created_date TIMESTAMP NOT NULL,
      changed_date TIMESTAMP NOT NULL
    );`;

    // Create Loans table
    await sql`CREATE TABLE IF NOT EXISTS Loans (
      loan_id SERIAL PRIMARY KEY,
      loan_status VARCHAR(255) NOT NULL,
      date_checked_out TIMESTAMP NOT NULL,
      date_due TIMESTAMP NOT NULL,
      date_returned TIMESTAMP,
      book_id INT NOT NULL,
      member_id INT,
      changed_date TIMESTAMP NOT NULL,
      FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,
      FOREIGN KEY (member_id) REFERENCES Members(member_id) ON DELETE CASCADE
    );`;

    // Create BookAudits table
    await sql`CREATE TABLE IF NOT EXISTS BookAudits (
      book_audit_id SERIAL PRIMARY KEY,
      book_id INT NOT NULL,
      book_status VARCHAR(255) NOT NULL,
      changed_date TIMESTAMP NOT NULL,
      FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE
    );`;

    // Create AuthorsBooks table
    await sql`CREATE TABLE IF NOT EXISTS AuthorsBooks (
      author_id INT NOT NULL,
      book_id INT NOT NULL,
      PRIMARY KEY (author_id, book_id),
      FOREIGN KEY (author_id) REFERENCES Authors(author_id) ON DELETE CASCADE,
      FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE
    );`;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}