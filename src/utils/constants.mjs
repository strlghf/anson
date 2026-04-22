import { getUsers } from "../mysql/database.js"

export const users = await getUsers();

export const products = [
  { id: 1, name: "chicken breast", price: 12.99 },
]