import { Response } from "express";
import { CustomError } from "./custom-error";
import { CustomResponse } from "../custom/custom-response";

export class HandleError {
  static execute = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      CustomResponse.execute({
        message: error.message,
        res,
        status: error.statusCode,
      });
      return;
    }

    CustomResponse.execute({
      res,
      status: 500,
      message: "Internal server error",
    });
  };
}
