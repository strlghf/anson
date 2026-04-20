import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";

const app = express();

mongoose
  .connect("mongodb://localhost/express_tutorial")
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(`Error: ${err}`))

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
