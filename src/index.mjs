import express from "express";
import usersRouter from "./routes/users.mjs";
import productsRouter from "./routes/products.mjs";

const app = express();
app.use(express.json());
app.use(usersRouter);
app.use(productsRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to the real world" });
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
