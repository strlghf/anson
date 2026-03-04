import express from "express";

const app = express();

const PORT = process.env.PORT || 5173;

const users = [
  {
    id: 1,
    name: "James",
    age: 23,
  }, {
    id: 2,
    name: "Agus",
    age: 20
  }, {
    id: 3,
    name: "Valen",
    age: 33
  },
  {
    id: 7,
    name: "Lucas",
    age: 22
  }, {
    id: 77,
    name: "Alis",
    age: 31
  }
]

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Hello!</h1>")
})

app.get("/alis", (req, res) => {
  return res.end("I loveee i lovee aa")
})

app.get("/api/users", (req, res) => {
  
  return res.send(JSON.stringify(users))
})

app.get("/api/products", (req, res) => {
  res.send([{ id: 123, name: "chicken breast", price: 12.99 }])
})

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params
  const parsedId = parseInt(id)

  if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad Request. Invalid ID" })

  const findUser = users.find(user => user.id === parsedId)

  if (!findUser) return res.sendStatus(404)

  res.send(findUser)
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})
