import { getUsers } from "../db/database.ts"

export const users = await getUsers();

export const products = [
  { id: 1, name: "chicken breast", price: 12.99 },
]