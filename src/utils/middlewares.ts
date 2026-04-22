import { products, users } from "./constants.ts";
import type { Request, Response, NextFunction } from "express";

interface ReqUserIndex extends Request {
  findUserIndex?: number;
}

interface ReqProductIndex extends Request {
  findProductIndex?: number;
}

export function resolveUserById (req: ReqUserIndex, res: Response, next: NextFunction) {
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