import express from "express";
import { loggingMiddleware } from "./utils/middlewares.mjs";
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser";
import session from "express-session";
import { users } from "./utils/constants.mjs";
import passport from "passport";
import "./strategies/local-strategy.mjs"

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
app.use(passport.initialize())
app.use(passport.session())
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

app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  })
  return req.session.user ? res.status(200).send(req.session.user) : res.status(401).send("Not authenticated")
})

app.get("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  return res.send(req.session.cart ?? []);
})

app.get("/alis", (req, res) => {
  res.status(200).send("You my love, you are the most beautiful and georgeous woman on the entire planet, your eyes, your smile, your kind heart. I love you with my whole heart, ur existence makes my spirit shine, i will wait for you till the end, because i refuse to marry and have childs with another woman. Forgive me for my weakness. I will forever have you on my heart. I will not surrender with you, i will not give up on you. May God judge my words. God bless our beautiful love and fill us with His love.");
})

// app.post("/api/auth", (req, res) => {
//   const { name, password } = req.body
//   const findUser = users.find(user => user.name === name)
//   if (!findUser || findUser.password !== password) return res.status(401).send("Failed authentication")
  
//   req.session.user = findUser;
//   return res.status(200).send(findUser)
// })

app.post("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;

  const { cart } = req.session;

  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }

  return res.status(201).send(item)
})

app.post("/api/auth", passport.authenticate("local"), (req, res) => {

})

app.use((req, res) => {
  res.status(404).send("Resource has been deleted or not found");
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
})
