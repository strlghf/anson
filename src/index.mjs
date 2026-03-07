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
  return res.status(200).end("You my love, you are the most beautiful and georgeous woman on the entire planet, your eyes, your smile, your kind heart. I love you with my whole heart, ur existence makes my spirit shine, i will wait for you till the end, because i refuse to marry and have childs with another woman. Forgive me for my weakness. I will forever have you on my heart. I will not surrender with you, i will not give up on you. May God judge my words. God bless our beatiful love and fill us with his love.")
})

app.get("/api/users", (req, res) => {
  const { filter, value} = req.query

  // when filter and value are undefined
  if (filter && value) {
    return res.send(users.filter(user => user[filter].includes(value)))
  }

  return res.send({ users })
})

app.get("/api/products", (req, res) => {
  res.send([{ id: 123, name: "chicken breast", price: 12.99 }])
})

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params
  const parsedId = +id

  if (isNaN(parsedId)) return res.status(400).send("Bad Request. Invalid ID")

  const findUser = users.find(user => user.id === parsedId)

  if (!findUser) return res.status(404).send("User doesn't found")

  res.send(findUser)
})

app.post("/api/users", (req, res) => {
  const { body } = req
  const newUser = { id: users.at(-1).id + 1, ...body }
  users.push(newUser)
  return res.send(newUser)
})

app.put("/api/users/:id", (req, res) => {
  const { body, params: { id } } = req

  const parsedId = +id
  if (isNaN(parsedId)) return response.sendStatus(400)

  const findUserIndex = users.findIndex(user => user.id === parsedId)

  if (findUserIndex === -1) return res.sendStatus(404)

  users[findUserIndex] = { id: parsedId, ...body }

  return res.sendStatus(200)
})

app.patch("/api/users/:id", (req, res) => {
  const { body, params: { id } } = req
  const parsedId = +id
  
  if (isNaN(parsedId)) return response.sendStatus(400)

  const findUserIndex = users.findIndex(user => user.id === parsedId)
  if (findUserIndex === -1) return res.sendStatus(404)
  users[findUserIndex] = { ...users[findUserIndex], ...body }

  return res.sendStatus(200)
})

app.delete("/api/users/:id", (req, res) => {
  const { id  } = req.params
  const parsedId = +id

  if (isNaN(parsedId)) return res.sendStatus(400)
    
  const findUserIndex = users.findIndex(user => user.id === parsedId)
  if (findUserIndex === -1) return res.sendStatus(404)
  users.splice(findUserIndex, 1)

  return res.status(204).send("Resource removed")
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})
