import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import DataStoredInToken from "../interfaces/dataStoredInToken";
import { PrismaClient } from "@prisma/client";
import RequestWithUser from "../interfaces/requestWithUser.interface";

const appSecret = process.env.APP_SECRET || "@2023";

const prisma = new PrismaClient();

async function authMiddleware(
  request: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  try {
    if (typeof request.headers["authorization"] === "undefined") {
      /**
       * if authorization header not found
       * return 401 && json message
       */
      res.status(401).json({
        status: `error`,
        message: `Authorization header not found`,
      });
      return;
    }

    /**
     * get token from authorization header
     */
    const token = request.headers["authorization"].replace("Bearer ", "");
    const verificationResponse = jwt.verify(
      token,
      appSecret
    ) as DataStoredInToken;
    if (!verificationResponse) {
      res.status(401).json({
        status: `error`,
        message: `Unauthorized`,
      });
      return;
    }
    const id = verificationResponse.id;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      /**
       * Add user to request
       */
      request.user = user;
      next();
    } else {
      next({
        status: 401,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    return res.sendStatus(403);
  }
}

export default authMiddleware;
