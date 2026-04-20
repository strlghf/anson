import { z } from "zod"
import mysql from "mysql2"

const UserSchema = z.object({
  username: z.string().nonoptional(),
  displayName: z.string(),
  password: z.string().nonoptional()
})

const User = mysql.