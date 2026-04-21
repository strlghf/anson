import mysql from "mysql2/promise"
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306
})

export async function getUsers () {
  const [result] = await pool.query("SELECT id, username, displayName FROM users;");
  return result;
}

// prepared statement
export async function getUser (id) {
  const [result] = await pool.query(`
    SELECT * FROM users
    WHERE id = (?);
  `, [id]);

  return result;
}

export async function createUser (id, username, displayName, password) {
  const [result] = await pool.query(`
    INSERT INTO users (id, username, displayName, password)
    VALUES (?, ?, ?, ?);
  `, [id, username, displayName, password])
  const idT = result.insertId
  return getGenre(idT);
}