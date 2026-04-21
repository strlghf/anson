import { getUsers } from "../mysql/database.mjs"

// export const users = [
//   { id: 1, username: "strlghf", displayName: "Lucas", password: "LANIX123" }
// ]

export const users = await getUsers();

export const products = [
  { id: 1, name: "chicken breast", price: 12.99 },
]