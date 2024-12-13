import { Request, Response } from "express";
import { HandleError } from "../../helpers/errors/handle-error";
import { UserDto } from "../../domain/dtos/user.dto";
import { CustomError } from "../../helpers/errors/custom-error";
import { CustomResponse } from "../../helpers/custom/custom-response";
import { AuthService } from "./auth.service";
import { JwtAuth } from "../../config/jwtauth";
import { AuthDto } from "../../domain/dtos/auth.dto";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const [error, loginUserDto] = UserDto.forLogin(req.body);
      if (error) throw CustomError.badRequest(error);

      const authServices = new AuthService();

      const user = await authServices.login(loginUserDto!);
      const token = await JwtAuth.generateToken({ id: user.id });

      CustomResponse.execute({
        message: "User logged in",
        res,
        data: {
          user: {
            id: user.id,
            fullName: user.firstName + " " + user.lastName,
            username: user.username,
          },
          token,
        },
      });
    } catch (error) {
      HandleError.execute(error, res);
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const [error, registerUserDto] = UserDto.forRegister(req.body);
      if (error) throw CustomError.badRequest(error);

      const authServices = new AuthService();
      const user = await authServices.register(registerUserDto!);

      CustomResponse.execute({
        message: "User registered",
        res,
        data: user,
      });
    } catch (error) {
      HandleError.execute(error, res);
    }
  }

  static async verify(req: Request, res: Response) {
    try {
      const [error, authDto] = AuthDto.check(req.body);
      if (error) throw CustomError.badRequest(error);

      const authServices = new AuthService();
      const user = await authServices.verify(authDto!);

      CustomResponse.execute({
        message: "User verified",
        res,
        data: {
          user: {
            id: user.id,
            fullName: user.firstName + " " + user.lastName,
            username: user.username,
          },
        },
      });
    } catch (error) {
      HandleError.execute(error, res);
    }
  }
}
