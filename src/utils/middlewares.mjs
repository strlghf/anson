import { users } from "./constants.mjs";

export function resolveUserById (req, res, next) {
  const { id } = req.params;

  if (isNaN(+id)) return res.sendStatus(400);

  const findUserIndex = users.findIndex(user => user.id === +id);

  if (findUserIndex === -1) return res.sendStatus(404);

  req.findUserIndex = findUserIndex;
  next();
}