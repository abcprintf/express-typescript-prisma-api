import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { jwtGenerate, jwtRefreshTokenGenerate } from "../../lib/jwt";
import authMiddleware from "../../middleware/auth.middleware";
import RequestWithUser from "../../interfaces/requestWithUser.interface";

const prisma = new PrismaClient();

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (typeof username === "undefined") {
    res.json({
      status: `error`,
      message: `username not found`,
    });
  }

  if (typeof password === "undefined") {
    res.json({
      status: `error`,
      message: `password not found`,
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      name: username,
      password: password,
    },
  });

  /**
   * verify user
   */
  if (!user) {
    res.status(401).json({
      status: `error`,
      message: `Login fail`,
    });
    return;
  }

  /**
   * Create token with jwt
   */
  const token = jwtGenerate(user);

  /**
   * Create refresh token
   */
  const refreshToken = jwtRefreshTokenGenerate(user);

  res.status(200).json({
    status: "success",
    userInfo: user,
    access_token: token,
    refresh_token: refreshToken,
  });
});

router.post(
  "/verify",
  authMiddleware,
  (request: RequestWithUser, res: Response) => {
    /**
     * if authMiddleware pass
     * return 200 && json message
     */
    const user = request.user;
    res.json({
      status: "success",
      userInfo: user,
    });
  }
);

router.post("/logout", authMiddleware, (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "logout successfully",
  });
});

export default router;
