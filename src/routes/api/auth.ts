import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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

  res.status(200).json({
    status: "success",
    userInfo: user,
  });
});

router.post("/verify", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "verify successfully",
  });
});

router.post("/logout", (req: Request, res: Response) => {
  res.json({
    status: "success",
    message: "logout successfully",
  });
});

export default router;
