import express from "express";
import routes from "./routes/index.mjs";

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to the real world" });
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
