import { z } from "zod"

const UserSchema = z.object({
  username: z.string().nonoptional(),
  displayName: z.string(),
  password: z.string().nonoptional()
})
