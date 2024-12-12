import { Router } from "express";
import { AuthController } from "./auth.controller";

export class AuthRoute {
  static get router() {
    const router = Router();
    router.post("/login", AuthController.login);
    router.post("/register", AuthController.register);
    return router;
  }
}
