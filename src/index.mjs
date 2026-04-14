import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, username: "pheralb", displayName: "Pheralb" },
  { id: 2, username: "midudev", displayName: "MiduDev" },
  { id: 3, username: "anson", displayName: "Anson" }
]

const products = [
  { id: "123", name: "chicken breast", price: "12.99" },
  { id: "132", name: "react course", price: "72.99" },
  { id: "231", name: "red mantle", price: "23.99" }
]

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to the real world" });
})

app.get("/api/users", (req, res) => {
  res.send()
})

app.get("/api/products", (req, res) => {
  res.send()
})

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
