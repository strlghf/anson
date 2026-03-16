import { Router } from "express";
import { checkSchema, matchedData, query, validationResult } from "express-validator";
import { users } from "../utils/constants.mjs";
import { userValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserId } from "../utils/middlewares.mjs";

export const router = Router();

router.get("/api/users", query("filter").isString().notEmpty().withMessage("Must not be empty").isLength({ min: 3, max: 10 }).withMessage("Must be at least 3-10 characters"), (req, res) => {
  const result = validationResult(req)
  console.log(result)

  const { filter, value} = req.query

  if (filter && value) {
    return res.send(users.filter(user => user[filter].includes(value)))
  }

  res.status(200).send(users)
})

router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req

  const findUser = users[findUserIndex]

  if (!findUser) return res.status(404).send("User doesn't found")

  res.status(200).send(findUser)
})

router.post("/api/users", checkSchema(userValidationSchema), (req, res) => {
  const result = validationResult(req)
  console.log(result);

  if (!result.isEmpty()) return res.status(400).send({ errors: result.array() })

  // validate req.body
  const data = matchedData(req)

  const newUser = { id: users.at(-1).id + 1, ...data }
  users.push(newUser)
  res.status(201).send(newUser)
})

router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req

  users[findUserIndex] = { id: users[findUserIndex].id, ...body }

  res.sendStatus(200)
})

router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req

  users[findUserIndex] = { ...users[findUserIndex], ...body }

  res.sendStatus(200)
})

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req

  users.splice(findUserIndex, 1)

  res.status(204).send("Resource removed")
})