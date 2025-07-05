import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getAdminByUsername } from "./db";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

export interface AuthPayload {
  adminId: string;
  username: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: AuthPayload): string {
  console.log({payload})
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch {
    return null;
  }
}

export async function authenticateAdmin(
  username: string,
  password: string
): Promise<string | null> {

  const admin = await getAdminByUsername(username);
  console.log({admin})
  if (!admin) return null;
  const isValid = await verifyPassword(password, admin.passwordHash);
  if (!isValid) return null;
  return generateToken({
    adminId: admin.id,
    username: admin.username,
  });
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  return authHeader.substring(7);
}

export function verifyAuthToken(request: NextRequest): AuthPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}
