import { Router } from "express";
import { users } from "../utils/constants.mjs";

const router = Router();

router.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session)
  })
  return req.session.user ? res.status(200).send(req.session.user)
  : res.status(401).send("Failed authentication")
})

// need to validate
router.post("/api/auth", (req, res) => {
  const { username, password } = req.body;
  const findUser = users.find(user => user.username === username);

  if (!findUser || findUser.password !== password) return res.status(401).send("Failed authentication");
  
  req.session.user = findUser;
  return res.status(200).send(findUser);
})

export default router;