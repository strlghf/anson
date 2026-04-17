import { products, users } from "./constants.mjs";

export function resolveUserById (req, res, next) {
  const { id } = req.params;

  if (isNaN(+id)) return res.sendStatus(400);

  const findUserIndex = users.findIndex(user => user.id === +id);

  if (findUserIndex === -1) return res.sendStatus(404);

  req.findUserIndex = findUserIndex;
  next();
}

export function resolveProductById (req, res, next) {
  const { id } = req.params;

  if (isNaN(+id)) return res.sendStatus(400);

  const findProductIndex = products.findIndex(product => product.id === +id);

  if (findProductIndex === -1) return res.sendStatus(404);

  req.findProductIndex = findProductIndex;
  next();
}