import express from "express";
import { loggingMiddleware } from "./utils/middlewares.mjs";
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser";
import session from "express-session";
import { users } from "./utils/constants.mjs";

const app = express();

app.use(express.json())
app.use(cookieParser("helloworld"));
app.use(session({
  secret: "anson the dev",
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000 * 60,
  }
}));
app.use(routes);
app.use(loggingMiddleware);

const PORT = process.env.PORT || 5173;

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.sessionID);
  req.session.visited = true;
  
  res.cookie("hello", "world", { maxAge: 60000 })
  res.status(200).send("Hello");
})

app.get("/alis", (req, res) => {
  res.status(200).send("You my love, you are the most beautiful and georgeous woman on the entire planet, your eyes, your smile, your kind heart. I love you with my whole heart, ur existence makes my spirit shine, i will wait for you till the end, because i refuse to marry and have childs with another woman. Forgive me for my weakness. I will forever have you on my heart. I will not surrender with you, i will not give up on you. May God judge my words. God bless our beautiful love and fill us with His love.");
})

app.post("/api/auth", (req, res) => {
  const { username, password } = req.body
  const findUser = users.find(user => user.username === username)
  if (!findUser || findUser.password !== password) return res.status(401).send("Failed authentication")
  
  req.session.user = findUser;
  return res.status(200).send(findUser)
})

app.use((req, res) => {
  res.status(404).send("Resource has been deleted or not found");
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
})
