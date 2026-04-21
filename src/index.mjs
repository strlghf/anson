import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
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

async function getGenres () {
  const [result] = await pool.query("SELECT * FROM genre");
  return result;
}

async function getGenre (id) {
  const [result] = await pool.query(`
    SELECT * FROM notes
    WHERE id  
  `);
  
  return result;
}

export const genres = await getGenres();
// console.log(genres);

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(session({
  secret: "LANIX123",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 60000, signed: true });
  res.status(200).send({ msg: "Welcome to the real world" });
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
