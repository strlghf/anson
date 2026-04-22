import mysql, { type Pool } from "mysql2/promise"
import dotenv from "dotenv";
dotenv.config();

interface CreateUser {
  username: string;
  displayName: string;
  password: string;
}

const pool: Pool = mysql.createPool({
  host: process.env.MYSQL_HOST!,
  user: process.env.MYSQL_USER!,
  password: process.env.MYSQL_PASSWORD!,
  database: process.env.MYSQL_DATABASE!,
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

export async function createUser ({ username, displayName, password }: CreateUser) {
  const [result] = await pool.query(`
    INSERT INTO users (username, displayName, password)
    VALUES (?, ?, ?);
  `, [username, displayName, password])
  const idT = result.insertId
  return getUser(idT);
}