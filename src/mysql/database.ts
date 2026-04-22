import mysql, { type Pool } from "mysql2/promise"
import dotenv from "dotenv";
import { env } from "./schemas/dbSchema.js";
dotenv.config();

export interface User {
  id: number;
  username: string;
  displayName: string;
  password: string;
}

const pool: Pool = mysql.createPool({
  host: env.MYSQL_HOST!,
  user: env.MYSQL_USER!,
  password: env.MYSQL_PASSWORD!,
  database: env.MYSQL_DATABASE!,
  port: 3306
})

export async function getUsers () {
  const [result] = await pool.query("SELECT id, username, password FROM users;");
  return result;
}

// prepared statement
export async function getUser (id: string) {
  const [result] = await pool.query(`
    SELECT id, username, displayName FROM users
    WHERE id = (?);
  `, [id]);

  return result;
}

export async function createUser ({ username, displayName, password }: User) {
  const [result] = await pool.query(`
    INSERT INTO users (username, displayName, password)
    VALUES (?, ?, ?);
  `, [username, displayName, password])
  const idT = result.insertId
  return getUser(idT);
}