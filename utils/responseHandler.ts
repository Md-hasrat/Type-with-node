import { Request, Response } from "express";

export function responseHandler(
  resp: Response,
  success: boolean,
  msg: string,
  status: number,
  data: unknown = null
) {
  resp.status(status).json({
    success: success,
    message: msg,
    data: data ? data : null,
  });
}
