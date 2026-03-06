import express from "express";

const app = express();

app.use(express.json())

const PORT = process.env.PORT || 5173;

const users = [
  { id: 1, name: "James", age: "33" }, 
  { id: 2, name: "Agus", age: 20 }, 
  { id: 3, name: "Valen", age: 33 },
  { id: 7, name: "Lucas", age: 22 }, 
  { id: 77, name: "Alis", age: 31, husband: "Lucas", verse: "Mateo 6:33", favoriteFood: "Chocolate", cat: "Pelu" },
  { id: 53, name: "André", age: 2 },
  { id: 43, name: "Salomon", age: 43 }
]

app.get("/", (req, res) => {
  return res.status(200).send("Hello")
})

app.get("/alis", (req, res) => {
  return res.end("I loveee i lovee aa")
})

app.get("/api/users", (req, res) => {
  const { query: { filter, value } } = req

  // when filter and value are undefined
  if (filter && value) {
    return res.send(users.filter(user => user[filter].includes(value)))
  }

  return res.send({ users })
})

app.get("/api/products", (req, res) => {
  res.send([{ id: 123, name: "chicken breast", price: 12.99 }])
})

app.post("/api/users/", (req, res) => {
  console.log(req.body)

  const { body } = req
  const newUser = { id: users.at(-1).id + 1, ...body }
  users.push(newUser)
  return res.status(201).send(newUser)
})

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params
  const parsedId = parseInt(id)

  if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad Request. Invalid ID" })

  const findUser = users.find(user => user.id === parsedId)

  if (!findUser) return res.sendStatus(404)

  res.send(findUser)
})

app.put("/api/users/:id", (req, res) => {
  const { body, params: { id } } = req

  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return response.sendStatus(400)

  const findUserIndex = users.findIndex(user => user.id === parsedId)

  if (findUserIndex === -1) return res.sendStatus(404)

  users[findUserIndex] = { id: parsedId, ...body }

  return res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})
