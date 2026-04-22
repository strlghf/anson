import passport from "passport";
import { Strategy } from "passport-local";
import { getUserById, getUserByUsername } from "../db/users.repository.ts";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
})

passport.deserializeUser(async (id: number, done) => {
  try {
    const findUser = await getUserById(id);
    if (!findUser) return done(null, false);
    done(null, findUser);
  } catch (err) {
    done(err);
  }
})

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const user = await getUserByUsername(username);
      if (!user) return done(null, false);
      if (user.password !== password) return done(null, false);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
)
