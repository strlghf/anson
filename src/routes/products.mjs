import { Router } from "express";
import { products } from "../utils/constants.mjs";
import { resolveProductById } from "../utils/middlewares.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { createProductValidation } from "../utils/validationSchema.js";

const router = Router();

router.get("/api/products", (req, res) => {
  const { filter, value } = req.query;

  if (filter && value) return res.send(products.filter(product => product[filter].includes(value)));

  if (req.cookies.hello && req.cookies.hello === "world") {
    res.send(products);
  }

  return res.status(403).send({ msg: "Cookie invalid" })
})

router.get("/api/products/:id", resolveProductById, (req, res) => {
  const { findProductIndex } = req;

  const findProduct = products[findProductIndex];

  if (!findProduct) return res.sendStatus(404);

  return res.send(findProduct);
})

router.post("/api/products", checkSchema(createProductValidation), (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.status(400).send({ errors: result.array() });

  const data = matchedData(req);

  const newProduct = { id: +products[products.length - 1].id + 1, ...data }

  products.push(newProduct);

  res.status(201).send(newProduct);
})

router.put("/api/products/:id", resolveProductById, (req, res) => {
  const { body, findProductIndex } = req;

  products[findProductIndex] = { id: products[findProductIndex].id, ...body };

  return res.sendStatus(200);
})

router.patch("/api/products/:id", resolveProductById, (req, res) => {
  const { body, findProductIndex } = req;

  products[findProductIndex] = { ...products[findProductIndex], ...body }

  return res.sendStatus(200);
})

router.delete("/api/products/:id", resolveProductById, (req, res) => {
  const { findProductIndex } = req;

  products.splice(findProductIndex, 1);

  return res.sendStatus(204);
})

export default router;