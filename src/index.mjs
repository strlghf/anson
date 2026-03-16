import express from "express";
import { loggingMiddleware } from "./utils/middlewares.mjs";
import usersRouter from "./routes/users.mjs";

const app = express();

app.use(express.json())
app.use(usersRouter)

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

app.use((req, res) => {
  res.status(404).send("Resource has been deleted or not found")
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})
