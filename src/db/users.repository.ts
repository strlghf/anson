import { pool } from "./database.js";
import type { ResultSetHeader } from "mysql2";

export interface User {
  id: number;
  username: string;
  displayName: string;
  password: string;
}

export async function getUserById(id: number): Promise<User | null> {
  const [result] = await pool.query<User[]>(
    `SELECT id, username, password
     FROM users
     WHERE id = (?);`, [id]
  );

  return result[0] ?? null;
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const [result] = await pool.query<User[]>(`
    SELECT id, username, password, displayName
    FROM users
    WHERE username = (?);`, [username]
  );

  return result[0] ?? null;
}

export async function createUser ({ username, displayName, password }: User) {
  const [result] = await pool.query<ResultSetHeader>(`
    INSERT INTO users (username, displayName, password)
    VALUES (?, ?, ?);
  `, [username, displayName, password])

  const user = await getUserById(result.insertId);
  if (!user) throw new Error("User creation failed");
  
  return user
}