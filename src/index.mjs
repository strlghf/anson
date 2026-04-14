import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).send({ msg: "Welcome to the real world" });
})

app.get("/api/users", (req, res) => {
  res.send([
    { id: 1, username: "pheralb", displayName: "Pheralb" },
    { id: 2, username: "midudev", displayName: "MiduDev" },
    { id: 3, username: "anson", displayName: "Anson" }
  ])
})

app.get("/api/products", (req, res) => {
  res.send([
    { id: "123", name: "chicken breast", price: "12.99" },
    { id: "132", name: "react course", price: "72.99" },
    { id: "231", name: "red mantle", price: "23.99" }
  ])
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
