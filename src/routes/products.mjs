import { Router } from "express";
import { products } from "../utils/constants.mjs";
import { resolveProductById } from "../utils/middlewares.mjs";
import { checkSchema } from "express-validator";
import { createProductValidation } from "../utils/validationSchema.mjs";

const router = Router();

router.get("/api/products", (req, res) => {
  const { filter, value } = req.query;

  if (filter && value) return res.send(products.filter(product => product[filter].includes(value)));

  res.send(products);
})

router.get("/api/products/:id", resolveProductById, (req, res) => {
  const { findProductIndex } = req;

  const findProduct = products[findProductIndex];

  if (!findProduct) return res.sendStatus(404);

  return res.send(findProduct);
})

router.post("/api/products", checkSchema(createProductValidation), (req, res) => {

})

export default router;