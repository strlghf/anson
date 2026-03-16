import express from "express";
import { validationResult, matchedData, checkSchema } from "express-validator";
import { loggingMiddleware } from "./middlewares/middlewares.mjs";
import { router } from "./routes/users.mjs";
import { users } from "./utils/constants.mjs";

const app = express();

app.use(express.json())
app.use(router)

app.use(loggingMiddleware)

const PORT = process.env.PORT || 5173;

app.get("/", (req, res) => {
  res.status(200).send("Hello")
})

app.get("/alis", (req, res) => {
  res.status(200).send("You my love, you are the most beautiful and georgeous woman on the entire planet, your eyes, your smile, your kind heart. I love you with my whole heart, ur existence makes my spirit shine, i will wait for you till the end, because i refuse to marry and have childs with another woman. Forgive me for my weakness. I will forever have you on my heart. I will not surrender with you, i will not give up on you. May God judge my words. God bless our beautiful love and fill us with His love.")
})

app.get("/api/products", (req, res) => {
  res.status(200).send([{ id: 123, name: "chicken breast", price: 12.99 }])
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
