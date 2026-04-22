import express from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

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

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke");
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
