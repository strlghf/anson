import { pool } from "./database.js";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

export interface User {
  id: number;
  username: string;
  displayName: string;
  password: string;
}

type UserRow = User & RowDataPacket;

export async function getUserById(id: number): Promise<User | null> {
  const [rows] = await pool.query<UserRow[]>(
    `SELECT id, username, password
     FROM users
     WHERE id = (?);`, [id]
  );

  return rows[0] ?? null;
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const [rows] = await pool.query<UserRow[]>(`
    SELECT id, username, password, displayName
    FROM users
    WHERE username = (?);`, [username]
  );

  return rows[0] ?? null;
}

export async function createUser ({ username, displayName, password }: User) {
  const [rows] = await pool.query<ResultSetHeader>(`
    INSERT INTO users (username, displayName, password)
    VALUES (?, ?, ?);
  `, [username, displayName, password])

  const user = await getUserById(rows.insertId);
  if (!user) throw new Error("User creation failed");

  return user
}