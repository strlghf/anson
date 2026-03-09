import express from "express";

const app = express();

app.use(express.json())

function loggingMiddleware (req, res, next) {
  console.log(`${req.method} - ${req.url}`)
  next()
}

app.use(loggingMiddleware)

function resolveIndexByUserId (req, res, next) {
  const { params: { id } } = req

  const parsedId = +id
  if (isNaN(parsedId)) return res.sendStatus(400)

  const findUserIndex = users.findIndex(user => user.id === parsedId)
  if (findUserIndex === -1) return res.sendStatus(404)

  req.findUserIndex = findUserIndex
  next()
}

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
  res.status(200).send("Hello")
})

app.get("/alis", (req, res) => {
  res.status(200).send("You my love, you are the most beautiful and georgeous woman on the entire planet, your eyes, your smile, your kind heart. I love you with my whole heart, ur existence makes my spirit shine, i will wait for you till the end, because i refuse to marry and have childs with another woman. Forgive me for my weakness. I will forever have you on my heart. I will not surrender with you, i will not give up on you. May God judge my words. God bless our beatiful love and fill us with his love.")
})

app.get("/api/users", (req, res) => {
  const { filter, value} = req.query

  // when filter and value are undefined
  if (filter && value) {
    return res.send(users.filter(user => user[filter].includes(value)))
  }

  res.status(200).send(users)
})

app.get("/api/products", (req, res) => {
  res.status(200).send([{ id: 123, name: "chicken breast", price: 12.99 }])
})

app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req

  const findUser = users[findUserIndex]

  if (!findUser) return res.status(404).send("User doesn't found")

  res.status(200).send(findUser)
})

app.post("/api/users", (req, res) => {
  const { body } = req
  const newUser = { id: users.at(-1).id + 1, ...body }
  users.push(newUser)
  res.status(201).send(newUser)
})

app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req

  users[findUserIndex] = { id: users[findUserIndex].id, ...body }

  res.sendStatus(200)
})

app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req

  users[findUserIndex] = { ...users[findUserIndex], ...body }

  res.sendStatus(200)
})

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req

  users.splice(findUserIndex, 1)

  res.status(204).send("Resource removed")
})

app.use((req, res) => {
  res.status(404).send("Resource has been deleted or not found")
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})
