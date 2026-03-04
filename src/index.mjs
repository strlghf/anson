import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  return res.end("Hello")
})

app.get("/alis", (req, res) => {
  return res.end("I loveee i lovee aa")
})

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`)
})
