import * as fs from "fs";
import * as path from "path";

const DB_PATH = path.join(process.cwd(), "data", "users.json");

interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

function ensureDbExists() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

function readUsers(): User[] {
  ensureDbExists();
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

function writeUsers(users: User[]) {
  ensureDbExists();
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

export function getUserByEmail(email: string): User | undefined {
  const users = readUsers();
  return users.find((u) => u.email === email);
}

export function getUserById(id: string): User | undefined {
  const users = readUsers();
  return users.find((u) => u.id === id);
}

export function createUser(user: Omit<User, "id" | "createdAt">) {
  const users = readUsers();
  const newUser: User = {
    ...user,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  writeUsers(users);
  return newUser;
}

export function getAllUsers(): User[] {
  return readUsers();
}
