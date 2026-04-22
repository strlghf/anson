import { z } from "zod"

const UserSchema = z.object({
  username: z.string().nonoptional(),
  displayName: z.string().nonoptional(),
  password: z.string().nonoptional()
})
