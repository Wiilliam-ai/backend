import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthMiddleware } from "../../helpers/middlewares/auth-midleware";

export class AuthRoute {
  static get router() {
    const router = Router();
    router.post("/login", AuthController.login);
    router.post("/register", AuthController.register);
    router.post("/verify", AuthMiddleware.verifyToken, AuthController.verify);
    return router;
  }
}
