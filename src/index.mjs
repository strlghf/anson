import express from "express";
import { query } from "express-validator";

const app = express();
app.use(express.json());

function logginMidleWare (req, res, next) {
  next();
}

function resolveUserById (req, res, next) {
  const { id } = req.params;

  if (isNaN(+id)) return res.sendStatus(400);

  const findUserIndex = users.findIndex(user => user.id === +id);

  if (findUserIndex === -1) return res.sendStatus(404);

  req.findUserIndex = findUserIndex;
  next();
}

const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, username: "pheralb", displayName: "Pheralb" },
  { id: 2, username: "midudev", displayName: "MiduDev" },
  { id: 3, username: "anson", displayName: "Anson" },
  { id: 4, username: "abraham", displayName: "Abraham" },
  { id: 5, username: "isaac", displayName: "Isaac" },
  { id: 6, username: "jacob", displayName: "Jacob" },
  { id: 7, username: "moses", displayName: "Moses" },
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
  const { filter, value } = req.query;

  if (filter && value) return res.send(
    users.filter(user => user[filter].includes(value))
  )

  return res.send(users);
})

app.get("/api/products", (req, res) => {
  res.send(products);
})

app.get("/api/users/:id", resolveUserById, (req, res) => {
  const { findUserIndex } = req;

  const findUser = users[findUserIndex];

  if (!findUser) return res.sendStatus(404);

  return res.send(findUser);
})

app.post("/api/users", (req, res) => {
  const { body } = req;
  const newUser = { id: users[users.length - 1].id + 1, ...body }
  users.push(newUser);
  return res.status(201).send(newUser);
})

app.put("/api/users/:id", resolveUserById, (req, res) => {
  const { body, findUserIndex } = req;

  users[findUserIndex] = { id: users[findUserIndex].id, ...body };

  return res.sendStatus(200);
})

app.patch("/api/users/:id", resolveUserById, (req, res) => {
  const { body, findUserIndex } = req;

  users[findUserIndex] = { ...users[findUserIndex], ...body };

  return res.sendStatus(200);
})

app.delete("/api/users/:id", resolveUserById, (req, res) => {
  const { findUserIndex } = req;

  users.splice(findUserIndex, 1);

  return res.sendStatus(204);
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
