import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./envs.config";

export class JwtAuth {
  static generateToken(
    payload: Object,
    duration: string = "3h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SECRET, { expiresIn: duration }, (err, token) => {
        if (err) {
          resolve(null);
        }
        resolve(token!);
      });
    });
  }

  static verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
