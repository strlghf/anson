import { getUserByUsername } from "../db/users.repository.js";

interface Login {
  username: string;
  password: string;
}

export async function login({username, password}: Login) {
  const user = await getUserByUsername(username);

  if (!user) return null;

  if (user.password !== password) return null;

  return user;
}