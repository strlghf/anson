import passport from "passport";
import { Strategy } from "passport-local";
import {  }
import { users } from "../utils/constants.js";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
  try {
    const findUser = users.find(user => user.id === id);
    if (!findUser) return done(null, false);
    done(null, findUser);
  } catch (err) {
    done(err);
  }
})

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const users = await getUsers();
      const findUser = users.find(user => user.username === username);
      if (!findUser) throw new Error("User not found");
      if (findUser.password !== password) throw new Error("Failed authentication")
      done(null, findUser);
    } catch (err) {
      done(err);
    }
  })
)
