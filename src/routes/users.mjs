import { Router } from "express";
import { query, validationResult } from "express-validator";

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