import { NextFunction, Request } from "express";

import jwt from "jsonwebtoken";

export default class Tokenizer {
  static decryptUser<T>(jwtKey: string, req: Request): T {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new Error("User Unathorised");
    try {
      const validatedUser = jwt.verify(authHeader, jwtKey) as T;
      return validatedUser;
    } catch (error) {
      throw new Error("Invalid User Signature");
    }
  }
  static sign(data): string {
    const key = process.env.USER_KEY;
    if (!key) throw new Error("Key not found");
    return jwt.sign(data, key);
  }
}
