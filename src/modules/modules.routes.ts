import { Router } from "express";
import { AuthRoute } from "./auth/auth.route";

export class ModulesRoutes {
  static get routesApp() {
    const router = Router();
    router.use("/auth", AuthRoute.router);
    return router;
  }
}
