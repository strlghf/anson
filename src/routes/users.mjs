import { Router } from "express";
import { checkSchema, matchedData, query, validationResult } from "express-validator";
// import { users } from "../utils/constants.mjs";
import { createUserValidation } from "../utils/validationSchema.js";
import { resolveUserById } from "../utils/middlewares.mjs";
import { getUsers, getUser, createUser } from "../mysql/database.js";

const router = Router();

router.get("/api/users", query("filter").isString().notEmpty().isLength({ min: 3, max: 10 }).withMessage("Must be at least 3-10 characters"), async(req, res) => {
  const users = await getUsers();
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      throw err;
    }
  })
  const result = validationResult(req);
  const { filter, value } = req.query;

  if (filter && value) return res.send(
    users.filter(user => user[filter].includes(value))
  )

  return res.send(users);
})

router.get("/api/users/:id", resolveUserById, async(req, res) => {
  const { id } = req.params
  const { findUserIndex } = req;
  const users = await getUser(id);

  const findUser = users[findUserIndex];

  if (!findUser) return res.sendStatus(404);

  return res.send(findUser);
})

router.post("/api/users", checkSchema(createUserValidation), async(req, res) => {
  const { username, displayName, password } = req.body;
  const result = validationResult(req);
  
  if (!result.isEmpty()) return res.status(400).send({ errors: result.array() });
  
  const data = matchedData(req);
  
  try {
    const newUser = await createUser(username, displayName, password);
    return res.status(201).send(newUser);
  } catch (err) {
    return res.sendStatus(400);
  }
})

router.put("/api/users/:id", resolveUserById, (req, res) => {
  const { body, findUserIndex } = req;

  users[findUserIndex] = { id: users[findUserIndex].id, ...body };

  return res.sendStatus(200);
})

router.patch("/api/users/:id", resolveUserById, (req, res) => {
  const { body, findUserIndex } = req;

  users[findUserIndex] = { ...users[findUserIndex], ...body };

  return res.sendStatus(200);
})

router.delete("/api/users/:id", resolveUserById, (req, res) => {
  const { findUserIndex } = req;

  users.splice(findUserIndex, 1);

  return res.sendStatus(204);
})

export default router;