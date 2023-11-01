import postgres from "postgres";

const DB_CONNECTION_STRING = "postgresql://hanzelkatomas3:postgres@localhost:5432/luxonis"

const sql = postgres(DB_CONNECTION_STRING)

export async function createTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS sreality (
        id serial PRIMARY KEY,
        img text,
        title varchar(128)
);`
}

export async function truncateTable() {
  await sql`TRUNCATE TABLE sreality;`
}

export async function addRow(img: string, title: string) {
  await sql`INSERT INTO sreality (img, title) VALUES (${img}, ${title});`
}

export async function getRows() {
  return sql`SELECT * FROM sreality;`;
}
